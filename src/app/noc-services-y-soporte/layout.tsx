import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NOC Services y Soporte | MIC',
  description:
    'Aseguramiento, continuidad y soporte técnico especializado para la operación de señales IPTV/OTT.',
  openGraph: {
    title: 'NOC Services y Soporte | MIC',
    description: 'Aseguramiento, continuidad y soporte técnico especializado para la operación de señales IPTV/OTT.',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function NocServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
