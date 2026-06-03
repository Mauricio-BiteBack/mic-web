'use client';

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PageShell from '@/components/PageShell';

const STATS = [
  { num: '26+', label: 'Años de experiencia' },
  { num: '90+', label: 'Canales disponibles' },
  { num: '700+', label: 'Clientes activos' },
  { num: '14', label: 'Países en LATAM' },
];

const VALUES = [
  {
    num: '01',
    title: 'Compromiso',
    desc: 'Cada cliente recibe nuestra total dedicación. El éxito de tu negocio es nuestro primer objetivo y la razón por la que trabajamos todos los días.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Transparencia',
    desc: 'Operamos con honestidad y claridad en cada proceso. Siempre sabes con quién trabajas, bajo qué condiciones y qué puedes esperar de nosotros.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Responsabilidad',
    desc: 'Cumplimos lo que prometemos, siempre. 26 años de trayectoria ininterrumpida respaldan nuestra palabra y nuestra capacidad de respuesta.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Entendimiento',
    desc: 'Conocemos el negocio de la televisión desde adentro. Hablamos tu idioma, entendemos tus desafíos y te ofrecemos soluciones concretas.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

const TEAM = [
  {
    name: 'Katya Sagastizabal',
    role: 'CEO & Fundadora',
    bio: 'Con más de 18 años representando señales internacionales: Televisión Española, Pasiones, Cine Latino, DHE y FMH. Líder en soluciones tecnológicas para cableoperadores e ISP de toda LATAM.',
    img: '/nosotros-Katya.png',
  },
  {
    name: 'Emily Rosell',
    role: 'Administradora',
    bio: 'Profesional en administración de empresas con sólidos conocimientos técnicos y valores éticos. Proactiva, organizada y con excelentes relaciones interpersonales.',
    img: '/nosotros-Emily.png',
  },
  {
    name: 'Nailuj López Izarra',
    role: 'Ejecutiva Comercial',
    bio: 'Amplia experiencia en telecomunicaciones, señales de TV, digitalización y plataformas IPTV y OTT. Propone soluciones concretas a los desafíos comerciales de cada cliente.',
    img: '/nosotros-Nailuj.png',
  },
  {
    name: 'Thalia Rodríguez',
    role: 'Ejecutiva Comercial',
    bio: 'Especialista en investigación de mercado y captación de clientes. Experta en digitalización, plataformas IPTV y OTT con enfoque en soluciones a medida para cada operador.',
    img: '/nosotros-Thalia.png',
  },
];

export default function NosotrosPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="text-white py-24 px-6 relative overflow-hidden">
        <Image
          src="/nosotros-banner.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{ zIndex: -20 }}
          priority
        />
        <div className="absolute inset-0 bg-[#0D1E6B]/72" style={{ zIndex: -10 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: -5, background: 'radial-gradient(800px 600px at 80% 50%, rgba(232,7,139,0.12), transparent 70%)' }}
        />
        <div className="max-w-[1240px] mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#28d98a]" />
              Lima · Miami · LATAM
            </div>
            <h1 className="text-[clamp(32px,4.5vw,58px)] font-bold leading-[1.06] tracking-[-0.025em] mb-5">
              26 años conectando contenido con audiencias en Latinoamérica.
            </h1>
            <p className="text-[18px] text-white/78 leading-relaxed">
              Somos una empresa peruana con presencia en Lima y Miami, especializada en la distribución de señales de TV e implementación de tecnología para cableoperadores.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="bg-white/8 border border-white/12 rounded-[16px] p-5 text-center"
              >
                <span className="block text-[36px] font-extrabold tracking-tight leading-none mb-2">{s.num}</span>
                <span className="text-white/60 text-[13px] leading-tight">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us — company story */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-[24px] overflow-hidden shadow-[0_24px_72px_rgba(13,30,107,0.18)] aspect-[4/3]">
                <Image
                  src="/Nosotros Banner.png"
                  alt="MIC — nuestro equipo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-5">
                <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
                Nuestra historia
              </span>
              <h2 className="text-[clamp(26px,3vw,38px)] font-bold tracking-[-0.025em] text-[#0a1133] mb-2 leading-tight">
                Manager International Channels
              </h2>
              <p className="text-[18px] text-[#E8078B] font-semibold mb-6">Un sueño hecho realidad.</p>
              <div className="space-y-4 text-[16px] text-[#6a7196] leading-[1.8]">
                <p>
                  Hace 26 años empezamos a comercializar y distribuir canales de televisión internacionales europeos para toda la Región Andina. Poco a poco fuimos entendiendo que nuestro mercado exigía contenidos más cercanos, y empezamos a distribuir DHE, Pasiones, Cine Latino, Inti y otros contenidos de altísima calidad.
                </p>
                <p>
                  Conscientes de lo constantes que son los cambios, fuimos los primeros en apostar por la tecnología IP. Hoy distribuimos contenidos lineales y on demand para las distintas plataformas, posicionándonos como la <strong className="text-[#0a1133]">única empresa peruana</strong> que distribuye, gestiona y realiza streaming de contenidos para los distintos actores del mercado de telecomunicaciones: operadores de cable e internet, ISP, WISP, canales de TV y servicios de streaming.
                </p>
                <p>
                  Llegamos a cualquier parte del Perú y América. Siempre un paso adelante, apoyando a nuestros clientes a transformarse y adaptarse — brindando no solo contenidos, sino soluciones.
                </p>
              </div>

              {/* CEO attribution */}
              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#E8078B]/20">
                  <Image
                    src="/nosotros-Katya.png"
                    alt="Katya Sagastizabal"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <strong className="block text-[15px] font-bold text-[#0a1133]">Katya Sagastizabal</strong>
                  <span className="text-[13px] text-[#E8078B] font-medium">CEO & Fundadora, MIC</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-[#f6f7fb]">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[600px] mb-12">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              Lo que nos define
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-[#0a1133]">
              Valores que guían cada decisión.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-[20px] border border-gray-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-[12px] bg-[#E8078B]/8 text-[#E8078B] grid place-items-center">
                    {v.icon}
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.12em] text-[#6a7196]/60 uppercase">{v.num}</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#0a1133] mb-2">{v.title}</h3>
                  <p className="text-[13.5px] text-[#6a7196] leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[600px] mb-12">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-3">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              Nuestro equipo
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-[#0a1133]">
              Las personas detrás de MIC.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-[20px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f6f7fb]">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Role badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-[#193595] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[7px]">
                      {member.role}
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="text-[16px] font-bold text-[#0a1133] mb-2">{member.name}</h3>
                  <p className="text-[13px] text-[#6a7196] leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#193595] text-white">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold tracking-tight mb-3">
              ¿Listo para hacer crecer tu grilla?
            </h2>
            <p className="text-white/70 text-[16px] leading-relaxed max-w-[480px]">
              Arma tu paquete de canales, pide cotización y recibe una propuesta personalizada en menos de 24 horas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a
              href="/#configurador"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#E8078B] text-white text-[15px] font-semibold rounded-[12px] shadow-[0_6px_18px_rgba(232,7,139,0.4)] hover:bg-[#ff1e9f] transition-all cursor-pointer"
            >
              Armar mi paquete
            </a>
            <a
              href="https://wa.me/51991688980?text=Hola%2C%20me%20interesa%20conocer%20el%20cat%C3%A1logo%20de%20MIC."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white text-[15px] font-semibold rounded-[12px] hover:bg-white/18 transition-all cursor-pointer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
