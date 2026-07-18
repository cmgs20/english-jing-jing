import { NextResponse, type NextRequest } from 'next/server'
import {
  getTrainerPriceForVariant,
  getTrainerCompareAtPriceForVariant,
  isTrainerDiscountActive,
  getTrainerDiscountDeadline,
  getTrainerDeviceAddonPriceThb,
  isPriceTestEnabled,
  type PriceVariant,
} from '@/lib/trainer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function readVariant(request: NextRequest): PriceVariant | null {
  const raw = request.cookies.get('ejj_pv')?.value
  return raw === 'a' || raw === 'b' ? raw : null
}

export async function GET(request: NextRequest) {
  const variant = readVariant(request)
  return NextResponse.json({
    priceThb: getTrainerPriceForVariant(variant),
    compareAtPriceThb: getTrainerCompareAtPriceForVariant(variant),
    discountActive: isPriceTestEnabled() ? false : isTrainerDiscountActive(),
    discountDeadline: getTrainerDiscountDeadline().toISOString(),
    deviceAddonPriceThb: getTrainerDeviceAddonPriceThb(),
    priceVariant: isPriceTestEnabled() ? variant : null,
  })
}
