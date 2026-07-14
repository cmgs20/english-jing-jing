import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase-service'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { deviceId } = await request.json()
    if (!deviceId || typeof deviceId !== 'string') {
      return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { error } = await supabase.from('trainer_reminders').delete().eq('device_id', deviceId)

    if (error) {
      console.error('[remove-reminder] delete failed:', error)
      return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[remove-reminder] error:', err)
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
  }
}
