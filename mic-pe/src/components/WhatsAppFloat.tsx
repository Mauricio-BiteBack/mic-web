'use client';

import { useState, useMemo } from 'react';
import { useCart } from './CartContext';

export default function WhatsAppFloat() {
  const cart = useCart();
  const [open, setOpen] = useState(true);

  const message = useMemo(() => {
    if (cart.channels.length > 0) {
      const names = cart.channels.map(c => c.name).join(', ');
      return `Hola, me interesa cotizar ${names} para mi operador.`;
    }
    return 'Hola, me interesa conocer el catálogo de MIC para mi operador.';
  }, [cart.channels]);

  const link = `https://wa.me/51991688980?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-[18px] shadow-[0_24px_60px_rgba(13,30,107,0.18)] border border-gray-100 p-4 w-[260px] relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2.5 right-3 text-[#6a7196] hover:text-[#0a1133] text-[20px] leading-none cursor-pointer"
            aria-label="Cerrar"
          >
            ×
          </button>
          <strong className="text-[14px] font-semibold text-[#0a1133] block mb-1">
            Conversemos por WhatsApp
          </strong>
          <span className="text-[12.5px] text-[#6a7196] leading-relaxed block mb-3">
            {cart.channels.length > 0
              ? `Mensaje pre-armado con tus ${cart.count} canal${cart.count > 1 ? 'es' : ''} seleccionado${cart.count > 1 ? 's' : ''}.`
              : 'Respondemos en menos de 30 min en horario laboral.'}
          </span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13.5px] font-semibold text-[#25d366] hover:text-[#128c7e] transition-colors cursor-pointer"
          >
            Abrir chat →
          </a>
        </div>
      )}

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25d366] text-white grid place-items-center shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:bg-[#128c7e] hover:shadow-[0_8px_28px_rgba(37,211,102,0.5)] transition-all duration-200 cursor-pointer"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-.9-2.3-.3-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
        </svg>
      </a>
    </div>
  );
}
