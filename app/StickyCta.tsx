'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function StickyCta({ priceThb }: { priceThb: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > 560
      const nearBottom = window.scrollY + window.innerHeight > document.body.scrollHeight - 500
      setVisible(pastHero && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`${styles.stickyCta} ${visible ? styles.stickyCtaVisible : ''}`}>
      <div className={styles.stickyCtaInner}>
        <span className={styles.stickyCtaPrice}>ปลดล็อกทั้งหมด {priceThb} บาท · จ่ายครั้งเดียว</span>
        <a href="/app.html" className={styles.stickyCtaBtn}>เริ่มเรียนฟรี →</a>
      </div>
    </div>
  )
}
