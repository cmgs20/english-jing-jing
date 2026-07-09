import { NextResponse } from 'next/server'
import { getResend, FROM_EMAIL } from '@/lib/resend'
import { trainerConfirmationHtml } from '@/lib/emails/trainer-confirmation'

// Temporary — sends the confirmation email design to a fixed address for
// review only. Destination is hardcoded (not a parameter) so this can't be
// used to spam arbitrary inboxes. Remove after review.
export const runtime = 'nodejs'

export async function GET() {
  try {
    const accessUrl = 'https://englishjingjing.com/app.html?code=test-preview'
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: 'learnfrenchwithcamille.m@gmail.com',
      subject: `[Test] Your access link — English jing jing`,
      html: trainerConfirmationHtml({ accessUrl, amount: 249 }),
    })
    return NextResponse.json({ sent: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
