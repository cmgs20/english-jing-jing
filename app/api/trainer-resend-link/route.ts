import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase-service'
import { getResend, FROM_EMAIL } from '@/lib/resend'
import { trainerConfirmationHtml } from '@/lib/emails/trainer-confirmation'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { data: purchase, error } = await supabase
      .from('trainer_purchases')
      .select('id, amount_thb')
      .ilike('email', email.trim())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('[trainer-resend-link] lookup failed:', error)
      return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
    }

    if (!purchase) {
      return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://englishjingjing.com'
    const accessUrl = `${siteUrl}/app.html?code=${purchase.id}`

    const resend = getResend()
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email.trim(),
      subject: `ลิงก์เข้าใช้งานของคุณ — English jing jing`,
      html: trainerConfirmationHtml({ accessUrl, amount: purchase.amount_thb }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[trainer-resend-link] error:', err)
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
  }
}
