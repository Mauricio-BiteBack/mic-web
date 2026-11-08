'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

// JSON-LD data for this page
const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Proveedor de canales para cableras en México',
  description:
    'MIC distribuye señales de TV e IP para operadores de cable e ISP en México.',
  url: 'https://www.mic.pe/mexico',
  inLanguage: 'es-MX',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.mic.pe/' },
    { '@type': 'ListItem', position: 2, name: 'México', item: 'https://www.mic.pe/mexico' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿MIC distribuye canales de televisión en México?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. MIC distribuye señales de TV para operadores de cable, ISP y plataformas IPTV en Latinoamérica, incluyendo México. [CONFIRMAR: cobertura actual y ciudades o regiones atendidas en México]',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipo de canales pueden contratar los operadores en México?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ofrecemos canales por categoría: entretenimiento general, cine, series, deportes, infantil, noticias, música y documentales. [CONFIRMAR: qué señales concretas están disponibles en territorio mexicano y si aplican restricciones de derechos]',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo llega la señal al operador?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las señales IP se entregan por internet, con un ancho de banda acordado entre MIC y el operador. No se requiere infraestructura satelital. El operador las inserta en su cabecera o plataforma IPTV.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuántos canales mínimos debo contratar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '[CONFIRMAR: si aplica un mínimo de canales o de volumen de suscriptores para operadores en México]',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué moneda se factura y cuál es el precio referencial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '[CONFIRMAR: moneda de facturación para México y si existe precio de referencia por canal o por suscriptor que MIC autorice publicar]',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se puede empezar con un contrato de prueba o período corto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '[CONFIRMAR: condiciones contractuales para México; si aplica la política de contratos flexibles que MIC ofrece en otros mercados]',
      },
    },
    {
      '@type': 'Question',
      name: '¿MIC se encarga de los derechos de transmisión en México?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '[CONFIRMAR: qué documentos de derechos recibe el operador y si MIC es el titular o sublicenciante para territorio mexicano]',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué soporte técnico recibe el operador?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MIC cuenta con NOC propio que monitorea la señal las 24 horas. Ante una interrupción, el equipo actúa de inmediato y mantiene al operador informado. [CONFIRMAR: horario de atención específico para México y si hay un contacto local]',
      },
    },
  ],
}

const CATEGORIES = [
  'Entretenimiento general',
  'Cine y series',
  'Deportes',
  'Infantil y familia',
  'Noticias e información',
  'Música',
  'Documentales',
  'Religión',
]

// WhatsApp number for Mexico inquiries
// [CONFIRMAR: número de WhatsApp dedicado para México]
const WA_NUMBER = '51991688980'
const WA_MESSAGE = encodeURIComponent(
  'Hola, soy operador de cable en México y quiero información sobre los canales disponibles.'
)
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

type FormState = {
  nombre: string
  empresa: string
  email: string
  whatsapp: string
  mensaje: string
  _hp: string
  _t: number
}

const EMPTY_FORM: FormState = {
  nombre: '',
  empresa: '',
  email: '',
  whatsapp: '',
  mensaje: '',
  _hp: '',
  _t: Date.now(),
}

export default function MexicoPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track('mexico_whatsapp_click')
    }
    window.open(WA_URL, '_blank', 'noopener,noreferrer')
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form._hp) return // honeypot
    setSending(true)
    setError(false)
    const mensajeFinal = `${form.mensaje.trim()}\n\nOrigen: mexico-seo`
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          empresa: form.empresa,
          email: form.email,
          whatsapp: form.whatsapp,
          pais: 'México',
          mensaje: mensajeFinal,
          _hp: form._hp,
          _t: form._t,
        }),
      })
      if (res.ok) {
        setSent(true)
        if (typeof window !== 'undefined' && window.umami) {
          window.umami.track('mexico_formulario_enviado')
        }
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  const inputCls =
    'w-full px-4 py-3 rounded-xl border border-[#d8dbe8] bg-white text-[14px] text-[#0a1133] placeholder:text-[#b0b5cc] focus:outline-none focus:ring-2 focus:ring-[#193595]/25 focus:border-[#193595] transition'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar onOpenCart={() => {}} />

      <main className="pt-[72px]">

        {/* ── HERO ── */}
        <section className="bg-[#0a1133] text-white py-20 px-6">
          <div className="max-w-[860px] mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-[12px] font-medium mb-6">
              Para operadores en México
            </span>
            <h1 className="text-[clamp(28px,4vw,52px)] font-bold leading-[1.08] tracking-[-0.025em] mb-5">
              Proveedor de canales para cableras en México
            </h1>
            <p className="text-[17px] text-white/75 leading-relaxed max-w-[600px] mb-8">
              Completa tu grilla rápido con señales IP de calidad, sin invertir en infraestructura satelital.
              MIC distribuye contenido de televisión para operadores de cable, ISP y plataformas IPTV en Latinoamérica.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-4 bg-[#25D366] text-white text-[15px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(37,211,102,0.35)] hover:bg-[#1ebe59] transition-all duration-200 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Consultar por WhatsApp
              </button>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 border border-white/25 text-white text-[15px] font-semibold rounded-[12px] hover:bg-white/18 transition-all duration-200"
              >
                Enviar consulta
              </a>
            </div>
          </div>
        </section>

        {/* ── EL PROBLEMA DEL OPERADOR ── */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[860px] mx-auto">
            <h2 className="text-[clamp(22px,3vw,34px)] font-bold text-[#0a1133] tracking-tight mb-5">
              Completar una grilla de canales no debería ser tan complicado
            </h2>
            <p className="text-[16px] text-[#374151] leading-relaxed mb-4">
              Muchos operadores en México pasan meses negociando con múltiples proveedores, resolviendo problemas de derechos por territorio y gestionando señales de calidad desigual.
              El resultado: una grilla incompleta, costos dispersos y tiempo perdido que no va a la operación.
            </p>
            <p className="text-[16px] text-[#374151] leading-relaxed">
              MIC consolida la distribución en un solo punto de contacto: señales IP listas para insertar, respaldo técnico 24 horas y documentación de derechos en orden.
              Así el operador se concentra en crecer su red, no en perseguir contenido.
            </p>
          </div>
        </section>

        {/* ── CÓMO TRABAJA MIC ── */}
        <section className="py-16 px-6 bg-[#f6f7fb]">
          <div className="max-w-[860px] mx-auto">
            <h2 className="text-[clamp(22px,3vw,34px)] font-bold text-[#0a1133] tracking-tight mb-10">
              Cómo funciona el proceso
            </h2>
            <ol className="space-y-8">
              {[
                {
                  n: '01',
                  title: 'Consulta sin compromiso',
                  body: 'El operador describe su grilla actual y lo que necesita. MIC revisa disponibilidad de señales para México y responde con una propuesta inicial.',
                },
                {
                  n: '02',
                  title: 'Propuesta y derechos',
                  body: 'Se define el paquete de canales, se confirman los derechos de transmisión para territorio mexicano y se establecen las condiciones de entrega.',
                },
                {
                  n: '03',
                  title: 'Integración técnica',
                  body: 'MIC entrega las señales IP al puerto o URL acordada. El equipo técnico acompaña la integración con la cabecera o plataforma del operador.',
                },
                {
                  n: '04',
                  title: 'Monitoreo continuo',
                  body: 'El NOC de MIC supervisa la señal las 24 horas. Cualquier incidencia se atiende de inmediato y se notifica al operador.',
                },
              ].map(step => (
                <li key={step.n} className="flex gap-5">
                  <span className="text-[28px] font-bold text-[#E8078B] tabular-nums w-10 flex-shrink-0 leading-none mt-1">{step.n}</span>
                  <div>
                    <p className="text-[16px] font-bold text-[#0a1133] mb-1">{step.title}</p>
                    <p className="text-[15px] text-[#374151] leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CATEGORÍAS DE CANALES ── */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[860px] mx-auto">
            <h2 className="text-[clamp(22px,3vw,34px)] font-bold text-[#0a1133] tracking-tight mb-3">
              Categorías de canales disponibles
            </h2>
            <p className="text-[15px] text-[#6a7196] mb-8">
              La disponibilidad de señales específicas en México está sujeta a derechos por territorio.{' '}
              <span className="text-[#E8078B] font-medium">[CONFIRMAR: qué canales o marcas están disponibles para México]</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {CATEGORIES.map(cat => (
                <div
                  key={cat}
                  className="flex items-center gap-2.5 bg-[#f6f7fb] border border-[#e6e8f2] rounded-[12px] px-4 py-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E8078B] flex-shrink-0" />
                  <span className="text-[14px] font-medium text-[#0a1133]">{cat}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[#6a7196] mt-5">
              Cada canal se entrega como señal IP lista para insertar en la cabecera o plataforma IPTV del operador.
              No se distribuyen canales satelitales en este mercado.{' '}
              <span className="text-[#E8078B] font-medium">[CONFIRMAR]</span>
            </p>
          </div>
        </section>

        {/* ── CONDICIONES ── */}
        <section className="py-16 px-6 bg-[#f6f7fb]">
          <div className="max-w-[860px] mx-auto">
            <h2 className="text-[clamp(22px,3vw,34px)] font-bold text-[#0a1133] tracking-tight mb-8">
              Condiciones de contratación
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Contrato flexible',
                  body: '[CONFIRMAR: si aplica en México la política de contrato sin ataduras ni volúmenes mínimos que MIC ofrece en Perú]',
                },
                {
                  title: 'Derechos de transmisión',
                  body: '[CONFIRMAR: qué documentos recibe el operador y quién es el titular o sublicenciante para México]',
                },
                {
                  title: 'Moneda y facturación',
                  body: '[CONFIRMAR: si se factura en USD, MXN u otra moneda; y si hay precio de referencia publicable]',
                },
                {
                  title: 'ISP y WISP',
                  body: '[CONFIRMAR: si las condiciones aplican también a proveedores de internet que quieran incluir TV en su oferta]',
                },
              ].map(item => (
                <div key={item.title} className="bg-white rounded-[16px] border border-[#e6e8f2] p-5">
                  <p className="text-[15px] font-bold text-[#0a1133] mb-2">{item.title}</p>
                  <p className="text-[14px] text-[#6a7196] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PREGUNTAS FRECUENTES ── */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[860px] mx-auto">
            <h2 className="text-[clamp(22px,3vw,34px)] font-bold text-[#0a1133] tracking-tight mb-8">
              Preguntas frecuentes
            </h2>
            <div className="space-y-6">
              {faqJsonLd.mainEntity.map((item, i) => (
                <div key={i} className="border-b border-[#e6e8f2] pb-6 last:border-0">
                  <p className="text-[15px] font-bold text-[#0a1133] mb-2">{item.name}</p>
                  <p className="text-[14px] text-[#374151] leading-relaxed">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMULARIO DE CONTACTO ── */}
        <section id="contacto" className="py-16 px-6 bg-[#0a1133] text-white">
          <div className="max-w-[600px] mx-auto">
            <h2 className="text-[clamp(22px,3vw,34px)] font-bold tracking-tight mb-3">
              ¿Eres operador de cable o ISP en México?
            </h2>
            <p className="text-white/70 text-[15px] mb-8 leading-relaxed">
              Cuéntanos sobre tu operación y te responderemos a la brevedad.
              {' '}
              <span className="text-[#E8078B] font-medium">[CONFIRMAR: horario de atención para México]</span>
            </p>

            {sent ? (
              <div className="bg-white/10 border border-white/20 rounded-[16px] px-6 py-8 text-center">
                <svg className="mx-auto mb-4 text-[#25D366]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <p className="text-[17px] font-bold mb-2">¡Mensaje recibido!</p>
                <p className="text-white/70 text-[14px]">Nuestro equipo te responderá pronto.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="_hp"
                  value={form._hp}
                  onChange={onChange}
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mx-nombre" className="block text-[13px] font-medium text-white/70 mb-1.5">
                      Nombre *
                    </label>
                    <input
                      id="mx-nombre"
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={onChange}
                      required
                      placeholder="Tu nombre"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="mx-empresa" className="block text-[13px] font-medium text-white/70 mb-1.5">
                      Empresa / Operadora *
                    </label>
                    <input
                      id="mx-empresa"
                      type="text"
                      name="empresa"
                      value={form.empresa}
                      onChange={onChange}
                      required
                      placeholder="Nombre de tu cablera o ISP"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mx-email" className="block text-[13px] font-medium text-white/70 mb-1.5">
                      Correo electrónico *
                    </label>
                    <input
                      id="mx-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      placeholder="correo@tuempresa.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="mx-whatsapp" className="block text-[13px] font-medium text-white/70 mb-1.5">
                      WhatsApp
                    </label>
                    <input
                      id="mx-whatsapp"
                      type="tel"
                      name="whatsapp"
                      value={form.whatsapp}
                      onChange={onChange}
                      placeholder="+52 55 0000 0000"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mx-mensaje" className="block text-[13px] font-medium text-white/70 mb-1.5">
                    Cuéntanos sobre tu operación *
                  </label>
                  <textarea
                    id="mx-mensaje"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={onChange}
                    required
                    rows={4}
                    maxLength={900}
                    placeholder="¿Cuántos suscriptores tienes? ¿Qué tipo de canales buscas? ¿Ya cuentas con una plataforma IPTV?"
                    className={`${inputCls} resize-none`}
                  />
                  <p className="text-[11px] text-white/35 mt-1 text-right">{form.mensaje.length}/900</p>
                </div>

                {error && (
                  <p className="text-[13px] text-red-400">
                    Hubo un problema al enviar. Por favor intenta de nuevo o escríbenos por WhatsApp.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex-1 py-3.5 bg-[#E8078B] text-white font-semibold text-[15px] rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.35)] hover:bg-[#ff1e9f] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {sending ? 'Enviando...' : 'Enviar consulta'}
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25D366] text-white font-semibold text-[15px] rounded-[12px] hover:bg-[#1ebe59] transition-all duration-200 cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WhatsApp
                  </button>
                </div>
              </form>
            )}

            <p className="text-[12px] text-white/35 mt-5">
              Al enviar este formulario aceptas nuestra{' '}
              <Link href="/privacidad" className="underline hover:text-white/60 transition-colors">
                política de privacidad
              </Link>
              . No compartimos tus datos con terceros.
            </p>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}

// Extend Window to include umami tracking
declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void
    }
  }
}
