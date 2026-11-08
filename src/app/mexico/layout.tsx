import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proveedor de canales para cableras en México',
  description:
    'MIC distribuye señales de TV e IP para operadores de cable e ISP en México. Canales de cine, noticias, infantil, deportes y más. Consulta sin compromiso.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/mexico' },
}

export default function MexicoLayout({ children }: { children: React.ReactNode }) {
  return children
}
