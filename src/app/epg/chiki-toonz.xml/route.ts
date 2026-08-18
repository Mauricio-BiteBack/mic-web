import { NextResponse } from 'next/server';
import { readChikiToonzXml } from '@/lib/epg/blobStore';

export const runtime = 'nodejs';

export async function GET() {
  let xml: string | null;
  try {
    xml = await readChikiToonzXml();
  } catch (err) {
    console.error('Error reading chiki-toonz.xml from Blob:', err);
    return NextResponse.json({ error: 'No se pudo leer el EPG.' }, { status: 502 });
  }

  if (!xml) {
    return NextResponse.json({ error: 'Aún no hay programación cargada.' }, { status: 404 });
  }

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  });
}
