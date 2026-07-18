import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase-service'

export const runtime = 'nodejs'

// Client-side funnel events only — purchase completion is logged separately
// by the Stripe webhook, which is the authoritative source for that event.
const ALLOWED_EVENTS = new Set(['paywall_view', 'paywall_cta_click'])

export async function POST(request: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const event = typeof body?.event === 'string' ? body.event : ''
  if (!ALLOWED_EVENTS.has(event)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  const context = typeof body?.context === 'string' ? body.context.slice(0, 40) : null
  const deviceId = typeof body?.deviceId === 'string' ? body.deviceId.slice(0, 80) : null

  try {
    const supabase = createServiceClient()
    await supabase.from('trainer_events').insert({ event, context, device_id: deviceId })
  } catch (err) {
    // Tracking must never break the app for the user — log and move on.
    console.error('[track-event] insert failed:', err)
  }

  return NextResponse.json({ ok: true })
}
