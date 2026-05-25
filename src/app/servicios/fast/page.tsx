'use client';

import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Inserción de anuncios en servidor',
    desc: 'Tecnología SSAI para inserción fluida y sin buffering. Compatible con cualquier reproductor.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>
      </svg>
    ),
    title: 'Noticias y deportes en vivo',
    desc: 'Anuncios precisos para transmisiones en vivo de noticias y deportes sin interrumpir la señal.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Panel de control avanzado',
    desc: 'Informes y análisis detallados de impresiones, fill rate, CPM e ingresos en tiempo real.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    title: 'Red amplia de socios',
    desc: 'Acceso a una red de socios publicitarios en todas las regiones de LATAM con altas tasas de fill.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Ventas automatizadas',
    desc: 'Publicidad programática con subastas en tiempo real. Sin gestión manual de campañas.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Revenue share transparente',
    desc: 'Modelo claro de distribución de ingresos. Recibes tu parte el primer día del mes siguiente.',
  },
];

const STATS = [
  { num: '700+', label: 'Operadores activos' },
  { num: '14', label: 'Países en LATAM' },
  { num: '40+', label: 'Canales FAST disponibles' },
  { num: '30d', label: 'Tiempo de activación' },
];

export default function FastPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="text-white py-24 px-6 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banner-servicios.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: -20 }} />
        <div className="absolute inset-0 bg-[#0D1E6B]/75" style={{ zIndex: -10 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -5, background: 'radial-gradient(700px 500px at 80% 50%, rgba(232,7,139,0.15), transparent 70%)' }} />
        <div className="max-w-[1240px] mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-medium mb-6">
              <span className="bg-[#E8078B] text-white text-[11px] font-bold px-2 py-[3px] rounded-full uppercase tracking-wider">Servicio 03</span>
              Monetización FAST
            </div>
            <h1 className="text-[clamp(32px,4vw,52px)] font-bold leading-[1.08] tracking-[-0.025em] mb-5">
              Monetización de contenidos{' '}
              <em className="not-italic bg-gradient-to-r from-[#E8078B] to-[#ff67c1] bg-clip-text text-transparent">FAST</em>
            </h1>
            <p className="text-[17px] text-white/78 leading-relaxed mb-8">
              MIC ofrece una solución completa de servicios publicitarios, disponible también como servicio gestionado. Convierte tu contenido en ingresos publicitarios sin alterar tu programación lineal.
            </p>
            <a
              href="/cotizacion"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#E8078B] text-white text-[15.5px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] transition-all duration-200 cursor-pointer group"
            >
              Solicitar información
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-4 mt-12">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-white/10 border border-white/15 rounded-[12px] px-5 py-3 text-center"
              >
                <span className="block text-[24px] font-bold tracking-tight">{s.num}</span>
                <span className="text-[12px] text-white/60">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[600px] mb-14">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              Qué incluye
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-3">
              Una plataforma completa de publicidad digital.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white border border-gray-200 rounded-[18px] p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-[10px] bg-[#E8078B]/8 text-[#E8078B] grid place-items-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-bold text-[#0a1133] mb-2">{f.title}</h3>
                <p className="text-[13.5px] text-[#6a7196] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[600px] mb-10">
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-[#0a1133] tracking-tight mb-3">
              ¿Cómo funciona?
            </h2>
            <p className="text-[16px] text-[#6a7196] leading-relaxed">
              Tu canal FAST está al aire en menos de 30 días.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { step: '1', title: 'Integras tu contenido', desc: 'Compartes tu biblioteca o feed de contenido con MIC.' },
              { step: '2', title: 'MIC configura el canal', desc: 'Programación, playlists y marcadores publicitarios listos.' },
              { step: '3', title: 'Anunciantes pujan', desc: 'Red programática llena tu inventario automáticamente.' },
              { step: '4', title: 'Recibes ingresos', desc: 'Revenue share mensual, transparente y puntual.' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-[18px] border border-gray-200 p-6 relative">
                <span className="absolute top-5 right-5 text-[40px] font-extrabold text-[#E8078B]/10 leading-none">{s.step}</span>
                <h3 className="text-[15px] font-bold text-[#0a1133] mb-2">{s.title}</h3>
                <p className="text-[13.5px] text-[#6a7196] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#E8078B] text-white text-center">
        <h2 className="text-[clamp(24px,3vw,38px)] font-bold tracking-tight mb-4">
          Empieza a monetizar este mes.
        </h2>
        <p className="text-white/80 text-[16px] leading-relaxed mb-8 max-w-[480px] mx-auto">
          Sin inversión inicial. Modelo de revenue share. El primer ingreso puede llegar en menos de 30 días.
        </p>
        <a
          href="/cotizacion"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#E8078B] text-[15.5px] font-bold rounded-[12px] hover:bg-gray-100 transition-colors cursor-pointer group"
        >
          Solicitar información
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </section>
    </PageShell>
  );
}
