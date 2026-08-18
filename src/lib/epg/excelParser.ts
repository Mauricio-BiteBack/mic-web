import * as XLSX from 'xlsx';
import { DayGroup, ProgrammeRow, dayKeyToLabel } from './types';

const WEEKDAY_NAMES: Record<string, number> = {
  LUNES: 1,
  MARTES: 2,
  MIERCOLES: 3,
  JUEVES: 4,
  VIERNES: 5,
  SABADO: 6,
  DOMINGO: 7,
};

const MONTH_NAMES = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE',
];

const HOUR_ROWS_PER_DAY = 24;
const BLOCKS_PER_DAY = 12;

export interface ParseSuccess {
  ok: true;
  days: DayGroup[];
  warnings: string[];
}

export interface ParseFailure {
  ok: false;
  error: string;
  details: string[];
}

export type ParseResult = ParseSuccess | ParseFailure;

function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function normalizeCell(v: unknown): string {
  return stripAccents(String(v ?? '')).trim().toUpperCase();
}

function daysInMonth(month: number, year: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function isoWeekday(year: number, month: number, day: number): number {
  // getUTCDay(): 0=Sun..6=Sat -> ISO 1=Mon..7=Sun
  const dow = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return dow === 0 ? 7 : dow;
}

function dayKeyOf(year: number, month: number, day: number): string {
  return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
}

function blockHours(b: number): { start: string; stop: string } {
  const startHour = 2 * b + 1;
  const stopHour = (startHour + 2) % 24;
  const pad = (n: number) => String(n).padStart(2, '0');
  return { start: `${pad(startHour)}:00`, stop: `${pad(stopHour)}:00` };
}

export function parseChikiToonzExcel(buffer: ArrayBuffer, month: number, year: number): ParseResult {
  const warnings: string[] = [];
  let workbook: XLSX.WorkBook;
  try {
    workbook = XLSX.read(buffer, { type: 'array' });
  } catch {
    return { ok: false, error: 'No se pudo leer el archivo. ¿Es un .xlsx válido?', details: [] };
  }

  if (!workbook.SheetNames.length) {
    return { ok: false, error: 'El archivo no tiene hojas.', details: [] };
  }

  const monthDays = daysInMonth(month, year);
  const resolvedByDay = new Map<number, Map<number, string>>(); // day -> (blockIndex -> title)
  let lastAssignedDay = 0;
  const overrideNotes: string[] = [];

  for (const sheetName of workbook.SheetNames) {
    const ws = workbook.Sheets[sheetName];
    const rows: unknown[][] = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '' });

    // 1. Title row: first row containing "SEMANA <n>"
    let titleRowIdx = -1;
    let dayStart = -1;
    let dayEnd = -1;
    for (let i = 0; i < rows.length; i++) {
      const rowText = rows[i].map(c => String(c ?? '')).join(' ');
      if (/SEMANA\s*\d+/i.test(rowText)) {
        const m = rowText.match(/(\d{1,2})\s*[-–]\s*(\d{1,2})/);
        if (m) {
          titleRowIdx = i;
          dayStart = Number(m[1]);
          dayEnd = Number(m[2]);
        }
        break;
      }
    }
    if (titleRowIdx === -1) {
      return {
        ok: false,
        error: `La hoja "${sheetName}" no tiene un título de semana reconocible (se esperaba algo como "SEMANA 2: 03 - 09").`,
        details: [],
      };
    }

    // Soft cross-check on the month word (non-blocking)
    const titleText = rows[titleRowIdx].map(c => String(c ?? '')).join(' ');
    const foundMonthWord = MONTH_NAMES.find(mn => stripAccents(titleText).toUpperCase().includes(mn));
    if (foundMonthWord && foundMonthWord !== MONTH_NAMES[month - 1]) {
      warnings.push(
        `Hoja "${sheetName}": el título menciona ${foundMonthWord.charAt(0)}${foundMonthWord.slice(1).toLowerCase()}, pero se generó con ${MONTH_NAMES[month - 1].charAt(0)}${MONTH_NAMES[month - 1].slice(1).toLowerCase()} (mes seleccionado en el formulario).`
      );
    }

    // 2. Header row: first row after title whose first cell is "HORA"
    let headerRowIdx = -1;
    for (let i = titleRowIdx + 1; i < rows.length; i++) {
      if (normalizeCell(rows[i][0]) === 'HORA') {
        headerRowIdx = i;
        break;
      }
    }
    if (headerRowIdx === -1) {
      return {
        ok: false,
        error: `La hoja "${sheetName}" no tiene una fila de encabezado ("Hora | Lunes | Martes | ...").`,
        details: [],
      };
    }

    const colToWeekday = new Map<number, number>();
    const headerRow = rows[headerRowIdx];
    for (let c = 1; c < headerRow.length; c++) {
      const wd = WEEKDAY_NAMES[normalizeCell(headerRow[c])];
      if (wd && !colToWeekday.has(c)) colToWeekday.set(c, wd);
    }
    const missingWeekdays = Object.entries(WEEKDAY_NAMES)
      .filter(([, wd]) => ![...colToWeekday.values()].includes(wd))
      .map(([name]) => name);
    if (missingWeekdays.length > 0) {
      return {
        ok: false,
        error: `La hoja "${sheetName}" no tiene columnas para: ${missingWeekdays.join(', ')}.`,
        details: [],
      };
    }

    // 3. 24 hour-rows beneath the header
    const dataRows = rows.slice(headerRowIdx + 1, headerRowIdx + 1 + HOUR_ROWS_PER_DAY);
    if (dataRows.length < HOUR_ROWS_PER_DAY) {
      return {
        ok: false,
        error: `La hoja "${sheetName}" tiene ${dataRows.length} filas de horario, se esperaban ${HOUR_ROWS_PER_DAY} (1:00 a 12:00 AM y PM).`,
        details: [],
      };
    }

    // 4. Build 12 two-hour blocks per weekday column, validating each row-pair agrees
    const blocksByWeekday = new Map<number, (string | null)[]>();
    const mismatchDetails: string[] = [];
    for (const [colIdx, weekday] of colToWeekday) {
      const blocks: (string | null)[] = [];
      for (let b = 0; b < BLOCKS_PER_DAY; b++) {
        const rowA = dataRows[2 * b];
        const rowB = dataRows[2 * b + 1];
        const valA = String(rowA[colIdx] ?? '').trim();
        const valB = String(rowB[colIdx] ?? '').trim();
        if (valA === '' && valB === '') {
          blocks.push(null);
        } else if (valA.toUpperCase() !== valB.toUpperCase()) {
          const { start, stop } = blockHours(b);
          mismatchDetails.push(
            `Hoja "${sheetName}", columna ${Object.keys(WEEKDAY_NAMES).find(k => WEEKDAY_NAMES[k] === weekday)}, bloque ${start}-${stop}: los dos renglones del bloque no coinciden ("${valA}" vs "${valB}").`
          );
          blocks.push(null);
        } else {
          blocks.push(valA);
        }
      }
      blocksByWeekday.set(weekday, blocks);
    }
    if (mismatchDetails.length > 0) {
      return {
        ok: false,
        error: `La hoja "${sheetName}" tiene bloques de horario inconsistentes.`,
        details: mismatchDetails,
      };
    }

    // 5. Determine which weekdays are active (have any data) and validate full-day completeness
    const activeWeekdays: number[] = [];
    const partialDayDetails: string[] = [];
    for (const [weekday, blocks] of blocksByWeekday) {
      const filled = blocks.filter(b => b !== null).length;
      if (filled === 0) continue;
      if (filled < BLOCKS_PER_DAY) {
        const name = Object.keys(WEEKDAY_NAMES).find(k => WEEKDAY_NAMES[k] === weekday);
        partialDayDetails.push(
          `Hoja "${sheetName}", columna ${name}: solo ${filled} de ${BLOCKS_PER_DAY} bloques tienen datos. Completa todo el día o déjalo totalmente vacío.`
        );
        continue;
      }
      activeWeekdays.push(weekday);
    }
    if (partialDayDetails.length > 0) {
      return {
        ok: false,
        error: `La hoja "${sheetName}" tiene días parcialmente completados.`,
        details: partialDayDetails,
      };
    }
    if (activeWeekdays.length === 0) {
      // Nothing in this sheet — skip it entirely.
      continue;
    }
    activeWeekdays.sort((a, b) => a - b);

    // 6. Reconcile against the title's declared day-range
    const titleDates: number[] = [];
    for (let d = dayStart; d <= dayEnd; d++) titleDates.push(d);
    const titleWeekdaySet = titleDates
      .filter(d => d >= 1 && d <= monthDays)
      .map(d => isoWeekday(year, month, d))
      .sort((a, b) => a - b);
    const activeSetMatchesTitle =
      titleWeekdaySet.length === activeWeekdays.length &&
      titleWeekdaySet.every((wd, i) => wd === activeWeekdays[i]) &&
      titleDates.length === activeWeekdays.length;

    let resolvedDates: number[];
    if (activeSetMatchesTitle) {
      resolvedDates = titleDates;
    } else {
      // Fallback: continue right after the previous sheet, sized by how many
      // weekday columns actually have data.
      const start = lastAssignedDay + 1;
      resolvedDates = [];
      for (let i = 0; i < activeWeekdays.length; i++) resolvedDates.push(start + i);
      const fallbackWeekdaySet = resolvedDates
        .filter(d => d >= 1 && d <= monthDays)
        .map(d => isoWeekday(year, month, d));
      const fallbackMatches =
        fallbackWeekdaySet.length === activeWeekdays.length &&
        fallbackWeekdaySet.every((wd, i) => wd === activeWeekdays[i]);
      if (!fallbackMatches) {
        return {
          ok: false,
          error: `No se pudo determinar a qué fechas corresponde la hoja "${sheetName}".`,
          details: [
            `El título dice "${dayStart} - ${dayEnd}" pero los datos reales cubren ${activeWeekdays.length} día(s) que no coinciden con ese rango, y tampoco encajan como continuación de la hoja anterior (que terminó el día ${lastAssignedDay}). Revisa el título y los datos de esta hoja.`,
          ],
        };
      }
      warnings.push(
        `Hoja "${sheetName}": el título decía "${dayStart} - ${dayEnd}" pero los datos solo cubren ${activeWeekdays.length} día(s); se interpretó como día(s) ${resolvedDates.join(', ')} de ${MONTH_NAMES[month - 1].charAt(0)}${MONTH_NAMES[month - 1].slice(1).toLowerCase()} (continuación de la hoja anterior).`
      );
    }

    const outOfRange = resolvedDates.filter(d => d < 1 || d > monthDays);
    if (outOfRange.length > 0) {
      return {
        ok: false,
        error: `La hoja "${sheetName}" produce fechas fuera del mes seleccionado: día(s) ${outOfRange.join(', ')} (el mes tiene ${monthDays} días).`,
        details: [],
      };
    }

    // 7. Assign resolved dates to weekday columns, in order
    for (let i = 0; i < resolvedDates.length; i++) {
      const day = resolvedDates[i];
      const weekday = activeWeekdays[i];
      const blocks = blocksByWeekday.get(weekday)!;
      const blockMap = new Map<number, string>();
      blocks.forEach((title, b) => {
        if (title !== null) blockMap.set(b, title);
      });

      if (resolvedByDay.has(day)) {
        overrideNotes.push(
          `Hoja "${sheetName}" reemplaza los datos del día ${day} que ya habían sido asignados por una hoja anterior en este mismo archivo.`
        );
      }
      resolvedByDay.set(day, blockMap);
      lastAssignedDay = Math.max(lastAssignedDay, day);
    }
  }

  warnings.push(...overrideNotes);

  // 8. Build DayGroup[] from resolvedByDay
  const days: DayGroup[] = [...resolvedByDay.entries()]
    .sort(([a], [b]) => a - b)
    .map(([day, blockMap]) => {
      const dayKey = dayKeyOf(year, month, day);
      const items: ProgrammeRow[] = [];
      for (let b = 0; b < BLOCKS_PER_DAY; b++) {
        const title = blockMap.get(b);
        if (!title) continue;
        const { start, stop } = blockHours(b);
        items.push({ start, stop, title });
      }
      const { dateLabel, dayNum } = dayKeyToLabel(dayKey);
      return { dayKey, dateLabel, dayNum, items };
    });

  if (days.length === 0) {
    return { ok: false, error: 'El archivo no contiene ningún día con datos.', details: [] };
  }

  return { ok: true, days, warnings };
}
