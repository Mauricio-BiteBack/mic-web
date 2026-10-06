'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '@/components/PageShell';

const PURPLE = '#841F89';
const BLUE = '#183595';
const MAGENTA = '#FF0190';

const titleFont = 'italic font-bold font-[family-name:var(--font-poppins)]';

function BlueprintGrid({ tone = 'blue', opacity = 0.06 }: { tone?: 'blue' | 'white'; opacity?: number }) {
  const line = tone === 'white' ? `rgba(255,255,255,${opacity})` : `rgba(24,53,149,${opacity})`;
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: '38px 38px',
      }}
    />
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const ICONS = {
  blueprint: <Icon><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></Icon>,
  wrench: <Icon><path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-3.3 3.3-2-2z" /></Icon>,
  network: <Icon><circle cx="5" cy="12" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 12h4l4-5.4M11 12l4 5.4" /></Icon>,
  broadcast: <Icon><path d="M12 20V10" /><path d="M8 10a4 4 0 0 1 8 0" /><path d="M5 7a7 7 0 0 1 14 0" /><circle cx="12" cy="20" r="1.4" fill="currentColor" stroke="none" /></Icon>,
  gauge: <Icon><path d="M4 18a8 8 0 1 1 16 0" /><path d="M12 18l4-6" /><circle cx="12" cy="18" r="1.3" fill="currentColor" stroke="none" /></Icon>,
  trendingUp: <Icon><path d="M3 17l6-6 4 4 8-8" /><path d="M17 5h4v4" /></Icon>,
  cap: <Icon><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></Icon>,
  check: <Icon><polyline points="20 6 9 17 4 12" /></Icon>,
  server: <Icon><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><line x1="7" y1="7" x2="7.01" y2="7" /><line x1="7" y1="17" x2="7.01" y2="17" /></Icon>,
};

const AUDIENCIA = [
  'Implementan una nueva operación IPTV/OTT.',
  'Requieren renovar o modernizar su infraestructura.',
  'Buscan optimizar una operación existente.',
  'Necesitan ampliar la capacidad de su plataforma.',
  'Requieren apoyo para implementar nuevas tecnologías.',
  'Necesitan capacitar a su equipo técnico.',
  'Buscan asesoría especializada para proyectos de transmisión y distribución de señales.',
];

const SERVICIOS = [
  {
    num: '01',
    icon: ICONS.blueprint,
    title: 'Diseño y Arquitectura de Cabecera',
    desc: 'Asesoría para el diseño y dimensionamiento de la infraestructura necesaria para una operación IPTV/OTT.',
    comprende: [
      'Selección y dimensionamiento de servidores Linux / Windows.',
      'Selección de moduladores RF/IP.',
      'Dimensionamiento de encoders.',
      'Selección de switches.',
      'Diseño de arquitectura de cabecera.',
      'Evaluación de los componentes necesarios para la operación.',
      'Dimensionamiento de infraestructura de acuerdo con el crecimiento proyectado.',
    ],
  },
  {
    num: '02',
    icon: ICONS.wrench,
    title: 'Implementación e Instalación',
    desc: 'Apoyo técnico para la implementación y puesta en operación de infraestructura IPTV/OTT.',
    comprende: [
      'Instalación del sistema operativo.',
      'Preparación de dependencias.',
      'Instalación y configuración de plataformas de streaming.',
      'Despliegue de soluciones como Astra, Flussonic, FFmpeg y Nimble Streamer.',
      'Preparación de servidores para la operación.',
      'Configuración inicial de los componentes de la plataforma.',
    ],
  },
  {
    num: '03',
    icon: ICONS.network,
    title: 'Configuración y Optimización de Red',
    desc: 'Asesoría y configuración de la infraestructura de red necesaria para la operación.',
    comprende: [
      'Balanceo de carga.',
      'Reglas NAT.',
      'Direccionamiento IP.',
      'Configuración multicast/UDP.',
      'Optimización de routers.',
      'Configuración de salidas dedicadas.',
      'Optimización de conectividad para la transmisión de señales.',
    ],
  },
  {
    num: '04',
    icon: ICONS.broadcast,
    title: 'Sistemas de Transmisión DVB/IP',
    desc: 'Configuración y asesoría especializada en sistemas de transmisión DVB/IP.',
    comprende: [
      'Mapeo de PIDs.',
      'Configuración de tablas DVB (PAT/PMT).',
      'Configuración de bitrate.',
      'Parámetros de transmisión.',
      'Configuración de moduladores QAM.',
      'Configuración de sistemas ISDB-T.',
      'Configuración de sistemas COFDM.',
    ],
  },
  {
    num: '05',
    icon: ICONS.gauge,
    title: 'Dimensionamiento de Ancho de Banda y Plataformas',
    desc: 'Asesoría para determinar los recursos necesarios para la operación y crecimiento de la plataforma.',
    comprende: [
      'Cálculo de consumo de Internet dedicado.',
      'Dimensionamiento de ancho de banda.',
      'Evaluación de distribución mediante CDN.',
      'Dimensionamiento de plataformas IPTV/OTT.',
      'Evaluación de infraestructura según las necesidades del proyecto.',
      'Proyección de crecimiento de la plataforma.',
    ],
  },
  {
    num: '06',
    icon: ICONS.trendingUp,
    title: 'Optimización y Escalamiento',
    desc: 'Asesoría para empresas que ya cuentan con una infraestructura IPTV/OTT y requieren mejorar su rendimiento o ampliar su capacidad.',
    comprende: [
      'Evaluación de infraestructura existente.',
      'Identificación de oportunidades de mejora.',
      'Optimización de recursos.',
      'Revisión de capacidad de servidores.',
      'Evaluación de crecimiento y escalabilidad.',
      'Recomendaciones para mejorar la operación.',
    ],
  },
];

const CAPACITACION_ITEMS = [
  'Administración de la cabecera.',
  'Operación de la infraestructura.',
  'Monitoreo de señales.',
  'Administración y mantenimiento de los sistemas.',
  'Identificación y diagnóstico de incidencias.',
  'Operación de las plataformas utilizadas.',
  'Buenas prácticas para la operación de sistemas IPTV/OTT.',
];

const PROTOCOLOS = ['SRT', 'HLS', 'MPEG-DASH', 'RTMP'];
const PLATAFORMAS = ['Astra Cesbo', 'Flussonic', 'Nimble Streamer', 'Wellav', 'FFmpeg'];

const NODES = [
  { label: 'Servidor', icon: ICONS.server },
  { label: 'Encoder', icon: ICONS.broadcast },
  { label: 'Red', icon: ICONS.network },
  { label: 'Pantalla', icon: ICONS.gauge },
];

function AccordionCard({ item, index, isOpen, onToggle }: { item: typeof SERVICIOS[number]; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="flex-1 pb-10 last:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="bg-white rounded-[20px] border border-[#eadcec] shadow-[0_4px_16px_rgba(24,53,149,0.06)] hover:shadow-[0_12px_28px_rgba(24,53,149,0.14)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-6 text-left cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full grid place-items-center flex-shrink-0" style={{ background: `${BLUE}10`, color: BLUE }}>
            {item.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] font-bold tracking-tight mb-1" style={{ color: '#201046' }}>{item.title}</h3>
            <p className="text-[13.5px] text-[#5d5a73] leading-relaxed">{item.desc}</p>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 w-8 h-8 rounded-full grid place-items-center"
            style={{ background: `${PURPLE}10`, color: PURPLE }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-1 pl-[82px]">
                <span className="block text-[12px] font-semibold uppercase tracking-wider mb-3" style={{ color: PURPLE }}>
                  Comprende:
                </span>
                <ul className="flex flex-col gap-2.5">
                  {item.comprende.map(line => (
                    <li key={line} className="flex gap-2.5 text-[14px] text-[#5d5a73] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: BLUE }} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function ConsultoriaIptvOttPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PageShell>
      {/* 1. Hero */}
      <section className="relative overflow-hidden py-24 px-6 text-white" style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, ${BLUE} 100%)` }}>
        <BlueprintGrid tone="white" opacity={0.08} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(650px 480px at 88% 15%, ${MAGENTA}26, transparent 70%)` }} />
        <div className="max-w-[1240px] mx-auto relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-semibold mb-6">
              02 · CONSULTORÍA
            </span>
            <h1 className={`${titleFont} text-[clamp(28px,4vw,48px)] leading-[1.15] tracking-[-0.02em] mb-5`}>
              CONSULTORÍA, ASESORÍA Y CAPACITACIÓN IPTV/OTT
            </h1>
            <p className="text-[17.5px] text-white/85 leading-relaxed mb-8 max-w-[560px]">
              Soluciones especializadas de ingeniería y arquitectura para empresas que buscan implementar, renovar, optimizar o ampliar su operación IPTV/OTT.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white text-[#841F89] text-[15.5px] font-semibold rounded-[12px] shadow-[0_10px_28px_rgba(0,0,0,0.18)] hover:bg-gray-100 transition-all duration-200 cursor-pointer group"
              >
                SOLICITAR CONSULTORÍA
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#servicios-consultoria"
                className="inline-flex items-center gap-2 px-7 py-4 border-2 border-white/50 text-white text-[15.5px] font-semibold rounded-[12px] hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                Ver servicios
              </a>
            </div>
          </motion.div>

          {/* Animated node diagram: servidor → encoder → red → pantalla */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden sm:block bg-white/10 border border-white/20 rounded-[20px] backdrop-blur-sm p-8"
          >
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-white/25" style={{ transform: 'translateY(-1px)' }} />
              <motion.div
                className="absolute top-1/2 w-2.5 h-2.5 rounded-full"
                style={{ background: MAGENTA, transform: 'translateY(-50%)' }}
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              {NODES.map(n => (
                <div key={n.label} className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-white grid place-items-center" style={{ color: BLUE }}>
                    {n.icon}
                  </div>
                  <span className="text-[11.5px] font-semibold text-white/85">{n.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Introducción */}
      <section className="relative py-20 px-6 bg-white overflow-hidden">
        <BlueprintGrid />
        <div className="max-w-[820px] mx-auto relative text-center">
          <p className="text-[19px] text-[#3d2b50] leading-relaxed mb-8">
            MIC pone su experiencia técnica a disposición de empresas que requieren desarrollar nuevos proyectos, mejorar su infraestructura existente, optimizar sus plataformas o capacitar a su equipo técnico.
          </p>
          <div className="inline-flex flex-col items-center gap-2 rounded-[18px] px-7 py-5" style={{ background: `${BLUE}0a`, border: `1px solid ${BLUE}20` }}>
            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full" style={{ background: `${BLUE}14`, color: BLUE }}>
              Bajo demanda y por proyecto
            </span>
            <p className="text-[14.5px] text-[#5d5a73] leading-relaxed max-w-[520px]">
              Este servicio se brinda bajo demanda y por proyecto, de acuerdo con las necesidades y dimensión de cada caso.
            </p>
          </div>
        </div>
      </section>

      {/* 3. ¿A quiénes está dirigido? */}
      <section className="relative py-20 px-6 overflow-hidden" style={{ background: '#f7f6fc' }}>
        <BlueprintGrid />
        <div className="max-w-[1000px] mx-auto relative">
          <div className="max-w-[700px] mb-10">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: BLUE }}>
              <span className="w-5 h-[2px] rounded-full" style={{ background: BLUE }} />
              Perfil del cliente
            </span>
            <h2 className={`${titleFont} text-[clamp(26px,3vw,40px)] tracking-[-0.02em] mb-3`} style={{ color: '#201046' }}>
              ¿A quiénes está dirigido?
            </h2>
            <p className="text-[16px] text-[#5d5a73] leading-relaxed">
              Este servicio está dirigido a empresas que:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AUDIENCIA.map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-start gap-3 bg-white rounded-[14px] p-4 border border-[#eadcec] shadow-[0_2px_10px_rgba(24,53,149,0.04)]"
              >
                <span className="w-7 h-7 rounded-full grid place-items-center flex-shrink-0" style={{ background: `${PURPLE}12`, color: PURPLE }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-[14.5px] text-[#3d2b50] leading-relaxed pt-0.5">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Servicios de Consultoría e Ingeniería */}
      <section id="servicios-consultoria" className="relative py-20 px-6 bg-white overflow-hidden">
        <BlueprintGrid />
        <div className="max-w-[900px] mx-auto relative">
          <div className="max-w-[700px] mb-14">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: PURPLE }}>
              <span className="w-5 h-[2px] rounded-full" style={{ background: PURPLE }} />
              Recorrido del proyecto
            </span>
            <h2 className={`${titleFont} text-[clamp(26px,3.2vw,42px)] tracking-[-0.02em]`} style={{ color: '#201046' }}>
              Servicios de Consultoría e Ingeniería
            </h2>
          </div>

          <div className="flex flex-col">
            {SERVICIOS.map((item, i) => (
              <div key={item.num} className="flex gap-5">
                <div className="flex flex-col items-center flex-shrink-0">
                  <span
                    className="w-14 h-14 rounded-full grid place-items-center text-[16px] font-extrabold flex-shrink-0"
                    style={{ background: i % 2 === 0 ? PURPLE : BLUE, color: 'white' }}
                  >
                    {item.num}
                  </span>
                  {i < SERVICIOS.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="w-[2px] flex-1 origin-top"
                      style={{ background: `linear-gradient(${PURPLE}, ${BLUE})` }}
                    />
                  )}
                </div>
                <AccordionCard
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(prev => (prev === i ? null : i))}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Capacitación Técnica */}
      <section className="relative py-20 px-6 overflow-hidden" style={{ background: `linear-gradient(135deg, ${PURPLE}0d 0%, ${BLUE}12 100%)` }}>
        <BlueprintGrid />
        <div className="max-w-[1240px] mx-auto relative grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
          {/* Placeholder: capacitacion.jpg — grupo técnico en taller / instructor frente a pantallas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[22px] h-[260px] lg:h-[340px] relative overflow-hidden flex flex-col items-center justify-center gap-3 text-white"
            style={{ background: `linear-gradient(135deg, ${BLUE} 0%, ${PURPLE} 100%)` }}
          >
            <div className="w-16 h-16 rounded-[14px] bg-white/15 grid place-items-center">
              {ICONS.cap}
            </div>
            <span className="text-[13px] font-semibold text-white/85 text-center px-6">Capacitación técnica en un ambiente luminoso</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5" style={{ background: `${PURPLE}14`, color: PURPLE }}>
              07 · CAPACITACIÓN TÉCNICA
            </span>
            <p className="text-[17px] text-[#3d2b50] leading-relaxed mb-6">
              Capacitación dirigida al equipo técnico del cliente, adaptada a las características y necesidades de cada proyecto.
            </p>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ color: BLUE }}>
              Comprende entrenamiento en:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {CAPACITACION_ITEMS.map(it => (
                <li key={it} className="flex gap-2.5 text-[14px] text-[#5d5a73] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: PURPLE }} />
                  {it}
                </li>
              ))}
            </ul>
            <p className="text-[13.5px] text-[#9087a0] leading-relaxed mb-6">
              La capacitación podrá adaptarse al nivel técnico del equipo y a las características de la infraestructura implementada.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 px-7 py-4 text-white text-[15px] font-bold rounded-[12px] shadow-[0_6px_18px_rgba(132,31,137,0.3)] hover:brightness-110 transition-all duration-200 cursor-pointer group"
              style={{ background: PURPLE }}
            >
              SOLICITAR CONSULTORÍA
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 6. Tecnologías y plataformas */}
      <section className="relative py-20 px-6 bg-white overflow-hidden">
        <BlueprintGrid />
        <div className="max-w-[1000px] mx-auto relative text-center">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: BLUE }}>
            <span className="w-5 h-[2px] rounded-full" style={{ background: BLUE }} />
            Tecnologías
          </span>
          <h2 className={`${titleFont} text-[clamp(24px,2.8vw,36px)] tracking-[-0.02em] mb-10`} style={{ color: '#201046' }}>
            Tecnologías con las que trabajamos
          </h2>

          <div className="flex flex-col gap-6">
            <div>
              <span className="block text-[12px] font-semibold uppercase tracking-wider text-[#9087a0] mb-3">Protocolos</span>
              <div className="flex flex-wrap justify-center gap-3">
                {PROTOCOLOS.map(p => (
                  <span key={p} className="px-5 py-2.5 rounded-full bg-white border text-[14px] font-semibold" style={{ borderColor: `${PURPLE}30`, color: PURPLE }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="block text-[12px] font-semibold uppercase tracking-wider text-[#9087a0] mb-3">Plataformas y herramientas</span>
              <div className="flex flex-wrap justify-center gap-3">
                {PLATAFORMAS.map(p => (
                  <span key={p} className="px-5 py-2.5 rounded-full bg-white border text-[14px] font-semibold" style={{ borderColor: `${BLUE}30`, color: BLUE }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA final */}
      <section className="relative overflow-hidden py-20 px-6 text-center" style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, ${BLUE} 100%)` }}>
        <BlueprintGrid tone="white" opacity={0.08} />
        <div className="relative max-w-[780px] mx-auto">
          <h2 className={`${titleFont} text-[clamp(26px,3.4vw,42px)] tracking-[-0.02em] text-white mb-4`}>
            ¿Tienes un proyecto IPTV/OTT en mente?
          </h2>
          <p className="text-[17px] text-white/80 leading-relaxed mb-9 max-w-[560px] mx-auto">
            Cuéntanos qué necesitas y diseñamos la solución a la medida de tu operación.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 px-9 py-5 bg-white text-[#841F89] text-[16.5px] font-bold rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:bg-gray-100 transition-all duration-200 cursor-pointer group"
          >
            SOLICITAR CONSULTORÍA
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <p className={`${titleFont} text-[15px] text-white/80 mt-8`}>
            CONECTAMOS EMOCIONES+
          </p>
        </div>
      </section>
    </PageShell>
  );
}
