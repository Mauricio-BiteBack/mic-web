'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Channel } from '@/data/channels';

interface CotizarModalProps {
  channels: Channel[];
  onClose: () => void;
}

export default function CotizarModal({ channels, onClose }: CotizarModalProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/cotizacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: fd.get('nombre'),
        empresa: fd.get('empresa'),
        email: fd.get('email'),
        whatsapp: fd.get('whatsapp'),
        ciudad: fd.get('ciudad'),
        canales: channels.map(c => `${c.name} · ${c.type}`),
      }),
    });
    setLoading(false);
    if (res.ok) setSent(true);
    else setError(true);
  }

  const waMessage = channels.length > 0
    ? `Hola, quiero cotizar: ${channels.map(c => c.name).join(', ')}.`
    : 'Hola, me interesa conocer el catálogo de MIC.';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0a1133]/70 backdrop-blur-[8px] z-[100] grid place-items-center p-5"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          className="bg-white rounded-[22px] p-8 sm:p-10 max-w-[520px] w-full shadow-[0_24px_60px_rgba(13,30,107,0.18)] max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {sent ? (
            <div className="text-center py-8 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#E8078B]/10 grid place-items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8078B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="text-[24px] font-bold text-[#0a1133]">¡Solicitud enviada!</h3>
              <p className="text-[#6a7196] text-[15px] leading-relaxed">
                Te contactaremos en menos de 24 horas hábiles con una propuesta personalizada.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-3 bg-[#193595] text-white font-semibold rounded-[10px] hover:bg-[#0D1E6B] transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#E8078B]">
                  Cotización
                </span>
                <button onClick={onClose} className="text-[#6a7196] hover:text-[#0a1133] text-[24px] leading-none cursor-pointer">×</button>
              </div>

              <h3 className="text-[26px] font-bold tracking-tight text-[#0a1133] mb-2">
                Tu paquete de {channels.length} canal{channels.length !== 1 ? 'es' : ''}
              </h3>
              <p className="text-[#6a7196] text-[15px] mb-6 leading-relaxed">
                Completa tus datos y te enviamos una propuesta personalizada en menos de 24 horas.
              </p>

              {/* Selected channels */}
              {channels.length > 0 && (
                <div className="bg-[#f6f7fb] rounded-[12px] p-4 mb-6 flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">
                  {channels.map(c => (
                    <span
                      key={c.id}
                      className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[12.5px] font-medium text-[#0a1133] px-2.5 py-1 rounded-full"
                    >
                      {c.name}
                      <span className="text-[#6a7196] text-[11px]">· {c.type}</span>
                    </span>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  name="nombre"
                  required
                  placeholder="Nombre completo"
                  className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] font-[inherit] bg-white outline-none focus:border-[#193595] transition-colors w-full"
                />
                <input
                  name="empresa"
                  required
                  placeholder="Empresa / Operador"
                  className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] font-[inherit] bg-white outline-none focus:border-[#193595] transition-colors w-full"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="Email"
                    className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] font-[inherit] bg-white outline-none focus:border-[#193595] transition-colors w-full"
                  />
                  <input
                    name="whatsapp"
                    required
                    type="tel"
                    placeholder="WhatsApp"
                    className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] font-[inherit] bg-white outline-none focus:border-[#193595] transition-colors w-full"
                  />
                </div>
                <input
                  name="ciudad"
                  placeholder="Ciudad / País"
                  className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] font-[inherit] bg-white outline-none focus:border-[#193595] transition-colors w-full"
                />

                {error && (
                  <p className="text-[13px] text-red-500 text-center">Hubo un error al enviar. Intenta por WhatsApp.</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 py-4 bg-[#E8078B] text-white font-semibold text-[15px] rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.35)] hover:bg-[#ff1e9f] transition-all duration-200 cursor-pointer disabled:opacity-60"
                >
                  {loading ? 'Enviando…' : 'Enviar solicitud'}
                </button>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[12px] text-[#6a7196]">o</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <a
                  href={`https://wa.me/51991688980?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-[12px] text-[14px] font-semibold text-[#0a1133] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366">
                    <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-.9-2.3-.3-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
                  </svg>
                  Cotizar por WhatsApp
                </a>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
