import { NextResponse } from 'next/server'
import { getTrainerPriceThb, getTrainerCompareAtPriceThb } from '@/lib/trainer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    priceThb: getTrainerPriceThb(),
    compareAtPriceThb: getTrainerCompareAtPriceThb(),
  })
}
