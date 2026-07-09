import { NextResponse } from 'next/server'
import { getResend, FROM_EMAIL } from '@/lib/resend'
import { trainerConfirmationHtml } from '@/lib/emails/trainer-confirmation'

// One-off — resends the real confirmation email for a specific already-paid
// purchase whose original email failed to deliver (FROM_EMAIL wasn't on a
// verified domain yet at the time). Hardcoded to this one purchase, not a
// general resend tool. Remove after use.
export const runtime = 'nodejs'

const PURCHASE_ID = 'c72a543e-f68f-43ce-80d8-f6740d6e0d19'
const EMAIL = 'sittichai.srikhom@gmail.com'
const AMOUNT = 249

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://englishjingjing.com'
    const accessUrl = `${siteUrl}/app.html?code=${PURCHASE_ID}`
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: EMAIL,
      subject: `Your access link — English jing jing`,
      html: trainerConfirmationHtml({ accessUrl, amount: AMOUNT }),
    })
    return NextResponse.json({ sent: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
