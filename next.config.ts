import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce React strict mode for better detection of side-effects
  reactStrictMode: true,
  
  // Configure domains for next/image if needed
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
