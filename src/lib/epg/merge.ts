import { DayGroup, EpgSchedule } from './types';

export function mergeSchedules(
  existing: EpgSchedule | null,
  channelId: string,
  incomingDays: DayGroup[]
): EpgSchedule {
  const byDayKey = new Map<string, DayGroup>();
  for (const day of existing?.days ?? []) byDayKey.set(day.dayKey, day);
  for (const day of incomingDays) byDayKey.set(day.dayKey, day);

  const days = [...byDayKey.values()].sort((a, b) => a.dayKey.localeCompare(b.dayKey));

  return {
    channelId,
    updatedAt: new Date().toISOString(),
    days,
  };
}
