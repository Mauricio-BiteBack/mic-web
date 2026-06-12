'use client';

import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/data/channels';

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#E8078B]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-[720px] mb-14">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-white/70 mb-3">
            <span className="w-5 h-[2px] bg-white/70 rounded-full" />
            Lo que dicen
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.025em] text-white mb-4">
            Operadores que ya escalaron con MIC.
          </h2>
          <p className="text-[17px] text-white/80 leading-relaxed">
            Testimonios de directores y gerentes de cableoperadores del país.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[22px] border border-gray-200 p-7 flex flex-col gap-5 shadow-sm hover:shadow-[0_8px_24px_rgba(13,30,107,0.08)] transition-shadow duration-200"
            >
              <span className="text-[56px] leading-none text-[#E8078B] font-serif select-none">"</span>
              <blockquote className="text-[15px] text-[#2b3567] leading-relaxed flex-1 -mt-8">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
                <span className="w-10 h-10 rounded-full bg-[#193595] text-white grid place-items-center text-[13px] font-bold flex-shrink-0">
                  {t.initials}
                </span>
                <div>
                  <strong className="text-[14px] font-semibold text-[#0a1133] block">{t.name}</strong>
                  <span className="text-[12.5px] text-[#6a7196]">{t.role} · {t.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
