import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Libro de reclamaciones | MIC',
  description:
    'Presenta tu reclamo o queja sobre los servicios de MIC. Formulario oficial del libro de reclamaciones de Manager International Channels S.A.C.',
  alternates: { canonical: '/libro-de-reclamaciones' },
  openGraph: {
    title: 'Libro de reclamaciones | MIC',
    description:
      'Presenta tu reclamo o queja sobre los servicios de MIC. Formulario oficial del libro de reclamaciones de Manager International Channels S.A.C.',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function LibroReclamacionesLayout({ children }: { children: React.ReactNode }) {
  return children
}
