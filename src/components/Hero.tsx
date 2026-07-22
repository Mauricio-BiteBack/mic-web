'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TOTAL_CHANNELS } from '@/data/channels';

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden pt-[168px] pb-24 isolate">
      {/* Background image — Next.js optimized, priority loaded. Boxed at its native 2050×796 ratio so it is never cropped. */}
      <div className="absolute inset-x-0 top-0 aspect-[2050/796] -z-30">
        <Image
          src="/banner-mic-nuevo-2.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Subtle accent radial wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: -10,
          background: 'radial-gradient(900px 500px at 12% 20%, rgba(232,7,139,0.12), transparent 60%)',
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px]"
        >
          <h1 className="text-[clamp(36px,4.6vw,60px)] font-bold leading-[1.05] tracking-[-0.025em] mb-5 text-balance">
            Impulsamos la televisión del futuro.
          </h1>

          <p className="text-[18px] leading-[1.55] text-white/85 max-w-[540px] mb-8 text-pretty">
            Conectamos operadores con el mejor contenido y la tecnología que necesitan para crecer.
          </p>

          <div className="flex gap-3 flex-wrap items-center mb-12">
            <a
              href="#configurador"
              className="inline-flex items-center gap-2 px-6 py-4 bg-[#E8078B] text-white text-[15.5px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] hover:shadow-[0_10px_26px_rgba(232,7,139,0.5)] transition-all duration-200 cursor-pointer group"
            >
              Armar mi paquete
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 border border-white/30 text-white text-[15.5px] font-semibold rounded-[12px] backdrop-blur-sm hover:bg-white/18 transition-all duration-200 cursor-pointer"
            >
              Ver catálogo
            </a>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 border-t border-white/20 pt-7 max-w-[580px]">
            {[
              { num: String(TOTAL_CHANNELS), label: 'Canales disponibles' },
              { num: '14', label: 'Países en LATAM' },
              { num: 'RPP', label: 'Distribuidor oficial' },
              { num: '24/7', label: 'Soporte técnico' },
            ].map((m, i) => (
              <div key={i} className={`pr-4 ${i < 3 ? 'border-r border-white/15' : ''}`}>
                <span className="block text-[30px] font-bold tracking-[-0.03em] leading-none mb-1.5 tabular-nums">{m.num}</span>
                <span className="text-[12.5px] text-white/70 leading-tight">{m.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
