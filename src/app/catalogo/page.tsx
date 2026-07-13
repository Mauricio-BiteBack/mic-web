'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PageShell from '@/components/PageShell';
import { useCart } from '@/components/CartContext';
import { useCotizar } from '@/components/CotizarContext';
import { CHANNELS, CATEGORIES, BRANDS, Channel } from '@/data/channels';
import { fuzzySearch } from '@/lib/search';

function ChannelCard({ ch }: { ch: Channel }) {
  const cart = useCart();
  const inCart = cart.has(ch.id);
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-[16px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      {/* Poster — aspect-square to match 308×308 format */}
      <Link href={`/catalogo/${ch.id}`} className="block relative aspect-square overflow-hidden">
        {ch.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ch.imageUrl}
            alt={ch.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-end p-3"
            style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.dark})` }}
          >
            <span className="text-white font-bold text-[16px] tracking-tight leading-tight">{ch.name}</span>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start z-10">
          <span className="bg-black/55 backdrop-blur-sm text-white text-[9px] font-semibold px-1.5 py-[3px] rounded-[5px] uppercase tracking-wider">
            {ch.category}
          </span>
          {ch.type !== 'FAST' && (
            <span className={`text-white text-[9px] font-bold px-1.5 py-[3px] rounded-[5px] uppercase tracking-wider ${
              ch.type === 'IP' ? 'bg-[#193595]/90' : 'bg-[#0aa84f]/90'
            }`}>
              {ch.type}
            </span>
          )}
        </div>
      </Link>

      {/* Card body */}
      <div className="p-3.5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-1 mb-1">
          <Link href={`/catalogo/${ch.id}`}>
            <h3 className="text-[13.5px] font-bold text-[#0a1133] leading-tight hover:text-[#193595] transition-colors">{ch.name}</h3>
          </Link>
          <span className="text-[10px] text-[#6a7196] font-medium flex-shrink-0 mt-0.5 bg-gray-100 px-1.5 py-[2px] rounded-[4px]">{ch.brand}</span>
        </div>
        <p className="text-[11.5px] text-[#6a7196] leading-relaxed mb-3 flex-1">{ch.desc}</p>
        <button
          onClick={() => cart.toggle(ch.id)}
          className={`w-full py-2 rounded-[8px] text-[12px] font-semibold flex items-center justify-center gap-1 transition-all duration-150 cursor-pointer ${
            inCart
              ? 'bg-[#193595]/8 text-[#193595] border border-[#193595]/20 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
              : 'bg-[#f6f7fb] text-[#0a1133] border border-gray-200 hover:bg-[#193595] hover:text-white hover:border-[#193595]'
          }`}
        >
          {inCart ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              En tu paquete
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Agregar a paquete
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}

function CatalogoContent() {
  const cart = useCart();
  const cotizar = useCotizar();
  const searchParams = useSearchParams();
  const [catFilter, setCatFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearch(q);
  }, [searchParams]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(true);
  const [distOpen, setDistOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  const filtered = useMemo(() => {
    return CHANNELS.filter(ch => {
      if (catFilter !== 'all' && ch.category !== catFilter) return false;
      if (brandFilter !== 'all' && ch.brand !== brandFilter) return false;
      if (typeFilter !== 'all' && ch.type !== typeFilter) return false;
      if (search && !fuzzySearch(`${ch.name} ${ch.category} ${ch.brand}`, search)) return false;
      return true;
    });
  }, [catFilter, brandFilter, typeFilter, search]);

  const activeFilterCount = [
    catFilter !== 'all',
    brandFilter !== 'all',
    typeFilter !== 'all',
    search !== '',
  ].filter(Boolean).length;

  const categoryCounts = useMemo(() => {
    const m: Record<string, number> = {};
    CHANNELS.forEach(ch => {
      m[ch.category] = (m[ch.category] || 0) + 1;
    });
    return m;
  }, []);

  const brandCounts = useMemo(() => {
    const m: Record<string, number> = {};
    CHANNELS.forEach(ch => {
      m[ch.brand] = (m[ch.brand] || 0) + 1;
    });
    return m;
  }, []);

  const typeCounts = useMemo(() => {
    const m: Record<string, number> = { IP: 0, Lineal: 0 };
    CHANNELS.forEach(ch => { m[ch.type] = (m[ch.type] || 0) + 1; });
    return m;
  }, []);

  const clearAll = () => { setCatFilter('all'); setBrandFilter('all'); setTypeFilter('all'); setSearch(''); };

  return (
    <PageShell>
      {/* Header */}
      <section className="relative text-white py-16 px-6 overflow-hidden">
        <Image
          src="/banner-catalogo.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{ zIndex: -20 }}
          priority
        />
        <div className="absolute inset-0 bg-[#841F89]/75" style={{ zIndex: -10 }} />
        <div className="max-w-[1240px] mx-auto relative">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-[12px] font-medium mb-5">
            Catálogo completo
          </span>
          <h1 className="text-[clamp(28px,3.5vw,48px)] font-bold leading-tight tracking-[-0.025em] mb-3">
            {CHANNELS.length} canales disponibles para tu grilla.
          </h1>
          <p className="text-white/70 text-[16px] leading-relaxed max-w-[560px]">
            Filtra por categoría, marca o tipo de distribución. Agrega los que quieras y solicita cotización en segundos.
          </p>
        </div>
      </section>

      {/* ── MOBILE FILTERS (hidden on md+) ─────────────────────────── */}
      <div className="md:hidden bg-white border-b border-gray-200 sticky top-[72px] z-20 shadow-sm">
        {/* Search + filter button row */}
        <div className="px-4 pt-3 pb-2 flex items-center gap-2">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6a7196]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar canal..."
              className="w-full pl-8 pr-4 py-2 rounded-[8px] border border-gray-200 text-[13px] outline-none focus:border-[#193595] bg-[#f6f7fb]"
            />
          </div>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-[12.5px] font-semibold border transition-all cursor-pointer flex-shrink-0 ${
              activeFilterCount > 0
                ? 'bg-[#193595] text-white border-[#193595]'
                : 'bg-white border-gray-200 text-[#0a1133]'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            Filtros{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </button>
        </div>

        {/* Quick category pills — sorted by count, top 4 */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Todos' },
            ...CATEGORIES.filter(c => c.id !== 'all')
              .filter(c => (categoryCounts[c.id] || 0) > 0)
              .sort((a, b) => (categoryCounts[b.id] || 0) - (categoryCounts[a.id] || 0))
              .slice(0, 4),
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setCatFilter(catFilter === c.id ? 'all' : c.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all cursor-pointer ${
                catFilter === c.id
                  ? 'bg-[#193595] text-white border-[#193595]'
                  : 'bg-white border-gray-200 text-[#6a7196]'
              }`}
            >
              {c.label}
              {c.id !== 'all' && <span className="ml-1 opacity-60 text-[11px]">({categoryCounts[c.id] || 0})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
              <h3 className="text-[16px] font-bold text-[#0a1133]">Filtros</h3>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button onClick={clearAll} className="text-[12px] font-semibold text-[#E8078B] cursor-pointer">
                    Limpiar todo
                  </button>
                )}
                <button onClick={() => setMobileFiltersOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 grid place-items-center cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>

            <div className="px-5 py-5 flex flex-col gap-6">
              {/* Distribución */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6a7196] mb-3">Distribución</p>
                <div className="flex flex-wrap gap-2">
                  {['all', 'IP', 'Lineal'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(t === typeFilter ? 'all' : t)}
                      className={`px-3.5 py-2 rounded-[8px] text-[13px] font-medium border cursor-pointer transition-all ${
                        typeFilter === t || (t === 'all' && typeFilter === 'all')
                          ? 'bg-[#0a1133] text-white border-[#0a1133]'
                          : 'bg-white border-gray-200 text-[#6a7196]'
                      }`}
                    >
                      {t === 'all' ? `Todos (${CHANNELS.length})` : `${t} (${typeCounts[t] || 0})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categoría */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6a7196] mb-3">Categoría</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCatFilter('all')}
                    className={`px-3.5 py-2 rounded-[8px] text-[13px] font-medium border cursor-pointer transition-all ${catFilter === 'all' ? 'bg-[#193595] text-white border-[#193595]' : 'bg-white border-gray-200 text-[#6a7196]'}`}
                  >
                    Todas
                  </button>
                  {CATEGORIES.filter(c => c.id !== 'all')
                    .filter(c => (categoryCounts[c.id] || 0) > 0)
                    .sort((a, b) => (categoryCounts[b.id] || 0) - (categoryCounts[a.id] || 0))
                    .map(c => (
                      <button
                        key={c.id}
                        onClick={() => setCatFilter(catFilter === c.id ? 'all' : c.id)}
                        className={`px-3.5 py-2 rounded-[8px] text-[13px] font-medium border cursor-pointer transition-all ${catFilter === c.id ? 'bg-[#193595] text-white border-[#193595]' : 'bg-white border-gray-200 text-[#6a7196]'}`}
                      >
                        {c.label} <span className="opacity-60 text-[12px]">({categoryCounts[c.id] || 0})</span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Marca */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6a7196] mb-3">Marca</p>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.filter(b => (brandCounts[b] || 0) > 0).map(b => (
                    <button
                      key={b}
                      onClick={() => setBrandFilter(brandFilter === b ? 'all' : b)}
                      className={`px-3.5 py-2 rounded-full text-[13px] font-semibold border cursor-pointer transition-all ${brandFilter === b ? 'bg-[#E8078B] text-white border-[#E8078B]' : 'bg-white border-gray-200 text-[#6a7196]'}`}
                    >
                      {b} <span className="opacity-60 text-[12px]">({brandCounts[b] || 0})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 pb-6">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3.5 bg-[#193595] text-white font-bold rounded-[12px] text-[15px] cursor-pointer"
              >
                Ver {filtered.length} canal{filtered.length !== 1 ? 'es' : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DESKTOP + MOBILE CONTENT AREA ──────────────────────────── */}
      <section className="py-8 px-4 md:px-6 bg-[#f6f7fb] min-h-[400px] pb-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex gap-6 items-start">

            {/* ── LEFT SIDEBAR (desktop only) ──────────────────────── */}
            <aside className="hidden md:flex flex-col w-[210px] flex-shrink-0 sticky top-[80px] max-h-[calc(100vh-96px)] overflow-y-auto bg-white rounded-[14px] border border-gray-200 shadow-sm">

              {/* Search */}
              <div className="p-3.5 border-b border-gray-100">
                <div className="relative">
                  <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6a7196]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar canal..."
                    className="w-full pl-7 pr-3 py-1.5 rounded-[8px] border border-gray-200 text-[12.5px] outline-none focus:border-[#193595] transition-colors bg-[#f6f7fb]"
                  />
                </div>
              </div>

              {/* Clear filters */}
              <AnimatePresence>
                {activeFilterCount > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden border-b border-gray-100"
                  >
                    <div className="px-3.5 py-2">
                      <button
                        onClick={clearAll}
                        className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#E8078B] hover:text-[#c4006a] transition-colors cursor-pointer"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        Limpiar filtros ({activeFilterCount})
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Categorías accordion ── */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setCatOpen(v => !v)}
                  className="w-full flex items-center justify-between px-3.5 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#0a1133]">Categorías</span>
                  <svg
                    className={`text-[#6a7196] transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`}
                    width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {catOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-2.5 pb-2.5 flex flex-col gap-0.5">
                        <button
                          onClick={() => setCatFilter('all')}
                          className={`w-full text-left px-2.5 py-1.5 rounded-[7px] text-[12px] font-medium transition-all duration-150 cursor-pointer flex items-center justify-between ${
                            catFilter === 'all'
                              ? 'bg-[#193595] text-white'
                              : 'text-[#374151] hover:bg-gray-100'
                          }`}
                        >
                          <span>Todas</span>
                          <span className={`text-[10.5px] ${catFilter === 'all' ? 'text-white/70' : 'text-[#9ca3af]'}`}>{CHANNELS.length}</span>
                        </button>
                        {CATEGORIES.filter(c => c.id !== 'all').map(c => {
                          const count = categoryCounts[c.id] || 0;
                          if (count === 0) return null;
                          return (
                            <button
                              key={c.id}
                              onClick={() => setCatFilter(catFilter === c.id ? 'all' : c.id)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-[7px] text-[12px] font-medium transition-all duration-150 cursor-pointer flex items-center justify-between ${
                                catFilter === c.id
                                  ? 'bg-[#193595] text-white'
                                  : 'text-[#374151] hover:bg-gray-100'
                              }`}
                            >
                              <span className="truncate pr-1">{c.label}</span>
                              <span className={`text-[10.5px] flex-shrink-0 ${catFilter === c.id ? 'text-white/70' : 'text-[#9ca3af]'}`}>{count}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Distribución accordion ── */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setDistOpen(v => !v)}
                  className="w-full flex items-center justify-between px-3.5 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#0a1133]">Distribución</span>
                  <svg
                    className={`text-[#6a7196] transition-transform duration-200 ${distOpen ? 'rotate-180' : ''}`}
                    width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {distOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-2.5 pb-2.5 flex flex-col gap-0.5">
                        {(['all', 'IP', 'Lineal'] as const).map(t => (
                          <button
                            key={t}
                            onClick={() => setTypeFilter(typeFilter === t ? (t === 'all' ? 'all' : 'all') : t)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-[7px] text-[12px] font-medium transition-all duration-150 cursor-pointer flex items-center justify-between ${
                              typeFilter === t || (t === 'all' && typeFilter === 'all')
                                ? t === 'IP'
                                  ? 'bg-[#193595] text-white'
                                  : t === 'Lineal'
                                  ? 'bg-[#0aa84f] text-white'
                                  : 'bg-[#0a1133] text-white'
                                : 'text-[#374151] hover:bg-gray-100'
                            }`}
                          >
                            <span>{t === 'all' ? 'Todos' : t}</span>
                            <span className={`text-[10.5px] ${typeFilter === t || (t === 'all' && typeFilter === 'all') ? 'text-white/70' : 'text-[#9ca3af]'}`}>
                              {t === 'all' ? CHANNELS.length : typeCounts[t] || 0}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Marca accordion ── */}
              <div>
                <button
                  onClick={() => setBrandOpen(v => !v)}
                  className="w-full flex items-center justify-between px-3.5 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#0a1133]">Marca</span>
                  <svg
                    className={`text-[#6a7196] transition-transform duration-200 ${brandOpen ? 'rotate-180' : ''}`}
                    width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {brandOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-2.5 pb-2.5 flex flex-col gap-0.5">
                        {BRANDS.map(b => {
                          const count = brandCounts[b] || 0;
                          if (count === 0) return null;
                          return (
                            <button
                              key={b}
                              onClick={() => setBrandFilter(brandFilter === b ? 'all' : b)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-[7px] text-[12px] font-medium transition-all duration-150 cursor-pointer flex items-center justify-between ${
                                brandFilter === b
                                  ? 'bg-[#E8078B] text-white'
                                  : 'text-[#374151] hover:bg-gray-100'
                              }`}
                            >
                              <span className="truncate pr-1">{b}</span>
                              <span className={`text-[10.5px] flex-shrink-0 ${brandFilter === b ? 'text-white/70' : 'text-[#9ca3af]'}`}>{count}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </aside>

            {/* ── MAIN CONTENT ─────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[13px] text-[#6a7196]">
                  <span className="font-semibold text-[#0a1133]">{filtered.length}</span>{' '}
                  canal{filtered.length !== 1 ? 'es' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20 text-[#6a7196]">
                  <svg className="mx-auto mb-4 opacity-40" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <p className="text-[16px] font-medium mb-3">No se encontraron canales con esos filtros.</p>
                  <button onClick={clearAll} className="text-[#E8078B] hover:underline cursor-pointer font-semibold text-[14px]">
                    Limpiar todos los filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map(ch => <ChannelCard key={ch.id} ch={ch} />)}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Persistent bottom tray */}
      {cart.count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#193595] text-white py-4 px-6 shadow-[0_-8px_32px_rgba(13,30,107,0.2)]">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#E8078B] grid place-items-center text-[13px] font-bold">{cart.count}</span>
              <div>
                <strong className="text-[14px] font-bold">canal{cart.count !== 1 ? 'es' : ''} seleccionado{cart.count !== 1 ? 's' : ''}</strong>
                <span className="text-white/60 text-[12px] ml-2 hidden sm:inline">
                  {[...new Set(cart.channels.map(c => c.type))].join(' · ')}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => cart.clear()}
                className="text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                Limpiar
              </button>
              <button
                onClick={cotizar.open}
                className="px-6 py-2.5 bg-[#E8078B] text-white font-semibold text-[14px] rounded-[10px] shadow-[0_4px_14px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] transition-colors cursor-pointer"
              >
                Solicitar cotización →
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense>
      <CatalogoContent />
    </Suspense>
  );
}
