import type { Metadata } from 'next'
import { legalCss, Clause } from '../legal-shared'

export const metadata: Metadata = { title: 'Terms of Service — English jing jing' }

export default function TermsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: legalCss }} />
      <div className="legal body-legal" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <div className="legal-wrap">
          <a href="/app.html" className="legal-back">← กลับไปที่แอป · Back to app</a>
          <div className="legal-eyebrow">English jing jing</div>
          <h1 className="legal-title">
            <span className="legal-title-th legal-th">ข้อกำหนดการใช้งาน</span>
            <span className="legal-title-en">Terms of Service</span>
          </h1>
          <p className="legal-updated">Last updated July 2026</p>

          <Clause
            num="01"
            titleTh="สิ่งที่คุณซื้อ"
            th="การชำระเงินหนึ่งครั้งให้สิทธิ์เข้าถึงแอป English jing jing แบบเต็มรูปแบบตลอดชีพ ราคาปัจจุบันคือ 249 บาท ราคาอาจเปลี่ยนแปลงสำหรับผู้ซื้อรายใหม่ในอนาคต แต่จะไม่กระทบสิทธิ์ของผู้ที่ซื้อไปแล้ว"
            en="A single payment unlocks lifetime access to the full English jing jing app. Current price is 249 THB. The price may change for future buyers — it never affects access you've already purchased."
          />

          <Clause
            num="02"
            titleTh="การเข้าถึงแอป"
            th={
              <>
                หลังชำระเงิน คุณจะได้รับลิงก์เข้าใช้งานทางอีเมล ลิงก์นี้ใช้ได้สูงสุด <b>2 อุปกรณ์</b>{' '}
                ต่อการซื้อหนึ่งครั้ง หากต้องการใช้งานเพิ่มเติม สามารถซื้อสิทธิ์เพิ่มอีก 1 เครื่องได้จากหน้า
                &ldquo;กู้คืนการเข้าถึง&rdquo; ในแอป หรือติดต่อเราได้โดยตอบกลับอีเมลยืนยันการซื้อ
              </>
            }
            en={
              <>
                After payment, you'll receive an access link by email. It works on up to <b>2 devices</b>{' '}
                per purchase. Need more? You can buy one extra device slot from the &ldquo;Restore
                Access&rdquo; screen in the app, or just reply to your confirmation email.
              </>
            }
          />

          <Clause
            num="03"
            titleTh="การคืนเงิน"
            th={
              <>
                เราคืนเงินให้เฉพาะในกรณีที่เกิดปัญหาทางเทคนิคจากฝั่งเรา เช่น ไม่ได้รับลิงก์เข้าใช้งาน
                หรือแอปใช้งานไม่ได้เนื่องจากข้อผิดพลาดของระบบ <b>เราไม่คืนเงินกรณีเปลี่ยนใจ</b>{' '}
                หลังจากได้รับสิทธิ์เข้าใช้งานแล้ว เนื่องจากเป็นสินค้าดิจิทัลที่ส่งมอบทันทีและไม่สามารถ
                &ldquo;คืน&rdquo; ได้
              </>
            }
            en={
              <>
                Refunds are given only for a technical failure on our side — for example, never receiving
                your access link, or the app being broken due to a bug on our end.{' '}
                <b>We don&apos;t offer refunds for a change of mind</b> once access has been granted, since
                this is instant digital content.
              </>
            }
          />

          <Clause
            num="04"
            titleTh="การใช้งานที่เหมาะสม"
            th="การเข้าถึงแอปนี้มีไว้สำหรับการใช้งานส่วนบุคคลเท่านั้น ห้ามแชร์ ขายต่อ หรือแจกจ่ายลิงก์เข้าใช้งานให้ผู้อื่น"
            en="Access is for personal use only. Don't share, resell, or redistribute your access link."
          />

          <Clause
            num="05"
            titleTh="ไม่มีการรับประกันผลลัพธ์"
            th="English jing jing เป็นเครื่องมือช่วยฝึกฝนภาษา เราไม่รับประกันผลลัพธ์การเรียนรู้เฉพาะเจาะจงใด ๆ ความก้าวหน้าขึ้นอยู่กับการฝึกฝนของแต่ละบุคคล"
            en="English jing jing is a practice tool. We don't guarantee any specific learning outcome — progress depends on individual practice."
          />

          <Clause
            num="06"
            titleTh="กฎหมายที่ใช้บังคับ"
            th="ข้อกำหนดนี้อยู่ภายใต้กฎหมายไทย"
            en="These terms are governed by the laws of Thailand."
          />

          <Clause
            num="07"
            titleTh="การเปลี่ยนแปลงข้อกำหนด"
            th="เราอาจปรับปรุงข้อกำหนดนี้เป็นครั้งคราว การเปลี่ยนแปลงจะถูกเผยแพร่ในหน้านี้"
            en="We may update these terms from time to time. Changes will be posted here."
          />

          <div className="legal-footer">
            English jing jing · Questions? Reply to your purchase confirmation email or contact{' '}
            <a href="mailto:englishjingjingthai@gmail.com">englishjingjingthai@gmail.com</a>.
            <br />
            See also our <a href="/privacy">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </>
  )
}
