/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    BACKEND_URI: process.env.BACKEND_URI,
  },
};

module.exports = nextConfig;
