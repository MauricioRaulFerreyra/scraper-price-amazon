/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose', // Permite usar módulos ESM en el entorno de Next.js
    serverComponentsExternalPackages: ['mongoose']
  },
  transpilePackages: ['undici'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com'
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com'
      }
    ]
  }
}

module.exports = nextConfig
