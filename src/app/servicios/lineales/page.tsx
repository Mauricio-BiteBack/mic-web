'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import PageShell from '@/components/PageShell';

const HERO_BENEFITS = [
  'Genera mayor posicionamiento para tu marca.',
  'Llega a nuevas audiencias.',
  'Aprovecha el contenido que ya tienes.',
  'Promociona tus plataformas digitales.',
  'Mantén presencia las 24 horas del día.',
];

const WHY_CHANNEL = [
  { icon: '💰', text: 'Crear nuevas oportunidades de monetización.' },
  { icon: '📈', text: 'Generar mayor posicionamiento para tu marca.' },
  { icon: '🌎', text: 'Llegar a nuevas audiencias.' },
  { icon: '📱', text: 'Llevar más personas hacia tus plataformas digitales.' },
  { icon: '🏢', text: 'Proyectar una imagen más profesional.' },
];

const CONTENT_TYPES = [
  'Programas grabados.',
  'Noticias e información especializada.',
  'Videos corporativos.',
  'Contenido educativo.',
  'Cursos y capacitaciones.',
  'Documentales.',
  'Videos publicados en distintas plataformas.',
];

const AUDIENCES = [
  { icon: '🎥', label: 'Productoras audiovisuales.' },
  { icon: '▶️', label: 'Creadores de contenido.' },
  { icon: '🏢', label: 'Empresas y marcas.' },
  { icon: '📰', label: 'Medios digitales.' },
  { icon: '🎓', label: 'Universidades e instituciones educativas.' },
  { icon: '🏛️', label: 'Organizaciones y proyectos especializados.' },
];

const HOW_STEPS = [
  { num: '1', text: 'Nos compartes tu contenido.' },
  { num: '2', text: 'Nosotros organizamos todo.' },
  { num: '3', text: 'Creamos tu canal.' },
  { num: '4', text: 'Lo ponemos al aire las 24 horas del día.' },
  { num: '5', text: 'Tu contenido comienza a llegar a más personas.' },
];

const WE_DO = [
  'Crear el canal.',
  'Organizar los contenidos.',
  'Diseñar la imagen del canal.',
  'Programar la transmisión automática.',
  'Mantener la señal funcionando las 24 horas.',
  'Brindar soporte especializado.',
];

const DIFF_BENEFITS = [
  { icon: '📈', text: 'Mayor posicionamiento.' },
  { icon: '🌎', text: 'Más alcance.' },
  { icon: '📱', text: 'Más visitas hacia tus plataformas digitales.' },
  { icon: '🏢', text: 'Mayor reconocimiento para tu marca.' },
  { icon: '💰', text: 'Más oportunidades de monetización.' },
];

const QR_ITEMS = [
  'Redes sociales.',
  'Página web.',
  'Productos y servicios.',
  'Información de contacto.',
  'Plataformas digitales.',
];

const SUCCESS_RESULTS = [
  'Mayor posicionamiento.',
  'Más audiencia.',
  'Mayor visibilidad.',
  'Más tráfico hacia plataformas digitales.',
  'Mayor reconocimiento de marca.',
  'Nuevas oportunidades de monetización.',
];

const TRUST_STATS = [
  { value: '+1,000', label: 'Operaciones en Latinoamérica' },
  { value: '+150', label: 'Cableoperadores en nuestra cartera' },
];

const CONTENT_TYPE_OPTIONS = [
  'Programas grabados',
  'Noticias e información especializada',
  'Videos corporativos',
  'Contenido educativo',
  'Cursos y capacitaciones',
  'Documentales',
  'Otro',
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65 },
};

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.09 },
});

export default function LinealesPage() {
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    pais: '',
    tipoContenido: '',
    horas: '',
    comentarios: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Nombre: ${form.nombre}%0AEmpresa: ${form.empresa}%0AEmail: ${form.email}%0ATéléfono: ${form.telefono}%0APaís: ${form.pais}%0ATipo de contenido: ${form.tipoContenido}%0AHoras de material: ${form.horas}%0AComentarios: ${form.comentarios}`;
    window.open(`https://wa.me/message/R5QI3ZBQMLUXP1?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <PageShell>

      {/* ── HERO ── */}
      <section className="relative text-white py-24 px-6 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banner-servicios.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: -20 }} />
        <div className="absolute inset-0 bg-[#0D1E6B]/80" style={{ zIndex: -10 }} />
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-medium mb-6">
              <span className="bg-[#E8078B] text-white text-[11px] font-bold px-2 py-[3px] rounded-full uppercase tracking-wider">Servicio 02</span>
              Canales 24/7
            </div>
            <h1 className="text-[clamp(28px,3.8vw,50px)] font-bold leading-[1.1] tracking-[-0.025em] mb-5">
              Convierte tus videos en un canal de TV o streaming disponible las 24 horas del día.
            </h1>
            <p className="text-[16px] text-white/80 leading-relaxed mb-6">
              Tu contenido ya tiene valor. En MIC lo transformamos en un canal profesional para ayudarte a llegar a más personas, fortalecer tu marca y crear nuevas oportunidades de monetización a través de tus propias plataformas digitales.<br /><br />
              <span className="font-semibold text-white">Nosotros nos encargamos de todo.</span>
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {HERO_BENEFITS.map((b, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[15px] text-white/90">
                  <span className="w-5 h-5 rounded-full bg-[#0aa84f] flex items-center justify-center flex-shrink-0">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#evaluacion"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#E8078B] text-white text-[15.5px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.45)] hover:bg-[#ff1e9f] transition-all duration-200 cursor-pointer group"
            >
              Quiero una evaluación gratuita
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Stats visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col gap-4"
            aria-hidden="true"
          >
            <div className="bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-[48px] font-bold text-[#E8078B] leading-none mb-1">24/7</div>
              <div className="text-white/80 text-[15px]">Tu canal transmitiendo sin parar</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {TRUST_STATS.map((s, i) => (
                <div key={i} className="bg-white/10 border border-white/15 rounded-2xl p-5 backdrop-blur-sm text-center">
                  <div className="text-[34px] font-bold text-white leading-none mb-1">{s.value}</div>
                  <div className="text-white/70 text-[13px] leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-[#E8078B]/20 border border-[#E8078B]/30 rounded-2xl p-5 backdrop-blur-sm">
              <div className="text-[15px] font-semibold text-white mb-1">Llave en mano</div>
              <div className="text-white/70 text-[13px]">Nos encargamos de todo el proceso, desde la organización del contenido hasta mantener el canal en el aire.</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── POR QUÉ TENER TU PROPIO CANAL ── */}
      <section className="py-20 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block bg-[#193595]/10 text-[#193595] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-4">💡 ¿Por qué tener tu propio canal?</span>
            <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-[#0a1133] tracking-tight mb-4">
              Miles de videos permanecen almacenados sin aprovechar todo su potencial.
            </h2>
            <p className="text-[17px] text-[#6a7196] max-w-[680px] mx-auto leading-relaxed">
              Con un canal disponible las 24 horas del día, tu contenido puede seguir llegando a más personas y ayudarte a fortalecer tu presencia.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CHANNEL.map((item, i) => (
              <motion.div key={i} {...stagger(i)} className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8eaf0] flex items-start gap-4">
                <span className="text-3xl leading-none flex-shrink-0">{item.icon}</span>
                <p className="text-[15px] text-[#374060] leading-snug font-medium pt-1">{item.text}</p>
              </motion.div>
            ))}
            <motion.div {...stagger(5)} className="bg-[#193595] rounded-2xl p-6 shadow-sm flex items-center justify-center sm:col-span-2 lg:col-span-1">
              <p className="text-white text-[16px] font-semibold text-center leading-snug">Tu canal puede ayudarte a crecer en todas estas áreas.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── YA TIENES EL CONTENIDO ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-block bg-[#0aa84f]/10 text-[#0aa84f] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-5">🎥 Si ya tienes contenido de valor</span>
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-[#0a1133] tracking-tight mb-4">
              Ya tienes gran parte del trabajo hecho.
            </h2>
            <p className="text-[17px] text-[#6a7196] leading-relaxed mb-6">
              No necesitas empezar desde cero. Podemos ayudarte a convertir tu contenido en un canal profesional disponible las 24 horas del día.
            </p>
            <p className="text-[15px] font-semibold text-[#0a1133] mb-4">Ideal para proyectos que cuentan con:</p>
            <ul className="flex flex-col gap-3">
              {CONTENT_TYPES.map((t, i) => (
                <li key={i} className="flex items-center gap-3 text-[15px] text-[#374060]">
                  <span className="w-5 h-5 rounded-full bg-[#0aa84f] flex items-center justify-center flex-shrink-0">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp} className="bg-gradient-to-br from-[#193595] to-[#0D1E6B] rounded-3xl p-8 text-white">
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="text-[22px] font-bold mb-3">¿Tienes horas de contenido grabado?</h3>
            <p className="text-white/75 text-[15px] leading-relaxed mb-6">
              Cada video que tienes archivado es una oportunidad. Te ayudamos a organizarlo, programarlo y ponerlo al aire para que siga generando valor para tu marca.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-[14px] text-white/80">
              Muchos de nuestros clientes empezaron con una biblioteca de contenidos existente y hoy cuentan con un canal profesional en funcionamiento.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PARA QUIÉN ES ── */}
      <section className="py-20 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block bg-[#E8078B]/10 text-[#E8078B] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-4">👥 ¿Para quién es esta solución?</span>
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-[#0a1133] tracking-tight mb-4">Ideal para:</h2>
            <p className="text-[17px] text-[#6a7196] max-w-[580px] mx-auto">
              Si ya tienes contenido de valor, nosotros podemos ayudarte a llevarlo más lejos.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {AUDIENCES.map((a, i) => (
              <motion.div key={i} {...stagger(i)} className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8eaf0] flex flex-col items-center text-center gap-3">
                <span className="text-4xl">{a.icon}</span>
                <p className="text-[14px] text-[#374060] font-medium leading-snug">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[860px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="inline-block bg-[#193595]/10 text-[#193595] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-4">⚙️ ¿Cómo funciona?</span>
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-[#0a1133] tracking-tight mb-3">Es más fácil de lo que imaginas.</h2>
          </motion.div>
          <div className="flex flex-col items-center gap-0">
            {HOW_STEPS.map((step, i) => (
              <motion.div key={i} {...stagger(i)} className="w-full flex flex-col items-center">
                <div className="w-full max-w-[560px] bg-gradient-to-r from-[#193595] to-[#1d45c2] rounded-2xl px-7 py-5 flex items-center gap-5 shadow-md">
                  <span className="w-10 h-10 rounded-full bg-white/20 text-white font-bold text-[17px] flex items-center justify-center flex-shrink-0">{step.num}</span>
                  <p className="text-white font-semibold text-[16px]">{step.text}</p>
                </div>
                {i < HOW_STEPS.length - 1 && (
                  <div className="py-2 flex justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#193595" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOSOTROS HACEMOS TODO ── */}
      <section className="py-20 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div {...fadeUp} className="bg-gradient-to-br from-[#E8078B] to-[#c4006e] rounded-3xl p-8 text-white order-last lg:order-first">
            <div className="text-5xl mb-5">🛠</div>
            <h3 className="text-[22px] font-bold mb-2">Nosotros hacemos todo por ti</h3>
            <p className="text-white/80 text-[15px] mb-6">Mientras tú te concentras en tu contenido, nosotros nos encargamos de:</p>
            <ul className="flex flex-col gap-3">
              {WE_DO.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[15px] text-white">
                  <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp}>
            <span className="inline-block bg-[#E8078B]/10 text-[#E8078B] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-5">🛠 Solución llave en mano</span>
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-[#0a1133] tracking-tight mb-4">
              Tú solo aportas el contenido. Nosotros hacemos el resto.
            </h2>
            <p className="text-[17px] text-[#6a7196] leading-relaxed mb-6">
              No necesitas conocimientos técnicos ni un equipo dedicado. MIC se encarga de todo el proceso para que tu canal esté en el aire funcionando de forma profesional.
            </p>
            <a
              href="#evaluacion"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#193595] text-white text-[15px] font-semibold rounded-[10px] hover:bg-[#1d45c2] transition-all duration-200 group"
            >
              Solicitar evaluación gratuita
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── QUÉ HACE DIFERENTE A MIC ── */}
      <section className="py-20 px-6 bg-[#0a1133] text-white">
        <div className="max-w-[1240px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="inline-block bg-white/10 text-white/80 text-[13px] font-semibold px-4 py-1.5 rounded-full mb-4">⭐ ¿Qué hace diferente a MIC?</span>
            <h2 className="text-[clamp(24px,3vw,40px)] font-bold tracking-tight mb-4">No solo creamos canales.</h2>
            <p className="text-[17px] text-white/70 max-w-[680px] mx-auto leading-relaxed">
              También contamos con una cartera de más de <strong className="text-white">150 cableoperadores en Latinoamérica</strong>. Esto nos permite ayudar a que los canales que desarrollamos tengan una mayor exposición y lleguen a nuevas audiencias.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {DIFF_BENEFITS.map((b, i) => (
              <motion.div key={i} {...stagger(i)} className="bg-white/7 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <span className="text-3xl leading-none flex-shrink-0">{b.icon}</span>
                <p className="text-[15px] text-white/85 font-medium pt-1">Más exposición significa: <span className="text-white font-semibold">{b.text}</span></p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="bg-white/7 border border-white/10 rounded-2xl p-7 text-center">
            <p className="text-[16px] text-white/75 leading-relaxed">
              Nuestra red de distribución te da acceso a un ecosistema de operadores, plataformas IPTV, OTT y canales FAST en toda la región.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── HERRAMIENTA DE PROMOCIÓN / QR ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-block bg-[#f5b015]/15 text-[#c48900] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-5">📲 Canal como herramienta de promoción</span>
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-[#0a1133] tracking-tight mb-4">
              Convierte tu canal en una herramienta de promoción.
            </h2>
            <p className="text-[17px] text-[#6a7196] leading-relaxed mb-6">
              Tu canal también puede ayudar a impulsar tus propias plataformas. Podemos incorporar un <strong className="text-[#0a1133]">código QR durante la transmisión</strong> para que las personas puedan acceder fácilmente a:
            </p>
            <ul className="flex flex-col gap-3 mb-6">
              {QR_ITEMS.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[15px] text-[#374060]">
                  <span className="w-5 h-5 rounded-full bg-[#f5b015] flex items-center justify-center flex-shrink-0">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[15px] text-[#6a7196] italic">Así, tu audiencia podrá seguir interactuando con tu marca y descubrir todo lo que tienes para ofrecer.</p>
          </motion.div>
          <motion.div {...fadeUp} className="bg-gradient-to-br from-[#f5b015] to-[#e0980a] rounded-3xl p-8 text-white flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="5" height="5" rx="1"/><rect x="16" y="3" width="5" height="5" rx="1"/><rect x="3" y="16" width="5" height="5" rx="1"/>
                <path d="M21 16h-3a2 2 0 0 0-2 2v3"/><line x1="21" y1="21" x2="21" y2="21"/><line x1="12" y1="3" x2="12" y2="6"/><path d="M12 11v2"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/>
              </svg>
            </div>
            <h3 className="text-[22px] font-bold mb-3">QR en vivo durante tu transmisión</h3>
            <p className="text-white/85 text-[15px] leading-relaxed">
              Cada persona que vea tu canal puede escanearlo y ser dirigida directamente a tus redes, página web o donde tú decidas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CASOS DE ÉXITO ── */}
      <section className="py-20 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block bg-[#193595]/10 text-[#193595] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-4">🏆 Casos de éxito</span>
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-[#0a1133] tracking-tight mb-4">
              Otros ya están aprovechando el valor de sus contenidos.
            </h2>
            <p className="text-[17px] text-[#6a7196] max-w-[660px] mx-auto leading-relaxed">
              Durante años hemos trabajado con medios, empresas y organizaciones de distintos países, ayudándolos a fortalecer su presencia y llegar a nuevas audiencias.
            </p>
          </motion.div>

          {/* Logos placeholder */}
          <motion.div {...fadeUp} className="bg-white rounded-2xl border border-[#e8eaf0] p-10 mb-8 flex items-center justify-center min-h-[160px]">
            <p className="text-[#9aa0b8] text-[15px] text-center italic">Logos e imágenes de proyectos autorizados</p>
          </motion.div>

          <motion.div {...fadeUp}>
            <p className="text-[16px] font-semibold text-[#0a1133] mb-5 text-center">Resultados obtenidos</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SUCCESS_RESULTS.map((r, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#e8eaf0] px-5 py-4 flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0aa84f] flex items-center justify-center flex-shrink-0">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="text-[14px] text-[#374060] font-medium">{r}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── POR QUÉ CONFIAR EN MIC ── */}
      <section className="py-16 px-6 bg-[#193595]">
        <div className="max-w-[1240px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-block bg-white/10 text-white/80 text-[13px] font-semibold px-4 py-1.5 rounded-full mb-4">🤝 ¿Por qué confiar en MIC?</span>
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-white tracking-tight">Respaldo, experiencia y acompañamiento.</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: '+1,000', label: 'Operaciones en Latinoamérica.' },
              { value: '+150', label: 'Cableoperadores en nuestra cartera.' },
              { value: '24/7', label: 'Soporte especializado durante todo el proceso.' },
              { value: '100%', label: 'Soluciones llave en mano.' },
            ].map((s, i) => (
              <motion.div key={i} {...stagger(i)} className="bg-white/10 border border-white/15 rounded-2xl p-6 text-center">
                <div className="text-[36px] font-bold text-white mb-1">{s.value}</div>
                <div className="text-white/70 text-[14px] leading-snug">{s.label}</div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="mt-6 bg-white/7 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-white/75 text-[15px]">Experiencia trabajando con medios, empresas y organizaciones de distintos países. Soporte especializado y acompañamiento durante todo el proceso.</p>
          </motion.div>
        </div>
      </section>

      {/* ── FORMULARIO ── */}
      <section id="evaluacion" className="py-20 px-6 bg-white">
        <div className="max-w-[760px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-block bg-[#E8078B]/10 text-[#E8078B] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-4">📩 Evaluación gratuita</span>
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-[#0a1133] tracking-tight mb-3">
              Solicita una evaluación gratuita.
            </h2>
            <p className="text-[17px] text-[#6a7196] leading-relaxed">
              Descubre cómo convertir tu contenido en un canal profesional disponible las 24 horas del día.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0aa84f]/8 border border-[#0aa84f]/25 rounded-2xl p-10 text-center"
            >
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-[22px] font-bold text-[#0a1133] mb-2">¡Gracias por contactarnos!</h3>
              <p className="text-[16px] text-[#6a7196]">Nos pondremos en contacto contigo muy pronto para coordinar tu evaluación gratuita.</p>
            </motion.div>
          ) : (
            <motion.form
              {...fadeUp}
              onSubmit={handleSubmit}
              className="bg-[#f6f7fb] rounded-2xl border border-[#e8eaf0] p-8 flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#374060]">Nombre <span className="text-[#E8078B]">*</span></label>
                  <input
                    type="text" name="nombre" required value={form.nombre} onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-3 rounded-xl border border-[#d8dbe8] bg-white text-[14.5px] text-[#0a1133] placeholder:text-[#b0b5cc] focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#374060]">Empresa u organización</label>
                  <input
                    type="text" name="empresa" value={form.empresa} onChange={handleChange}
                    placeholder="Nombre de tu empresa"
                    className="w-full px-4 py-3 rounded-xl border border-[#d8dbe8] bg-white text-[14.5px] text-[#0a1133] placeholder:text-[#b0b5cc] focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#374060]">Correo electrónico <span className="text-[#E8078B]">*</span></label>
                  <input
                    type="email" name="email" required value={form.email} onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#d8dbe8] bg-white text-[14.5px] text-[#0a1133] placeholder:text-[#b0b5cc] focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#374060]">Teléfono</label>
                  <input
                    type="tel" name="telefono" value={form.telefono} onChange={handleChange}
                    placeholder="+51 999 000 000"
                    className="w-full px-4 py-3 rounded-xl border border-[#d8dbe8] bg-white text-[14.5px] text-[#0a1133] placeholder:text-[#b0b5cc] focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#374060]">País</label>
                  <input
                    type="text" name="pais" value={form.pais} onChange={handleChange}
                    placeholder="País"
                    className="w-full px-4 py-3 rounded-xl border border-[#d8dbe8] bg-white text-[14.5px] text-[#0a1133] placeholder:text-[#b0b5cc] focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#374060]">Tipo de contenido</label>
                  <select
                    name="tipoContenido" value={form.tipoContenido} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#d8dbe8] bg-white text-[14.5px] text-[#0a1133] focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition"
                  >
                    <option value="">Selecciona una opción</option>
                    {CONTENT_TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[#374060]">Horas aproximadas de material disponible</label>
                <input
                  type="text" name="horas" value={form.horas} onChange={handleChange}
                  placeholder="Ej: 50 horas, 200 episodios…"
                  className="w-full px-4 py-3 rounded-xl border border-[#d8dbe8] bg-white text-[14.5px] text-[#0a1133] placeholder:text-[#b0b5cc] focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[#374060]">Comentarios</label>
                <textarea
                  name="comentarios" value={form.comentarios} onChange={handleChange}
                  placeholder="Cuéntanos más sobre tu proyecto…"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#d8dbe8] bg-white text-[14.5px] text-[#0a1133] placeholder:text-[#b0b5cc] focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#E8078B] text-white text-[16px] font-bold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] transition-all duration-200 group"
              >
                🚀 Quiero crear mi canal
              </button>
              <p className="text-center text-[12.5px] text-[#9aa0b8]">Al enviar este formulario serás redirigido a WhatsApp para completar tu solicitud.</p>
            </motion.form>
          )}
        </div>
      </section>

    </PageShell>
  );
}
