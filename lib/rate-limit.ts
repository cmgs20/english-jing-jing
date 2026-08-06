import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse, type NextRequest } from 'next/server'

// Lazy singletons — mirrors the pattern in lib/resend.ts. Building the Redis
// client at module load time would break the build before env vars exist.
let redis: Redis | null = null
function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }
  return redis
}

const limiters = new Map<string, Ratelimit>()

// `key` namespaces the limiter (and its Redis keys) per route so the same
// IP gets an independent quota on each endpoint.
function getLimiter(key: string, requests: number, window: `${number} h`): Ratelimit {
  const cached = limiters.get(key)
  if (cached) return cached
  const limiter = new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.fixedWindow(requests, window),
    prefix: `ratelimit:${key}`,
  })
  limiters.set(key, limiter)
  return limiter
}

function getClientIp(request: NextRequest): string {
  // Vercel sets x-forwarded-for on every request; fall back to a constant
  // bucket (better to share a quota than to silently skip limiting) if it's
  // ever missing, e.g. in local dev without a proxy in front.
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

/**
 * Returns a 429 response if the caller's IP has exceeded `requests` per hour
 * on this `key`, otherwise null.
 */
export async function checkRateLimit(
  request: NextRequest,
  key: string,
  requests: number,
): Promise<NextResponse | null> {
  const limiter = getLimiter(key, requests, '1 h')
  const ip = getClientIp(request)
  const { success } = await limiter.limit(ip)
  if (!success) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests — please try again later.' },
      { status: 429 },
    )
  }
  return null
}
