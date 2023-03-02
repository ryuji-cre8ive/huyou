/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  reactStrictMode: false,
  env: {
    Server: isProd ? 'https://server-6fldog5s3a-uc.a.run.app/query' : 'localhost:8080/query'
  }
}

module.exports = nextConfig
