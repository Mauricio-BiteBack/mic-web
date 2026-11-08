import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad | MIC',
  description:
    'Política de privacidad y cookies de MIC. Cómo gestionamos tus datos personales en el sitio web de Manager International Channels S.A.C.',
  alternates: { canonical: '/privacidad' },
  openGraph: {
    title: 'Política de privacidad | MIC',
    description:
      'Política de privacidad y cookies de MIC. Cómo gestionamos tus datos personales en el sitio web de Manager International Channels S.A.C.',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return children
}
