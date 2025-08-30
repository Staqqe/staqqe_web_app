import type { NextConfig } from "next";
import { SERVERDOMAIN } from "./const";

const nextConfig: NextConfig = {

  /* config options here */
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${SERVERDOMAIN}/api/:path*`, // Rewrite path
      },
    ];
  },
};

export default nextConfig;
