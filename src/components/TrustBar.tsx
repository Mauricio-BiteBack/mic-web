'use client';

const LOGOS = [
  { src: '/cable-peru.png', alt: 'Cable Perú' },
  { src: '/cable-sur.png', alt: 'Cable Sur' },
  { src: '/cable-vision.png', alt: 'Cable Visión' },
  { src: '/claro.png', alt: 'Claro' },
  { src: '/dkr-vision.png', alt: 'DKR Visión' },
  { src: '/home_clientes_02.png', alt: 'Cliente 6' },
  { src: '/home_clientes_03.png', alt: 'Cliente 7' },
  { src: '/latin-cable.png', alt: 'Latin Cable' },
  { src: '/cable-peru.png', alt: 'Cable Perú' },
  { src: '/cable-sur.png', alt: 'Cable Sur' },
  { src: '/cable-vision.png', alt: 'Cable Visión' },
  { src: '/claro.png', alt: 'Claro' },
  { src: '/dkr-vision.png', alt: 'DKR Visión' },
  { src: '/latin-cable.png', alt: 'Latin Cable' },
];

// Duplicate for seamless infinite loop
const TRACK = [...LOGOS, ...LOGOS];

export default function TrustBar() {
  return (
    <div className="border-b border-gray-200 py-10 bg-white overflow-hidden">
      {/* Carousel track */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center gap-12"
          style={{
            animation: 'carousel-scroll 28s linear infinite',
            width: 'max-content',
          }}
        >
          {TRACK.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '180px', height: '80px' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
