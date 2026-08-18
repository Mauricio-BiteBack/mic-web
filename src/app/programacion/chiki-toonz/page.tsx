import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

const MONTH_LABEL = 'Agosto 2026';
const XML_PATH = '/epg/EPG_CHIKITOONS_AGOSTO_2026.xml';

interface ProgrammeRow {
  start: string;
  stop: string;
  title: string;
}

interface DayGroup {
  dayKey: string;
  dateLabel: string;
  dayNum: string;
  items: ProgrammeRow[];
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function loadSchedule(): DayGroup[] {
  const filePath = path.join(process.cwd(), 'public', 'epg', 'EPG_CHIKITOONS_AGOSTO_2026.xml');
  const xml = fs.readFileSync(filePath, 'utf-8');
  const regex = /<programme start="(\d{14})[^"]*" stop="(\d{14})[^"]*" channel="[^"]*">\s*<title lang="es">([^<]*)<\/title>\s*<\/programme>/g;

  const byDay = new Map<string, ProgrammeRow[]>();
  let match: RegExpExecArray | null;
  while ((match = regex.exec(xml))) {
    const [, startRaw, stopRaw, rawTitle] = match;
    const dayKey = startRaw.slice(0, 8);
    const row: ProgrammeRow = {
      start: `${startRaw.slice(8, 10)}:${startRaw.slice(10, 12)}`,
      stop: `${stopRaw.slice(8, 10)}:${stopRaw.slice(10, 12)}`,
      title: decodeXmlEntities(rawTitle.trim()),
    };
    if (!byDay.has(dayKey)) byDay.set(dayKey, []);
    byDay.get(dayKey)!.push(row);
  }

  return [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dayKey, items]) => {
      const y = Number(dayKey.slice(0, 4));
      const mo = Number(dayKey.slice(4, 6));
      const d = Number(dayKey.slice(6, 8));
      const date = new Date(Date.UTC(y, mo - 1, d));
      const dateLabel = new Intl.DateTimeFormat('es-PE', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        timeZone: 'UTC',
      }).format(date);
      return { dayKey, dateLabel, dayNum: String(d), items };
    });
}

export default function ChikiToonzEPGPage() {
  const days = loadSchedule();

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
            <p className="text-white/75 text-[15px]">{MONTH_LABEL} · {days.length} días · Hora de Lima (UTC-5)</p>
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
    </PageShell>
  );
}
