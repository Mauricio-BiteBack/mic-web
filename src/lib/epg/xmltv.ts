import { EpgSchedule } from './types';

const LIMA_OFFSET = '-0500';

function toXmltvTimestamp(dayKey: string, hhmm: string, dayShift: 0 | 1): string {
  const y = Number(dayKey.slice(0, 4));
  const mo = Number(dayKey.slice(4, 6));
  const d = Number(dayKey.slice(6, 8));
  const [hh, mm] = hhmm.split(':').map(Number);
  const date = new Date(Date.UTC(y, mo - 1, d + dayShift, hh, mm, 0));
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00`
  );
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildXmltv(schedule: EpgSchedule, displayName = 'Chikitoonz'): string {
  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="utf-8"?>');
  lines.push(`<tv generator-info-name="MIC EPG Generator" generator-info-url="https://mic.pe">`);
  lines.push(`  <channel id="${schedule.channelId}">`);
  lines.push(`    <display-name>${escapeXml(displayName)}</display-name>`);
  lines.push(`  </channel>`);

  for (const day of schedule.days) {
    for (const item of day.items) {
      // Blocks that wrap past midnight (e.g. 23:00–01:00) have a stop time
      // that is numerically earlier than the start time — that means the
      // stop actually lands on the next calendar day.
      const toMinutes = (hhmm: string) => {
        const [h, m] = hhmm.split(':').map(Number);
        return h * 60 + m;
      };
      const stopDayShift = toMinutes(item.stop) <= toMinutes(item.start) ? 1 : 0;
      const start = toXmltvTimestamp(day.dayKey, item.start, 0);
      const stop = toXmltvTimestamp(day.dayKey, item.stop, stopDayShift);
      lines.push(
        `  <programme start="${start} ${LIMA_OFFSET}" stop="${stop} ${LIMA_OFFSET}" channel="${schedule.channelId}">`
      );
      lines.push(`    <title lang="es">${escapeXml(item.title)}</title>`);
      lines.push(`  </programme>`);
    }
  }

  lines.push('</tv>');
  return lines.join('\n') + '\n';
}
