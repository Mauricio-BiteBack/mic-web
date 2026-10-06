import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/servicios/fast',
        destination: '/noc-services-y-soporte',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
