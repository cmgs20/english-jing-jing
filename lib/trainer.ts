export function getTrainerPriceThb(): number {
  const raw = process.env.TRAINER_PRICE_THB
  const parsed = raw ? parseInt(raw, 10) : NaN
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 249
}

export function getTrainerCompareAtPriceThb(): number {
  const raw = process.env.TRAINER_COMPARE_PRICE_THB
  const parsed = raw ? parseInt(raw, 10) : NaN
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 349
}
