import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dashboard.twilightguesthouse.com"], // <-- add your hostname here
  },
};

export default nextConfig;
