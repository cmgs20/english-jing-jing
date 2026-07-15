import { getResend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend'

const ALERT_RECIPIENTS = Array.from(new Set([ADMIN_EMAIL, 'englishjingjingthai@gmail.com']))

/** Emails Camille when a cron job fails, so she finds out before a student does. */
export async function sendAdminAlert(source: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`[${source}] alert:`, message)

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: ALERT_RECIPIENTS,
      subject: `⚠️ ${source} failed`,
      html: `
        <div style="font-family:Georgia,serif;padding:24px;">
          <p style="font-size:16px;color:#1c1c1e;"><strong>${source}</strong> failed at ${new Date().toISOString()}.</p>
          <pre style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;font-size:13px;color:#6b6b6b;">${message}</pre>
        </div>
      `,
    })
  } catch (alertError) {
    // Last resort: at least this shows up in Vercel logs
    console.error(`Failed to send admin alert for ${source}:`, alertError)
  }
}
