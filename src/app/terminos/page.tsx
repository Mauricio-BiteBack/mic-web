'use client';

import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const SECTIONS = [
  {
    title: 'Naturaleza del servicio',
    body: `Este sitio web (mic.pe) es propiedad de Manager International Channels S.A.C. (en adelante, "MIC"), empresa peruana con domicilio en Calle German Schreiber Nro. 210, Urb. Santa Ana, Lima, San Isidro, Lima, Perú. A través del Sitio, MIC pone a disposición información sobre sus servicios de distribución de canales de televisión y soluciones tecnológicas dirigidas a cableoperadores, ISP y operadores de plataformas IPTV y OTT en el territorio peruano y latinoamericano.`,
  },
  {
    title: 'Aceptación de condiciones',
    body: `Al ingresar y utilizar este Sitio, el Usuario declara haber leído, comprendido y aceptado íntegramente las presentes Condiciones de Uso. Si no está de acuerdo con alguna de estas condiciones, le pedimos abstenerse de utilizar el Sitio. MIC se reserva el derecho de modificar estas condiciones en cualquier momento, siendo las modificaciones válidas desde su publicación en el Sitio. Se recomienda revisar periódicamente esta sección.`,
  },
  {
    title: 'Usuarios habilitados',
    body: `Los servicios del Sitio están destinados a personas jurídicas o naturales con capacidad legal para contratar, que actúen en calidad de representantes o encargados de empresas operadoras de telecomunicaciones, cableoperadores o plataformas de streaming. MIC no presta servicios directamente al público consumidor final. Quienes accedan al Sitio en representación de una empresa declaran tener las facultades necesarias para obligar a dicha entidad.`,
  },
  {
    title: 'Uso del sitio y de los servicios',
    body: `El Usuario se compromete a utilizar el Sitio y sus servicios de forma lícita, de acuerdo con la legislación peruana vigente y conforme a las presentes Condiciones de Uso. Queda prohibido el uso del Sitio para fines ilícitos o contrarios a las buenas costumbres, así como cualquier acción que pudiera dañar, inutilizar o sobrecargar la infraestructura técnica del Sitio o interferir con el uso y disfrute del mismo por parte de terceros.`,
  },
  {
    title: 'Solicitudes de cotización y propuestas comerciales',
    body: `Las solicitudes de cotización realizadas a través del Sitio o mediante el sistema de carrito de canales no constituyen contratos vinculantes. Dichas solicitudes son una manifestación de interés, sujeta a revisión y aprobación por parte del equipo comercial de MIC. Todo contrato de distribución de señales se perfecciona mediante acuerdo escrito firmado por ambas partes. MIC se reserva el derecho de aceptar, rechazar o modificar cualquier propuesta comercial.`,
  },
  {
    title: 'Propiedad intelectual',
    body: `Todo el contenido del Sitio —incluyendo textos, imágenes, logotipos, marcas, diseños, videos y código fuente— es propiedad de MIC o de sus licenciantes y se encuentra protegido por la Ley sobre el Derecho de Autor (Decreto Legislativo N° 822) y demás normas de propiedad intelectual aplicables en el Perú. Queda expresamente prohibida la reproducción, distribución, modificación o uso con fines comerciales de cualquier contenido del Sitio sin autorización previa y por escrito de MIC.\n\nLos logotipos y nombres de los canales de televisión distribuidos por MIC pertenecen a sus respectivos titulares y son utilizados en el Sitio bajo los acuerdos de distribución correspondientes.`,
  },
  {
    title: 'Datos personales',
    body: `MIC trata los datos personales que los Usuarios facilitan a través del Sitio de conformidad con la Ley N° 29733 – Ley de Protección de Datos Personales y su Reglamento (Decreto Supremo N° 003-2013-JUS). Los datos recopilados se utilizan exclusivamente para la gestión de consultas comerciales, el envío de información sobre los servicios de MIC y el cumplimiento de obligaciones legales.\n\nEl Usuario tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales enviando una solicitud a info@mic.pe. MIC no cede ni comercializa datos personales a terceros sin el consentimiento previo del titular, salvo obligación legal.`,
  },
  {
    title: 'Referencias y enlaces a terceros',
    body: `El Sitio puede contener referencias o enlaces a sitios web de terceros, como canales de televisión, redes sociales o plataformas de contenido. MIC no es responsable del contenido, políticas de privacidad o prácticas de dichos sitios, y no garantiza la disponibilidad ni exactitud de su información. El acceso a sitios de terceros es bajo la entera responsabilidad del Usuario.`,
  },
  {
    title: 'Limitación de responsabilidad',
    body: `MIC no garantiza la disponibilidad continua e ininterrumpida del Sitio, ni la ausencia de errores en su contenido. MIC no será responsable por daños directos o indirectos derivados del uso o la imposibilidad de uso del Sitio, incluyendo pérdida de datos, daños patrimoniales o lucro cesante, salvo que tales daños sean consecuencia directa de una actuación dolosa o gravemente culposa de MIC.`,
  },
  {
    title: 'Ley aplicable y jurisdicción',
    body: `Las presentes Condiciones de Uso se rigen por la legislación vigente en la República del Perú. Cualquier controversia derivada de su interpretación o aplicación se someterá a los Juzgados y Tribunales competentes de la ciudad de Lima, renunciando expresamente las partes a cualquier otro fuero que pudiera corresponderles.`,
  },
  {
    title: 'Contacto',
    body: `Para cualquier consulta relacionada con estas Condiciones de Uso, el Usuario puede comunicarse con MIC a través de:\n\nCorreo electrónico: info@mic.pe\nTeléfono / WhatsApp: +51 991 688 980\nDirección: Calle German Schreiber Nro. 210, Urb. Santa Ana, San Isidro, Lima, Perú`,
  },
];

export default function TerminosPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-[#0D1E6B] text-white py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(700px 500px at 80% 50%, rgba(232,7,139,0.10), transparent 70%)' }}
        />
        <div className="max-w-[1240px] mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#28d98a]" />
              Legal
            </div>
            <h1 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.08] tracking-[-0.025em] mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-[16px] text-white/70 leading-relaxed">
              Al utilizar este sitio web aceptas las condiciones que rigen su uso y los servicios ofrecidos por MIC.
            </p>
            <p className="text-[13px] text-white/45 mt-4">Última actualización: mayo 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-[860px] mx-auto">
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
                    <p key={j} className="text-[15px] text-[#6a7196] leading-[1.8]">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 p-6 bg-[#f6f7fb] rounded-[20px] border border-gray-200"
          >
            <p className="text-[13px] text-[#6a7196] leading-relaxed text-center">
              © {new Date().getFullYear()} Manager International Channels S.A.C. — Todos los derechos reservados.
              Consulta también nuestra{' '}
              <a href="/privacidad" className="text-[#193595] font-semibold hover:text-[#E8078B] transition-colors">
                Política de Privacidad y Cookies
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
