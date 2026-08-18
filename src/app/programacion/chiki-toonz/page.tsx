import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { readChikiToonzSchedule } from '@/lib/epg/blobStore';

const XML_PATH = '/epg/chiki-toonz.xml';

export const dynamic = 'force-dynamic';

function monthYearLabel(dayKey: string): string {
  const y = Number(dayKey.slice(0, 4));
  const mo = Number(dayKey.slice(4, 6));
  const date = new Date(Date.UTC(y, mo - 1, 1));
  const label = new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default async function ChikiToonzEPGPage() {
  let schedule = null;
  try {
    schedule = await readChikiToonzSchedule();
  } catch (err) {
    console.error('Error reading chiki-toonz schedule from Blob:', err);
  }
  const days = schedule?.days ?? [];
  const monthLabel = days.length > 0 ? monthYearLabel(days[0].dayKey) : '';

  return (
    <PageShell>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-[1000px] mx-auto flex items-center gap-2 text-[13px] text-[#6a7196]">
          <Link href="/" className="hover:text-[#193595] transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo/chikitoonz" className="hover:text-[#193595] transition-colors">Chiki Toonz</Link>
          <span>/</span>
          <span className="text-[#0a1133] font-medium">Programación</span>
        </div>
      </div>

      {/* Header */}
      <section className="relative text-white py-14 px-6 overflow-hidden bg-gradient-to-br from-[#193595] to-[#E8078B]">
        <div className="max-w-[1000px] mx-auto flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-[12px] font-medium mb-4">
              Grilla EPG
            </span>
            <h1 className="text-[clamp(26px,3.2vw,40px)] font-bold leading-tight tracking-[-0.02em] mb-2">
              Programación — Chiki Toonz
            </h1>
            <p className="text-white/75 text-[15px]">
              {monthLabel && `${monthLabel} · `}{days.length} día{days.length !== 1 ? 's' : ''} · Hora de Lima (UTC-5)
            </p>
          </div>
          <a
            href={XML_PATH}
            download
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-[#193595] font-bold rounded-[12px] shadow-md hover:bg-white/90 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
            Descargar XML (EPG)
          </a>
        </div>
      </section>

      {days.length === 0 ? (
        <section className="py-20 px-6 bg-[#f6f7fb]">
          <div className="max-w-[1000px] mx-auto text-center text-[#6a7196]">
            <p className="text-[16px] font-medium">Todavía no hay programación cargada para este canal.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Day quick-nav */}
          <div className="bg-white border-b border-gray-200 sticky top-[72px] z-20 overflow-x-auto scrollbar-none">
            <div className="max-w-[1000px] mx-auto flex gap-1.5 px-6 py-3">
              {days.map(d => (
                <a
                  key={d.dayKey}
                  href={`#dia-${d.dayKey}`}
                  className="flex-shrink-0 w-9 h-9 rounded-[8px] grid place-items-center text-[12.5px] font-bold text-[#374151] border border-gray-200 hover:border-[#193595] hover:text-[#193595] transition-colors"
                >
                  {d.dayNum}
                </a>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <section className="py-10 px-6 bg-[#f6f7fb]">
            <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
              {days.map(d => (
                <div
                  key={d.dayKey}
                  id={`dia-${d.dayKey}`}
                  className="bg-white rounded-[16px] border border-gray-200 shadow-sm overflow-hidden scroll-mt-[136px]"
                >
                  <div className="px-5 py-3.5 bg-[#0a1133] text-white">
                    <h2 className="text-[14px] font-bold capitalize">{d.dateLabel}</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {d.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 px-5 py-2.5 text-[13.5px]">
                        <span className="flex-shrink-0 w-[110px] font-semibold text-[#193595] tabular-nums">
                          {item.start} – {item.stop}
                        </span>
                        <span className="text-[#374151]">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
