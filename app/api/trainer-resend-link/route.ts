import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase-service'
import { getResend, FROM_EMAIL } from '@/lib/resend'
import { trainerConfirmationHtml } from '@/lib/emails/trainer-confirmation'
import { checkRateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  const rateLimited = await checkRateLimit(request, 'trainer-resend-link', 5)
  if (rateLimited) return rateLimited

  try {
    const { email } = await request.json()
    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { data: purchase, error } = await supabase
      .from('trainer_purchases')
      .select('id, amount_thb')
      .eq('email', email.trim().toLowerCase())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('[trainer-resend-link] lookup failed:', error)
      // Same response as success — don't let callers distinguish a lookup
      // failure from "no purchase found" either.
      return NextResponse.json({ ok: true })
    }

    // Always respond the same way regardless of whether a purchase was
    // found, so this endpoint can't be used to check if an email address
    // has ever made a purchase. The email itself only goes out when there's
    // actually something to send.
    if (purchase) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://englishjingjing.com'
      const accessUrl = `${siteUrl}/app.html?code=${purchase.id}`

      try {
        const resend = getResend()
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email.trim(),
          subject: `ลิงก์เข้าใช้งานของคุณ — English jing jing`,
          html: trainerConfirmationHtml({ accessUrl, amount: purchase.amount_thb }),
        })
      } catch (sendErr) {
        console.error('[trainer-resend-link] send failed:', sendErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[trainer-resend-link] error:', err)
    return NextResponse.json({ ok: true })
  }
}
