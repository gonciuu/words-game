/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    appDir: true,
    fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
  },
}

module.exports = nextConfig
