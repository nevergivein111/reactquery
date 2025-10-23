/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "pakistanplaces.com"],
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
  },
};

export default nextConfig;
