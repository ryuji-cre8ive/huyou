/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  reactStrictMode: false,
  env: {
    Server: isProd ? 'https://server-6fldog5s3a-uc.a.run.app/query' : 'http://localhost:8080/query',
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
}

module.exports = nextConfig
