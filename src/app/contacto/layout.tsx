import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto | MIC',
  description:
    'Escríbenos o llámanos. Atendemos operadores de cable e ISP en Latinoamérica. Lima, Perú · +51 991 688 980 · info@mic.pe',
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contacto | MIC',
    description:
      'Escríbenos o llámanos. Atendemos operadores de cable e ISP en Latinoamérica. Lima, Perú · +51 991 688 980 · info@mic.pe',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children
}
