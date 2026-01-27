import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 reactCompiler: true,
 images: {
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
   }
  ],
 },
};

export default nextConfig;
