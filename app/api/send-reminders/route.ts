import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase-service'
import { getWebPush } from '@/lib/web-push'
import { sendAdminAlert } from '@/lib/alert'
import { isTrainerDiscountActive, getTrainerPriceThb, getTrainerCompareAtPriceThb } from '@/lib/trainer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SOURCE = 'Send reminders cron'

type ReminderRow = {
  id: string
  device_id: string
  endpoint: string
  keys_p256dh: string
  keys_auth: string
  reminder_time: string
  timezone: string
  last_sent_date: string | null
}

// Devices that never activated a purchase (see unlockedDeviceIds below) get
// a reminder that also mentions the discounted price, instead of the plain
// practice nudge. No "last day" / "X days left" framing: the launch discount
// runs on a rolling window with no real expiry, so a countdown here would be
// a claim that's never actually true.
function buildNotificationPayload() {
  const price = getTrainerPriceThb()
  const compareAt = getTrainerCompareAtPriceThb()
  const body = `ปลดล็อกไวยากรณ์ครบทุกบท ฝึกผันกริยาทุก tense และอีกเยอะ ในราคา ${price} บาท (ปกติ ${compareAt} บาท) ชำระครั้งเดียว`
  return { title: 'ฝึกภาษาอังกฤษต่อได้เลย', body, url: '/app.html?open=paywall' }
}

// iOS Safari's <input type="time"> doesn't reliably honor step="300", so a
// stored reminder_time isn't guaranteed to land on a 5-minute mark like the
// cron cadence does — floor it the same way so e.g. "12:48" still matches
// the "12:45" cron tick instead of never matching any tick, ever.
function floorTo5(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const flooredMinute = String(Math.floor(m / 5) * 5).padStart(2, '0')
  return `${String(h).padStart(2, '0')}:${flooredMinute}`
}

// Local wall-clock time for a given IANA zone, rounded down to the nearest
// 5 minutes so it lines up with the cron cadence that calls this route.
function localTimeParts(timezone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
  const roundedMinute = String(Math.floor(Number(get('minute')) / 5) * 5).padStart(2, '0')
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    hhmm: `${get('hour')}:${roundedMinute}`,
  }
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, reason: 'unauthorized' }, { status: 401 })
  }

  try {
    return await handleReminders()
  } catch (err) {
    await sendAdminAlert(SOURCE, err)
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
  }
}

async function handleReminders() {
  const supabase = createServiceClient()
  const { data: rows, error } = await supabase.from('trainer_reminders').select('*')
  if (error) {
    throw new Error(`Failed to fetch reminders: ${error.message}`)
  }

  // Devices that never activated a purchase are eligible for the price-nudge
  // notification below — everyone else just gets the normal practice reminder.
  const { data: activations, error: activationsError } = await supabase
    .from('trainer_activations')
    .select('device_id')
  if (activationsError) {
    throw new Error(`Failed to fetch activations: ${activationsError.message}`)
  }
  const unlockedDeviceIds = new Set((activations ?? []).map((a) => a.device_id))

  const discountActive = isTrainerDiscountActive()

  const webpush = getWebPush()
  let sent = 0
  const failures: string[] = []

  for (const row of (rows ?? []) as ReminderRow[]) {
    let local
    try {
      local = localTimeParts(row.timezone)
    } catch (e) {
      continue // invalid/unknown timezone string, skip this row
    }
    if (local.hhmm !== floorTo5(row.reminder_time)) continue
    if (row.last_sent_date === local.date) continue

    const showPriceNudge = !unlockedDeviceIds.has(row.device_id) && discountActive
    const payload = showPriceNudge
      ? buildNotificationPayload()
      : { title: 'Time to practice!', body: 'jing jing is ready when you are.' }

    try {
      await webpush.sendNotification(
        { endpoint: row.endpoint, keys: { p256dh: row.keys_p256dh, auth: row.keys_auth } },
        JSON.stringify(payload),
      )
      sent++
      await supabase.from('trainer_reminders').update({ last_sent_date: local.date }).eq('id', row.id)
    } catch (err: any) {
      if (err?.statusCode === 404 || err?.statusCode === 410) {
        // subscription no longer valid on the browser's push service
        await supabase.from('trainer_reminders').delete().eq('id', row.id)
      } else {
        console.error('[send-reminders] push failed for', row.id, err)
        failures.push(`reminder ${row.id}: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
  }

  if (failures.length > 0) {
    await sendAdminAlert(SOURCE, `${failures.length} reminder(s) failed to send:\n\n${failures.join('\n')}`)
  }

  return NextResponse.json({ ok: true, sent, failed: failures.length })
}
