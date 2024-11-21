import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
  },
};

export default nextConfig;
