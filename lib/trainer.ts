// Launch discount ends at midnight Bangkok time on this date; price then reverts to the compare-at price.
const DEFAULT_DISCOUNT_DEADLINE = '2026-09-01T00:00:00+07:00'

export function getTrainerDiscountDeadline(): Date {
  const raw = process.env.TRAINER_DISCOUNT_DEADLINE
  const parsed = raw ? new Date(raw) : null
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date(DEFAULT_DISCOUNT_DEADLINE)
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
