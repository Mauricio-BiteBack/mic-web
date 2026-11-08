import type { Metadata } from 'next'
import { CHANNELS } from '@/data/channels'

export const metadata: Metadata = {
  title: 'Catálogo de canales | MIC',
  description:
    `Explora los ${CHANNELS.length} canales disponibles: IP, satelitales, cine, deportes, infantil, noticias y más. Arma tu paquete y cotiza al instante.`,
  alternates: { canonical: '/catalogo' },
  openGraph: {
    title: 'Catálogo de canales | MIC',
    description:
      `Explora los ${CHANNELS.length} canales disponibles: IP, satelitales, cine, deportes, infantil, noticias y más. Arma tu paquete y cotiza al instante.`,
    locale: 'es_PE',
    type: 'website',
  },
}

export default function CatalogoLayout({ children }: { children: React.ReactNode }) {
  return children
}
