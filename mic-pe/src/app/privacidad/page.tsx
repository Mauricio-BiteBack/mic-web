'use client';

import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const COOKIE_TYPES = [
  {
    name: 'Cookies técnicas',
    color: 'bg-[#193595]/8 text-[#193595]',
    desc: 'Imprescindibles para el funcionamiento básico del sitio. Permiten la navegación, el uso del carrito de canales y el acceso a las distintas secciones. No pueden desactivarse.',
  },
  {
    name: 'Cookies analíticas',
    color: 'bg-[#0aa84f]/8 text-[#0aa84f]',
    desc: 'Nos ayudan a comprender cómo los visitantes interactúan con el sitio mediante la recopilación de información anónima y agregada. Usamos esta información para mejorar la experiencia de navegación.',
  },
  {
    name: 'Cookies de preferencias',
    color: 'bg-[#f59e0b]/8 text-[#d97706]',
    desc: 'Permiten que el sitio recuerde información como tu idioma o región preferida, para ofrecerte una experiencia más personalizada en visitas futuras.',
  },
  {
    name: 'Cookies de marketing',
    color: 'bg-[#E8078B]/8 text-[#E8078B]',
    desc: 'Utilizadas para mostrarte contenido relevante sobre los servicios de MIC en otras plataformas. No compartimos información personal identificable con terceros con fines publicitarios sin tu consentimiento.',
  },
];

const SECTIONS = [
  {
    title: 'Responsable del tratamiento',
    body: `Manager International Channels S.A.C. (en adelante, "MIC"), con domicilio en Calle German Schreiber Nro. 210, Urb. Santa Ana, San Isidro, Lima, Perú, es el responsable del tratamiento de los datos personales recogidos a través del sitio web mic.pe.\n\nPuedes contactarnos en: info@mic.pe o al +51 991 688 980.`,
  },
  {
    title: 'Datos que recopilamos',
    body: `MIC recopila únicamente los datos que el Usuario facilita de forma voluntaria al completar formularios de contacto, solicitudes de cotización o el sistema de carrito de canales. Los datos pueden incluir nombre, nombre de la empresa, cargo, correo electrónico, teléfono y la información comercial relevante para atender tu consulta.\n\nNo recopilamos datos sensibles ni datos de menores de edad. No vendemos ni alquilamos tus datos a terceros.`,
  },
  {
    title: 'Finalidad del tratamiento',
    body: `Los datos personales recopilados son utilizados exclusivamente para:\n\n• Gestionar y responder consultas y solicitudes de cotización comercial.\n• Enviar información sobre los servicios, canales y novedades de MIC (con tu consentimiento).\n• Cumplir obligaciones legales o requerimientos de autoridades competentes.\n• Mejorar nuestros servicios y la experiencia en el sitio web.`,
  },
  {
    title: 'Base legal del tratamiento',
    body: `El tratamiento de tus datos se realiza conforme a la Ley N° 29733 – Ley de Protección de Datos Personales del Perú y su Reglamento. La base legal que legitima el tratamiento es:\n\n• Tu consentimiento explícito al completar un formulario o al aceptar las presentes políticas.\n• La ejecución de una relación precontractual o contractual.\n• El cumplimiento de obligaciones legales aplicables a MIC.`,
  },
  {
    title: 'Conservación de datos',
    body: `MIC conserva los datos personales durante el tiempo necesario para cumplir con las finalidades descritas o mientras exista una relación comercial activa. Una vez finalizada dicha relación, los datos se eliminarán o anonimizarán salvo que su conservación sea necesaria por obligaciones legales.`,
  },
  {
    title: 'Derechos del Usuario',
    body: `De conformidad con la Ley N° 29733, el Usuario puede ejercer en cualquier momento los siguientes derechos sobre sus datos personales:\n\n• Acceso: conocer qué datos tenemos sobre ti y cómo los usamos.\n• Rectificación: corregir datos inexactos o incompletos.\n• Cancelación: solicitar la eliminación de tus datos cuando ya no sean necesarios.\n• Oposición: oponerte al tratamiento de tus datos con fines de marketing.\n\nPuedes ejercer estos derechos enviando una solicitud a info@mic.pe, indicando tu nombre completo y la acción que deseas ejercer. Responderemos en un plazo máximo de 20 días hábiles.`,
  },
  {
    title: 'Seguridad de los datos',
    body: `MIC implementa medidas técnicas y organizativas adecuadas para proteger los datos personales frente a accesos no autorizados, pérdida, alteración o divulgación. Sin embargo, ninguna transmisión por internet es completamente segura, por lo que te recomendamos no enviar información sensible por canales no seguros.`,
  },
  {
    title: 'Cambios en esta política',
    body: `MIC puede actualizar esta Política de Privacidad y Cookies en cualquier momento. Los cambios serán publicados en esta misma página con la fecha de actualización. Te recomendamos revisarla periódicamente. El uso continuado del Sitio tras la publicación de cambios implica la aceptación de la política actualizada.`,
  },
];

export default function PrivacidadPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-[#0D1E6B] text-white py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(700px 500px at 20% 50%, rgba(232,7,139,0.10), transparent 70%)' }}
        />
        <div className="max-w-[1240px] mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#28d98a]" />
              Legal
            </div>
            <h1 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.08] tracking-[-0.025em] mb-4">
              Política de Privacidad y Cookies
            </h1>
            <p className="text-[16px] text-white/70 leading-relaxed">
              Aquí encontrarás cómo MIC gestiona y protege tus datos personales, y cómo utiliza las cookies en este sitio.
            </p>
            <p className="text-[13px] text-white/45 mt-4">Última actualización: mayo 2025</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[860px] mx-auto space-y-14">

          {/* Policy sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-10"
          >
            {SECTIONS.map((s, i) => (
              <div key={i} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#193595]/8 text-[#193595] text-[11px] font-bold grid place-items-center mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-[20px] font-bold text-[#0a1133]">{s.title}</h2>
                </div>
                <div className="pl-11 space-y-3">
                  {s.body.split('\n\n').map((para, j) => (
                    <p key={j} className="text-[15px] text-[#6a7196] leading-[1.8] whitespace-pre-line">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Cookie types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
                <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
                Uso de cookies
              </span>
              <h2 className="text-[24px] font-bold text-[#0a1133]">Tipos de cookies que utilizamos</h2>
              <p className="text-[15px] text-[#6a7196] mt-2 leading-relaxed">
                Una cookie es un pequeño archivo que se almacena en tu dispositivo al visitar un sitio web. Las cookies nos permiten mejorar tu experiencia de navegación y analizar el uso del Sitio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COOKIE_TYPES.map((c, i) => (
                <div key={i} className="bg-[#f6f7fb] rounded-[16px] border border-gray-200 p-5">
                  <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 ${c.color}`}>
                    {c.name}
                  </span>
                  <p className="text-[14px] text-[#6a7196] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-5 bg-[#f6f7fb] rounded-[16px] border border-gray-200">
              <h3 className="text-[15px] font-bold text-[#0a1133] mb-2">¿Cómo gestionar o desactivar las cookies?</h3>
              <p className="text-[14px] text-[#6a7196] leading-relaxed">
                Puedes configurar tu navegador para aceptar, rechazar o eliminar cookies en cualquier momento. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del Sitio. Los principales navegadores permiten gestionar las cookies desde sus ajustes de privacidad: Chrome, Firefox, Safari, Edge.
              </p>
            </div>
          </motion.div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-[#f6f7fb] rounded-[20px] border border-gray-200"
          >
            <p className="text-[13px] text-[#6a7196] leading-relaxed text-center">
              © {new Date().getFullYear()} Manager International Channels S.A.C. — Todos los derechos reservados.
              Consulta también nuestros{' '}
              <a href="/terminos" className="text-[#193595] font-semibold hover:text-[#E8078B] transition-colors">
                Términos y Condiciones
              </a>
              {' '}o ingresa al{' '}
              <a href="/libro-de-reclamaciones" className="text-[#193595] font-semibold hover:text-[#E8078B] transition-colors">
                Libro de Reclamaciones
              </a>.
            </p>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
