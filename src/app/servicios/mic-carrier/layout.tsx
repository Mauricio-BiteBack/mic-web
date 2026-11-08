import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MIC Carrier — transporte de señales | MIC',
  description:
    'Transportamos señales de TV por IP con infraestructura segura y de alto rendimiento. Conectamos canales con operadores de cable en Latinoamérica.',
  alternates: { canonical: '/servicios/mic-carrier' },
  openGraph: {
    title: 'MIC Carrier — transporte de señales | MIC',
    description:
      'Transportamos señales de TV por IP con infraestructura segura y de alto rendimiento. Conectamos canales con operadores de cable en Latinoamérica.',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function MicCarrierLayout({ children }: { children: React.ReactNode }) {
  return children
}
