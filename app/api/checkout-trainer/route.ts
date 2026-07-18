import { NextResponse } from 'next/server'
import { getTrainerPriceThb } from '@/lib/trainer'

export const runtime = 'nodejs'

// ── Stripe via direct fetch — avoids SDK bundling issues on serverless hosts ──
async function createStripeSession(params: Record<string, string>): Promise<{ url: string; id: string }> {
  const key = process.env.TRAINER_STRIPE_SECRET_KEY
  if (!key) throw new Error('TRAINER_STRIPE_SECRET_KEY is not set')

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params).toString(),
  })
  const data = await res.json() as { url: string; id: string; error?: { message: string } }
  if (!res.ok) throw new Error(data.error?.message ?? `Stripe error ${res.status}`)
  return data
}

export async function POST(request: Request) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const priceThb = getTrainerPriceThb()

    // Which module's paywall sent the customer here (drill/verbs/grammar/pron/settings)
    // — carried through to the webhook so the purchase event can be tagged by context.
    let context: string | null = null
    try {
      const body = await request.json()
      if (typeof body?.context === 'string') context = body.context.slice(0, 40)
    } catch {
      // no body sent — fine, context stays null
    }

    const session = await createStripeSession({
      'payment_method_types[0]': 'promptpay',
      'payment_method_types[1]': 'card',
      'mode': 'payment',
      'line_items[0][price_data][currency]': 'thb',
      'line_items[0][price_data][unit_amount]': String(priceThb * 100),
      'line_items[0][price_data][product_data][name]': 'English jing jing — Full Access',
      'line_items[0][price_data][product_data][description]': 'One-time purchase, lifetime access to the full app',
      'line_items[0][quantity]': '1',
      'metadata[type]': 'trainer',
      ...(context ? { 'metadata[context]': context } : {}),
      'success_url': `${siteUrl}/app.html?purchased=1&session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `${siteUrl}/app.html?cancelled=1`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[checkout-trainer] error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
