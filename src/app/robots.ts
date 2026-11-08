import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/portal',
          '/api',
          '/auth',
          '/forgot-password',
          '/reset-password',
          '/sin-acceso',
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.mic.pe'}/sitemap.xml`,
  };
}
