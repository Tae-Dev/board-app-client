import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
  },
  reactStrictMode: true,
  experimental: {
    appDocumentPreloading: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
  },
};

export default nextConfig;
