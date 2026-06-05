export interface Service {
  num: string;
  verb: string;
  title: string;
  desc: string;
  accent: boolean;
  href: string;
}

export const SERVICES: Service[] = [
  {
    num: '01',
    verb: 'Distribuye',
    title: 'Canales IP',
    desc: 'Integra señales premium directamente a tu headend vía streaming. 40+ canales en HD listos para grilla.',
    accent: false,
    href: '/servicios/canales-ip',
  },
  {
    num: '02',
    verb: 'Crea',
    title: 'Distribuye tu Contenido con MIC',
    desc: 'Promocionamos y comercializamos tu canal a través de nuestra red de operadores aliados.',
    accent: false,
    href: '/servicios/lineales',
  },
  {
    num: '03',
    verb: 'Monetiza',
    title: 'FAST Channels',
    desc: 'Canales gratuitos sostenidos por publicidad. Una segunda vía de ingresos sin alterar tu grilla.',
    accent: true,
    href: '/servicios/fast',
  },
  {
    num: '04',
    verb: 'Inserta',
    title: 'AddFast',
    desc: 'Publicidad programática con pricing en tiempo real. Inventario premium con CPMs competitivos.',
    accent: false,
    href: '/servicios/addfast',
  },
];
