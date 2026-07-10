import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase-service'

export const runtime = 'nodejs'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(request: NextRequest) {
  try {
    const { code, deviceId } = await request.json()
    if (!code || !deviceId || typeof code !== 'string' || typeof deviceId !== 'string' || !UUID_RE.test(code)) {
      return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Locks the purchase row and checks+inserts the device activation in one
    // transaction, so concurrent activations for the same purchase can't
    // both slip past the device-limit check before either commits.
    const { data, error } = await supabase.rpc('activate_trainer_device', {
      p_purchase_id: code,
      p_device_id: deviceId,
    })

    if (error) {
      console.error('[trainer-activate] rpc failed:', error)
      return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
    }

    const result = data as { ok: boolean; reason?: string }
    const status = result.ok ? 200 : result.reason === 'device_limit' ? 403 : result.reason === 'invalid' ? 404 : 500
    return NextResponse.json(result, { status })
  } catch (err) {
    console.error('[trainer-activate] error:', err)
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
  }
}
