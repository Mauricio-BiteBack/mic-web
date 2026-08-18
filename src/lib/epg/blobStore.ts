import { get, put } from '@vercel/blob';
import { EpgSchedule } from './types';

export const CHIKI_TOONZ_JSON_PATH = 'epg/chiki-toonz.json';
export const CHIKI_TOONZ_XML_PATH = 'epg/chiki-toonz.xml';

export async function readChikiToonzSchedule(): Promise<EpgSchedule | null> {
  const result = await get(CHIKI_TOONZ_JSON_PATH, { access: 'public', useCache: false });
  if (!result || !result.stream) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text) as EpgSchedule;
}

export async function writeChikiToonzSchedule(schedule: EpgSchedule, xml: string): Promise<void> {
  await Promise.all([
    put(CHIKI_TOONZ_JSON_PATH, JSON.stringify(schedule), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    }),
    put(CHIKI_TOONZ_XML_PATH, xml, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/xml; charset=utf-8',
    }),
  ]);
}

export async function readChikiToonzXml(): Promise<string | null> {
  const result = await get(CHIKI_TOONZ_XML_PATH, { access: 'public', useCache: false });
  if (!result || !result.stream) return null;
  return new Response(result.stream).text();
}
