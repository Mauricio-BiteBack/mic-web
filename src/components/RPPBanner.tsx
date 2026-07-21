'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const BANNERS = [
  { src: '/banner-vibra.png', alt: 'Banner MIC — Vibra' },
  { src: '/RPP-MIC.jpg',      alt: 'MIC — Distribuidor Oficial de RPP TV en Perú' },
  { src: '/banner-3.png',     alt: 'Banner MIC 3' },
  { src: '/banner-4.png',     alt: 'Banner MIC 4' },
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
    <section className="py-12 px-6 bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div className="relative overflow-hidden rounded-[20px] shadow-[0_12px_40px_rgba(13,30,107,0.12)]">

          {/* Slides */}
          <div
            className={`flex ${animate ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map((b, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={1240}
                  height={400}
                  className="w-full h-auto block"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Arrow left */}
          <button
            onClick={prev}
            aria-label="Banner anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center transition-all duration-150 backdrop-blur-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Arrow right */}
          <button
            onClick={next}
            aria-label="Siguiente banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center transition-all duration-150 backdrop-blur-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al banner ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeDot
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
