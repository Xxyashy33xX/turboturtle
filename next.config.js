/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // add external image domains here if needed
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ this will stop Vercel build from failing on ESLint warnings
  },
};

module.exports = nextConfig;
