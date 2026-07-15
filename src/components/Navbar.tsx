'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from './CartContext';
import { useCotizar } from './CotizarContext';
import { SERVICES } from '@/data/services';

interface NavbarProps {
  onOpenCart: () => void;
}

function ServiceIcon({ kind }: { kind: string }) {
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'Canales IP') return <svg {...p}><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/></svg>;
  if (kind === 'Lineal 24x7') return <svg {...p}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>;
  if (kind === 'FAST Channels') return <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
}

export default function Navbar({ onOpenCart }: NavbarProps) {
  const cart = useCart();
  const cotizar = useCotizar();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const prevCount = useRef(cart.count);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    router.push(q ? `/catalogo?q=${encodeURIComponent(q)}` : '/catalogo');
    setSearchQuery('');
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (cart.count > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 500);
      prevCount.current = cart.count;
      return () => clearTimeout(t);
    }
    prevCount.current = cart.count;
  }, [cart.count]);

  const isDark = !scrolled;

  const handleMegaEnter = () => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-[#0D1E6B]/70 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 flex items-center gap-8 h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" aria-label="MIC — inicio">
          <Image
            src="/logo_3D.png"
            alt="MIC"
            width={96}
            height={38}
            className="w-[96px] h-auto object-contain py-1"
            priority
          />
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex gap-7 flex-1 items-center" aria-label="Navegación principal">
          {/* Servicios with megamenu */}
          <div
            className="relative"
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            ref={megaRef}
          >
            <button
              className={`flex items-center gap-1 text-[14.5px] font-medium transition-colors hover:opacity-100 cursor-pointer ${
                isDark ? 'text-white/85 hover:text-white' : 'text-[#2b3567] hover:text-[#193595]'
              }`}
            >
              Servicios
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {/* Megamenu dropdown */}
            {megaOpen && (
              <div
                className="absolute top-[calc(100%+12px)] left-0 w-[300px] bg-white rounded-[20px] shadow-[0_20px_60px_rgba(13,30,107,0.18)] border border-gray-100 p-5 z-50"
                onMouseEnter={handleMegaEnter}
                onMouseLeave={handleMegaLeave}
              >
                {/* Arrow apuntando al botón Servicios */}
                <div className="absolute -top-[7px] left-6 w-3.5 h-3.5 bg-white border-l border-t border-gray-100 rotate-45" />

                <div className="flex flex-col gap-2">
                  {SERVICES.map(s => (
                    <a
                      key={s.num}
                      href={s.href}
                      className="group flex gap-3 p-3.5 rounded-[14px] border bg-[#f6f7fb] border-gray-100 hover:bg-[#fff0f8] hover:border-[#E8078B]/25 hover:shadow-md transition-all duration-150"
                    >
                      <div className="w-9 h-9 rounded-[10px] grid place-items-center flex-shrink-0 bg-[#193595]/10 text-[#193595] group-hover:bg-[#E8078B] group-hover:text-white transition-all duration-150">
                        <ServiceIcon kind={s.title} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6a7196] group-hover:text-[#E8078B] transition-colors duration-150">{s.verb}</span>
                        </div>
                        <strong className="block text-[14px] font-bold text-[#0a1133] leading-tight mb-1">{s.title}</strong>
                        <p className="text-[12px] text-[#6a7196] leading-relaxed line-clamp-2">{s.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[12px] text-[#6a7196]">Explora todos los servicios de MIC</span>
                  <a href="/#servicios" className="text-[12px] font-semibold text-[#193595] hover:text-[#E8078B] transition-colors flex items-center gap-1">
                    Ver todos <span>→</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {[
            { href: '/#configurador', label: 'Configurador' },
            { href: '/catalogo', label: 'Catálogo' },
            { href: '/nosotros', label: 'Nosotros' },
            { href: '/contacto', label: 'Contacto' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`text-[14.5px] font-medium transition-colors hover:opacity-100 ${
                isDark ? 'text-white/85 hover:text-white' : 'text-[#2b3567] hover:text-[#193595]'
              }`}
            >
              {label}
            </a>
          ))}

          {/* Search — desktop, empujado a la derecha dentro del nav */}
          <form onSubmit={handleSearch} className="ml-auto">
            <div className={`flex items-center rounded-[12px] border-2 px-4 py-2.5 gap-2.5 w-[240px] focus-within:w-[300px] transition-all duration-200 shadow-sm focus-within:shadow-md ${
              isDark
                ? 'bg-white/15 border-white/30 focus-within:border-[#E8078B] focus-within:bg-white/20'
                : 'bg-white border-[#193595]/25 focus-within:border-[#E8078B]'
            }`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`flex-shrink-0 ${isDark ? 'text-white/80' : 'text-[#193595]'}`}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar canal…"
                className={`bg-transparent text-[14px] font-medium w-full outline-none ${
                  isDark ? 'text-white placeholder-white/60' : 'text-[#0a1133] placeholder-[#6a7196]'
                }`}
              />
            </div>
          </form>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3.5 ml-auto">
          {/* Cart / Package button */}
          <button
            onClick={onOpenCart}
            aria-label="Mi paquete"
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-sm font-semibold transition-all duration-200 cursor-pointer ${
              bump ? 'scale-110' : ''
            } ${
              isDark
                ? 'bg-white/10 border border-white/20 text-white hover:bg-white/18'
                : 'bg-[#193595]/10 border border-[#193595]/20 text-[#193595] hover:bg-[#193595]/15'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4"/>
              <circle cx="9" cy="20" r="1.5"/>
              <circle cx="18" cy="20" r="1.5"/>
            </svg>
            <span className="hidden sm:inline">Mi paquete</span>
            {cart.count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#E8078B] text-white text-[10px] font-bold rounded-full grid place-items-center">
                {cart.count}
              </span>
            )}
          </button>

          {/* CTA */}
          <button
            onClick={cotizar.open}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#E8078B] text-white text-sm font-semibold rounded-[10px] shadow-[0_6px_18px_rgba(232,7,139,0.35)] hover:bg-[#ff1e9f] hover:shadow-[0_10px_26px_rgba(232,7,139,0.45)] transition-all duration-200 cursor-pointer"
          >
            Solicitar cotización
          </button>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 cursor-pointer ${isDark ? 'text-white' : 'text-[#193595]'}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-5 pt-3 flex flex-col gap-4 shadow-lg">
          {[
            { href: '/#servicios', label: 'Servicios' },
            { href: '/#configurador', label: 'Configurador' },
            { href: '/catalogo', label: 'Catálogo' },
            { href: '/nosotros', label: 'Nosotros' },
            { href: '/contacto', label: 'Contacto' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-[15px] font-medium text-[#2b3567] hover:text-[#193595] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <form onSubmit={handleSearch} className="flex items-center rounded-[10px] border border-gray-200 bg-gray-100 px-3 py-2 gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#6a7196]">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar canal…"
              className="bg-transparent text-[14px] text-[#0a1133] placeholder-[#9ca3af] outline-none flex-1"
            />
          </form>
          <button
            onClick={() => { cotizar.open(); setMenuOpen(false); }}
            className="mt-1 inline-flex justify-center px-4 py-3 bg-[#E8078B] text-white text-sm font-semibold rounded-[10px] shadow-[0_6px_18px_rgba(232,7,139,0.35)] cursor-pointer"
          >
            Solicitar cotización
          </button>
        </div>
      )}
    </header>
  );
}
