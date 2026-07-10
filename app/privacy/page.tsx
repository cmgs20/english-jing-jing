import type { Metadata } from 'next'
import { legalCss, Clause } from '../legal-shared'

export const metadata: Metadata = { title: 'Privacy Policy — English jing jing' }

export default function PrivacyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: legalCss }} />
      <div className="legal body-legal" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <div className="legal-wrap">
          <a href="/app.html" className="legal-back">← กลับไปที่แอป · Back to app</a>
          <div className="legal-eyebrow">English jing jing</div>
          <h1 className="legal-title">
            <span className="legal-title-th legal-th">นโยบายความเป็นส่วนตัว</span>
            <span className="legal-title-en">Privacy Policy</span>
          </h1>
          <p className="legal-updated">Last updated July 2026</p>

          <Clause
            num="01"
            titleTh="ข้อมูลที่เราเก็บ"
            th={
              <>
                เราเก็บข้อมูลเท่าที่จำเป็นในการให้บริการเท่านั้น:
                <ul>
                  <li>อีเมลของคุณ (ตอนที่คุณซื้อ ใช้เพื่อส่งลิงก์เข้าใช้งาน)</li>
                  <li>ข้อมูลการชำระเงิน — เราไม่เห็นหรือเก็บเลขบัตรของคุณเลย ข้อมูลนี้จัดการโดย Stripe ผู้ให้บริการชำระเงินเท่านั้น</li>
                  <li>รหัสอุปกรณ์ (device ID) เพื่อจำกัดจำนวนอุปกรณ์ที่ใช้งานได้ต่อการซื้อหนึ่งครั้ง</li>
                  <li>บันทึกการซื้อ (วันที่ จำนวนเงิน)</li>
                </ul>
              </>
            }
            en="We only collect what's needed to run the service: your email (to send your access link), payment details (handled entirely by Stripe — we never see or store your card number), a device identifier (to enforce the per-purchase device limit), and a record of the purchase itself."
          />

          <Clause
            num="02"
            titleTh="เราใช้ข้อมูลอย่างไร"
            th="เราใช้ข้อมูลของคุณเพื่อ: ส่งลิงก์เข้าใช้งานแอปหลังการซื้อ ยืนยันการสั่งซื้อ ให้ความช่วยเหลือเมื่อคุณติดต่อเรา และป้องกันไม่ให้ลิงก์เดียวถูกใช้เกินจำนวนอุปกรณ์ที่กำหนด เราไม่ขายหรือแชร์ข้อมูลของคุณให้บุคคลภายนอกเพื่อการโฆษณา"
            en="Your data is used to deliver your access link, confirm your purchase, help you if you contact us, and prevent one link from being shared beyond the allowed number of devices. We never sell or share your data for advertising."
          />

          <Clause
            num="03"
            titleTh="ผู้ให้บริการภายนอกที่เกี่ยวข้อง"
            th={
              <>
                เราใช้บริการที่เชื่อถือได้เหล่านี้ในการดำเนินงาน: <b>Stripe</b> (ประมวลผลการชำระเงิน),{' '}
                <b>Resend</b> (ส่งอีเมล), <b>Supabase</b> (จัดเก็บข้อมูล) และ <b>Vercel</b> (โฮสติ้งเว็บไซต์)
                แต่ละบริการมีนโยบายความเป็นส่วนตัวของตนเอง
              </>
            }
            en={
              <>
                We rely on a small set of trusted services to run: <b>Stripe</b> (payment processing),{' '}
                <b>Resend</b> (email delivery), <b>Supabase</b> (data storage), and <b>Vercel</b> (web hosting).
                Each has its own privacy policy.
              </>
            }
          />

          <Clause
            num="04"
            titleTh="การเก็บรักษาข้อมูลในอุปกรณ์ของคุณ"
            th="แอปเก็บข้อมูลบางส่วนไว้ในเครื่องของคุณ (localStorage) เช่น ความคืบหน้าในการเรียนและสถานะการปลดล็อก ข้อมูลนี้อยู่ในอุปกรณ์ของคุณเท่านั้น ไม่ถูกใช้เพื่อการติดตามพฤติกรรมหรือโฆษณา"
            en="The app stores some data locally on your device (learning progress, unlock status). This stays on your device — it's not used for tracking or ads."
          />

          <Clause
            num="05"
            titleTh="สิทธิ์ของคุณ"
            th="คุณสามารถขอดูข้อมูลที่เรามีเกี่ยวกับคุณ หรือขอให้ลบข้อมูลนั้นได้ตลอดเวลา เพียงตอบกลับอีเมลยืนยันการซื้อที่คุณได้รับ"
            en="You can ask what data we hold about you, or ask us to delete it, at any time — just reply to your purchase confirmation email."
          />

          <Clause
            num="06"
            titleTh="เด็กและเยาวชน"
            th="แอปนี้ไม่ได้ออกแบบมาสำหรับเด็กอายุต่ำกว่า 13 ปีโดยไม่มีผู้ปกครองดูแล"
            en="This app isn't designed for children under 13 without parental supervision."
          />

          <Clause
            num="07"
            titleTh="การเปลี่ยนแปลงนโยบายนี้"
            th="เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว การเปลี่ยนแปลงจะถูกเผยแพร่ในหน้านี้"
            en="We may update this policy from time to time. Changes will be posted here."
          />

          <div className="legal-footer">
            English jing jing · Questions? Reply to your purchase confirmation email or contact{' '}
            <a href="mailto:englishjingjingthai@gmail.com">englishjingjingthai@gmail.com</a>.
            <br />
            See also our <a href="/terms">Terms of Service</a>.
          </div>
        </div>
      </div>
    </>
  )
}
