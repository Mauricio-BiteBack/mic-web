'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: "William",
    message: "Ayer la instalé y hasta ahora todo muy bien",
    time: "12:27 p.m.",
  },
  {
    name: "Jeancarlos",
    message: "Vamos bien por el momento. No tengo ninguna queja. De igual manera cualquier inconveniente se los reporto vía el grupo que se maneja",
    time: "4:45 p.m.",
  },
  {
    name: "Coral",
    message: "Bastante bien. Aún no son las más vistas pero empiezan a ganar popularidad",
    time: "9:38 a.m.",
  },
  {
    name: "Cliente",
    message: "Bien, tienen excelente acogida por los clientes. Y han estado estables, que es lo más importante",
    time: "11:48 a.m.",
  },
  {
    name: "David Martin",
    message: "Con respecto a las señales muy buena calidad y estabilidad. El soporte técnico siempre dando solución a lo solicitado, atención inmediata",
    time: "8:13 a.m.",
  },
];

// One color per sender name, cycling through WhatsApp-style palette
const NAME_COLORS = [
  '#e53935', '#8e24aa', '#039be5', '#00897b', '#e65100',
  '#3949ab', '#d81b60', '#00acc1',
];

function nameColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash * 31;
  return NAME_COLORS[Math.abs(hash) % NAME_COLORS.length];
}

// Typing indicator — three bouncing dots
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-white rounded-[18px] rounded-tl-[4px] w-fit shadow-sm">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-2 h-2 rounded-full bg-[#90949c]"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

// WhatsApp wallpaper SVG pattern (subtle grid of small diamonds)
const WA_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23c8bfb0' stroke-width='0.6'/%3E%3C/svg%3E")`;

export default function WhatsAppTestimonials() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever new content appears
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [visibleCount, showTyping]);

  // Orchestrate: typing → message → repeat, then loop
  useEffect(() => {
    let cancelled = false;

    async function runCycle() {
      setVisibleCount(0);
      setShowTyping(false);

      for (let i = 0; i < testimonials.length; i++) {
        if (cancelled) return;

        // Show typing indicator
        setShowTyping(true);
        await delay(1300);
        if (cancelled) return;

        // Show message bubble
        setShowTyping(false);
        setVisibleCount(i + 1);
        await delay(800);
      }

      // Pause at the end, then restart
      await delay(3000);
      if (!cancelled) runCycle();
    }

    runCycle();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="py-16 px-4 bg-[#f0f4f8]">
      <div className="max-w-lg mx-auto">
        {/* Phone frame */}
        <div className="rounded-[24px] overflow-hidden shadow-2xl border border-[#00000018] max-w-sm mx-auto">

          {/* WhatsApp header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54]">
            {/* Group avatar */}
            <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Clientes MIC</p>
              <p className="text-[#b2dfdb] text-[11px]">
                {testimonials.length} participantes
              </p>
            </div>
            {/* Action icons */}
            <div className="ml-auto flex items-center gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.8">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01l-2.21 2.21z"/>
              </svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.8">
                <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
              </svg>
            </div>
          </div>

          {/* Chat area */}
          <div
            ref={containerRef}
            className="h-[380px] overflow-y-auto px-3 py-3 flex flex-col gap-1"
            style={{
              background: `${WA_PATTERN}, #E5DDD5`,
            }}
          >
            {/* Sent message (admin/MIC) — always visible */}
            <div className="flex flex-col items-end mb-1">
              <div className="relative bg-[#DCF8C6] rounded-[10px] rounded-tr-[3px] px-3 pt-1.5 pb-1.5 max-w-[82%] shadow-sm">
                {/* Bubble tail right */}
                <span
                  className="absolute -right-[6px] top-0 w-0 h-0"
                  style={{
                    borderTop: '8px solid #DCF8C6',
                    borderRight: '7px solid transparent',
                  }}
                />
                <p className="text-[13.5px] text-[#111b21] leading-snug pr-14">
                  Buenos días! Qué tal les fue con las señales?
                </p>
                <span className="absolute bottom-1.5 right-2 flex items-center gap-0.5 text-[10px] text-[#8696a0] whitespace-nowrap">
                  8:10 a.m.
                  {/* Double blue check */}
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                    <path d="M1 5.5L4.5 9L9 3" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 5.5L9.5 9L14 3" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            <AnimatePresence>
              {testimonials.slice(0, visibleCount).map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="flex flex-col items-start mb-1"
                >
                  <div className="relative bg-white rounded-[10px] rounded-tl-[3px] px-3 pt-1.5 pb-1.5 max-w-[82%] shadow-sm">
                    {/* Bubble tail */}
                    <span
                      className="absolute -left-[6px] top-0 w-0 h-0"
                      style={{
                        borderTop: '8px solid white',
                        borderLeft: '7px solid transparent',
                      }}
                    />
                    <p
                      className="text-[12px] font-semibold mb-0.5 leading-none"
                      style={{ color: nameColor(t.name) }}
                    >
                      {t.name}
                    </p>
                    <p className="text-[13.5px] text-[#111b21] leading-snug pr-10">
                      {t.message}
                    </p>
                    <span className="absolute bottom-1.5 right-2 text-[10px] text-[#8696a0] whitespace-nowrap">
                      {t.time}
                    </span>
                  </div>
                </motion.div>
              ))}

              {showTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-start mb-1"
                >
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>

          {/* Input bar (decorative) */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#f0f2f5]">
            <div className="flex-1 bg-white rounded-full px-4 py-2 text-[13px] text-[#8696a0]">
              Escribe un mensaje
            </div>
            <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
