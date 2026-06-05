'use client';

import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const FEATURES = [
  {
    step: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Evaluación y Monitoreo',
    sub: 'Analizamos tu contenido',
    desc: 'Monitoreamos tu señal o biblioteca de contenidos para evaluar su potencial técnico y comercial.',
  },
  {
    step: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    title: 'Integración MIC',
    sub: 'Incorporación a nuestra cartera',
    desc: 'Integramos tu contenido a nuestro portafolio y definimos la estrategia de distribución más adecuada.',
  },
  {
    step: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Promoción y Comercialización',
    sub: 'Presentamos tu canal al mercado',
    desc: 'Promocionamos tu señal en propuestas comerciales, redes sociales, eventos y reuniones con operadores.',
  },
  {
    step: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Distribución y Monetización',
    sub: 'Llega a nuevas audiencias',
    desc: 'Distribuimos tu contenido a operadores, plataformas IPTV, OTT y canales FAST para generar nuevas oportunidades de negocio.',
  },
];

const FLOW = [
  { label: 'Evaluación', sub: 'Análisis técnico y comercial de tu contenido', color: 'bg-[#193595]' },
  { label: 'Integración MIC', sub: 'Incorporación a nuestra red de distribución', color: 'bg-[#E8078B]' },
  { label: 'Promoción', sub: 'Presentación a operadores y plataformas', color: 'bg-[#0aa84f]' },
  { label: 'Distribución', sub: 'IPTV, OTT y canales FAST en Latinoamérica', color: 'bg-[#f5b015]' },
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
              Si cuentas con contenido audiovisual, programas, o producciones propias, en MIC podemos ayudarte a llevarlo más lejos. Evaluamos su potencial, lo integramos a nuestra red de distribución y lo presentamos a operadores, plataformas IPTV, OTT y canales FAST en toda Latinoamérica.<br/><br/>Además, podemos convertir tu biblioteca de contenidos en un canal lineal 24/7, permitiéndote ampliar tu alcance, generar nuevas audiencias y crear nuevas oportunidades de monetización.
            </p>
            <a
              href="https://wa.me/message/R5QI3ZBQMLUXP1" target="_blank" rel="noopener noreferrer"
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
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="w-11 h-11 rounded-[10px] bg-[#193595]/8 text-[#193595] grid place-items-center">
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#193595]/50 tracking-widest">{f.step}</span>
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#0a1133] mb-0.5">{f.title}</h3>
                  <p className="text-[12px] font-semibold text-[#E8078B] mb-1.5">{f.sub}</p>
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
            href="https://wa.me/message/R5QI3ZBQMLUXP1" target="_blank" rel="noopener noreferrer"
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
