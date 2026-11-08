import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canal lineal 24/7 a medida | MIC',
  description:
    'Convierte tus videos en un canal de TV lineal disponible las 24 horas. MIC lo distribuye en IP para operadores de cable en Latinoamérica.',
  alternates: { canonical: '/servicios/lineales' },
  openGraph: {
    title: 'Canal lineal 24/7 a medida | MIC',
    description:
      'Convierte tus videos en un canal de TV lineal disponible las 24 horas. MIC lo distribuye en IP para operadores de cable en Latinoamérica.',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function LinealesLayout({ children }: { children: React.ReactNode }) {
  return children
}
