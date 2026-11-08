import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canales IP para cableoperadores | MIC',
  description:
    '96 canales IP disponibles: cine, series, infantil, deportes, música y más. Distribución directa para operadores de cable e ISP en Latinoamérica.',
  alternates: { canonical: '/servicios/canales-ip' },
  openGraph: {
    title: 'Canales IP para cableoperadores | MIC',
    description:
      '96 canales IP disponibles: cine, series, infantil, deportes, música y más. Distribución directa para operadores de cable e ISP en Latinoamérica.',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function CanalesIPLayout({ children }: { children: React.ReactNode }) {
  return children
}
