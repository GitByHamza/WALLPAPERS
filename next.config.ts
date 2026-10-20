import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "w.wallhaven.cc",
      },
      {
        protocol: "https",
        hostname: "th.wallhaven.cc",
      },
      {
        protocol: "https",
        hostname: "wallhaven.cc",
      },
    ],
  },
};

export default nextConfig;
