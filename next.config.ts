import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: '/uploads/**' },
      { pathname: '/church/**' },
    ],
  },
};

export default nextConfig;
