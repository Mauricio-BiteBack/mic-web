import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultoría, Asesoría y Capacitación IPTV/OTT | MIC',
  description:
    'Soluciones especializadas de ingeniería y arquitectura para implementar, renovar, optimizar o ampliar tu operación IPTV/OTT.',
  openGraph: {
    title: 'Consultoría, Asesoría y Capacitación IPTV/OTT | MIC',
    description: 'Soluciones especializadas de ingeniería y arquitectura para implementar, renovar, optimizar o ampliar tu operación IPTV/OTT.',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function ConsultoriaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
