'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PageShell from '@/components/PageShell';

const AZUL = '#193595';
const FUCSIA = '#E8078B';
const MORADO = '#841F89';
const ACCENTS = [AZUL, FUCSIA, MORADO];

const OFFER = [
  {
    color: AZUL,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9-9" /><path d="M4 4v6h6" /><circle cx="12" cy="15" r="2" /><path d="M12 4a11 11 0 0 1 8 3.5" /><path d="M2 12a13.9 13.9 0 0 1 3-4.5" />
      </svg>
    ),
    title: 'Transporte de Señales IP',
    desc: 'Transportamos sus señales vía IP con estabilidad, seguridad y calidad desde el origen hasta el destino.',
  },
  {
    color: FUCSIA,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="2.2" /><circle cx="19" cy="5" r="2.2" /><circle cx="19" cy="12" r="2.2" /><circle cx="19" cy="19" r="2.2" />
        <path d="M7 12h2M13 12l4-5.4M13 12l4 5.4M13 12h4" />
      </svg>
    ),
    title: 'Distribución Multipunto',
    desc: 'Una misma señal, múltiples destinos. Amplíe su distribución de forma flexible y escalable.',
  },
  {
    color: MORADO,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Monitoreo 24/7',
    desc: 'Supervisión continua de sus señales para detectar y atender incidencias rápidamente.',
  },
  {
    color: AZUL,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" /><path d="M3 18h2v2H3zM19 18h2v2h-2z" /><path d="M12 12V6" /><path d="M9 6h6" />
      </svg>
    ),
    title: 'Soporte Especializado',
    desc: 'Asistencia técnica durante la implementación y operación de su servicio de transporte.',
  },
];

const PROTOCOLS = [
  { name: 'SRT', color: AZUL },
  { name: 'HLS', color: FUCSIA },
  { name: 'RTMP', color: MORADO },
  { name: 'UDP', color: AZUL },
  { name: 'RTP', color: FUCSIA },
  { name: 'MPEG-TS/IP', color: MORADO },
];

const INFRA = [
  {
    title: 'Servidores de alto rendimiento',
    desc: 'Equipos dimensionados para procesar y entregar señales sin degradación.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><line x1="7" y1="7" x2="7.01" y2="7" /><line x1="7" y1="17" x2="7.01" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Transporte IP',
    desc: 'Rutas dedicadas y redundantes para el tránsito de sus señales en tiempo real.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.2" /><circle cx="5" cy="19" r="2.2" /><circle cx="19" cy="19" r="2.2" /><path d="M12 7.2V12M12 12L6.5 17.2M12 12l5.5 5.2" />
      </svg>
    ),
  },
  {
    title: 'Alta disponibilidad',
    desc: 'Arquitectura redundante que minimiza el riesgo de interrupciones en su señal.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Monitoreo permanente',
    desc: 'Supervisión activa de cada enlace, con visibilidad sobre el estado de la señal.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M6 13l3-4 3 3 4-6" />
      </svg>
    ),
  },
  {
    title: 'Escalabilidad',
    desc: 'Infraestructura preparada para crecer junto con su número de destinos y señales.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V9M3 21h6M9 21v-7M9 14h6M15 21V6M15 6h6M21 6v15" />
      </svg>
    ),
  },
  {
    title: 'Soporte técnico especializado',
    desc: 'Equipo dedicado que acompaña la integración, operación y resolución de incidencias.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const WHATSAPP_URL = 'https://wa.me/message/R5QI3ZBQMLUXP1';

export default function MicCarrierPage() {
  return (
    <PageShell>
      {/* 1. Banner Principal */}
      <section className="text-white py-24 px-6 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/mic-carrier-banner.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: -20 }} />
        <div className="absolute inset-0" style={{ zIndex: -10, background: 'linear-gradient(90deg, rgba(10,17,51,0.72) 0%, rgba(10,17,51,0.38) 45%, rgba(10,17,51,0.08) 68%, transparent 88%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -5, background: `radial-gradient(600px 460px at 8% 88%, ${FUCSIA}40, transparent 70%), radial-gradient(480px 380px at 32% 4%, ${AZUL}30, transparent 70%)` }} />

        {/* Floating color orbs for movement */}
        <motion.div
          className="absolute rounded-full pointer-events-none hidden md:block"
          style={{ zIndex: -3, width: 220, height: 220, right: '8%', top: '18%', background: `radial-gradient(circle, ${FUCSIA}55, transparent 70%)`, filter: 'blur(10px)' }}
          animate={{ y: [0, -22, 0], x: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none hidden md:block"
          style={{ zIndex: -3, width: 160, height: 160, right: '22%', bottom: '10%', background: `radial-gradient(circle, ${MORADO}4d, transparent 70%)`, filter: 'blur(8px)' }}
          animate={{ y: [0, 18, 0], x: [0, -14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <div className="max-w-[1240px] mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[780px]">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2.5 rounded-full text-[17px] font-medium mb-6">
              <span className="bg-[#E8078B] text-white text-[14px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Servicio 04</span>
              Transporte de señales
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/logo-mic-3d.png"
                alt="MIC"
                width={340}
                height={207}
                className="w-[170px] sm:w-[220px] md:w-[260px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                priority
              />
              <span className="text-[clamp(36px,4.7vw,60px)] font-extrabold tracking-tight text-white">CARRIER</span>
            </div>

            <h1 className="text-[clamp(39px,4.9vw,62px)] font-bold leading-[1.12] tracking-[-0.025em] mb-5 text-[#E8078B]">
              Transportamos tu señal sin fronteras
            </h1>
            <p className="text-[22px] text-white/78 leading-relaxed mb-8">
              Conectamos canales de televisión con operadores mediante infraestructura IP segura, estable y de alto rendimiento.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-9 py-5 bg-[#E8078B] text-white text-[20px] font-semibold rounded-[12px] shadow-[0_6px_22px_rgba(232,7,139,0.5)] hover:brightness-110 hover:shadow-[0_10px_30px_rgba(232,7,139,0.6)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            >
              Solicitar información
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. ¿Qué ofrecemos? */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/mic-carrier-infra-bg.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: -20 }} />
        <div className="absolute inset-0" style={{ zIndex: -10, background: `${MORADO}99` }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -5, background: `radial-gradient(600px 460px at 92% 0%, ${FUCSIA}4d, transparent 70%), radial-gradient(500px 400px at 4% 100%, ${AZUL}33, transparent 70%)` }} />
        <div className="max-w-[1240px] mx-auto relative">
          <div className="max-w-[760px] mb-14">
            <span
              className="inline-flex items-center gap-2 text-[19px] font-extrabold tracking-[0.14em] uppercase text-white mb-3"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.65)' }}
            >
              <span className="w-6 h-[3px] bg-white rounded-full" />
              ¿Qué ofrecemos?
            </span>
            <h2
              className="text-[clamp(42px,4.9vw,62px)] font-bold tracking-[-0.025em] text-white mb-3"
              style={{ textShadow: '0 3px 16px rgba(0,0,0,0.55)' }}
            >
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
                className="group h-72 [perspective:1200px] cursor-pointer"
              >
                <div className="relative w-full h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-active:[transform:rotateY(180deg)]">
                  {/* Frente: ícono + título */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-[18px] p-6 flex flex-col items-center justify-center text-center gap-4 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                    style={{ borderTop: `3px solid ${f.color}` }}
                  >
                    <div
                      className="w-20 h-20 rounded-[12px] grid place-items-center"
                      style={{ background: `${f.color}18`, color: f.color }}
                    >
                      {f.icon}
                    </div>
                    <h3 className="text-[23px] font-bold text-[#0a1133]">{f.title}</h3>
                  </div>

                  {/* Reverso: definición sobre panel fucsia */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#E8078B] rounded-[18px] p-6 flex flex-col items-center justify-center text-center gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                  >
                    <h3 className="text-[19px] font-bold text-white">{f.title}</h3>
                    <p className="text-[16px] text-white/90 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Protocolos Compatibles */}
      <section className="py-16 px-6 bg-[#0a1133] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(600px 400px at 15% 20%, ${AZUL}66, transparent 70%), radial-gradient(600px 400px at 85% 80%, ${FUCSIA}38, transparent 70%)` }} />
        <div className="max-w-[1240px] mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-4">
            <span className="w-6 h-[3px] bg-[#E8078B] rounded-full" />
            Protocolos compatibles
          </span>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {PROTOCOLS.map((p, i) => (
              <motion.span
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, y: -3 }}
                transition={{ delay: i * 0.06 }}
                className="px-6 py-3 rounded-[10px] text-white font-mono text-[18px] font-semibold tracking-wide border cursor-default transition-shadow"
                style={{ borderColor: `${p.color}55`, background: `${p.color}22` }}
              >
                {p.name}
              </motion.span>
            ))}
          </div>
          <p className="text-white/55 text-[19px] max-w-[600px] mx-auto">
            Adaptamos el protocolo de entrega según los requerimientos técnicos del cliente.
          </p>
        </div>
      </section>

      {/* 4. ¿Tiene un canal de televisión? */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" style={{ background: `radial-gradient(circle, ${MORADO}18, transparent 70%)` }} />
        <div className="max-w-[1240px] mx-auto relative">
          <div className="max-w-[740px] mb-14">
            <span className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-6 h-[3px] bg-[#E8078B] rounded-full" />
              Para canales de TV
            </span>
            <h2 className="text-[clamp(34px,3.9vw,52px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-3">
              ¿Tiene un canal de televisión? Nosotros lo llevamos a sus operadores.
            </h2>
            <p className="text-[21px] text-[#6a7196] leading-relaxed">
              Centralizamos la distribución de su señal para que llegue de forma segura y estable a sus clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-4 items-center">
            {[
              { label: 'Canal', desc: 'Su señal de origen', color: AZUL },
              { label: 'MIC Carrier', desc: 'Transporte y distribución IP', color: FUCSIA },
              { label: 'Operadores', desc: 'Cable, IPTV, OTT, ISP', color: MORADO },
            ].flatMap((step, i, arr) => {
              const node = (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="rounded-[18px] p-7 text-center text-white relative overflow-hidden shadow-[0_10px_30px_rgba(13,30,107,0.12)]"
                  style={{ background: step.color }}
                >
                  <div className="w-[74px] h-[74px] rounded-[14px] mx-auto mb-4 grid place-items-center bg-white/18 backdrop-blur-sm">
                    {i === 0 && (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="13" rx="2" /><path d="M7 3l5 4 5-4" /></svg>
                    )}
                    {i === 1 && (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="6" rx="1.5" /><rect x="3" y="15" width="18" height="6" rx="1.5" /><path d="M12 9v6" /></svg>
                    )}
                    {i === 2 && (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="2.2" /><circle cx="19" cy="5" r="2.2" /><circle cx="19" cy="19" r="2.2" /><path d="M7 12h4l4-5.4M11 12l4 5.4" /></svg>
                    )}
                  </div>
                  <h3 className="text-[20px] font-bold mb-1">{step.label}</h3>
                  <p className="text-[16px] text-white/75">{step.desc}</p>
                </motion.div>
              );
              if (i < arr.length - 1) {
                return [
                  node,
                  <motion.div
                    key={`arrow-${i}`}
                    className="flex justify-center rotate-90 md:rotate-0"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8078B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </motion.div>,
                ];
              }
              return [node];
            })}
          </div>
        </div>
      </section>

      {/* 5. Nuestra Infraestructura */}
      <section className="py-20 px-6 bg-[#0a1133] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(700px 500px at 90% 0%, ${FUCSIA}20, transparent 70%), radial-gradient(600px 450px at 5% 100%, ${AZUL}26, transparent 70%)` }} />
        <div className="max-w-[1240px] mx-auto relative">
          <div className="max-w-[700px] mb-14">
            <span className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-6 h-[3px] bg-[#E8078B] rounded-full" />
              Infraestructura
            </span>
            <h2 className="text-[clamp(34px,3.9vw,52px)] font-bold tracking-[-0.025em] text-white mb-3">
              Construida para no fallar.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INFRA.map((f, i) => {
              const color = ACCENTS[i % ACCENTS.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white/[0.04] rounded-[18px] p-6 border border-white/10 hover:border-white/25 transition-colors backdrop-blur-sm"
                >
                  <div
                    className="w-14 h-14 rounded-[10px] grid place-items-center mb-4"
                    style={{ background: `${color}30`, color }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-[20px] font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-[18px] text-white/55 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ¿Para quién es MIC CARRIER? */}
      <section className="py-20 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[700px] mb-14">
            <span className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-6 h-[3px] bg-[#E8078B] rounded-full" />
              Para quién es
            </span>
            <h2 className="text-[clamp(34px,3.9vw,52px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-3">
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
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.45, delay: gi * 0.1 }}
                className="rounded-[22px] p-8 border text-white relative overflow-hidden shadow-[0_12px_32px_rgba(13,30,107,0.12)]"
                style={{
                  background: gi === 0 ? AZUL : FUCSIA,
                  borderColor: gi === 0 ? AZUL : FUCSIA,
                }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
                <h3 className="text-[26px] font-bold tracking-tight mb-5 relative">{group.title}</h3>
                <div className="flex flex-col gap-3 relative">
                  {group.items.map(item => (
                    <div key={item} className="flex items-center gap-3 bg-white/12 border border-white/20 rounded-[12px] px-4 py-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-white flex-shrink-0" />
                      <span className="text-[19px] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ¿Por qué elegir MIC? */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/mic-carrier-why-bg.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: -20 }} />
        <div className="absolute inset-0" style={{ zIndex: -10, background: 'rgba(10,17,51,0.5)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -5, background: `radial-gradient(600px 460px at 95% 100%, ${FUCSIA}33, transparent 70%), radial-gradient(500px 400px at 0% 0%, ${MORADO}2e, transparent 70%)` }} />
        <div className="max-w-[1240px] mx-auto relative">
          <div className="max-w-[760px] mb-14">
            <span
              className="inline-flex items-center gap-2 text-[18px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
            >
              <span className="w-6 h-[3px] bg-[#E8078B] rounded-full" />
              Por qué MIC
            </span>
            <h2
              className="text-[clamp(42px,4.9vw,62px)] font-bold tracking-[-0.025em] text-white mb-3"
              style={{ textShadow: '0 3px 16px rgba(0,0,0,0.6)' }}
            >
              ¿Por qué elegir MIC?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY.map((item, i) => {
              const color = ACCENTS[i % ACCENTS.length];
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-[14px] px-5 py-4 backdrop-blur-sm hover:bg-white/[0.16] hover:border-white/30 transition-colors"
                >
                  <span
                    className="w-14 h-14 rounded-full grid place-items-center flex-shrink-0"
                    style={{ background: `${color}40`, color }}
                  >
                    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span className="text-[22px] font-semibold text-white" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{item}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Contacto */}
      <section className="py-16 px-6 bg-[#193595] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(500px 350px at 90% 20%, ${FUCSIA}40, transparent 70%), radial-gradient(400px 300px at 10% 90%, ${MORADO}40, transparent 70%)` }} />
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-10 relative">
          <div>
            <h2 className="text-[clamp(29px,3.3vw,44px)] font-bold tracking-tight mb-3">
              ¿Necesita transportar una señal?
            </h2>
            <p className="text-white/70 text-[20px] leading-relaxed max-w-[520px]">
              Escríbanos por WhatsApp y le armamos una propuesta de transporte a medida.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-9 py-5 bg-[#E8078B] text-white text-[20px] font-bold rounded-[12px] shadow-[0_6px_22px_rgba(232,7,139,0.45)] hover:brightness-110 hover:shadow-[0_10px_30px_rgba(232,7,139,0.55)] hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.21-8.24 8.21zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12.17 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z" /></svg>
            Solicitar información
          </a>
        </div>

        <div className="max-w-[1240px] mx-auto border-t border-white/15 pt-6 relative">
          <p className="text-[16px] text-white/50 leading-relaxed max-w-[960px]">
            <strong className="text-white/70">Aviso legal:</strong> MIC CARRIER presta exclusivamente servicios de transporte técnico de señales mediante infraestructura IP. Este servicio no comprende la cesión, licencia o sublicencia de derechos sobre contenidos audiovisuales de terceros. La obtención de las autorizaciones necesarias para la recepción y distribución de dichas señales corresponde al cliente cuando resulte aplicable.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
