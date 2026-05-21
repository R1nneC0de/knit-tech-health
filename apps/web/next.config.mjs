/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kth/shared'],
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs', 'nodemailer', '@paypal/checkout-server-sdk'],
  },
  async redirects() {
    return [
      { source: '/shop', destination: '/shop-medical', permanent: true },
      { source: '/shop/:slug', destination: '/shop-medical/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
