import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase-service'

export const runtime = 'nodejs'

const TIME_RE = /^\d{2}:\d{2}$/

// The stored endpoint is later POSTed to directly by the send-reminders cron
// (via the web-push library), so an unvalidated value here is a server-side
// request forgery vector — restrict to the known push service origins.
const ALLOWED_ENDPOINT_PREFIXES = [
  'https://fcm.googleapis.com/',
  'https://updates.push.services.mozilla.com/',
  'https://web.push.apple.com/',
]
const WNS_ENDPOINT_RE = /^https:\/\/[a-z0-9-]+\.notify\.windows\.com\//i

function isAllowedPushEndpoint(endpoint: string): boolean {
  return ALLOWED_ENDPOINT_PREFIXES.some((prefix) => endpoint.startsWith(prefix)) || WNS_ENDPOINT_RE.test(endpoint)
}

export async function POST(request: NextRequest) {
  try {
    const { deviceId, endpoint, keys, reminderTime, timezone, dailyGoalMin } = await request.json()

    if (
      !deviceId || typeof deviceId !== 'string' ||
      !endpoint || typeof endpoint !== 'string' || !isAllowedPushEndpoint(endpoint) ||
      !keys?.p256dh || typeof keys.p256dh !== 'string' ||
      !keys?.auth || typeof keys.auth !== 'string' ||
      typeof reminderTime !== 'string' || !TIME_RE.test(reminderTime) ||
      !timezone || typeof timezone !== 'string' ||
      !Number.isFinite(dailyGoalMin)
    ) {
      return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { error } = await supabase.from('trainer_reminders').upsert(
      {
        device_id: deviceId.slice(0, 100),
        endpoint,
        keys_p256dh: keys.p256dh,
        keys_auth: keys.auth,
        reminder_time: reminderTime,
        timezone: timezone.slice(0, 100),
        daily_goal_min: dailyGoalMin,
      },
      { onConflict: 'device_id' },
    )

    if (error) {
      console.error('[save-reminder] upsert failed:', error)
      return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[save-reminder] error:', err)
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
  }
}
