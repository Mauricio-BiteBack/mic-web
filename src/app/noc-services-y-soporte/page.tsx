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
};

const QUE_COMPRENDE = [
  { icon: ICONS.settings, title: 'Configuración inicial', desc: 'Configuración inicial de los enlaces contratados.' },
  { icon: ICONS.headset, title: 'Asistencia remota', desc: 'Asistencia remota básica para la incorporación de las señales en la cabecera del cliente.' },
  { icon: ICONS.waveform, title: 'Verificación técnica', desc: 'Verificación de video, audio y sincronización.' },
  { icon: ICONS.gridCheck, title: 'Validación de salida', desc: 'Validación de la correcta salida de la señal en la grilla del cliente.' },
  { icon: ICONS.alertCircle, title: 'Atención de incidencias', desc: 'Atención de incidencias relacionadas con las señales contratadas con MIC.' },
  { icon: ICONS.tvAlert, title: 'Eventos de señal', desc: 'Atención de eventos como pantalla negra, congelamiento o pixelación cuando sean reportados por el cliente.' },
];

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
              Solicitar información
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
                Próximamente
              </span>
              <h3 className="text-[22px] font-bold tracking-tight mb-2" style={{ color: '#2c1230' }}>
                Soporte Especializado
              </h3>
              <p className="text-[15px] text-[#6a5a73] leading-relaxed mb-4">
                El contenido se agregará después.
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

      {/* Soporte Especializado — próximamente */}
      <section id="soporte-especializado" className="py-20 px-6" style={{ background: '#faf4fb' }}>
        <div className="max-w-[900px] mx-auto text-center rounded-[22px] p-10 border-2 bg-white" style={{ borderColor: `${BLUE}25` }}>
          <div className="w-14 h-14 rounded-[14px] grid place-items-center mx-auto mb-5" style={{ background: `${BLUE}12`, color: BLUE }}>
            {ICONS.wrench}
          </div>
          <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: `${BLUE}14`, color: BLUE }}>
            Próximamente
          </span>
          <h2 className={`${titleFont} text-[clamp(26px,3vw,38px)] tracking-[-0.02em] mb-3`} style={{ color: '#2c1230' }}>
            Soporte Especializado
          </h2>
          <p className="text-[15.5px] text-[#6a5a73] leading-relaxed max-w-[560px] mx-auto">
            El contenido de esta modalidad se agregará próximamente.
          </p>
        </div>
      </section>

      {/* 7. Cierre / CTA */}
      <section className="py-20 px-6 text-center" style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, #a62baf 100%)` }}>
        <h2 className={`${titleFont} text-[clamp(26px,3.4vw,42px)] tracking-[-0.02em] text-white mb-8`}>
          CONECTAMOS EMOCIONES+
        </h2>
        <a
          href="/contacto"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#841F89] text-[15.5px] font-bold rounded-[12px] hover:bg-gray-100 transition-colors cursor-pointer group"
        >
          Contáctanos
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </section>
    </PageShell>
  );
}
