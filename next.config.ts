import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [32, 96, 256],
    minimumCacheTTL: 2678400, // 31 días
  },
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
