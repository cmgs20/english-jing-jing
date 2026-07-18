// A deadline months away creates no real urgency and silently goes stale once
// it passes. Absent an explicit TRAINER_DISCOUNT_DEADLINE (for a genuine
// one-time flash sale with a hard end date), the discount instead rolls in
// fixed-length windows anchored to the epoch, so "time left" is always a real,
// short, currently-true number and never needs manual renewal.
//
// Because this rolling window never truly ends, the UI deliberately never
// surfaces a "days left" / "valid until" countdown for it — that framing
// would be a claim that's never actually true. Only set an explicit
// TRAINER_DISCOUNT_DEADLINE if you want to bring back a real, honest
// countdown for a genuine time-boxed promo.
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

// ── Price test: 249 vs 349 THB flat, no discount framing ──
// Each visitor is bucketed once (see middleware.ts, cookie "ejj_pv") into
// variant "a" or "b" and always sees/pays that price from then on. Toggle
// with TRAINER_PRICE_TEST_ENABLED=true; leaving it unset/false fully
// restores the old rolling-discount price with zero code changes.
export type PriceVariant = 'a' | 'b'

export function isPriceTestEnabled(): boolean {
  return process.env.TRAINER_PRICE_TEST_ENABLED === 'true'
}

function getPriceTestVariantPriceThb(variant: PriceVariant): number {
  const raw = process.env[variant === 'a' ? 'TRAINER_PRICE_TEST_A_THB' : 'TRAINER_PRICE_TEST_B_THB']
  const parsed = raw ? parseInt(raw, 10) : NaN
  if (Number.isFinite(parsed) && parsed > 0) return parsed
  return variant === 'a' ? 249 : 349
}

export function getTrainerPriceForVariant(variant: PriceVariant | null): number {
  if (isPriceTestEnabled() && variant) return getPriceTestVariantPriceThb(variant)
  return getTrainerPriceThb()
}

// A flat price-test variant has no "was X" anchor to show — that's a
// rolling-discount-only concept. Returning the same number as the price
// itself makes existing "show strike only if compareAt > price" UI code
// correctly hide the strike-through during the test, with no UI changes.
export function getTrainerCompareAtPriceForVariant(variant: PriceVariant | null): number {
  if (isPriceTestEnabled() && variant) return getPriceTestVariantPriceThb(variant)
  return getTrainerCompareAtPriceThb()
}
