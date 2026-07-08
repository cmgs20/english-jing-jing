/** @type {import('next').NextConfig} */
const nextConfig = {
  // Same fix Oh Oui French needed: hosts that serve static files with
  // Content-Disposition: inline; filename="..." make Chrome treat the page
  // as a download and sandbox script execution, silently breaking the app.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/app.html',
        headers: [
          { key: 'Content-Disposition', value: 'inline' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      { source: '/', destination: '/app.html', permanent: false },
    ]
  },
}

module.exports = nextConfig
