import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import { CotizarProvider } from '@/components/CotizarContext';
import Script from 'next/script';
import { TOTAL_CHANNELS } from '@/data/channels';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  icons: { icon: '/icon-mic.png' },
  title: 'MIC — Canales de TV y tecnología para cableoperadores en LATAM',
  description:
    `Distribución de señales IP, lineales 24x7, contenidos FAST y publicidad programática para cableoperadores de Latinoamérica. ${TOTAL_CHANNELS} canales, 14 países.`,
  keywords: 'canales TV, cableoperadores, señales IP, FAST channels, publicidad programática, distribución de canales, LATAM',
  openGraph: {
    title: 'MIC — Canales de TV para cableoperadores',
    description: 'Distribución de señales IP, lineales 24x7, FAST y publicidad programática para cableoperadores de Latinoamérica.',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="642e34f4-d5dc-4d93-8875-7c79bdf93f55"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased font-[family-name:var(--font-inter)]">
        <CartProvider><CotizarProvider>{children}</CotizarProvider></CartProvider>
      </body>
    </html>
  );
}
