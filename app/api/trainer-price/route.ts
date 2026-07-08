import { NextResponse } from 'next/server'
import { getTrainerPriceThb } from '@/lib/trainer'

export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json({ priceThb: getTrainerPriceThb() })
}
