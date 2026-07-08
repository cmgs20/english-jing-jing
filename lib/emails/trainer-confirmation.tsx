export function trainerConfirmationHtml({
  accessUrl,
  amount,
}: {
  accessUrl: string
  amount: number
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Your access link — English jing jing</title>
</head>
<body style="margin:0;padding:0;background:#0a0c16;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:40px auto;background:#161a2e;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.3);">

    <div style="background:#10142a;padding:32px 40px;text-align:center;">
      <p style="margin:0;font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#f2f3f7;">
        English <span style="color:#7aa8ff;">jing jing</span>
      </p>
    </div>

    <div style="padding:40px;">
      <h1 style="font-family:Georgia,serif;font-size:24px;color:#f2f3f7;margin:0 0 8px;">
        You're in! Your app is unlocked.
      </h1>
      <p style="font-size:15px;color:#9aa0b4;margin:0 0 28px;">
        Thanks for your purchase (${amount} THB). Tap the button below on the device you want to learn on.
      </p>

      <div style="text-align:center;margin-bottom:28px;">
        <a href="${accessUrl}"
          style="display:inline-block;background:#5b8def;color:#ffffff;font-size:15px;font-weight:bold;padding:16px 32px;border-radius:50px;text-decoration:none;">
          Open my app →
        </a>
      </div>

      <p style="font-size:13px;color:#6b7288;line-height:1.6;margin:0 0 24px;">
        This link works on up to 2 devices (for example, your phone and a tablet). Once opened, add the page
        to your home screen so it's always one tap away — you won't need to click this link again on that device.
      </p>

      <p style="font-size:14px;color:#9aa0b4;line-height:1.6;margin:0;">
        Questions or lost access? Just reply to this email.<br/>
        <strong style="color:#f2f3f7;">Camille</strong>
      </p>
    </div>

    <div style="background:#10142a;border-top:1px solid rgba(255,255,255,.06);padding:20px 40px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#6b7288;">
        © ${new Date().getFullYear()} English jing jing
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

export function trainerNotificationHtml({
  email,
  amount,
}: {
  email: string
  amount: number
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New trainer purchase</title></head>
<body style="margin:0;padding:0;background:#faf9f6;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
    <div style="background:#5b8def;padding:24px 40px;">
      <p style="margin:0;font-size:18px;font-weight:bold;color:#ffffff;">New English jing jing purchase</p>
    </div>
    <div style="padding:32px 40px;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr><td style="padding:8px 0;color:#6b6b6b;width:120px;">Email</td><td style="padding:8px 0;color:#1c1c1e;">${email}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6b6b;">Amount</td><td style="padding:8px 0;color:#5b8def;font-weight:bold;">${amount} THB</td></tr>
      </table>
    </div>
  </div>
</body>
</html>
  `.trim()
}
