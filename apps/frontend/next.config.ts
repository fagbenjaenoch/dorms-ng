import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-0ef10981177a40fb9dddba7b3a460064.r2.dev",
      },
    ],
  },
};

export default nextConfig;
