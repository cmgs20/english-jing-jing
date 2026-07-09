export function trainerConfirmationHtml({
  accessUrl,
  amount,
}: {
  accessUrl: string
  amount: number
}) {
  const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://englishjingjing.com'}/logo.png`
  const thaiFont = `"Noto Sans Thai", "Leelawadee UI", "Segoe UI", sans-serif`

  return `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ลิงก์เข้าใช้งานของคุณ — English jing jing</title>
</head>
<body style="margin:0;padding:0;background:#0a0c16;font-family:${thaiFont};">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="background:linear-gradient(160deg,#161a2e,#10142a);border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,.06);">

      <!-- HEADER -->
      <div style="background:radial-gradient(circle at 50% -20%, rgba(91,141,239,.35), transparent 60%), #0d1024; padding:36px 40px 28px; text-align:center;">
        <img src="${logoUrl}" width="144" height="144" alt="English jing jing"
          style="width:144px;height:144px;border-radius:36px;display:inline-block;margin-bottom:14px;" />
        <p style="margin:0;font-size:20px;font-weight:700;color:#f2f3f7;letter-spacing:-.2px;">
          English <span style="color:#7aa8ff;">jing jing</span>
        </p>
      </div>

      <div style="padding:36px 40px 8px;">

        <!-- THAI -->
        <h1 style="font-size:21px;color:#f2f3f7;margin:0 0 10px;font-weight:700;">
          พร้อมใช้งานแล้ว! ปลดล็อกแอปเรียบร้อย
        </h1>
        <p style="font-size:15px;color:#c7ccdb;line-height:1.7;margin:0 0 24px;">
          ขอบคุณสำหรับการสั่งซื้อ (${amount} บาท) กดปุ่มด้านล่างบนอุปกรณ์ที่คุณต้องการใช้เรียน
        </p>

        <div style="text-align:center;margin-bottom:26px;">
          <a href="${accessUrl}"
            style="display:inline-block;background:linear-gradient(135deg,#5b8def,#8e5bef);color:#ffffff;font-size:15px;font-weight:700;padding:15px 34px;border-radius:50px;text-decoration:none;box-shadow:0 10px 24px -6px rgba(91,141,239,.6);">
            เปิดแอปของฉัน →
          </a>
        </div>

        <p style="font-size:13px;color:#9aa0b4;line-height:1.7;margin:0 0 8px;">
          ลิงก์นี้ใช้ได้สูงสุด 2 อุปกรณ์ (เช่น มือถือและแท็บเล็ต) เมื่อเปิดแล้ว
          ให้เพิ่มหน้านี้ไปที่หน้าจอหลักของคุณ เพื่อให้เข้าใช้งานได้ทันทีในครั้งต่อไป
          ไม่ต้องกดลิงก์นี้ซ้ำอีกบนอุปกรณ์เครื่องนั้น
        </p>
        <p style="font-size:14px;color:#c7ccdb;line-height:1.7;margin:0 0 32px;">
          มีคำถามหรือเข้าใช้งานไม่ได้? ตอบกลับอีเมลนี้ได้เลย<br/>
          <strong style="color:#f2f3f7;">ทีมงาน English jing jing</strong>
        </p>

        <div style="height:1px;background:rgba(255,255,255,.08);margin:0 0 32px;"></div>

        <!-- ENGLISH -->
        <h2 style="font-family:Georgia,serif;font-size:17px;color:#f2f3f7;margin:0 0 8px;font-weight:700;">
          You're in! Your app is unlocked.
        </h2>
        <p style="font-family:Georgia,serif;font-size:13.5px;color:#8890a6;line-height:1.7;margin:0 0 18px;">
          Thanks for your purchase (${amount} THB). Tap the button above on the device you want to learn on.
          This link works on up to 2 devices — once opened, add the page to your home screen so it's always
          one tap away. Questions or lost access? Just reply to this email.
        </p>
      </div>

      <div style="border-top:1px solid rgba(255,255,255,.06);padding:22px 40px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#6b7288;">
          © ${new Date().getFullYear()} English jing jing
        </p>
      </div>
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
