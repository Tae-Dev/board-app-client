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
  }
};

export default nextConfig;
