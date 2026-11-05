import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  // Allow the Arena live-preview proxy hosts to load the dev server.
  allowedDevOrigins: ["*.e2b.app", "*.arena.ai"],
};

export default nextConfig;
