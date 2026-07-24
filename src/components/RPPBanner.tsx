'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const BANNERS = [
  { src: '/banner-vibra.png',        alt: 'Banner MIC — Vibra' },
  { src: '/RPP-MIC.jpg',             alt: 'MIC — Distribuidor Oficial de RPP TV en Perú' },
  { src: '/banner-fmh.png',          alt: 'Banner MIC — FMH Kids, Family y Movies' },
  { src: '/banner-4.png',            alt: 'Banner MIC 4' },
  { src: '/banner-documentales.png', alt: 'Banner MIC — Documentales' },
  { src: '/banner-premium.png',      alt: 'Banner MIC — Premium' },
];

// Clone of the first slide appended at the end so the auto-advance can keep
// moving forward past the last slide and land visually back on slide 1,
// instead of jumping backwards through the whole carousel.
const SLIDES = [...BANNERS, BANNERS[0]];

export default function RPPBanner() {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);

  const next = useCallback(() => setCurrent(c => c + 1), []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  // Once we've animated onto the cloned slide, snap back to the real first
  // slide without a transition, then re-enable the transition for next time.
  useEffect(() => {
    if (current === BANNERS.length) {
      const t = setTimeout(() => {
        setAnimate(false);
        setCurrent(0);
      }, 500);
      return () => clearTimeout(t);
    }
    if (!animate) {
      const raf = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [current, animate]);

  const prev = () => { setAnimate(true); setCurrent(c => (c - 1 + BANNERS.length) % BANNERS.length); };
  const goTo = (i: number) => { setAnimate(true); setCurrent(i); };
  const activeDot = current === BANNERS.length ? 0 : current;

  return (
    <section className="pt-[72px] bg-[#0a1133]">
      <div className="relative overflow-hidden">

        {/* Slides */}
        <div
          className={`flex ${animate ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {SLIDES.map((b, i) => (
            <div key={i} className="relative w-full flex-shrink-0 aspect-[2050/796]">
              <Image
                src={b.src}
                alt={b.alt}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Arrow left */}
        <button
          onClick={prev}
          aria-label="Banner anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center transition-all duration-150 backdrop-blur-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Arrow right */}
        <button
          onClick={next}
          aria-label="Siguiente banner"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center transition-all duration-150 backdrop-blur-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al banner ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeDot
                  ? 'w-7 h-2.5 bg-white'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
