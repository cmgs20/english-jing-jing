import { NextResponse, type NextRequest } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { createServiceClient } from '@/lib/supabase-service'
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend'
import { trainerConfirmationHtml, trainerNotificationHtml } from '@/lib/emails/trainer-confirmation'

export const runtime = 'nodejs'

// Manual Stripe signature verification — no SDK needed, uses Node crypto only
function verifyStripeSignature(body: string, header: string, secret: string): boolean {
  const parts = Object.fromEntries(header.split(',').map(p => p.split('=')))
  const timestamp = parts['t']
  const v1 = parts['v1']
  if (!timestamp || !v1) return false
  const signed = `${timestamp}.${body}`
  const expected = createHmac('sha256', secret).update(signed, 'utf8').digest('hex')
  try {
    return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(v1, 'hex'))
  } catch { return false }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature') ?? ''
  const secret = process.env.TRAINER_STRIPE_WEBHOOK_SECRET ?? ''

  if (!verifyStripeSignature(body, signature, secret)) {
    console.error('[webhook-trainer] signature verification failed')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let event: { type: string; data: { object: any } }
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const supabase = createServiceClient()
    const customerEmail: string = session.customer_details?.email ?? ''
    const amount = session.amount_total ? session.amount_total / 100 : 0

    // Idempotency — Stripe can replay webhook deliveries
    const { data: existing } = await supabase
      .from('trainer_purchases')
      .select('id')
      .eq('stripe_session_id', session.id)
      .maybeSingle()

    if (!existing) {
      const { data: purchase, error } = await supabase
        .from('trainer_purchases')
        .insert({
          email: customerEmail,
          amount_thb: amount,
          stripe_session_id: session.id,
        })
        .select('id')
        .single()

      if (error || !purchase) {
        console.error('[webhook-trainer] failed to record purchase:', error)
        return NextResponse.json({ error: 'db_error' }, { status: 500 })
      }

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://englishjingjing.com'
      const accessUrl = `${siteUrl}/app.html?code=${purchase.id}`

      try {
        const resend = getResend()
        if (customerEmail) {
          await resend.emails.send({
            from: FROM_EMAIL,
            to: customerEmail,
            subject: `ลิงก์เข้าใช้งานของคุณ — English jing jing`,
            html: trainerConfirmationHtml({ accessUrl, amount }),
          })
        }
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New English jing jing purchase: ${customerEmail}`,
          html: trainerNotificationHtml({ email: customerEmail, amount }),
        })
      } catch (emailErr) {
        console.error('[webhook-trainer] email send failed:', emailErr)
      }
    }
  }

  return NextResponse.json({ received: true })
}
