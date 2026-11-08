import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y condiciones | MIC',
  description:
    'Condiciones de uso del sitio web de Manager International Channels S.A.C. (MIC), distribuidor de señales de TV para cableoperadores en Latinoamérica.',
  alternates: { canonical: '/terminos' },
  openGraph: {
    title: 'Términos y condiciones | MIC',
    description:
      'Condiciones de uso del sitio web de Manager International Channels S.A.C. (MIC), distribuidor de señales de TV para cableoperadores en Latinoamérica.',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return children
}
