'use client';

import { motion } from 'framer-motion';

export default function CTAStrip() {
  return (
    <section id="contacto" className="py-20 bg-[#193595]">
      <div className="max-w-[1240px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-white tracking-tight mb-3">
              Habla con un especialista esta semana.
            </h2>
            <p className="text-white/70 text-[16px] leading-relaxed max-w-[480px]">
              Te asesoramos sobre integración técnica, modelos comerciales y cómo armar la grilla ideal para tu zona.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a
              href="#configurador"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E8078B] text-white text-[15px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.35)] hover:bg-[#ff1e9f] hover:shadow-[0_10px_26px_rgba(232,7,139,0.45)] transition-all duration-200 cursor-pointer"
            >
              Armar mi paquete
            </a>
            <a
              href={`https://wa.me/51991688980?text=${encodeURIComponent('Hola, me interesa agendar una llamada con un especialista de MIC.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white text-[15px] font-semibold rounded-[12px] hover:bg-white/18 transition-all duration-200 cursor-pointer"
            >
              Agendar llamada
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
