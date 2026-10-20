'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { EVENTS, photoSrc, thumbSrc, type MicEvent } from '@/data/eventos';

// Most recent first; the oldest events end up at the bottom.
const TIMELINE = [...EVENTS].reverse();
const THUMBS = 6;

type Open = { event: MicEvent; index: number };

function Lightbox({ open, onClose, onMove }: { open: Open; onClose: () => void; onMove: (d: number) => void }) {
  const { event, index } = open;
  const photo = event.photos[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onMove]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-[#050a24]/95 flex flex-col"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${event.name} ${event.year}`}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white" onClick={(e) => e.stopPropagation()}>
        <div>
          <strong className="text-[16px] font-bold">{event.name}</strong>
          <span className="ml-2 text-[#E8078B] font-semibold">{event.year}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-[13px] tabular-nums">
            {index + 1} / {event.photos.length}
          </span>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[22px] cursor-pointer"
          >
            ×
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-0 mx-4 sm:mx-16 mb-6">
        <Image
          key={photo.n}
          src={photoSrc(event.slug, photo.n)}
          alt={`${event.name} ${event.year} — foto ${index + 1}`}
          fill
          unoptimized
          className="object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {[-1, 1].map((d) => (
        <button
          key={d}
          onClick={(e) => {
            e.stopPropagation();
            onMove(d);
          }}
          aria-label={d < 0 ? 'Foto anterior' : 'Foto siguiente'}
          className={`absolute top-1/2 -translate-y-1/2 ${d < 0 ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-[24px] flex items-center justify-center cursor-pointer`}
        >
          {d < 0 ? '‹' : '›'}
        </button>
      ))}
    </motion.div>
  );
}

export default function EventsGallery() {
  const [open, setOpen] = useState<Open | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (d: number) =>
      setOpen((o) => (o ? { ...o, index: (o.index + d + o.event.photos.length) % o.event.photos.length } : o)),
    [],
  );

  return (
    <section className="py-20 px-6 bg-[#841F89]" style={{ background: 'linear-gradient(160deg, #841F89 0%, #5e1462 100%)' }}>
      <div className="max-w-[1240px] mx-auto">
        <div className="max-w-[640px] mb-12">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-white/80 mb-3">
            <span className="w-5 h-[2px] bg-white/80 rounded-full" />
            Eventos
          </span>
          <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.025em] text-white">
            Nuestra participación en eventos.
          </h2>
          <p className="text-[16px] text-white/75 leading-relaxed mt-3">
            Año tras año acompañamos a la industria en las ferias y encuentros más importantes del sector.
          </p>
        </div>

        <div className="space-y-12">
          {TIMELINE.map((event, i) => {
            const [cover, ...rest] = event.photos;
            const thumbs = rest.slice(0, THUMBS);
            const extra = event.photos.length - 1 - thumbs.length;
            return (
              <motion.article
                key={event.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4"
              >
                {/* Main photo */}
                <button
                  onClick={() => setOpen({ event, index: 0 })}
                  className={`group relative lg:col-span-7 aspect-[16/10] rounded-[20px] overflow-hidden bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] cursor-pointer text-left ${i % 2 ? 'lg:order-2' : ''}`}
                >
                  <Image
                    src={photoSrc(event.slug, cover.n)}
                    alt={`${event.name} ${event.year}`}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a24]/85 via-[#050a24]/20 to-transparent" />
                  <div className="absolute left-5 right-5 bottom-5 sm:left-7 sm:bottom-7 text-white">
                    <span className="inline-block bg-[#E8078B] text-white text-[13px] font-bold px-3 py-1 rounded-[8px] mb-3">
                      {event.year}
                    </span>
                    <h3 className="text-[clamp(22px,2.6vw,34px)] font-bold tracking-[-0.02em] leading-tight">{event.name}</h3>
                    <span className="text-white/70 text-[13px]">{event.photos.length} fotos · Ver galería</span>
                  </div>
                </button>

                {/* Thumbnails */}
                <div className="lg:col-span-5 grid grid-cols-3 gap-3 content-start">
                  {thumbs.map((p, j) => {
                    const last = j === thumbs.length - 1 && extra > 0;
                    return (
                      <button
                        key={p.n}
                        onClick={() => setOpen({ event, index: j + 1 })}
                        className="group relative aspect-square rounded-[12px] overflow-hidden bg-white/10 cursor-pointer"
                        aria-label={`${event.name} ${event.year} — foto ${j + 2}`}
                      >
                        <Image
                          src={thumbSrc(event.slug, p.n)}
                          alt=""
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {last && (
                          <span className="absolute inset-0 bg-[#3d0b40]/70 text-white text-[20px] font-bold flex items-center justify-center">
                            +{extra}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>{open && <Lightbox open={open} onClose={close} onMove={move} />}</AnimatePresence>
    </section>
  );
}
