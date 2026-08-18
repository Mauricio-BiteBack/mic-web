// One-time migration: seeds the Vercel Blob store with the schedule that
// currently lives in the static public/epg/EPG_CHIKITOONS_AGOSTO_2026.xml
// file, so /programacion/chiki-toonz and /epg/chiki-toonz.xml keep working
// immediately after the switch to Blob-backed storage — no admin upload
// required first.
//
// Requires BLOB_READ_WRITE_TOKEN to be set in the environment (from the
// Vercel Blob store connected to this project).
//
// Run with: npx tsx scripts/seed-epg-chiki-toonz.mjs

import fs from 'fs';
import path from 'path';
import { buildXmltv } from '../src/lib/epg/xmltv.ts';
import { writeChikiToonzSchedule } from '../src/lib/epg/blobStore.ts';

function decodeXmlEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseReferenceXml(xml) {
  const regex = /<programme start="(\d{14})[^"]*" stop="(\d{14})[^"]*" channel="[^"]*">\s*<title lang="es">([^<]*)<\/title>\s*<\/programme>/g;
  const byDay = new Map();
  let match;
  while ((match = regex.exec(xml))) {
    const [, startRaw, stopRaw, rawTitle] = match;
    const dayKey = startRaw.slice(0, 8);
    const row = {
      start: `${startRaw.slice(8, 10)}:${startRaw.slice(10, 12)}`,
      stop: `${stopRaw.slice(8, 10)}:${stopRaw.slice(10, 12)}`,
      title: decodeXmlEntities(rawTitle.trim()),
    };
    if (!byDay.has(dayKey)) byDay.set(dayKey, []);
    byDay.get(dayKey).push(row);
  }
  return [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dayKey, items]) => {
      const y = Number(dayKey.slice(0, 4));
      const mo = Number(dayKey.slice(4, 6));
      const d = Number(dayKey.slice(6, 8));
      const date = new Date(Date.UTC(y, mo - 1, d));
      const dateLabel = new Intl.DateTimeFormat('es-PE', {
        weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC',
      }).format(date);
      return { dayKey, dateLabel, dayNum: String(d), items };
    });
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN is not set. Add it to .env.local (or export it) before running this script.');
    process.exit(1);
  }

  const filePath = path.join(process.cwd(), 'public', 'epg', 'EPG_CHIKITOONS_AGOSTO_2026.xml');
  const xml = fs.readFileSync(filePath, 'utf-8');
  const days = parseReferenceXml(xml);

  const schedule = { channelId: 'CHIKITOONS', updatedAt: new Date().toISOString(), days };
  const generatedXml = buildXmltv(schedule);

  await writeChikiToonzSchedule(schedule, generatedXml);

  console.log(`Seeded ${days.length} days / ${days.reduce((s, d) => s + d.items.length, 0)} programme entries to Vercel Blob.`);
  console.log('epg/chiki-toonz.json and epg/chiki-toonz.xml are now live.');
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
