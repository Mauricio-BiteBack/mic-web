'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';
import { useCart } from '@/components/CartContext';
import { CHANNELS, CATEGORIES, BRANDS, Channel } from '@/data/channels';

function ChannelCard({ ch }: { ch: Channel }) {
  const cart = useCart();
  const inCart = cart.has(ch.id);
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-[18px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div
        className="relative aspect-[16/9] flex flex-col justify-between p-3.5"
        style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.dark})` }}
      >
        {ch.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ch.imageUrl} alt={ch.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="relative z-10 flex justify-between items-start">
          <span className="bg-black/50 text-white text-[10px] font-semibold px-2 py-1 rounded-[6px] uppercase tracking-wider">
            {ch.category}
          </span>
          <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-[6px] uppercase tracking-wider">
            {ch.type}
          </span>
        </div>
        {!ch.imageUrl && (
          <span className="relative z-10 text-white font-bold text-[15px] tracking-tight leading-tight">{ch.name}</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h3 className="text-[15px] font-bold text-[#0a1133] leading-tight">{ch.name}</h3>
          <span className="text-[11px] text-[#6a7196] font-medium flex-shrink-0 mt-0.5">{ch.brand}</span>
        </div>
        <p className="text-[12.5px] text-[#6a7196] leading-relaxed mb-3">{ch.desc}</p>
        <button
          onClick={() => cart.toggle(ch.id)}
          className={`w-full py-2.5 rounded-[10px] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer ${
            inCart
              ? 'bg-[#193595]/8 text-[#193595] border border-[#193595]/20 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
              : 'bg-[#f6f7fb] text-[#0a1133] border border-gray-200 hover:bg-[#193595] hover:text-white hover:border-[#193595]'
          }`}
        >
          {inCart ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              En tu paquete
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Agregar a paquete
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}

export default function CanalesIPPage() {
  const [catFilter, setCatFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [search, setSearch] = useState('');
  const cart = useCart();

  const filtered = useMemo(() => {
    return CHANNELS.filter(ch => {
      if (catFilter !== 'all' && ch.category !== catFilter) return false;
      if (brandFilter !== 'all' && ch.brand !== brandFilter) return false;
      if (search && !ch.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [catFilter, brandFilter, search]);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative text-white py-20 px-6 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banner-servicios.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: -20 }} />
        <div className="absolute inset-0 bg-[#0D1E6B]/75" style={{ zIndex: -10 }} />
        <div className="max-w-[1240px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-medium mb-6">
            <span className="bg-[#E8078B] text-white text-[11px] font-bold px-2 py-[3px] rounded-full uppercase tracking-wider">Servicio 01</span>
            Distribución IP
          </div>
          <h1 className="text-[clamp(32px,4vw,54px)] font-bold leading-[1.08] tracking-[-0.025em] mb-5 max-w-[700px]">
            Canales IP listos para integrar en tu plataforma IPTV.
          </h1>
          <p className="text-[18px] text-white/78 leading-relaxed max-w-[580px] mb-8">
            MIC distribuye señales premium vía streaming directamente a tu headend. Sin obras físicas, sin demoras. Integración en horas, no semanas.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { num: '40+', label: 'Canales disponibles' },
              { num: 'HD', label: 'Calidad garantizada' },
              { num: '24/7', label: 'Uptime y soporte' },
              { num: '14', label: 'Países en LATAM' },
            ].map((m, i) => (
              <div key={i} className="text-center">
                <span className="block text-[28px] font-bold tracking-tight">{m.num}</span>
                <span className="text-[12px] text-white/60">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channel catalog */}
      <section className="py-16 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-[320px]">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6a7196]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar canal..."
                className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-gray-200 bg-white text-[14px] outline-none focus:border-[#193595] transition-colors"
              />
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => setCatFilter('all')} className={`px-3 py-1.5 rounded-[8px] text-[12.5px] font-medium transition-colors cursor-pointer ${catFilter === 'all' ? 'bg-[#193595] text-white' : 'bg-white border border-gray-200 text-[#6a7196] hover:border-[#193595] hover:text-[#193595]'}`}>Todos</button>
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <button key={c.id} onClick={() => setCatFilter(c.id)} className={`px-3 py-1.5 rounded-[8px] text-[12.5px] font-medium transition-colors cursor-pointer ${catFilter === c.id ? 'bg-[#193595] text-white' : 'bg-white border border-gray-200 text-[#6a7196] hover:border-[#193595] hover:text-[#193595]'}`}>{c.label}</button>
              ))}
            </div>
          </div>

          {/* Brand filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setBrandFilter('all')} className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${brandFilter === 'all' ? 'bg-[#E8078B] text-white' : 'bg-white border border-gray-200 text-[#6a7196] hover:border-[#E8078B] hover:text-[#E8078B]'}`}>Todas las marcas</button>
            {BRANDS.map(b => (
              <button key={b} onClick={() => setBrandFilter(b)} className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${brandFilter === b ? 'bg-[#E8078B] text-white' : 'bg-white border border-gray-200 text-[#6a7196] hover:border-[#E8078B] hover:text-[#E8078B]'}`}>{b}</button>
            ))}
          </div>

          <p className="text-[13px] text-[#6a7196] mb-5">{filtered.length} canal{filtered.length !== 1 ? 'es' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(ch => <ChannelCard key={ch.id} ch={ch} />)}
          </div>
        </div>
      </section>

      {/* Cart tray */}
      {cart.count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#193595] text-white py-4 px-6 shadow-[0_-8px_32px_rgba(13,30,107,0.18)]">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
            <div>
              <strong className="text-[15px] font-bold">{cart.count} canal{cart.count !== 1 ? 'es' : ''} seleccionado{cart.count !== 1 ? 's' : ''}</strong>
              <span className="text-white/70 text-[13px] ml-2">— listos para cotizar</span>
            </div>
            <a
              href="/cotizacion"
              className="flex-shrink-0 px-6 py-2.5 bg-[#E8078B] text-white font-semibold text-[14px] rounded-[10px] shadow-[0_4px_14px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] transition-colors cursor-pointer"
            >
              Solicitar cotización →
            </a>
          </div>
        </div>
      )}
    </PageShell>
  );
}
