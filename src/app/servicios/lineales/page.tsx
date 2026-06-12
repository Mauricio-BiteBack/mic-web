'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import PageShell from '@/components/PageShell';

const f = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.08 },
});

const CONTENT_TYPE_OPTIONS = [
  'Programas grabados',
  'Noticias e información especializada',
  'Videos corporativos',
  'Contenido educativo',
  'Cursos y capacitaciones',
  'Documentales',
  'Otro',
];

export default function LinealesPage() {
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', telefono: '', pais: '', tipoContenido: '', horas: '', comentarios: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Nombre: ${form.nombre}%0AEmpresa: ${form.empresa}%0AEmail: ${form.email}%0ATel: ${form.telefono}%0APaís: ${form.pais}%0AContenido: ${form.tipoContenido}%0AHoras: ${form.horas}%0AComentarios: ${form.comentarios}`;
    window.open(`https://wa.me/message/R5QI3ZBQMLUXP1?text=${msg}`, '_blank');
    setSent(true);
  };

  const input = 'w-full px-4 py-3 rounded-xl border border-[#d8dbe8] bg-white text-[14px] text-[#0a1133] placeholder:text-[#b0b5cc] focus:outline-none focus:ring-2 focus:ring-[#193595]/25 focus:border-[#193595] transition';

  return (
    <PageShell>

      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banner-servicios.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: -20 }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1E6B]/90 via-[#193595]/80 to-[#0D1E6B]/90" style={{ zIndex: -10 }} />

        <div className="max-w-[1240px] mx-auto px-6 py-20 lg:py-28">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-[13px] font-medium">
              <span className="bg-[#E8078B] text-white text-[10px] font-bold px-2 py-[3px] rounded-full uppercase tracking-widest">Servicio 02</span>
              Canales 24/7
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center text-[clamp(30px,5vw,62px)] font-bold leading-[1.08] tracking-[-0.03em] mb-5 max-w-[900px] mx-auto"
          >
            Convierte tus videos en un canal de TV disponible{' '}
            <span className="text-[#E8078B]">las 24 horas.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="text-center text-[17px] text-white/75 max-w-[580px] mx-auto mb-10 leading-relaxed"
          >
            Tu contenido ya tiene valor. Nosotros lo transformamos en un canal profesional. <strong className="text-white">Nosotros nos encargamos de todo.</strong>
          </motion.p>

          {/* Benefit chips */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-2.5 mb-10"
          >
            {['Mayor posicionamiento', 'Nuevas audiencias', 'Monetización', 'Impulsa tus plataformas', 'Presencia 24/7'].map((b, i) => (
              <span key={i} className="bg-white/12 border border-white/20 text-white/90 text-[13px] font-medium px-4 py-1.5 rounded-full">
                ✅ {b}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a href="#evaluacion" className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8078B] text-white text-[15.5px] font-bold rounded-[12px] shadow-[0_6px_22px_rgba(232,7,139,0.5)] hover:bg-[#ff1e9f] transition-all group">
              Quiero una evaluación gratuita
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href="https://wa.me/message/R5QI3ZBQMLUXP1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/25 text-white text-[15px] font-medium rounded-[12px] hover:bg-white/20 transition-all">
              Hablar con un asesor
            </a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="bg-white/8 border-t border-white/10 backdrop-blur-sm">
          <div className="max-w-[1240px] mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-white/15">
            {[['24/7', 'Canal siempre en vivo'], ['+150', 'Cableoperadores LATAM'], ['+1,000', 'Operaciones realizadas']].map(([v, l], i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.1 }} className="text-center px-4">
                <div className="text-[26px] font-bold text-white">{v}</div>
                <div className="text-white/60 text-[12px]">{l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASOS DE ÉXITO ── */}
      <section className="py-10 px-6 bg-[#0a1133]">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <p className="text-[13px] font-semibold text-white/40 uppercase tracking-widest whitespace-nowrap flex-shrink-0">🏆 Casos de éxito</p>
            <div className="flex-1 h-px bg-white/10 hidden sm:block" />
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-10">
              {[
                { src: '/logo-chikitoonz.png', alt: 'Chikitoonz', delay: 0.2, cls: 'h-[210px] w-[546px] object-contain' },
                { src: '/logo-fierro-a-fondo.png', alt: 'Fierro a Fondo', delay: 0.35, cls: 'h-[100px] w-[260px] object-contain' },
              ].map((logo) => (
                <motion.div
                  key={logo.alt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: logo.delay }}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt={logo.alt} className={logo.cls} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TODO LO QUE NECESITAS ── */}
      <section className="py-16 px-6 bg-[#f0f2f8]">
        <div className="max-w-[1240px] mx-auto">
          <motion.div {...f(0)} className="text-center mb-10">
            <h2 className="text-[clamp(22px,3vw,36px)] font-bold text-[#0a1133] tracking-tight">Todo lo que necesitas, en un solo lugar.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* 1 - Por qué */}
            <motion.div {...f(0)} className="bg-[#193595] text-white rounded-2xl p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl flex-shrink-0">💡</span>
                <span className="text-[14px] font-bold text-white uppercase tracking-wide">¿Por qué un canal propio?</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {[
                  'Nuevas oportunidades de monetización',
                  'Mayor posicionamiento de marca',
                  'Llega a nuevas audiencias',
                  'Impulsa tus plataformas digitales',
                  'Proyecta imagen más profesional',
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13.5px] text-white/85">
                    <span className="w-4 h-4 rounded-full bg-[#E8078B] flex items-center justify-center flex-shrink-0">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 2 - Para quién */}
            <motion.div {...f(1)} className="bg-[#E8078B] text-white rounded-2xl p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl flex-shrink-0">👥</span>
                <span className="text-[14px] font-bold text-white uppercase tracking-wide">¿Para quién?</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {[
                  'Productoras audiovisuales',
                  'Creadores de contenido',
                  'Empresas y marcas',
                  'Medios digitales',
                  'Universidades e instituciones',
                  'Organizaciones especializadas',
                ].map((a, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13.5px] text-white/90">
                    <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 3 - Tipos de contenido */}
            <motion.div {...f(2)} className="bg-[#0aa84f] text-white rounded-2xl p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl flex-shrink-0">🎥</span>
                <span className="text-[14px] font-bold text-white uppercase tracking-wide">Tipos de contenido</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {[
                  'Programas grabados',
                  'Noticias e información especializada',
                  'Videos corporativos',
                  'Contenido educativo',
                  'Cursos y capacitaciones',
                  'Documentales',
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13.5px] text-white/90">
                    <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 4 - Hacemos todo */}
            <motion.div {...f(3)} className="bg-[#0a1133] text-white rounded-2xl p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">🛠</span>
                <span className="text-[14px] font-bold text-white uppercase tracking-wide">Nosotros hacemos todo</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {[
                  'Crear el canal',
                  'Organizar los contenidos',
                  'Diseñar la imagen del canal',
                  'Programar transmisión automática',
                  'Mantener la señal 24/7',
                  'Soporte especializado',
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13.5px] text-white/80">
                    <span className="w-4 h-4 rounded-full bg-[#f5b015] flex items-center justify-center flex-shrink-0">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 5 - QR */}
            <motion.div {...f(4)} className="bg-[#f5b015] rounded-2xl p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center text-xl flex-shrink-0">📲</span>
                <span className="text-[14px] font-bold text-black/75 uppercase tracking-wide">QR en pantalla</span>
              </div>
              <p className="text-[14px] text-black/70 leading-relaxed">
                Incorporamos un código QR en vivo durante la transmisión para llevar a tu audiencia hacia tus redes, web o servicios.
              </p>
              <div className="flex justify-center mt-auto pt-2">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-xl bg-white p-2 shadow-sm">
                  {/* Top-left finder */}
                  <rect x="8" y="8" width="30" height="30" rx="3" fill="#1a1a1a"/>
                  <rect x="13" y="13" width="20" height="20" rx="2" fill="white"/>
                  <rect x="18" y="18" width="10" height="10" rx="1" fill="#1a1a1a"/>
                  {/* Top-right finder */}
                  <rect x="82" y="8" width="30" height="30" rx="3" fill="#1a1a1a"/>
                  <rect x="87" y="13" width="20" height="20" rx="2" fill="white"/>
                  <rect x="92" y="18" width="10" height="10" rx="1" fill="#1a1a1a"/>
                  {/* Bottom-left finder */}
                  <rect x="8" y="82" width="30" height="30" rx="3" fill="#1a1a1a"/>
                  <rect x="13" y="87" width="20" height="20" rx="2" fill="white"/>
                  <rect x="18" y="92" width="10" height="10" rx="1" fill="#1a1a1a"/>
                  {/* Data modules - row 1 */}
                  <rect x="46" y="8" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="57" y="8" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="68" y="8" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  {/* Data modules - row 2 */}
                  <rect x="46" y="19" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="68" y="19" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  {/* Data modules - row 3 */}
                  <rect x="57" y="30" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  {/* Data modules - middle rows */}
                  <rect x="8"  y="46" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="19" y="46" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="35" y="46" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="46" y="46" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="57" y="46" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="68" y="46" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="79" y="46" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="90" y="46" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="105" y="46" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="8"  y="57" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="35" y="57" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="57" y="57" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="79" y="57" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="105" y="57" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="19" y="68" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="46" y="68" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="68" y="68" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="90" y="68" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="105" y="68" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  {/* Bottom-right data */}
                  <rect x="46" y="82" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="57" y="82" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="79" y="82" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="105" y="82" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="46" y="93" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="68" y="93" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="90" y="93" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="57" y="104" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="79" y="104" width="7" height="7" rx="1" fill="#1a1a1a"/>
                  <rect x="105" y="104" width="7" height="7" rx="1" fill="#1a1a1a"/>
                </svg>
              </div>
            </motion.div>

            {/* 6 - Red MIC */}
            <motion.div {...f(5)} className="bg-white border border-[#d8dbe8] rounded-2xl p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#193595]/10 flex items-center justify-center text-xl flex-shrink-0">⭐</span>
                <span className="text-[14px] font-bold text-[#0a1133] uppercase tracking-wide">Red MIC</span>
              </div>
              <p className="text-[14px] text-[#374060] leading-relaxed">
                Accede a nuestra red de <strong className="text-[#193595]">+150 cableoperadores</strong> en Latinoamérica. Tu canal llega a más personas desde el primer día.
              </p>
              <ul className="flex flex-col gap-2 mt-auto">
                {['Mayor posicionamiento', 'Más alcance regional', 'Nuevas audiencias', 'Más oportunidades de monetización'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] text-[#6a7196]">
                    <span className="w-4 h-4 rounded-full bg-[#193595] flex items-center justify-center flex-shrink-0">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="py-16 px-6 bg-white overflow-hidden">
        <div className="max-w-[1240px] mx-auto">
          <motion.div {...f(0)} className="text-center mb-10">
            <span className="inline-block bg-[#193595]/8 text-[#193595] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-3">⚙️ ¿Cómo funciona?</span>
            <h2 className="text-[clamp(22px,3vw,36px)] font-bold text-[#0a1133] tracking-tight">Es más fácil de lo que imaginas.</h2>
          </motion.div>

          {/* Steps horizontal */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { n: '1', label: 'Nos compartes tu contenido', color: 'bg-[#193595]' },
              { n: '2', label: 'Nosotros organizamos todo', color: 'bg-[#E8078B]' },
              { n: '3', label: 'Creamos tu canal', color: 'bg-[#0aa84f]' },
              { n: '4', label: 'Lo ponemos al aire 24/7', color: 'bg-[#f5b015]' },
              { n: '5', label: 'Tu contenido llega a más personas', color: 'bg-[#0a1133]' },
            ].map((s, i) => (
              <motion.div key={i} {...f(i)} className={`${s.color} rounded-2xl p-5 text-white flex flex-col gap-3`}>
                <span className="w-9 h-9 rounded-full bg-white/20 text-white font-bold text-[17px] flex items-center justify-center">{s.n}</span>
                <p className="text-[14px] font-semibold leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULARIO ── */}
      <section id="evaluacion" className="py-16 px-6 bg-gradient-to-br from-[#0D1E6B] via-[#193595] to-[#0D1E6B]">
        <div className="max-w-[900px] mx-auto">
          <motion.div {...f(0)} className="text-center mb-10">
            <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-[13px] font-semibold px-4 py-1.5 rounded-full mb-4">📩 Evaluación gratuita</span>
            <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-white tracking-tight mb-3">
              Solicita tu evaluación gratuita.
            </h2>
            <p className="text-[16px] text-white/65 max-w-[500px] mx-auto">
              Descubre cómo convertir tu contenido en un canal profesional disponible las 24 horas del día.
            </p>
          </motion.div>

          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 border border-white/20 rounded-2xl p-12 text-center text-white">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-[22px] font-bold mb-2">¡Mensaje enviado!</h3>
              <p className="text-white/70">Te contactaremos muy pronto para coordinar tu evaluación.</p>
            </motion.div>
          ) : (
            <motion.form {...f(1)} onSubmit={onSubmit} className="bg-white/5 border border-white/15 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-white/60 uppercase tracking-wide">Nombre *</label>
                  <input type="text" name="nombre" required value={form.nombre} onChange={onChange} placeholder="Tu nombre" className={input} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-white/60 uppercase tracking-wide">Empresa</label>
                  <input type="text" name="empresa" value={form.empresa} onChange={onChange} placeholder="Tu empresa u organización" className={input} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-white/60 uppercase tracking-wide">Correo electrónico *</label>
                  <input type="email" name="email" required value={form.email} onChange={onChange} placeholder="correo@ejemplo.com" className={input} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-white/60 uppercase tracking-wide">Teléfono</label>
                  <input type="tel" name="telefono" value={form.telefono} onChange={onChange} placeholder="+51 999 000 000" className={input} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-white/60 uppercase tracking-wide">País</label>
                  <input type="text" name="pais" value={form.pais} onChange={onChange} placeholder="País" className={input} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-white/60 uppercase tracking-wide">Tipo de contenido</label>
                  <select name="tipoContenido" value={form.tipoContenido} onChange={onChange} className={input}>
                    <option value="">Selecciona una opción</option>
                    {CONTENT_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-[12px] font-semibold text-white/60 uppercase tracking-wide">Horas aproximadas de material disponible</label>
                <input type="text" name="horas" value={form.horas} onChange={onChange} placeholder="Ej: 50 horas, 200 episodios…" className={input} />
              </div>
              <div className="flex flex-col gap-1.5 mb-6">
                <label className="text-[12px] font-semibold text-white/60 uppercase tracking-wide">Comentarios</label>
                <textarea name="comentarios" value={form.comentarios} onChange={onChange} rows={3} placeholder="Cuéntanos más sobre tu proyecto…" className={`${input} resize-none`} />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-[#E8078B] text-white text-[16px] font-bold rounded-[12px] shadow-[0_6px_22px_rgba(232,7,139,0.45)] hover:bg-[#ff1e9f] transition-all group">
                🚀 Quiero crear mi canal
              </button>
              <p className="text-center text-[12px] text-white/35 mt-3">Al enviar serás redirigido a WhatsApp para completar tu solicitud.</p>
            </motion.form>
          )}
        </div>
      </section>

    </PageShell>
  );
}
