import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Price test (249 vs 349 THB): buckets each visitor once into variant "a" or
// "b" so the same price is shown from the landing page through the in-app
// paywall to checkout. Stamped as a request header too so Server Components
// (page.tsx) see the resolved variant on this very request — a cookie set
// here only reaches the *next* request, not the one currently rendering.
const COOKIE_NAME = 'ejj_pv'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90 // 90 days — long enough to run the test to a conclusion

export function middleware(request: NextRequest) {
  const existing = request.cookies.get(COOKIE_NAME)?.value
  const variant = existing === 'a' || existing === 'b' ? existing : (Math.random() < 0.5 ? 'a' : 'b')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-price-variant', variant)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  if (existing !== variant) {
    response.cookies.set(COOKIE_NAME, variant, {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    })
  }
  return response
}

export const config = {
  matcher: ['/', '/app.html'],
}
