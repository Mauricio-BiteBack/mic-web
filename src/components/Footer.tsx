import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#050d3a] text-white pt-16 pb-8">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo blanco.png"
                alt="MIC"
                width={140}
                height={56}
                className="h-auto object-contain"
                style={{ width: '140px' }}
              />
            </div>
            <p className="text-white/55 text-[14px] leading-relaxed mb-5">
              Canales de TV y tecnología para el cableoperador. 14 años distribuyendo señales en Latinoamérica.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Facebook', href: 'https://www.facebook.com/mic.tv.peru', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                )},
                { label: 'Instagram', href: 'https://www.instagram.com/mic.canales_/', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                )},
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mictv/', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                )},
                { label: 'YouTube', href: 'https://www.youtube.com/channel/UCZY4SSx7K92gtaExLV4lADw', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                )},
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-[8px] bg-white/8 border border-white/10 grid place-items-center text-white/60 hover:bg-white/15 hover:text-white transition-all duration-150 cursor-pointer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h5 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/50 mb-4">Servicios</h5>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Canales IP', href: '/servicios/canales-ip' },
                { label: 'Lineal 24x7', href: '/servicios/lineales' },
                { label: 'FAST Channels', href: '/servicios/fast' },
                { label: 'AddFast', href: '/servicios/addfast' },
              ].map(s => (
                <li key={s.label}>
                  <a href={s.href} className="text-[14.5px] text-white/70 hover:text-white transition-colors cursor-pointer">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h5 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/50 mb-4">Empresa</h5>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Nosotros', href: '/nosotros' },
                { label: 'Catálogo', href: '/catalogo' },
                { label: 'Contacto', href: '/contacto' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14.5px] text-white/70 hover:text-white transition-colors cursor-pointer">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h5 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/50 mb-4">Contacto</h5>
            <ul className="flex flex-col gap-2.5 text-[14.5px] text-white/70">
              <li>
                <a href="tel:+51991688980" className="hover:text-white transition-colors cursor-pointer">+51 991 688 980</a>
              </li>
              <li>
                <a href="mailto:info@mic.pe" className="hover:text-white transition-colors cursor-pointer">info@mic.pe</a>
              </li>
              <li className="leading-snug">Calle German Schreiber Nro. 210<br/>Urb. Santa Ana, San Isidro<br/>Lima, Perú</li>
              <li className="leading-snug">Miami FL 33130<br/>Estados Unidos</li>
            </ul>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/40">
          <span>© 2026 MIC. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <a href="/terminos" className="hover:text-white/70 transition-colors cursor-pointer">Términos</a>
            <a href="/privacidad" className="hover:text-white/70 transition-colors cursor-pointer">Privacidad</a>
            <a href="/libro-de-reclamaciones" className="hover:text-white/70 transition-colors cursor-pointer">Libro de Reclamaciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
