export interface ProgrammeRow {
  start: string; // "HH:MM"
  stop: string;  // "HH:MM"
  title: string;
}

export interface DayGroup {
  dayKey: string;    // "YYYYMMDD"
  dateLabel: string; // "sábado, 1 de agosto"
  dayNum: string;    // "1"
  items: ProgrammeRow[];
}

export interface EpgSchedule {
  channelId: string;
  updatedAt: string; // ISO timestamp
  days: DayGroup[];
}

export function dayKeyToLabel(dayKey: string): { dateLabel: string; dayNum: string } {
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
  return { dateLabel, dayNum: String(d) };
}
