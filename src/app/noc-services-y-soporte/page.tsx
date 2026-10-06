'use client';

import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const PURPLE = '#841F89';
const MAGENTA = '#FF0190';
const BLUE = '#183595';

const titleFont = 'italic font-bold font-[family-name:var(--font-poppins)]';

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const ICONS = {
  settings: <Icon><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></Icon>,
  headset: <Icon><path d="M3 18v-2a9 9 0 0 1 18 0v2" /><rect x="2" y="15" width="4" height="6" rx="1.5" /><rect x="18" y="15" width="4" height="6" rx="1.5" /><path d="M21 18a3 3 0 0 1-3 3h-2" /></Icon>,
  waveform: <Icon><path d="M3 12h2l2-6 3 14 3-11 2 8 2-5h4" /></Icon>,
  gridCheck: <Icon><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8" /><path d="M9 9l1.6 1.6L14.5 7" /></Icon>,
  alertCircle: <Icon><circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="13" /><line x1="12" y1="16.5" x2="12.01" y2="16.5" /></Icon>,
  tvAlert: <Icon><rect x="2" y="5" width="20" height="13" rx="2" /><path d="M8 21h8M12 18v3" /><path d="M9.5 9l2.5 2.5L15.5 8" /></Icon>,
  clock: <Icon><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></Icon>,
  shieldCheck: <Icon><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></Icon>,
  wrench: <Icon><path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-3.3 3.3-2-2z" /></Icon>,
  radar: <Icon><circle cx="12" cy="12" r="9" /><path d="M12 12L17 7" /><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" /></Icon>,
  flag: <Icon><path d="M5 3v18" /><path d="M5 4h11l-2 4 2 4H5" /></Icon>,
  network: <Icon><circle cx="5" cy="12" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 12h4l4-5.4M11 12l4 5.4" /></Icon>,
  pulseBars: <Icon><path d="M4 20V10" /><path d="M9 20V6" /><path d="M14 20V13" /><path d="M19 20V4" /></Icon>,
  server: <Icon><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><line x1="7" y1="7" x2="7.01" y2="7" /><line x1="7" y1="17" x2="7.01" y2="17" /></Icon>,
  link: <Icon><path d="M9 15l6-6" /><path d="M11 5l1-1a4 4 0 0 1 6 6l-1 1" /><path d="M13 19l-1 1a4 4 0 0 1-6-6l1-1" /></Icon>,
  book: <Icon><path d="M4 19.5V6a2 2 0 0 1 2-2h13v15.5" /><path d="M4 19.5A1.5 1.5 0 0 1 5.5 18H19" /></Icon>,
  play: <Icon><rect x="2" y="5" width="20" height="14" rx="2" /><polygon points="10 9 10 15 15 12" fill="currentColor" stroke="none" /></Icon>,
  building: <Icon><rect x="4" y="3" width="16" height="18" rx="1" /><line x1="8" y1="7" x2="8.01" y2="7" /><line x1="12" y1="7" x2="12.01" y2="7" /><line x1="16" y1="7" x2="16.01" y2="7" /><line x1="8" y1="11" x2="8.01" y2="11" /><line x1="12" y1="11" x2="12.01" y2="11" /><line x1="16" y1="11" x2="16.01" y2="11" /><line x1="8" y1="15" x2="8.01" y2="15" /><line x1="12" y1="15" x2="12.01" y2="15" /></Icon>,
  buildings: <Icon><path d="M3 21V9l6-4v16" /><path d="M15 21V5l6 4v12" /><path d="M9 21h12" /></Icon>,
  tower: <Icon><path d="M12 2l-3 7h6l-3-7z" /><path d="M8 22l1.5-11M16 22l-1.5-11" /><path d="M5 22h14" /></Icon>,
  shuffle: <Icon><path d="M4 7h3l5 10h5" /><path d="M4 17h3l2-4" /><path d="M14 7h3" /><polyline points="19 4 22 7 19 10" /><polyline points="19 14 22 17 19 20" /></Icon>,
};

const QUE_COMPRENDE = [
  { icon: ICONS.settings, title: 'Configuración inicial', desc: 'Configuración inicial de los enlaces contratados.' },
  { icon: ICONS.headset, title: 'Asistencia remota', desc: 'Asistencia remota básica para la incorporación de las señales en la cabecera del cliente.' },
  { icon: ICONS.waveform, title: 'Verificación técnica', desc: 'Verificación de video, audio y sincronización.' },
  { icon: ICONS.gridCheck, title: 'Validación de salida', desc: 'Validación de la correcta salida de la señal en la grilla del cliente.' },
  { icon: ICONS.alertCircle, title: 'Atención de incidencias', desc: 'Atención de incidencias relacionadas con las señales contratadas con MIC.' },
  { icon: ICONS.tvAlert, title: 'Eventos de señal', desc: 'Atención de eventos como pantalla negra, congelamiento o pixelación cuando sean reportados por el cliente.' },
];

function WaveDivider() {
  return (
    <div className="w-full h-10 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={PURPLE} />
            <stop offset="100%" stopColor={MAGENTA} />
          </linearGradient>
        </defs>
        <path
          d="M0 20 C 100 2, 200 38, 300 20 C 400 2, 500 38, 600 20 C 700 2, 800 38, 900 20 C 1000 2, 1100 38, 1200 20"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

const QUE_COMPRENDE_ESPECIALIZADO = [
  { icon: ICONS.radar, title: 'Monitoreo preventivo', desc: 'Monitoreo preventivo de enlaces.' },
  { icon: ICONS.flag, title: 'Atención prioritaria', desc: 'Atención prioritaria de incidencias.' },
  { icon: ICONS.network, title: 'Diagnóstico de red', desc: 'Diagnóstico avanzado de red.' },
  { icon: ICONS.pulseBars, title: 'Análisis de conectividad', desc: 'Análisis de latencia, pérdida de paquetes, jitter y problemas de conectividad.' },
  { icon: ICONS.headset, title: 'Asistencia remota', desc: 'Asistencia remota para configuraciones, ajustes o migraciones.' },
  { icon: ICONS.server, title: 'Apoyo en infraestructura', desc: 'Apoyo técnico sobre la infraestructura del cliente.' },
  { icon: ICONS.link, title: 'Integración de terceros', desc: 'Integración, configuración y estabilización de señales de terceros.' },
  { icon: ICONS.book, title: 'Capacitación operativa', desc: 'Capacitación operativa relacionada con el monitoreo y verificación de sus sistemas.' },
  { icon: ICONS.play, title: 'Soporte IPTV/OTT', desc: 'Apoyo técnico para la identificación y resolución de problemas relacionados con la operación IPTV/OTT.' },
];

const PLANES = [
  {
    code: 'A',
    name: 'POR DEMANDA',
    highlight: false,
    items: [
      'Dirigido a empresas que requieren una intervención técnica puntual.',
      'La atención se realiza por horas, de acuerdo con la necesidad, alcance y complejidad de la intervención.',
    ],
    price: 'Consultar',
  },
  {
    code: 'B',
    name: 'ADMINISTRADO MENSUAL',
    highlight: true,
    badge: 'Atención continua',
    items: [
      'Dirigido a empresas que requieren una atención técnica continua, monitoreo preventivo, atención prioritaria y disponibilidad extendida.',
      'Horario de cobertura: 07:00 a 23:00 horas, de lunes a domingo y feriados.',
    ],
    price: 'Consultar',
  },
];

const AUDIENCIA = [
  { icon: ICONS.building, title: 'Clientes MIC', desc: 'Empresas que requieren atención técnica sobre las señales contratadas con MIC y/o soporte especializado adicional para su operación.' },
  { icon: ICONS.buildings, title: 'Empresas que no son clientes MIC', desc: 'Empresas que requieren soporte técnico especializado para su propia infraestructura, operación IPTV/OTT o integración de señales.' },
  { icon: ICONS.tower, title: 'Operadores, ISPs y empresas de telecomunicaciones', desc: 'Empresas que requieren apoyo técnico para asegurar la continuidad y correcta operación de sus servicios de transmisión.' },
  { icon: ICONS.shuffle, title: 'Operaciones con señales de terceros', desc: 'Empresas que cuentan con señales contratadas con diferentes proveedores y requieren apoyo técnico para su integración, operación o estabilización.' },
];

const PROTOCOLOS = ['SRT', 'HLS', 'MPEG-DASH', 'RTMP'];
const PLATAFORMAS = ['Astra Cesbo', 'Flussonic', 'Nimble Streamer', 'Wellav', 'FFmpeg'];

export default function NocServicesPage() {
  return (
    <PageShell>
      {/* 1. Hero */}
      <section className="relative overflow-hidden py-24 px-6 text-white" style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, #a62baf 100%)` }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(650px 480px at 85% 20%, ${MAGENTA}33, transparent 70%)` }} />
        <div className="max-w-[1240px] mx-auto relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className={`${titleFont} text-[clamp(32px,4.4vw,54px)] leading-[1.1] tracking-[-0.02em] mb-5`}>
              NOC SERVICES Y SOPORTE
            </h1>
            <p className="text-[18px] text-white/85 leading-relaxed mb-8 max-w-[560px]">
              Aseguramiento, continuidad y soporte técnico especializado para la operación de señales IPTV/OTT.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white text-[#841F89] text-[15.5px] font-semibold rounded-[12px] shadow-[0_10px_28px_rgba(0,0,0,0.18)] hover:bg-gray-100 transition-all duration-200 cursor-pointer group"
            >
              SOLICITAR SERVICIO NOC
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* NOC monitoring illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden sm:block"
          >
            <div className="rounded-[20px] bg-white/10 border border-white/20 backdrop-blur-sm p-5 grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-video rounded-[8px] bg-white/15 border border-white/20 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${MAGENTA}55, transparent)` }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  />
                  <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#2ee6a0]" />
                </div>
              ))}
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-[14px] px-4 py-3 shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2ee6a0] animate-pulse" />
              <span className="text-[12px] font-semibold text-[#0a1133]">Monitoreo activo</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Introducción */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[820px] mx-auto text-center">
          <p className="text-[19px] text-[#3d2b50] leading-relaxed">
            El Servicio NOC de MIC está orientado a empresas que requieren asegurar la correcta operación, continuidad y atención técnica de sus señales y sistemas IPTV/OTT.
          </p>
        </div>
      </section>

      {/* 3. Modalidades de atención */}
      <section className="py-20 px-6" style={{ background: '#faf4fb' }}>
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[700px] mb-12">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: PURPLE }}>
              <span className="w-5 h-[2px] rounded-full" style={{ background: PURPLE }} />
              Modalidades de atención
            </span>
            <h2 className={`${titleFont} text-[clamp(26px,3vw,40px)] tracking-[-0.02em]`} style={{ color: '#2c1230' }}>
              El servicio contempla dos modalidades principales de atención.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.a
              href="#soporte-estandar"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="block bg-white rounded-[22px] p-8 border-2 hover:shadow-[0_12px_32px_rgba(132,31,137,0.14)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              style={{ borderColor: `${PURPLE}30` }}
            >
              <div className="w-12 h-12 rounded-[12px] grid place-items-center mb-5" style={{ background: `${PURPLE}12`, color: PURPLE }}>
                {ICONS.shieldCheck}
              </div>
              <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: `${PURPLE}14`, color: PURPLE }}>
                Incluido sin costo adicional para clientes MIC
              </span>
              <h3 className="text-[22px] font-bold tracking-tight mb-2" style={{ color: '#2c1230' }}>
                Soporte Estándar
              </h3>
              <p className="text-[15px] text-[#6a5a73] leading-relaxed mb-4">
                NOC Onboarding &amp; Essential Delivery.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: PURPLE }}>
                Ver detalle <span>→</span>
              </span>
            </motion.a>

            <motion.a
              href="#soporte-especializado"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="block bg-white rounded-[22px] p-8 border-2 hover:shadow-[0_12px_32px_rgba(132,31,137,0.14)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              style={{ borderColor: `${BLUE}25` }}
            >
              <div className="w-12 h-12 rounded-[12px] grid place-items-center mb-5" style={{ background: `${BLUE}12`, color: BLUE }}>
                {ICONS.wrench}
              </div>
              <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: `${BLUE}14`, color: BLUE }}>
                Servicio opcional
              </span>
              <h3 className="text-[22px] font-bold tracking-tight mb-2" style={{ color: '#2c1230' }}>
                Soporte Especializado — NOC Proactive Managed Care
              </h3>
              <p className="text-[15px] text-[#6a5a73] leading-relaxed mb-4">
                Atención técnica adicional para su infraestructura, operación de señales o integración de contenidos de terceros.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: BLUE }}>
                Ver detalle <span>→</span>
              </span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* 4. Soporte Estándar */}
      <section id="soporte-estandar" className="py-20 px-6 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[760px] mb-6">
            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5" style={{ background: `${PURPLE}14`, color: PURPLE }}>
              Incluido sin costo adicional para clientes MIC
            </span>
            <h2 className={`${titleFont} text-[clamp(28px,3.4vw,44px)] tracking-[-0.02em] mb-4`} style={{ color: '#2c1230' }}>
              Soporte Estándar
            </h2>
            <p className="text-[16.5px] text-[#6a5a73] leading-relaxed">
              NOC Onboarding &amp; Essential Delivery. El soporte estándar corresponde a la atención técnica que MIC brinda a sus clientes como parte de la contratación de sus señales. Está orientado principalmente a garantizar la correcta incorporación y operación de las señales suministradas por MIC.
            </p>
          </div>

          <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] mt-12 mb-6" style={{ color: PURPLE }}>
            ¿Qué comprende?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {QUE_COMPRENDE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white border rounded-[18px] p-6 hover:shadow-[0_8px_22px_rgba(132,31,137,0.10)] transition-shadow"
                style={{ borderColor: '#eadcec' }}
              >
                <div className="w-11 h-11 rounded-[10px] grid place-items-center mb-4" style={{ background: `${PURPLE}10`, color: PURPLE }}>
                  {item.icon}
                </div>
                <h4 className="text-[15px] font-bold mb-2" style={{ color: '#2c1230' }}>{item.title}</h4>
                <p className="text-[13.5px] text-[#6a5a73] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Horario de atención inmediata */}
      <section className="py-14 px-6" style={{ background: PURPLE }}>
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-full bg-white/15 grid place-items-center text-white flex-shrink-0">
            {ICONS.clock}
          </div>
          <div>
            <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-white/70 mb-1">
              Horario de atención inmediata
            </span>
            <p className="text-[20px] font-semibold text-white">
              Lunes a viernes de 08:00 a 17:00 horas.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Alcance del soporte estándar */}
      <section className="py-20 px-6 bg-white">
        <div
          className="max-w-[900px] mx-auto rounded-[22px] p-8 md:p-10"
          style={{ border: `2px solid ${PURPLE}30`, background: '#faf4fb' }}
        >
          <p className="text-[16px] text-[#3d2b50] leading-relaxed mb-6">
            El soporte estándar está orientado a la atención de las señales suministradas por MIC y no contempla intervenciones especializadas sobre la infraestructura propia del cliente. Las necesidades que requieran análisis, configuración o intervención técnica adicional podrán ser atendidas mediante el Servicio NOC Especializado.
          </p>
          <a
            href="#soporte-especializado"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-white text-[14.5px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(132,31,137,0.3)] hover:brightness-110 transition-all duration-200 cursor-pointer group"
            style={{ background: PURPLE }}
          >
            Conocer el Soporte Especializado
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>

      <WaveDivider />

      {/* Soporte Especializado — NOC Proactive Managed Care */}
      <section id="soporte-especializado" className="relative overflow-hidden py-20 px-6" style={{ background: 'linear-gradient(160deg, #fdf5fb 0%, #f3e0f5 100%)' }}>
        <div className="max-w-[1240px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5" style={{ background: `${BLUE}14`, color: BLUE }}>
                Servicio opcional
              </span>
              <h2 className={`${titleFont} text-[clamp(28px,3.4vw,44px)] tracking-[-0.02em] mb-4`} style={{ color: '#2c1230' }}>
                Soporte Especializado — NOC Proactive Managed Care
              </h2>
              <p className="text-[16.5px] text-[#6a5a73] leading-relaxed">
                El Soporte Especializado está dirigido a clientes MIC y a empresas que requieren una atención técnica adicional para su infraestructura, operación de señales o integración de contenidos de terceros. Puede contratarse para intervenciones puntuales o mediante un esquema de atención administrada y recurrente.
              </p>
            </motion.div>

            {/* Placeholder: especializado-servidores.jpg — servidores e infraestructura de transmisión */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[22px] h-[240px] lg:h-full min-h-[220px] relative overflow-hidden flex flex-col items-center justify-center gap-3 text-white"
              style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, ${BLUE} 100%)` }}
            >
              <div className="w-16 h-16 rounded-[14px] bg-white/15 grid place-items-center">
                {ICONS.server}
              </div>
              <span className="text-[13px] font-semibold text-white/85 text-center px-6">Servidores e infraestructura de transmisión</span>
            </motion.div>
          </div>

          <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-6" style={{ color: PURPLE }}>
            ¿Qué comprende?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {QUE_COMPRENDE_ESPECIALIZADO.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-[18px] p-6 shadow-[0_6px_18px_rgba(132,31,137,0.08)] hover:shadow-[0_14px_32px_rgba(132,31,137,0.16)] transition-shadow duration-200"
              >
                <div className="w-12 h-12 rounded-full grid place-items-center mb-4" style={{ background: `${PURPLE}12`, color: PURPLE }}>
                  {item.icon}
                </div>
                <h4 className="text-[15px] font-bold mb-2" style={{ color: '#2c1230' }}>{item.title}</h4>
                <p className="text-[13.5px] text-[#6a5a73] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-start gap-3 rounded-[16px] p-5 bg-white" style={{ borderLeft: `4px solid ${MAGENTA}` }}>
            <div className="w-9 h-9 rounded-full grid place-items-center flex-shrink-0" style={{ background: `${MAGENTA}14`, color: MAGENTA }}>
              {ICONS.alertCircle}
            </div>
            <p className="text-[14.5px] text-[#3d2b50] leading-relaxed pt-1.5">
              El servicio especializado puede incluir soporte sobre señales de terceros que formen parte de la operación del cliente.
            </p>
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* Modalidades del Soporte Especializado */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[700px] mb-12">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: PURPLE }}>
              <span className="w-5 h-[2px] rounded-full" style={{ background: PURPLE }} />
              Modalidades del Soporte Especializado
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {PLANES.map((plan, i) => (
              <motion.div
                key={plan.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative rounded-[22px] p-8 border-2 bg-white shadow-[0_6px_20px_rgba(132,31,137,0.06)] hover:shadow-[0_16px_36px_rgba(132,31,137,0.16)] transition-shadow duration-200"
                style={{ borderColor: plan.highlight ? MAGENTA : `${PURPLE}25` }}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-3 right-7 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                    style={{ background: MAGENTA }}
                  >
                    {plan.badge}
                  </span>
                )}
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: plan.highlight ? MAGENTA : PURPLE }}>
                  {plan.code === 'A' ? 'Modalidad A' : 'Modalidad B'}
                </span>
                <h3 className="text-[22px] font-bold tracking-tight mt-1 mb-4" style={{ color: '#2c1230' }}>
                  {plan.name}
                </h3>
                <ul className="flex flex-col gap-3 mb-6">
                  {plan.items.map(it => (
                    <li key={it} className="flex gap-2.5 text-[14.5px] text-[#6a5a73] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: plan.highlight ? MAGENTA : PURPLE }} />
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] font-semibold uppercase tracking-wider mb-5" style={{ color: plan.highlight ? MAGENTA : PURPLE }}>
                  Precio: {plan.price}
                </p>
                <a
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-white text-[14px] font-bold rounded-[12px] shadow-[0_6px_18px_rgba(132,31,137,0.3)] hover:brightness-110 transition-all duration-200 cursor-pointer group"
                  style={{ background: plan.highlight ? MAGENTA : PURPLE }}
                >
                  SOLICITAR SERVICIO NOC
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </motion.div>
            ))}
          </div>

          <p className="text-[12.5px] text-[#9087a0] leading-relaxed max-w-[760px]">
            Las tarifas definitivas, condiciones comerciales, alcance específico y características de cada modalidad serán comunicadas mediante la propuesta comercial correspondiente.
          </p>
        </div>
      </section>

      <WaveDivider />

      {/* Comparativo de horarios */}
      <section className="py-20 px-6" style={{ background: '#faf4fb' }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="max-w-[700px] mb-12">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: PURPLE }}>
              <span className="w-5 h-[2px] rounded-full" style={{ background: PURPLE }} />
              Comparativo de horarios
            </span>
            <h2 className={`${titleFont} text-[clamp(24px,2.8vw,36px)] tracking-[-0.02em]`} style={{ color: '#2c1230' }}>
              Más horas de cobertura con el plan administrado.
            </h2>
          </div>

          <div className="flex flex-col gap-7">
            {[
              { label: 'Soporte Estándar', detail: '08:00 a 17:00, lunes a viernes', color: PURPLE, start: 8, end: 17 },
              { label: 'Administrado Mensual', detail: '07:00 a 23:00, lunes a domingo y feriados', color: MAGENTA, start: 7, end: 23 },
            ].map(row => (
              <div key={row.label}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 gap-0.5">
                  <span className="text-[14.5px] font-bold" style={{ color: '#2c1230' }}>{row.label}</span>
                  <span className="text-[13px] text-[#6a5a73]">{row.detail}</span>
                </div>
                <div className="relative h-4 rounded-full" style={{ background: `${row.color}14` }}>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute top-0 h-full rounded-full origin-left"
                    style={{
                      left: `${(row.start / 24) * 100}%`,
                      width: `${((row.end - row.start) / 24) * 100}%`,
                      background: row.color,
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Hour ticks */}
            <div className="flex justify-between text-[11px] text-[#9087a0] px-0.5">
              {['00:00', '06:00', '12:00', '18:00', '24:00'].map(h => <span key={h}>{h}</span>)}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* ¿A quiénes está dirigido el Servicio NOC? */}
      <section className="relative overflow-hidden py-20 px-6 bg-white">
        {/* Placeholder: redes-latam.jpg — mapa de Latinoamérica con puntos conectados, como fondo tenue */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 24 }).map((_, i) => {
            const x = 20 + (i % 6) * 65;
            const y = 20 + Math.floor(i / 6) * 65;
            return <circle key={i} cx={x} cy={y} r="3" fill={PURPLE} />;
          })}
          {Array.from({ length: 24 }).map((_, i) => {
            if (i % 6 === 5) return null;
            const x1 = 20 + (i % 6) * 65;
            const y1 = 20 + Math.floor(i / 6) * 65;
            return <line key={`l${i}`} x1={x1} y1={y1} x2={x1 + 65} y2={y1} stroke={PURPLE} strokeWidth="1" />;
          })}
        </svg>

        <div className="max-w-[1240px] mx-auto relative">
          <div className="max-w-[700px] mb-12">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: PURPLE }}>
              <span className="w-5 h-[2px] rounded-full" style={{ background: PURPLE }} />
              ¿A quiénes está dirigido?
            </span>
            <h2 className={`${titleFont} text-[clamp(26px,3vw,40px)] tracking-[-0.02em] mb-3`} style={{ color: '#2c1230' }}>
              El Servicio NOC puede ser contratado por:
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {AUDIENCIA.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white border rounded-[18px] p-6 flex gap-4 shadow-[0_4px_14px_rgba(132,31,137,0.06)] hover:shadow-[0_12px_28px_rgba(132,31,137,0.14)] transition-shadow duration-200"
                style={{ borderColor: '#eadcec' }}
              >
                <div className="w-12 h-12 rounded-full grid place-items-center flex-shrink-0" style={{ background: `${PURPLE}12`, color: PURPLE }}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[15.5px] font-bold mb-1.5" style={{ color: '#2c1230' }}>{item.title}</h4>
                  <p className="text-[13.5px] text-[#6a5a73] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* Tecnologías y plataformas */}
      <section className="py-20 px-6" style={{ background: '#faf4fb' }}>
        <div className="max-w-[1000px] mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: PURPLE }}>
            <span className="w-5 h-[2px] rounded-full" style={{ background: PURPLE }} />
            Tecnologías y plataformas
          </span>
          <p className="text-[16.5px] text-[#3d2b50] leading-relaxed max-w-[700px] mx-auto mb-10">
            MIC cuenta con experiencia en diferentes tecnologías, protocolos y plataformas utilizadas en operaciones IPTV/OTT.
          </p>

          <div className="flex flex-col gap-6 mb-8">
            <div>
              <span className="block text-[12px] font-semibold uppercase tracking-wider text-[#9087a0] mb-3">Protocolos y tecnologías</span>
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
                  <span key={p} className="px-5 py-2.5 rounded-full bg-white border text-[14px] font-semibold" style={{ borderColor: `${MAGENTA}30`, color: MAGENTA }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-[14.5px] text-[#6a5a73] leading-relaxed max-w-[700px] mx-auto">
            Estas capacidades permiten a MIC trabajar con diferentes entornos de cabecera, transmisión y distribución de señales.
          </p>
        </div>
      </section>

      <WaveDivider />

      {/* CTA final */}
      <section className="relative overflow-hidden py-20 px-6 text-center" style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, ${MAGENTA} 100%)` }}>
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" aria-hidden="true" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M0 200 C150 100, 300 300, 450 200 C600 100, 750 300, 900 200 C1050 100, 1150 250, 1200 200" fill="none" stroke="white" strokeWidth="4" />
        </svg>
        <div className="relative max-w-[780px] mx-auto">
          <h2 className={`${titleFont} text-[clamp(26px,3.4vw,42px)] tracking-[-0.02em] text-white mb-8`}>
            ¿Listo para asegurar la continuidad de tu operación?
          </h2>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 px-9 py-5 bg-white text-[#841F89] text-[16.5px] font-bold rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:bg-gray-100 transition-all duration-200 cursor-pointer group"
          >
            SOLICITAR SERVICIO NOC
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
