'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { useCart } from '@/components/CartContext';
import { CHANNELS } from '@/data/channels';
import { CHANNEL_DETAILS } from '@/data/channelDetails';

function RecommendedCard({ ch }: { ch: (typeof CHANNELS)[0] }) {
  return (
    <Link href={`/catalogo/${ch.id}`} className="group block">
      <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200">
        <div className="relative aspect-square overflow-hidden">
          {ch.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ch.imageUrl}
              alt={ch.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-end p-3"
              style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.dark})` }}
            >
              <span className="text-white font-bold text-[14px]">{ch.name}</span>
            </div>
          )}
          {ch.type !== 'FAST' && (
            <div className="absolute top-2 right-2">
              <span className={`text-white text-[9px] font-bold px-1.5 py-[3px] rounded-[5px] uppercase tracking-wider ${
                ch.type === 'IP' ? 'bg-[#193595]/90' : 'bg-[#0aa84f]/90'
              }`}>{ch.type}</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h4 className="text-[13px] font-bold text-[#0a1133] leading-tight mb-0.5">{ch.name}</h4>
          <p className="text-[11px] text-[#6a7196]">{ch.category}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ChannelPage() {
  const params = useParams();
  const id = params.id as string;
  const cart = useCart();

  const channel = CHANNELS.find(c => c.id === id);
  const detail = CHANNEL_DETAILS[id];

  if (!channel) {
    return (
      <PageShell>
        <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-[28px] font-bold text-[#0a1133] mb-3">Canal no encontrado</h1>
            <p className="text-[#6a7196] mb-6">Este canal no existe o aún no está disponible.</p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#193595] text-white font-semibold rounded-[12px] hover:bg-[#0d1e6b] transition-colors"
            >
              ← Volver al catálogo
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  const inCart = cart.has(channel.id);

  // Recommended: same category or same type, excluding current, max 5
  const recommended = CHANNELS.filter(
    c => c.id !== channel.id && (c.category === channel.category || c.type === channel.type)
  ).slice(0, 5);

  return (
    <PageShell>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-[1240px] mx-auto flex items-center gap-2 text-[13px] text-[#6a7196]">
          <Link href="/" className="hover:text-[#193595] transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-[#193595] transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-[#0a1133] font-medium">{channel.name}</span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 py-12">
        {/* Main content — 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-10 mb-16">

          {/* LEFT — Channel image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(13,30,107,0.15)] aspect-square">
              {channel.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={channel.imageUrl}
                  alt={channel.name}
                  className="w-full h-full object-contain bg-[#0a1133]"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${channel.color}, ${channel.dark})` }}
                >
                  <span className="text-white font-bold text-[40px] tracking-tight">{channel.name}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT — Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {channel.type !== 'FAST' && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white ${
                  channel.type === 'IP' ? 'bg-[#193595]' : 'bg-[#0aa84f]'
                }`}>
                  {channel.type}
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gray-100 text-[#6a7196]">
                {detail?.displayCategory ?? channel.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#f6f7fb] text-[#0a1133] border border-gray-200">
                {channel.brand}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-[clamp(28px,3.5vw,42px)] font-bold tracking-[-0.025em] text-[#0a1133] leading-tight mb-2">
                {channel.name}
              </h1>
              <p className="text-[16px] text-[#6a7196] leading-relaxed">{channel.desc}</p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => cart.toggle(channel.id)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-[12px] text-[15px] font-bold transition-all duration-200 cursor-pointer shadow-sm ${
                  inCart
                    ? 'bg-[#193595]/10 text-[#193595] border border-[#193595]/25 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                    : 'bg-[#E8078B] text-white shadow-[0_6px_18px_rgba(232,7,139,0.35)] hover:bg-[#ff1e9f]'
                }`}
              >
                {inCart ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Agregado a tu paquete
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Solicitar cotización
                  </>
                )}
              </button>
              <a
                href={`https://wa.me/51991688980?text=Hola%2C%20quiero%20información%20sobre%20el%20canal%20${encodeURIComponent(channel.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-[12px] text-[15px] font-semibold border border-gray-200 text-[#0a1133] hover:border-[#193595] hover:text-[#193595] transition-all duration-200 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Consultar por WhatsApp
              </a>
            </div>

            {/* Specs */}
            {detail?.specs && (
              <div className="bg-[#f6f7fb] rounded-[16px] border border-gray-200 p-5">
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#6a7196] mb-4">Especificaciones</h3>
                <div className="grid grid-cols-2 gap-3">
                  {detail.specs.map(spec => (
                    <div key={spec.label}>
                      <span className="block text-[11px] text-[#6a7196] mb-0.5">{spec.label}</span>
                      <span className="text-[13.5px] font-semibold text-[#0a1133]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Long description */}
        {detail?.longDesc && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <div className="max-w-[780px]">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-4">
                <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
                Sobre el canal
              </span>
              <div className="text-[16px] text-[#6a7196] leading-[1.8] space-y-4">
                {detail.longDesc.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Video(s) */}
        {detail?.videoUrls && detail.videoUrls.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-5">
              <span className="w-5 h-[2px] bg-[#E8078B] rounded-full" />
              {detail.videoUrls.length > 1 ? 'Videos de presentación' : 'Video de presentación'}
            </span>
            <div className="flex flex-col gap-8">
              {detail.videoUrls.map((url, i) => (
                <div key={i} className="rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(13,30,107,0.15)] aspect-video max-w-[800px]">
                  <iframe
                    src={url}
                    title={`${channel.name} — video de presentación ${detail.videoUrls!.length > 1 ? i + 1 : ''}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Recommended channels */}
        {recommended.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#E8078B] mb-1 block">
                  <span className="w-5 h-[2px] bg-[#E8078B] rounded-full inline-block" />
                  Canales recomendados
                </span>
                <h2 className="text-[22px] font-bold text-[#0a1133]">También podrían interesarte</h2>
              </div>
              <Link
                href="/catalogo"
                className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold text-[#193595] hover:text-[#E8078B] transition-colors"
              >
                Ver catálogo completo <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recommended.map(ch => (
                <RecommendedCard key={ch.id} ch={ch} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </PageShell>
  );
}
