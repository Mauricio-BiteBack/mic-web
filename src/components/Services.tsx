'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/data/services';

function ServiceIcon({ kind }: { kind: string }) {
  const props = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'Canales IP') return (
    <svg {...props}><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/></svg>
  );
  if (kind === 'Lineal 24x7') return (
    <svg {...props}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
  );
  if (kind === 'FAST Channels') return (
    <svg {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  );
  return (
    <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-[#841F89]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-[720px] mb-14">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-white/70 mb-3">
            <span className="w-5 h-[2px] bg-white/70 rounded-full" />
            Servicios
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.025em] text-white mb-4">
            Cuatro formas de hacer crecer tu operación.
          </h2>
          <p className="text-[17px] text-white/75 leading-relaxed">
            Sin contratos atados, sin volúmenes mínimos. Empieza con lo que necesitas hoy y escala cuando convenga.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-[22px] p-7 overflow-hidden flex flex-col gap-4 border transition-all duration-200 hover:shadow-[0_8px_24px_rgba(13,30,107,0.10)] hover:-translate-y-0.5 cursor-pointer ${
                s.accent
                  ? 'bg-[#E8078B] text-white border-[#E8078B]'
                  : 'bg-white text-[#0a1133] border-gray-200'
              }`}
            >
              {/* Decorative blob */}
              <div
                className="absolute top-0 right-0 w-28 h-28 rounded-bl-full pointer-events-none"
                style={{
                  background: s.accent ? 'rgba(255,255,255,0.1)' : 'rgba(25,53,149,0.04)',
                }}
              />

              <span className={`text-[11px] font-bold tracking-[0.12em] uppercase ${s.accent ? 'text-white/60' : 'text-[#6a7196]'}`}>
                {s.num}
              </span>

              <div className={`w-10 h-10 rounded-[10px] grid place-items-center ${s.accent ? 'bg-white/15' : 'bg-[#193595]/8'} ${s.accent ? 'text-white' : 'text-[#193595]'}`}>
                <ServiceIcon kind={s.title} />
              </div>

              <div>
                <span className={`text-[12px] font-semibold uppercase tracking-wider ${s.accent ? 'text-white/70' : 'text-[#E8078B]'} block mb-1`}>
                  {s.verb}
                </span>
                <h3 className="text-[19px] font-bold tracking-tight leading-tight">{s.title}</h3>
              </div>

              <p className={`text-[14.5px] leading-relaxed flex-1 ${s.accent ? 'text-white/82' : 'text-[#6a7196]'}`}>
                {s.desc}
              </p>

              <a
                href={s.href}
                className={`text-[13.5px] font-semibold inline-flex items-center gap-1.5 group transition-colors ${
                  s.accent ? 'text-white/90 hover:text-white' : 'text-[#193595] hover:text-[#E8078B]'
                }`}
              >
                Saber más
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
