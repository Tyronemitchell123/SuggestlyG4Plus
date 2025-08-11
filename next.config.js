/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'suggestlyg4plus.io', 'www.suggestlyg4plus.io'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.suggestlyg4plus.io' }],
        destination: 'https://suggestlyg4plus.io/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/robots.txt', destination: '/api/robots.txt' },
      { source: '/sitemap.xml', destination: '/api/sitemap' },
    ];
  },
};

module.exports = nextConfig;
