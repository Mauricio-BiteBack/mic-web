'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PageShell from '@/components/PageShell';

const OFFER = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9-9" /><path d="M4 4v6h6" /><circle cx="12" cy="15" r="2" /><path d="M12 4a11 11 0 0 1 8 3.5" /><path d="M2 12a13.9 13.9 0 0 1 3-4.5" />
      </svg>
    ),
    title: 'Transporte de Señales IP',
    desc: 'Recepción y entrega de señales mediante infraestructura profesional, punto a punto.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="2.2" /><circle cx="19" cy="5" r="2.2" /><circle cx="19" cy="12" r="2.2" /><circle cx="19" cy="19" r="2.2" />
        <path d="M7 12h2M13 12l4-5.4M13 12l4 5.4M13 12h4" />
      </svg>
    ),
    title: 'Distribución Multipunto',
    desc: 'Una señal, múltiples destinos. Escale su entrega a tantos operadores como necesite.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Monitoreo 24/7',
    desc: 'Supervisión permanente de las señales, con alertas y respuesta inmediata ante incidencias.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" /><path d="M3 18h2v2H3zM19 18h2v2h-2z" /><path d="M12 12V6" /><path d="M9 6h6" />
      </svg>
    ),
    title: 'Soporte Especializado',
    desc: 'Acompañamiento técnico durante la implementación y la operación de su transporte.',
  },
];

const PROTOCOLS = ['SRT', 'HLS', 'RTMP', 'UDP', 'RTP', 'MPEG-TS/IP'];

const NATIONAL_SIGNALS = [
  'Latina', 'ATV', 'ATV+', 'Panamericana', 'TV Perú', 'Congreso TV', 'Justicia TV', 'Exitosa', 'Karibeña', 'Willax',
];

const TRUSTED_CHANNELS = [
  { name: 'Titan Channel', logo: '/Titan Channel.png' },
  { name: 'Fierro a Fondo', logo: '/Fierro a fondo.png' },
  { name: 'FunBox', logo: '/Fun Box.png' },
  { name: 'Rumbo Minero', logo: '/Rumbo Minero.png' },
];

const INFRA = [
  {
    title: 'Servidores de alto rendimiento',
    desc: 'Equipos dimensionados para procesar y entregar señales sin degradación.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><line x1="7" y1="7" x2="7.01" y2="7" /><line x1="7" y1="17" x2="7.01" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Transporte IP',
    desc: 'Rutas dedicadas y redundantes para el tránsito de sus señales en tiempo real.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.2" /><circle cx="5" cy="19" r="2.2" /><circle cx="19" cy="19" r="2.2" /><path d="M12 7.2V12M12 12L6.5 17.2M12 12l5.5 5.2" />
      </svg>
    ),
  },
  {
    title: 'Alta disponibilidad',
    desc: 'Arquitectura redundante que minimiza el riesgo de interrupciones en su señal.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Monitoreo permanente',
    desc: 'Supervisión activa de cada enlace, con visibilidad sobre el estado de la señal.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M6 13l3-4 3 3 4-6" />
      </svg>
    ),
  },
  {
    title: 'Escalabilidad',
    desc: 'Infraestructura preparada para crecer junto con su número de destinos y señales.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V9M3 21h6M9 21v-7M9 14h6M15 21V6M15 6h6M21 6v15" />
      </svg>
    ),
  },
  {
    title: 'Soporte técnico especializado',
    desc: 'Equipo dedicado que acompaña la integración, operación y resolución de incidencias.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" /><path d="M3 18h2v2H3zM19 18h2v2h-2z" /><circle cx="12" cy="7" r="3" />
      </svg>
    ),
  },
];

const AUDIENCE = [
  {
    title: 'Operadores',
    items: ['Cable', 'IPTV', 'OTT', 'ISP'],
  },
  {
    title: 'Canales de TV',
    items: ['Canales nacionales', 'Canales internacionales', 'Productoras', 'Empresas de medios'],
  },
];

const WHY = [
  'Infraestructura profesional',
  'Distribución estable',
  'Protocolos compatibles',
  'Implementación rápida',
  'Atención personalizada',
  'Soluciones escalables',
];

export default function MicCarrierPage() {
  return (
    <PageShell>
      {/* 1. Banner Principal */}
      <section className="text-white py-24 px-6 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banner-servicios.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: -20 }} />
        <div className="absolute inset-0 bg-[#050d3a]/85" style={{ zIndex: -10 }} />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.15]"
          style={{
            zIndex: -8,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
            maskImage: 'radial-gradient(ellipse 900px 500px at 20% 40%, black, transparent)',
          }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -5, background: 'radial-gradient(800px 600px at 15% 55%, rgba(25,53,149,0.55), transparent 70%), radial-gradient(500px 400px at 90% 15%, rgba(232,7,139,0.14), transparent 70%)' }} />
        <div className="max-w-[1240px] mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-medium mb-6">
              <span className="bg-[#E8078B] text-white text-[11px] font-bold px-2 py-[3px] rounded-full uppercase tracking-wider">Servicio 04</span>
              Transporte de señales
            </div>
            <h1 className="text-[clamp(32px,4vw,52px)] font-bold leading-[1.08] tracking-[-0.025em] mb-5">
              MIC CARRIER —{' '}
              <em className="not-italic bg-gradient-to-r from-[#E8078B] to-[#ff67c1] bg-clip-text text-transparent">
                Transporte Profesional de Señales IP
              </em>
            </h1>
            <p className="text-[17px] text-white/78 leading-relaxed mb-8">
              Conectamos canales de televisión con operadores mediante infraestructura IP segura, estable y de alto rendimiento.
            </p>
            <a
              href="/cotizacion"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#E8078B] text-white text-[15.5px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] transition-all duration-200 cursor-pointer group"
            >
              Solicitar información
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Signal path indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:flex items-center gap-3 mt-16 text-white/50 text-[12px] font-mono tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#0aa84f] animate-pulse" />
            Enlace activo
            <span className="w-16 h-px bg-white/20" />
            SRT · HLS · RTMP · UDP · RTP · MPEG-TS/IP
          </motion.div>
        </div>
      </section>

      {/* 2. ¿Qué ofrecemos? */}
      <section className="py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[600px] mb-14">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              ¿Qué ofrecemos?
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-3">
              La infraestructura que conecta su señal con el operador.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFER.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-[18px] p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-[10px] bg-[#193595]/8 text-[#193595] grid place-items-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-bold text-[#0a1133] mb-2">{f.title}</h3>
                <p className="text-[13.5px] text-[#6a7196] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Protocolos Compatibles */}
      <section className="py-16 px-6 bg-[#0a1133]">
        <div className="max-w-[1240px] mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#ff67c1] mb-4">
            <span className="w-5 h-[2px] bg-[#ff67c1] rounded-full" />
            Protocolos compatibles
          </span>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {PROTOCOLS.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="px-5 py-2.5 rounded-[10px] bg-white/8 border border-white/15 text-white font-mono text-[14px] font-semibold tracking-wide hover:border-[#E8078B]/50 hover:bg-white/12 transition-colors"
              >
                {p}
              </motion.span>
            ))}
          </div>
          <p className="text-white/55 text-[14.5px] max-w-[520px] mx-auto">
            Adaptamos el protocolo de entrega según los requerimientos técnicos del cliente.
          </p>
        </div>
      </section>

      {/* 4. Transporte de Señales Nacionales */}
      <section className="py-20 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[640px] mb-10">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              Cobertura nacional
            </span>
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-[#0a1133] tracking-tight mb-3">
              Señales disponibles mediante transporte IP.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {NATIONAL_SIGNALS.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="bg-white border border-gray-200 rounded-[14px] px-4 py-6 flex flex-col items-center gap-2.5 text-center hover:border-[#193595]/30 hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-[#193595]/8 text-[#193595] grid place-items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="13" rx="2" /><path d="M7 3l5 4 5-4" />
                  </svg>
                </div>
                <span className="text-[13.5px] font-bold text-[#0a1133]">{name}</span>
              </motion.div>
            ))}
          </div>

          <div className="bg-white border border-[#193595]/15 rounded-[14px] px-5 py-4 flex gap-3 items-start max-w-[820px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#193595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p className="text-[13px] text-[#6a7196] leading-relaxed">
              MIC ofrece el servicio de transporte IP de estas señales. La contratación del servicio no incluye licencias o derechos de distribución sobre su contenido.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ¿Tiene un canal de televisión? */}
      <section className="py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[640px] mb-14">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              Para canales de TV
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-3">
              ¿Tiene un canal de televisión? Nosotros lo llevamos a sus operadores.
            </h2>
            <p className="text-[16px] text-[#6a7196] leading-relaxed">
              Centralizamos la distribución de su señal para que llegue de forma segura y estable a sus clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-4 items-center">
            {[
              { label: 'Canal', desc: 'Su señal de origen', color: '#193595' },
              { label: 'MIC Carrier', desc: 'Transporte y distribución IP', color: '#E8078B' },
              { label: 'Operadores', desc: 'Cable, IPTV, OTT, ISP', color: '#0aa84f' },
            ].flatMap((step, i, arr) => {
              const node = (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="bg-white border-2 rounded-[18px] p-7 text-center"
                  style={{ borderColor: `${step.color}30` }}
                >
                  <div
                    className="w-14 h-14 rounded-[14px] mx-auto mb-4 grid place-items-center text-white"
                    style={{ background: step.color }}
                  >
                    {i === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="13" rx="2" /><path d="M7 3l5 4 5-4" /></svg>
                    )}
                    {i === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="6" rx="1.5" /><rect x="3" y="15" width="18" height="6" rx="1.5" /><path d="M12 9v6" /></svg>
                    )}
                    {i === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="2.2" /><circle cx="19" cy="5" r="2.2" /><circle cx="19" cy="19" r="2.2" /><path d="M7 12h4l4-5.4M11 12l4 5.4" /></svg>
                    )}
                  </div>
                  <h3 className="text-[15px] font-bold text-[#0a1133] mb-1">{step.label}</h3>
                  <p className="text-[12.5px] text-[#6a7196]">{step.desc}</p>
                </motion.div>
              );
              if (i < arr.length - 1) {
                return [
                  node,
                  <div key={`arrow-${i}`} className="flex justify-center rotate-90 md:rotate-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </div>,
                ];
              }
              return [node];
            })}
          </div>
        </div>
      </section>

      {/* 6. Canales que confían en MIC */}
      <section className="py-16 px-6 bg-[#f6f7fb] border-y border-gray-200">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6a7196] mb-8">
            Canales que confían en MIC
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {TRUSTED_CHANNELS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-[14px] border border-gray-200 p-6 flex items-center justify-center h-[100px] grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              >
                <Image src={c.logo} alt={c.name} width={140} height={60} className="max-h-[52px] w-auto h-auto object-contain" />
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[12.5px] text-[#9199bb] mt-6">
            Canales que utilizan la infraestructura de transporte de MIC.
          </p>
        </div>
      </section>

      {/* 7. Nuestra Infraestructura */}
      <section className="py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[600px] mb-14">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              Infraestructura
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-3">
              Construida para no fallar.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INFRA.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-[#0a1133] rounded-[18px] p-6 border border-white/10 hover:border-[#E8078B]/30 transition-colors"
              >
                <div className="w-11 h-11 rounded-[10px] bg-white/8 text-[#ff67c1] grid place-items-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[13.5px] text-white/55 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ¿Para quién es MIC CARRIER? */}
      <section className="py-20 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[600px] mb-14">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              Para quién es
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-3">
              ¿Para quién es MIC Carrier?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AUDIENCE.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: gi * 0.1 }}
                className={`rounded-[22px] p-8 border ${
                  gi === 0 ? 'bg-[#193595] border-[#193595] text-white' : 'bg-[#E8078B] border-[#E8078B] text-white'
                }`}
              >
                <h3 className="text-[20px] font-bold tracking-tight mb-5">{group.title}</h3>
                <div className="flex flex-col gap-3">
                  {group.items.map(item => (
                    <div key={item} className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-[12px] px-4 py-3">
                      <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                      <span className="text-[14.5px] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ¿Por qué elegir MIC? */}
      <section className="py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[600px] mb-14">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              Por qué MIC
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-3">
              ¿Por qué elegir MIC?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-[14px] px-5 py-4"
              >
                <span className="w-7 h-7 rounded-full bg-[#0aa84f]/10 text-[#0aa84f] grid place-items-center flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span className="text-[14.5px] font-semibold text-[#0a1133]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Contacto */}
      <section className="py-16 px-6 bg-[#193595] text-white">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div>
            <h2 className="text-[clamp(22px,2.5vw,34px)] font-bold tracking-tight mb-3">
              ¿Necesita transportar una señal?
            </h2>
            <p className="text-white/70 text-[15px] leading-relaxed max-w-[480px]">
              Cuéntenos su caso y le armamos una propuesta de transporte a medida.
            </p>
          </div>
          <a
            href="/cotizacion"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 bg-[#E8078B] text-white text-[15px] font-bold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] transition-all cursor-pointer group"
          >
            Solicitar una propuesta
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="max-w-[1240px] mx-auto border-t border-white/15 pt-6">
          <p className="text-[12px] text-white/50 leading-relaxed max-w-[900px]">
            <strong className="text-white/70">Aviso legal:</strong> MIC CARRIER presta exclusivamente servicios de transporte técnico de señales mediante infraestructura IP. Este servicio no comprende la cesión, licencia o sublicencia de derechos sobre contenidos audiovisuales de terceros. La obtención de las autorizaciones necesarias para la recepción y distribución de dichas señales corresponde al cliente cuando resulte aplicable.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
