import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any custom config here
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default withNextIntl(nextConfig); 