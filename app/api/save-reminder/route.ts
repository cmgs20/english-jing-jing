import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase-service'

export const runtime = 'nodejs'

const TIME_RE = /^\d{2}:\d{2}$/

export async function POST(request: NextRequest) {
  try {
    const { deviceId, endpoint, keys, reminderTime, timezone, dailyGoalMin } = await request.json()

    if (
      !deviceId || typeof deviceId !== 'string' ||
      !endpoint || typeof endpoint !== 'string' ||
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
        device_id: deviceId,
        endpoint,
        keys_p256dh: keys.p256dh,
        keys_auth: keys.auth,
        reminder_time: reminderTime,
        timezone,
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
