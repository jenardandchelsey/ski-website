/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ski-kitchens.com' }],
        destination: 'https://swedishkitcheninstallers.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ski-kitchens.com' }],
        destination: 'https://swedishkitcheninstallers.com/:path*',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
