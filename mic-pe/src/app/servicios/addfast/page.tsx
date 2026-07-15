'use client';

import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="18"/>
      </svg>
    ),
    title: 'Detección automática de espacios',
    desc: 'El sistema identifica los breaks publicitarios en tu señal sin intervención manual.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
      </svg>
    ),
    title: 'No intrusivo',
    desc: 'No requiere cambios en tu infraestructura existente. Se integra sobre lo que ya tienes.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Subasta en tiempo real',
    desc: 'Los primeros 120 segundos de cada break se subastan programáticamente al mejor postor.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Revenue share',
    desc: 'Los ingresos se distribuyen mensualmente con un modelo transparente sin costos ocultos.',
  },
];

const FLOW = [
  { label: 'Tu señal en vivo', icon: '📡', color: '#193595', desc: 'Canal lineal o FAST existente' },
  { label: 'MIC inserta marcadores', icon: '🎯', color: '#E8078B', desc: 'Solo se envía el bumper "ya regresamos"' },
  { label: 'Subasta programática', icon: '⚡', color: '#f5b015', desc: 'Anunciantes pujan en tiempo real' },
  { label: 'Revenue share', icon: '💰', color: '#0aa84f', desc: 'Ingresos mensuales directos a ti' },
];

export default function AddFastPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="text-white py-24 px-6 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banner-servicios.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: -20 }} />
        <div className="absolute inset-0 bg-[#050d3a]/80" style={{ zIndex: -10 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -5, background: 'radial-gradient(800px 600px at 10% 60%, rgba(25,53,149,0.5), transparent 70%), radial-gradient(500px 400px at 90% 20%, rgba(232,7,139,0.12), transparent 70%)' }} />
        <div className="max-w-[1240px] mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-medium mb-6">
              <span className="bg-[#E8078B] text-white text-[11px] font-bold px-2 py-[3px] rounded-full uppercase tracking-wider">Servicio 04</span>
              Publicidad programática
            </div>
            <h1 className="text-[clamp(32px,4vw,52px)] font-bold leading-[1.08] tracking-[-0.025em] mb-5">
              ADD FAST —{' '}
              <em className="not-italic bg-gradient-to-r from-[#E8078B] to-[#ff67c1] bg-clip-text text-transparent">
                Publicidad Programática
              </em>
            </h1>
            <p className="text-[17px] text-white/78 leading-relaxed mb-8">
              Proporcionamos una plataforma de inserción de anuncios en el servidor para editores de contenido. MIC se encargará de la inserción de marcadores, mientras que nuestros aliados atraerán a los anunciantes.
            </p>
            <p className="text-[16px] text-white/65 leading-relaxed mb-8">
              La inserción de marcadores es no intrusiva y no requiere cambios en su infraestructura existente, ya que detecta automáticamente los espacios publicitarios. Los primeros 120 segundos de estos espacios se subastarán, requiriendo solo el envío del bumper de &ldquo;ya regresamos&rdquo; del canal.
            </p>
            <a
              href="/cotizacion"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#E8078B] text-white text-[15.5px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] transition-all duration-200 cursor-pointer group"
            >
              Solicitar información
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Flow diagram */}
      <section className="py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[600px] mb-14">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              Cómo funciona
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-3">
              Del espacio publicitario al ingreso en 4 pasos.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-14">
            {FLOW.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-[18px] p-6 text-center relative hover:shadow-md transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-4 grid place-items-center text-white text-[22px] font-bold"
                  style={{ background: step.color }}
                >
                  {i + 1}
                </div>
                <h3 className="text-[14px] font-bold text-[#0a1133] mb-2">{step.label}</h3>
                <p className="text-[12.5px] text-[#6a7196]">{step.desc}</p>
                {i < FLOW.length - 1 && (
                  <div className="absolute top-1/2 -right-3 hidden md:flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#f6f7fb] rounded-[18px] p-6 flex gap-5 border border-gray-200"
              >
                <div className="w-11 h-11 rounded-[10px] bg-[#193595]/8 text-[#193595] grid place-items-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0a1133] mb-1.5">{f.title}</h3>
                  <p className="text-[13.5px] text-[#6a7196] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#193595] text-white">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[clamp(22px,2.5vw,34px)] font-bold tracking-tight mb-3">
              Activa AddFast en tu canal esta semana.
            </h2>
            <p className="text-white/70 text-[15px] leading-relaxed max-w-[480px]">
              Sin inversión inicial. Sin cambios técnicos. Solo envía el bumper y empezá a cobrar.
            </p>
          </div>
          <a
            href="/cotizacion"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 bg-[#E8078B] text-white text-[15px] font-bold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] transition-all cursor-pointer group"
          >
            Solicitar información
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>
    </PageShell>
  );
}
