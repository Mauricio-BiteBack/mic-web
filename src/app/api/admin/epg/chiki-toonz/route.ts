import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/adminAuth';
import { parseChikiToonzExcel } from '@/lib/epg/excelParser';
import { mergeSchedules } from '@/lib/epg/merge';
import { buildXmltv } from '@/lib/epg/xmltv';
import { readChikiToonzSchedule, writeChikiToonzSchedule } from '@/lib/epg/blobStore';

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const CHANNEL_ID = 'CHIKITOONS';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'No se pudo leer el formulario.' }, { status: 400 });
  }

  const file = formData.get('file');
  const monthRaw = formData.get('month');

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Adjunta un archivo Excel (.xlsx).' }, { status: 400 });
  }
  if (!file.name.toLowerCase().endsWith('.xlsx')) {
    return NextResponse.json({ ok: false, error: 'El archivo debe ser un .xlsx.' }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ ok: false, error: 'El archivo supera el tamaño máximo (5MB).' }, { status: 400 });
  }

  const month = Number(monthRaw);
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return NextResponse.json({ ok: false, error: 'Selecciona un mes válido.' }, { status: 400 });
  }

  const year = new Date().getFullYear();
  const buffer = await file.arrayBuffer();
  const result = parseChikiToonzExcel(buffer, month, year);

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error, details: result.details }, { status: 400 });
  }

  let existing;
  try {
    existing = await readChikiToonzSchedule();
  } catch (err) {
    console.error('Error reading existing EPG schedule from Blob:', err);
    return NextResponse.json(
      { ok: false, error: 'No se pudo leer el archivo actual de programación. Intenta de nuevo.' },
      { status: 502 }
    );
  }

  const merged = mergeSchedules(existing, CHANNEL_ID, result.days);
  const xml = buildXmltv(merged);

  try {
    await writeChikiToonzSchedule(merged, xml);
  } catch (err) {
    console.error('Error writing EPG schedule to Blob:', err);
    return NextResponse.json(
      { ok: false, error: 'No se pudo guardar la programación. Intenta de nuevo.' },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    warnings: result.warnings,
    updatedDays: result.days.map(d => d.dayKey),
    totalDays: merged.days.length,
  });
}
