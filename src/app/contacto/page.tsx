'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/mic.tv.peru',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/mic.canales_/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/mictv/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCZY4SSx7K92gtaExLV4lADw',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@mictvperu2022',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
      </svg>
    ),
  },
];

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/cotizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origen: 'contacto',
        nombre: fd.get('nombre'),
        empresa: fd.get('empresa'),
        email: fd.get('email'),
        whatsapp: fd.get('whatsapp'),
        ciudad: fd.get('pais'),
        mensaje: fd.get('mensaje'),
      }),
    });
    setLoading(false);
    if (res.ok) setSent(true);
    else setError(true);
  }

  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-[#0D1E6B] text-white py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-[clamp(36px,5vw,64px)] font-bold leading-tight tracking-[-0.025em] mb-3">
              Hablemos.
            </h1>
            <p className="text-white/70 text-[18px] leading-relaxed max-w-[500px]">
              Estamos en Lima y Miami. Respondemos en menos de 24 horas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-[20px] font-bold text-[#0a1133] mb-1">Información de contacto</h2>
              <p className="text-[14.5px] text-[#6a7196] leading-relaxed">
                Escríbenos, llámanos o visita nuestras oficinas.
              </p>
            </div>

            {/* Phone */}
            <a
              href="tel:+51991688980"
              className="flex items-center gap-4 bg-white rounded-[14px] border border-gray-200 p-4 hover:border-[#193595] transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[#193595]/8 text-[#193595] grid place-items-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l1.95-1.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 15.28z"/>
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6a7196] block mb-0.5">Teléfono</span>
                <span className="text-[15px] font-semibold text-[#0a1133] group-hover:text-[#193595] transition-colors">+51 991 688 980</span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@mic.pe"
              className="flex items-center gap-4 bg-white rounded-[14px] border border-gray-200 p-4 hover:border-[#193595] transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[#193595]/8 text-[#193595] grid place-items-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6a7196] block mb-0.5">Email</span>
                <span className="text-[15px] font-semibold text-[#0a1133] group-hover:text-[#193595] transition-colors">info@mic.pe</span>
              </div>
            </a>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/51991688980?text=Hola%2C+me+interesa+conocer+el+cat%C3%A1logo+de+MIC."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25d366] text-white rounded-[14px] p-4 font-semibold text-[15px] hover:bg-[#20ba5a] transition-colors cursor-pointer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-.9-2.3-.3-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
              </svg>
              Escribirnos por WhatsApp
            </a>

            {/* Addresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { city: 'Lima, Perú', address: 'Calle German Shereiber Nro. 210 Urb. Santa Ana, San Isidro' },
                { city: 'Miami, FL · USA', address: 'FL 33130, Estados Unidos' },
              ].map(loc => (
                <div key={loc.city} className="bg-white rounded-[14px] border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#193595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span className="text-[11.5px] font-bold text-[#193595] uppercase tracking-wider">{loc.city}</span>
                  </div>
                  <p className="text-[13.5px] text-[#6a7196] leading-relaxed">{loc.address}</p>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#6a7196] mb-3">Redes sociales</p>
              <div className="flex gap-3">
                {SOCIALS.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-10 h-10 rounded-[10px] bg-white border border-gray-200 grid place-items-center text-[#6a7196] hover:bg-[#193595] hover:text-white hover:border-[#193595] transition-all duration-150 cursor-pointer"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-[22px] border border-gray-200 p-8 shadow-sm"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#E8078B]/10 grid place-items-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8078B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="text-[22px] font-bold text-[#0a1133]">¡Mensaje enviado!</h3>
                <p className="text-[#6a7196] text-[15px] leading-relaxed max-w-[320px]">
                  Te contactaremos pronto. Generalmente respondemos en menos de 24 horas hábiles.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-[#193595] font-medium text-[14px] hover:underline cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-[20px] font-bold text-[#0a1133] mb-1.5">Envíanos un mensaje</h2>
                <p className="text-[14px] text-[#6a7196] mb-7 leading-relaxed">
                  Cuéntanos sobre tu operador y te asesoramos sin compromiso.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="nombre" className="text-[12.5px] font-semibold text-[#0a1133]">Nombre completo</label>
                      <input id="nombre" required placeholder="Tu nombre" className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] outline-none focus:border-[#193595] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="empresa" className="text-[12.5px] font-semibold text-[#0a1133]">Empresa</label>
                      <input id="empresa" required placeholder="Nombre del operador" className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] outline-none focus:border-[#193595] transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[12.5px] font-semibold text-[#0a1133]">Email</label>
                    <input id="email" required type="email" placeholder="tu@empresa.com" className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] outline-none focus:border-[#193595] transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="whatsapp" className="text-[12.5px] font-semibold text-[#0a1133]">WhatsApp</label>
                      <input id="whatsapp" type="tel" placeholder="+51 999 999 999" className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] outline-none focus:border-[#193595] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="pais" className="text-[12.5px] font-semibold text-[#0a1133]">País</label>
                      <input id="pais" placeholder="Perú" className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] outline-none focus:border-[#193595] transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mensaje" className="text-[12.5px] font-semibold text-[#0a1133]">Mensaje</label>
                    <textarea
                      id="mensaje"
                      required
                      rows={4}
                      placeholder="Cuéntanos sobre tu operador, cuántos suscriptores tienes y qué tipo de canales te interesan..."
                      className="border border-gray-200 rounded-[10px] px-3.5 py-3 text-[14px] outline-none focus:border-[#193595] transition-colors resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-[13px] text-red-500 text-center">Hubo un error al enviar. Escríbenos directamente a info@mic.pe</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-1 py-4 bg-[#E8078B] text-white font-semibold text-[15px] rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.35)] hover:bg-[#ff1e9f] transition-all duration-200 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? 'Enviando…' : 'Enviar mensaje'}
                  </button>
                  <p className="text-[12px] text-[#6a7196] text-center">
                    Sin spam. Tu información es confidencial. Enviado a info@mic.pe
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
