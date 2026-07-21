'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CHANNELS } from '@/data/channels';
import { useCart } from './CartContext';

export default function CatalogPreview() {
  const cart = useCart();
  const featured = CHANNELS.filter(c => c.featured).slice(0, 6);

  return (
    <section id="catalogo" className="py-24">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-[720px] mb-14">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
            <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
            Catálogo
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-4">
            Una selección. El catálogo completo tiene mucho más.
          </h2>
          <p className="text-[17px] text-[#6a7196] leading-relaxed">
            Filtra por categoría, tipo de distribución (IP, lineal) e idioma para encontrar la mezcla exacta.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {featured.map((ch, i) => {
            const inCart = cart.has(ch.id);
            return (
              <motion.article
                key={ch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-[18px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-[0_8px_24px_rgba(13,30,107,0.10)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                {/* Poster — square to match 308×308 format */}
                <Link href={`/catalogo/${ch.id}`} className="block relative aspect-square overflow-hidden">
                  {ch.imageUrl ? (
                    <Image
                      src={ch.imageUrl}
                      alt={`${ch.name} portada`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-end p-4"
                      style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.dark})` }}
                    >
                      <span className="text-white font-bold text-[20px] tracking-tight leading-tight">
                        {ch.name}
                      </span>
                    </div>
                  )}
                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-[6px] uppercase tracking-wider">
                      {ch.categories[0]}
                    </span>
                    <span className={`text-white text-[10px] font-bold px-2 py-1 rounded-[6px] uppercase tracking-wider ${
                      ch.type === 'IP' ? 'bg-[#193595]/90' : 'bg-[#0aa84f]/90'
                    }`}>
                      {ch.type}
                    </span>
                  </div>
                </Link>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <Link href={`/catalogo/${ch.id}`}>
                      <h4 className="text-[15px] font-bold text-[#0a1133] leading-tight hover:text-[#193595] transition-colors">{ch.name}</h4>
                    </Link>
                    <span className="text-[11px] text-[#6a7196] font-medium flex-shrink-0">{ch.lang}</span>
                  </div>
                  <p className="text-[13px] text-[#6a7196] leading-relaxed mb-3 flex-1">{ch.desc}</p>
                  <button
                    onClick={() => cart.toggle(ch.id)}
                    className={`w-full py-2.5 rounded-[10px] text-[13.5px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer ${
                      inCart
                        ? 'bg-[#193595]/8 text-[#193595] border border-[#193595]/20 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                        : 'bg-[#f6f7fb] text-[#0a1133] border border-gray-200 hover:bg-[#193595] hover:text-white hover:border-[#193595]'
                    }`}
                  >
                    {inCart ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        En tu paquete
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Agregar a cotización
                      </>
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA bar */}
        <div className="mt-10 bg-[#0D1E6B] rounded-[18px] p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <strong className="text-white text-[16px] font-bold block mb-1">
              {CHANNELS.length} canales más en el catálogo completo
            </strong>
            <span className="text-white/62 text-[14px]">
              Filtros por categoría, tipo (IP / Satelital) e idioma.
            </span>
          </div>
          <a
            href="/catalogo"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#193595] text-[15px] font-bold rounded-[12px] hover:bg-gray-100 transition-colors cursor-pointer group"
          >
            Ver catálogo completo
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
