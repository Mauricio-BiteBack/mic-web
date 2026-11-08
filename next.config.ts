import type { NextConfig } from "next";

/**
 * Content-Security-Policy
 *
 * Directivas ajustadas a lo que usa el sitio:
 *   - PayPal SDK (script, frame, connect)
 *   - Supabase auth (connect, websocket)
 *   - Google Fonts (style, font)
 *   - Umami analytics (script, connect)
 *   - Vercel Blob (img)
 *   - Propio origen (todo)
 *
 * Nota: 'unsafe-inline' en script-src es necesario para los scripts de
 * hidratacion que Next.js inyecta en el HTML. Para eliminarlo se requiere
 * implementar nonces en el middleware — pendiente como mejora futura.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.paypal.com https://www.sandbox.paypal.com https://js.paypalobjects.com https://cloud.umami.is",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://mic.pe https://www.mic.pe",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api-m.paypal.com https://api-m.sandbox.paypal.com https://cloud.umami.is https://gateway.umami.is",
  "frame-src https://www.paypal.com https://www.sandbox.paypal.com https://www.youtube.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  "base-uri 'self'",
].join('; ')

const nextConfig: NextConfig = {
  images: {
    // Cloudflare no tiene el optimizador de imagenes de Vercel: las imagenes ya van comprimidas en public/
    unoptimized: true,
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [32, 96, 256],
    minimumCacheTTL: 2678400, // 31 dias
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: CSP,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://www.paypal.com")',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ]
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
