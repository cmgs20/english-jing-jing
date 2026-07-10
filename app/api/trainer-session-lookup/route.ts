import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase-service'

export const runtime = 'nodejs'

// Lets the success page recover the access code from the Stripe session id
// when it lands back on the site — a fallback for when the confirmation
// email fails to send or arrive.
export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()
    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { data: purchase } = await supabase
      .from('trainer_purchases')
      .select('id')
      .eq('stripe_session_id', sessionId)
      .maybeSingle()

    if (!purchase) {
      // Webhook may not have processed the purchase yet — caller should retry shortly.
      return NextResponse.json({ ok: false, reason: 'pending' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, code: purchase.id })
  } catch (err) {
    console.error('[trainer-session-lookup] error:', err)
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
  }
}
