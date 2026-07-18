// A deadline months away creates no real urgency and silently goes stale once
// it passes. Absent an explicit TRAINER_DISCOUNT_DEADLINE (for a genuine
// one-time flash sale with a hard end date), the discount instead rolls in
// fixed-length windows anchored to the epoch, so "time left" is always a real,
// short, currently-true number and never needs manual renewal.
const ROLLING_DISCOUNT_WINDOW_HOURS = 48

export function getTrainerDiscountDeadline(): Date {
  const raw = process.env.TRAINER_DISCOUNT_DEADLINE
  if (raw) {
    const parsed = new Date(raw)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  const windowMs = ROLLING_DISCOUNT_WINDOW_HOURS * 3600 * 1000
  const cycleStart = Math.floor(Date.now() / windowMs) * windowMs
  return new Date(cycleStart + windowMs)
}

export function isTrainerDiscountActive(): boolean {
  return Date.now() < getTrainerDiscountDeadline().getTime()
}

export function getTrainerCompareAtPriceThb(): number {
  const raw = process.env.TRAINER_COMPARE_PRICE_THB
  const parsed = raw ? parseInt(raw, 10) : NaN
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 349
}

export function getTrainerPriceThb(): number {
  if (!isTrainerDiscountActive()) return getTrainerCompareAtPriceThb()
  const raw = process.env.TRAINER_PRICE_THB
  const parsed = raw ? parseInt(raw, 10) : NaN
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 249
}

export function getTrainerDeviceAddonPriceThb(): number {
  const raw = process.env.TRAINER_DEVICE_ADDON_PRICE_THB
  const parsed = raw ? parseInt(raw, 10) : NaN
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 49
}
