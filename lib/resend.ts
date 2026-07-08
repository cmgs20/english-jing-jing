import { Resend } from 'resend'

// Lazy initialisation — the Resend SDK throws immediately if the API key is
// missing, and Vercel evaluates this module at build time (before env vars
// from a first deploy necessarily exist), which breaks the build. Deferring
// construction to request time avoids that.
let _resend: Resend | null = null
export function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')
  return _resend
}

export const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'ohouifrench@gmail.com'
