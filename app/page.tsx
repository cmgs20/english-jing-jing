import type { Metadata } from 'next'
import styles from './page.module.css'
import {
  getTrainerPriceThb,
  getTrainerCompareAtPriceThb,
  isTrainerDiscountActive,
  getTrainerDiscountDeadline,
  getTrainerDeviceAddonPriceThb,
} from '@/lib/trainer'

export const dynamic = 'force-dynamic'

const title = 'English jing jing: เรียนภาษาอังกฤษที่ออกแบบมาสำหรับคนไทย'
const description =
  'แฟลชการ์ด ไวยากรณ์ ฝึกผันกริยา และฝึกออกเสียง ออกแบบมาสำหรับคนไทยระดับ A1–B1 โดยเฉพาะ แฟลชการ์ดใช้ฟรีตลอดไป จ่ายครั้งเดียวปลดล็อกที่เหลือทั้งหมด'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: '/',
    title,
    description,
    images: ['/icon-512.png'],
    locale: 'th_TH',
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/icon-512.png'],
  },
}

function Icon({ path, size = 22 }: { path: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  )
}

const MODULES = [
  {
    name: 'Flashcards', color: 'var(--blue)', tag: 'free', tagLabel: 'ฟรีตลอดไป',
    desc: 'คำศัพท์ A1–B1 ไทย → อังกฤษ ไม่จำกัดจำนวน',
    path: 'm12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z M22 17.65l-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65 M22 12.65l-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65',
  },
  {
    name: 'Conjugation Drill', color: 'var(--orange)', tag: 'sample', tagLabel: 'ตัวอย่างฟรี',
    desc: 'ฝึกผันกริยาทุก tense พร้อมเฉลยทันที',
    path: 'M12 20h9 M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z',
  },
  {
    name: 'Pronunciation', color: 'var(--violet)', tag: 'sample', tagLabel: 'ตัวอย่างฟรี',
    desc: 'เสียงที่คนไทยออกเสียงยาก เช่น R vs L',
    path: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3',
  },
  {
    name: 'Verb Dictionary', color: 'var(--green)', tag: 'sample', tagLabel: 'ตัวอย่างฟรี',
    desc: 'ค้นการผันกริยาแบบเต็มของคำใดก็ได้',
    path: 'M12 7v14 M16 12h2 M16 8h2 M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z M6 12h2 M6 8h2',
  },
  {
    name: 'Grammar', color: 'var(--red)', tag: 'sample', tagLabel: 'ตัวอย่างฟรี',
    desc: 'บทเรียนทีละขั้น: กฎ เปรียบเทียบ ฝึกใช้',
    path: 'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z M22 10v6 M6 12.5V16a6 3 0 0 0 12 0v-3.5',
  },
]

export default function LandingPage() {
  const priceThb = getTrainerPriceThb()
  const compareAtPriceThb = getTrainerCompareAtPriceThb()
  const discountActive = isTrainerDiscountActive()
  const deviceAddonPriceThb = getTrainerDeviceAddonPriceThb()
  const deadlineLabel = getTrainerDiscountDeadline().toLocaleDateString('th-TH-u-ca-buddhist', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Bangkok',
  })

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <nav className={styles.nav}>
          <a href="/app.html" className={styles.brand}>
            <span className={styles.brandMark} />
            <span className={styles.brandWord}>English <span>jing jing</span></span>
          </a>
          <a href="/app.html" className={styles.navLink}>เข้าสู่แอป →</a>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>สำหรับคนไทยระดับ A1–B1</span>
          <h1 className={styles.h1}>
            เรียนภาษาอังกฤษที่ออกแบบมา<br />สำหรับคนไทย<span className={styles.accent}>โดยเฉพาะ</span>
          </h1>
          <p className={styles.subEn}>
            An English trainer built specifically for Thai speakers: vocabulary, grammar, verb
            conjugation, and pronunciation drills for sounds that are genuinely hard to hear.
          </p>
          <div className={styles.ctaRow}>
            <a href="/app.html" className={styles.cta}>เริ่มเรียนฟรี →</a>
            <span className={styles.ctaNote}>ไม่ต้องสมัครสมาชิก · ไม่ต้องใช้บัตรเครดิต · No signup required</span>
          </div>
        </header>

        <div className={styles.mockWrap}>
          <div className={styles.mock}>
            <span className={styles.mockLvl}>A1 · Vocabulary</span>
            <div className={styles.mockTh}>น่าประหลาดใจ</div>
            <div className={styles.mockEn}>surprising</div>
            <div className={styles.mockEx}>&ldquo;The news was surprising.&rdquo;</div>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>5 โหมดฝึก ครบทุกทักษะ</h2>
            <p className={styles.h2Sub}>Five practice modes, every skill you need to go from A1 to B1.</p>
          </div>
          <div className={styles.grid}>
            {MODULES.map((m) => (
              <div className={styles.modCard} key={m.name}>
                <div className={styles.modIcon} style={{ background: m.color }}>
                  <Icon path={m.path} />
                </div>
                <div className={styles.modBody}>
                  <div className={styles.modName}>
                    {m.name}
                    <span className={m.tag === 'free' ? styles.tagFree : styles.tagSample}>{m.tagLabel}</span>
                  </div>
                  <div className={styles.modDesc}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>ทำไมถึงต่างจากแอปเรียนภาษาอื่น</h2>
            <p className={styles.h2Sub}>What makes this different from a generic language app.</p>
          </div>
          <div className={styles.whyList}>
            <div className={styles.whyItem}>
              <div>
                <b>ฝึกออกเสียงที่คนไทยออกเสียงยากจริง ๆ</b>
                <p>Minimal-pair drills for the sounds Thai speakers specifically struggle with: B vs P, R vs L, and more, not generic pronunciation tips.</p>
              </div>
            </div>
            <div className={styles.whyItem}>
              <div>
                <b>คำแปลไทยควบคู่ทุกจุด</b>
                <p>Every word, sentence, and grammar rule shows the Thai translation alongside the English, so nothing is left to guess.</p>
              </div>
            </div>
            <div className={styles.whyItem}>
              <div>
                <b>ไวยากรณ์แบบเทียบกับภาษาไทย</b>
                <p>Grammar lessons show the pattern, then how Thai flips it, so the rule makes sense against a language you already know.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.priceCard}>
            <div className={styles.priceTh}>เข้าถึงได้ไม่จำกัด ตลอดชีพ</div>
            <div className={styles.priceRow}>
              {discountActive && <span className={styles.priceStrike}>{compareAtPriceThb} บาท</span>}
              <span className={styles.priceNow}>{priceThb} บาท</span>
            </div>
            <div className={styles.priceUnit}>ชำระครั้งเดียว · One-time payment</div>
            {discountActive && <div className={styles.priceDeadline}>ราคานี้ถึง {deadlineLabel} เท่านั้น</div>}
            <ul className={styles.priceBullets}>
              <li>ปลดล็อกทุกโหมด: ไวยากรณ์ครบ A1–B1, Drill ทุก tense, ทุกเสียงที่ออกยาก, พจนานุกรมกริยาทั้งหมด</li>
              <li>แฟลชการ์ดใช้ฟรีตลอดไป ไม่ว่าจะซื้อหรือไม่</li>
              <li>ใช้ได้ 2 อุปกรณ์ต่อการซื้อ 1 ครั้ง เพิ่มอุปกรณ์ภายหลังได้ในราคา {deviceAddonPriceThb} บาท</li>
            </ul>
            <a href="/app.html" className={styles.cta}>เริ่มเรียนฟรี →</a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>คำถามที่พบบ่อย</h2>
          </div>
          <details className={styles.faq}>
            <summary>ต้องสมัครสมาชิกไหม</summary>
            <p className={styles.faqBody}>ไม่ต้อง เปิดลิงก์แล้วเริ่มเรียนได้เลย หลังชำระเงินคุณจะได้รับลิงก์เข้าใช้งานทางอีเมล ไม่มีรหัสผ่านให้จำ.<br />No account needed — just open the link and start. After payment you get an access link by email, no password to remember.</p>
          </details>
          <details className={styles.faq}>
            <summary>ใช้ได้กี่อุปกรณ์</summary>
            <p className={styles.faqBody}>การซื้อ 1 ครั้งใช้ได้สูงสุด 2 อุปกรณ์ (เช่น มือถือและแท็บเล็ต) หากต้องการเพิ่ม สามารถซื้อสิทธิ์เพิ่มอีก 1 เครื่องได้จากหน้ากู้คืนการเข้าถึงในแอป.<br />Each purchase works on up to 2 devices. Need more? You can add an extra device slot from the Restore Access screen in the app.</p>
          </details>
          <details className={styles.faq}>
            <summary>มีนโยบายคืนเงินไหม</summary>
            <p className={styles.faqBody}>เราคืนเงินเฉพาะกรณีปัญหาทางเทคนิคจากฝั่งเรา เช่น ไม่ได้รับลิงก์เข้าใช้งาน ไม่คืนเงินกรณีเปลี่ยนใจหลังปลดล็อกแล้ว เนื่องจากเป็นสินค้าดิจิทัลที่ส่งมอบทันที.<br />Refunds are given only for a technical failure on our side (e.g. never receiving your access link) — not for a change of mind after access is granted, since this is instant digital content.</p>
          </details>
          <details className={styles.faq}>
            <summary>แฟลชการ์ดฟรีจริงไหม</summary>
            <p className={styles.faqBody}>จริง แฟลชการ์ดคำศัพท์ A1–B1 ใช้ได้ฟรีไม่จำกัดตลอดไป ไม่ว่าคุณจะซื้อเวอร์ชันเต็มหรือไม่.<br />Yes — flashcards are unlimited and free forever, whether or not you ever buy full access.</p>
          </details>
        </section>

        <footer className={styles.footer}>
          English jing jing · Questions? <a href="mailto:englishjingjingthai@gmail.com">englishjingjingthai@gmail.com</a>
          <br />
          <a href="/terms">Terms of Service</a> · <a href="/privacy">Privacy Policy</a> · <a href="/app.html">Open the app</a>
          <br />
          © {new Date().getFullYear()} English jing jing
        </footer>
      </div>
    </div>
  )
}
