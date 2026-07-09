'use client';

import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
      </svg>
    ),
    title: 'Interfaz web intuitiva',
    desc: 'Gestión completa de flujos de trabajo de extremo a extremo desde un panel centralizado.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Transferencia a la nube MIC',
    desc: 'Tu contenido migra a la infraestructura MIC de forma segura y sin pérdida de calidad.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Programación y playlists',
    desc: 'Crea listas de reproducción, agenda horarios y mantén tu canal siempre activo sin gaps.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
    ),
    title: 'Distribución masiva',
    desc: 'Llega a más de 700 clientes activos o a cualquier plataforma OTT y FAST.',
  },
];

const FLOW = [
  { label: 'Tu contenido', sub: 'YouTube, archivos, biblioteca propia', color: 'bg-[#193595]' },
  { label: 'Nube MIC', sub: 'Procesamiento, programación y playlists', color: 'bg-[#E8078B]' },
  { label: '700+ clientes', sub: 'Cable operadores en LATAM', color: 'bg-[#0aa84f]' },
  { label: 'Plataformas OTT', sub: 'FAST y streaming en línea', color: 'bg-[#f5b015]' },
];

export default function LinealesPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative text-white py-24 px-6 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banner-servicios.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: -20 }} />
        <div className="absolute inset-0 bg-[#0D1E6B]/75" style={{ zIndex: -10 }} />
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-medium mb-6">
              <span className="bg-[#E8078B] text-white text-[11px] font-bold px-2 py-[3px] rounded-full uppercase tracking-wider">Servicio 02</span>
              Canales lineales
            </div>
            <h1 className="text-[clamp(32px,4vw,52px)] font-bold leading-[1.08] tracking-[-0.025em] mb-5">
              Creación de canales lineales en streaming 24x7
            </h1>
            <p className="text-[17px] text-white/78 leading-relaxed mb-8">
              Si tienes contenidos transmitidos en YouTube o contenidos que ya fueron emitidos en canales de TV que ya no están siendo disfrutados, podemos monetizarlos creando un canal de TV lineal 24/7, distribuir el contenido a nuestros más de 700 clientes o a cualquier plataforma OTT, incluyendo Free Ad-Supported Streaming TV (FAST), y utilizar un modelo de pago por uso para una mayor rentabilidad.
            </p>
            <a
              href="/cotizacion"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#E8078B] text-white text-[15.5px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] transition-all duration-200 cursor-pointer group"
            >
              Solicitar información
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Workflow visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col gap-3"
            aria-hidden="true"
          >
            {FLOW.map((step, i) => (
              <div key={i}>
                <div className={`${step.color} rounded-[14px] p-4 text-white flex items-center gap-4`}>
                  <span className="w-9 h-9 rounded-full bg-white/20 grid place-items-center text-[14px] font-bold flex-shrink-0">{i + 1}</span>
                  <div>
                    <strong className="text-[15px] font-bold block">{step.label}</strong>
                    <span className="text-white/70 text-[13px]">{step.sub}</span>
                  </div>
                </div>
                {i < FLOW.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[600px] mb-14">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              Características
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-3">
              Todo lo que incluye el servicio.
            </h2>
            <p className="text-[16px] text-[#6a7196] leading-relaxed">
              Una solución completa para llevar tu contenido al aire en 24 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-[18px] p-6 flex gap-5 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-[10px] bg-[#193595]/8 text-[#193595] grid place-items-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#0a1133] mb-1.5">{f.title}</h3>
                  <p className="text-[14px] text-[#6a7196] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#f6f7fb]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-[#0a1133] tracking-tight mb-4">
            ¿Tienes contenido sin usar? Lo convertimos en un canal 24/7.
          </h2>
          <p className="text-[16px] text-[#6a7196] leading-relaxed mb-8">
            Con modelo de pago por uso, sin inversión inicial en infraestructura. Monetiza desde el primer mes.
          </p>
          <a
            href="/cotizacion"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8078B] text-white text-[15.5px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.35)] hover:bg-[#ff1e9f] transition-all duration-200 cursor-pointer group"
          >
            Solicitar información
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>
    </PageShell>
  );
}
