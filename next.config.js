/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

// Fix the i18n object to ensure localeDetection is a boolean
const fixedI18n = {
  ...i18n,
  localeDetection: false // Set to false as per warning
}

const nextConfig = {
  reactStrictMode: true,
  i18n: fixedI18n,
  images: {
    domains: ['images.unsplash.com', 'fakestoreapi.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/',
        permanent: true,
      },
    ]
  },
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
