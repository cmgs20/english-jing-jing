import { NextResponse, type NextRequest } from 'next/server'
import { getTrainerDeviceAddonPriceThb } from '@/lib/trainer'
import { createServiceClient } from '@/lib/supabase-service'

export const runtime = 'nodejs'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

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

export async function POST(request: NextRequest) {
  try {
    const { purchaseId } = await request.json()
    if (!purchaseId || typeof purchaseId !== 'string' || !UUID_RE.test(purchaseId)) {
      return NextResponse.json({ error: 'Invalid purchase id' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { data: purchase } = await supabase
      .from('trainer_purchases')
      .select('id')
      .eq('id', purchaseId)
      .maybeSingle()

    if (!purchase) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const priceThb = getTrainerDeviceAddonPriceThb()

    const session = await createStripeSession({
      'payment_method_types[0]': 'promptpay',
      'payment_method_types[1]': 'card',
      'mode': 'payment',
      'line_items[0][price_data][currency]': 'thb',
      'line_items[0][price_data][unit_amount]': String(priceThb * 100),
      'line_items[0][price_data][product_data][name]': 'English jing jing — Extra Device',
      'line_items[0][price_data][product_data][description]': 'One-time purchase, unlocks one additional device for your existing lifetime access',
      'line_items[0][quantity]': '1',
      'metadata[type]': 'device_addon',
      'metadata[purchaseId]': purchaseId,
      'success_url': `${siteUrl}/app.html?device_addon=1&code=${purchaseId}`,
      'cancel_url': `${siteUrl}/app.html?device_addon_cancelled=1&code=${purchaseId}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[checkout-device-addon] error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
