'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHANNELS, CATEGORIES } from '@/data/channels';
import { useCart } from './CartContext';

interface PackageConfiguratorProps {
  onCotizar: () => void;
}

export default function PackageConfigurator({ onCotizar }: PackageConfiguratorProps) {
  const cart = useCart();
  const [tab, setTab] = useState('all');

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    CATEGORIES.forEach(c => {
      m[c.id] = c.id === 'all' ? CHANNELS.length : CHANNELS.filter(ch => ch.category === c.id).length;
    });
    return m;
  }, []);

  const visible = useMemo(
    () => (tab === 'all' ? CHANNELS : CHANNELS.filter(c => c.category === tab)),
    [tab]
  );

  return (
    <section id="configurador" className="py-24 bg-[#f6f7fb]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-[720px] mb-14">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
            <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
            Configurador
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-4">
            Arma tu paquete. Cotiza en 30 segundos.
          </h2>
          <p className="text-[17px] text-[#6a7196] leading-relaxed">
            Selecciona los canales que quieres ofrecer en tu grilla. Tu selección se guarda en{' '}
            <strong className="text-[#0a1133]">Mi paquete</strong> — agrega más desde el catálogo y pide
            cotización cuando estés listo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Main panel */}
          <div className="bg-white rounded-[22px] border border-gray-200 overflow-hidden shadow-sm">
            {/* Category tabs */}
            <div className="flex gap-1.5 flex-wrap p-4 border-b border-gray-100">
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setTab(c.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                    tab === c.id
                      ? 'bg-[#193595] text-white shadow-sm'
                      : 'text-[#6a7196] hover:bg-gray-100 hover:text-[#0a1133]'
                  }`}
                >
                  {c.label}
                  <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                    tab === c.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-[#6a7196]'
                  }`}>
                    {counts[c.id]}
                  </span>
                </button>
              ))}
            </div>

            {/* Channel pills */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {visible.map(ch => {
                  const selected = cart.has(ch.id);
                  return (
                    <motion.button
                      key={ch.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => cart.toggle(ch.id)}
                      className={`flex items-center gap-3 p-3 rounded-[12px] text-left border transition-all duration-150 cursor-pointer ${
                        selected
                          ? 'bg-[#193595]/6 border-[#193595]/30 shadow-sm'
                          : 'bg-gray-50 border-gray-200 hover:border-[#193595]/30 hover:bg-[#193595]/3'
                      }`}
                    >
                      {/* Logo */}
                      <span
                        className="w-10 h-10 rounded-[8px] flex-shrink-0 grid place-items-center text-white text-[11px] font-bold"
                        style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.dark})` }}
                      >
                        {ch.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </span>
                      {/* Info */}
                      <span className="flex-1 min-w-0">
                        <span className="block text-[14px] font-semibold text-[#0a1133] leading-tight truncate">{ch.name}</span>
                        <span className="flex items-center gap-1 text-[11.5px] text-[#6a7196] mt-0.5">
                          <span>{ch.type}</span>
                          <span className="w-[3px] h-[3px] rounded-full bg-[#6a7196]" />
                          <span>{ch.category}</span>
                          <span className="w-[3px] h-[3px] rounded-full bg-[#6a7196]" />
                          <span>{ch.lang}</span>
                        </span>
                      </span>
                      {/* Check */}
                      <span className={`w-5 h-5 rounded-full flex-shrink-0 border-2 grid place-items-center transition-all duration-150 ${
                        selected ? 'bg-[#193595] border-[#193595]' : 'border-gray-300'
                      }`}>
                        {selected && (
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="bg-white rounded-[22px] border border-gray-200 p-6 shadow-sm flex flex-col gap-5 h-fit lg:sticky lg:top-[88px]">
            <h3 className="text-[17px] font-bold text-[#0a1133]">Tu paquete</h3>

            <div className="text-center py-3">
              <span className="text-[56px] font-extrabold leading-none text-[#193595] tracking-tight tabular-nums">
                {cart.count}
              </span>
              <span className="text-[20px] font-light text-[#6a7196]"> / {CHANNELS.length}</span>
              <p className="text-[13px] text-[#6a7196] mt-1">canales en tu cotización</p>
            </div>

            {/* Selected tags */}
            {cart.channels.length > 0 && (
              <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto">
                {cart.channels.map(ch => (
                  <span
                    key={ch.id}
                    className="inline-flex items-center gap-1.5 bg-[#f6f7fb] border border-gray-200 text-[12px] text-[#0a1133] font-medium px-2.5 py-1 rounded-full"
                  >
                    {ch.name}
                    <button
                      onClick={() => cart.remove(ch.id)}
                      className="text-[#6a7196] hover:text-[#E8078B] transition-colors leading-none cursor-pointer"
                      aria-label={`Quitar ${ch.name}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-gray-100 pt-4 text-[13px]">
              <span className="text-[#6a7196]">Tipos incluidos</span>
              <strong className="block text-[#0a1133] mt-0.5">
                {[...new Set(cart.channels.map(c => c.type))].join(' · ') || '—'}
              </strong>
            </div>

            <button
              onClick={onCotizar}
              disabled={cart.count === 0}
              className={`w-full py-3.5 rounded-[12px] text-[15px] font-semibold transition-all duration-200 cursor-pointer ${
                cart.count === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#E8078B] text-white shadow-[0_6px_18px_rgba(232,7,139,0.35)] hover:bg-[#ff1e9f] hover:shadow-[0_10px_26px_rgba(232,7,139,0.45)]'
              }`}
            >
              {cart.count === 0 ? 'Selecciona al menos 1 canal' : `Solicitar cotización (${cart.count})`}
            </button>

            <p className="text-[12px] text-[#6a7196] text-center leading-relaxed">
              Recibirás una propuesta personalizada en menos de 24 horas hábiles. Sin spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
