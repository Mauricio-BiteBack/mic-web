'use client';

import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCotizar: () => void;
}

export default function CartDrawer({ open, onClose, onCotizar }: CartDrawerProps) {
  const cart = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const grouped = useMemo(() => {
    const m: Record<string, typeof cart.channels> = {};
    cart.channels.forEach(c => { (m[c.type] = m[c.type] || []).push(c); });
    return m;
  }, [cart.channels]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a1133]/60 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-50 flex flex-col shadow-[0_0_60px_rgba(13,30,107,0.2)]"
            aria-label="Mi paquete"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E8078B] block mb-0.5">
                  Mi paquete
                </span>
                <h3 className="text-[18px] font-bold text-[#0a1133]">
                  {cart.count} canal{cart.count !== 1 ? 'es' : ''} para cotizar
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 grid place-items-center text-[#6a7196] hover:bg-gray-200 hover:text-[#0a1133] transition-colors cursor-pointer text-[20px] leading-none"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.count === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 grid place-items-center text-[#6a7196]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4"/>
                      <circle cx="9" cy="20" r="1.5"/>
                      <circle cx="18" cy="20" r="1.5"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-[#0a1133] mb-2">Tu paquete está vacío</h4>
                    <p className="text-[14px] text-[#6a7196] leading-relaxed">
                      Agrega canales desde el configurador o el catálogo. Tu selección se guarda automáticamente.
                    </p>
                  </div>
                  <a
                    href="#configurador"
                    onClick={onClose}
                    className="px-5 py-2.5 bg-[#193595] text-white text-[14px] font-semibold rounded-[10px] hover:bg-[#0D1E6B] transition-colors cursor-pointer"
                  >
                    Ir al configurador
                  </a>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {Object.entries(grouped).map(([type, list]) => (
                    <div key={type}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          type === 'IP' ? 'bg-[#193595]/10 text-[#193595]' :
                          type === 'FAST' ? 'bg-[#E8078B]/10 text-[#E8078B]' :
                          'bg-[#0aa84f]/10 text-[#0aa84f]'
                        }`}>
                          {type}
                        </span>
                        <span className="text-[12.5px] text-[#6a7196]">{list.length} canal{list.length !== 1 ? 'es' : ''}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {list.map(ch => (
                          <div key={ch.id} className="flex items-center gap-3 p-3 bg-[#f6f7fb] rounded-[12px]">
                            <span
                              className="w-9 h-9 rounded-[8px] flex-shrink-0 grid place-items-center text-white text-[11px] font-bold"
                              style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.dark})` }}
                            >
                              {ch.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                            </span>
                            <div className="flex-1 min-w-0">
                              <strong className="text-[13.5px] font-semibold text-[#0a1133] block truncate">{ch.name}</strong>
                              <span className="text-[11.5px] text-[#6a7196]">{ch.category} · {ch.lang}</span>
                            </div>
                            <button
                              onClick={() => cart.remove(ch.id)}
                              className="w-7 h-7 rounded-full grid place-items-center text-[#6a7196] hover:bg-red-100 hover:text-red-500 transition-colors text-[16px] leading-none cursor-pointer"
                              aria-label={`Quitar ${ch.name}`}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={cart.clear}
                    className="text-[13px] text-[#6a7196] hover:text-red-500 transition-colors cursor-pointer self-start"
                  >
                    Vaciar paquete
                  </button>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            {cart.count > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#6a7196]">Tipos incluidos</span>
                  <strong className="text-[#0a1133]">{[...new Set(cart.channels.map(c => c.type))].join(' · ')}</strong>
                </div>
                <button
                  onClick={() => { onCotizar(); onClose(); }}
                  className="w-full py-3.5 bg-[#E8078B] text-white text-[15px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.35)] hover:bg-[#ff1e9f] transition-all duration-200 cursor-pointer"
                >
                  Solicitar cotización ({cart.count})
                </button>
                <p className="text-[12px] text-[#6a7196] text-center">
                  Recibirás una propuesta en menos de 24h hábiles.
                </p>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
