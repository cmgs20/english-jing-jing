import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase-service'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { code, deviceId } = await request.json()
    if (!code || !deviceId || typeof code !== 'string' || typeof deviceId !== 'string') {
      return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data: purchase } = await supabase
      .from('trainer_purchases')
      .select('id, max_devices')
      .eq('id', code)
      .maybeSingle()

    if (!purchase) {
      return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 404 })
    }

    // Already activated on this exact device — just confirm, no new row needed
    const { data: existingActivation } = await supabase
      .from('trainer_activations')
      .select('id')
      .eq('purchase_id', purchase.id)
      .eq('device_id', deviceId)
      .maybeSingle()

    if (existingActivation) {
      return NextResponse.json({ ok: true })
    }

    const { count } = await supabase
      .from('trainer_activations')
      .select('id', { count: 'exact', head: true })
      .eq('purchase_id', purchase.id)

    if ((count ?? 0) >= purchase.max_devices) {
      return NextResponse.json({ ok: false, reason: 'device_limit' }, { status: 403 })
    }

    const { error: insertError } = await supabase
      .from('trainer_activations')
      .insert({ purchase_id: purchase.id, device_id: deviceId })

    if (insertError) {
      console.error('[trainer-activate] insert failed:', insertError)
      return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[trainer-activate] error:', err)
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
  }
}
