/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src reallyshorturl.online;
  style-src 'self' *.reallyshorturl.online;
  font-src 'self';  
`

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin',
  },
]


const csp = {
  key: 'Content-Security-Policy',
  value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
}

if (process.env.NODE_ENV !== 'development') securityHeaders.push(csp)

module.exports = {
  nextConfig,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      }
    ]
  }
}
