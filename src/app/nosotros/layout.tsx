import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiénes somos | MIC',
  description:
    'Empresa peruana con 26 años distribuyendo señales de TV para cableoperadores en Latinoamérica. Presencia en Lima y Miami.',
  alternates: { canonical: '/nosotros' },
  openGraph: {
    title: 'Quiénes somos | MIC',
    description:
      'Empresa peruana con 26 años distribuyendo señales de TV para cableoperadores en Latinoamérica. Presencia en Lima y Miami.',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return children
}
