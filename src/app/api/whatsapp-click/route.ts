import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

// Rate limiting: máx 5 avisos por IP por hora
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (entry && now < entry.resetAt) {
    if (entry.count >= 5) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }
    entry.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
  }

  let body: { page?: unknown; href?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const page = String(body.page ?? '').slice(0, 300);
  const href = String(body.href ?? '').slice(0, 1000);
  if (!/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Mensaje prellenado que el visitante verá en WhatsApp
  let texto = '—';
  try {
    texto = new URL(href).searchParams.get('text') || '—';
  } catch {}

  const fecha = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });
  const pais = req.headers.get('x-vercel-ip-country') ?? '—';
  const ciudad = req.headers.get('x-vercel-ip-city');

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a1133">
      <div style="background:#25D366;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:white;margin:0;font-size:20px">Un visitante abrió WhatsApp desde la web</h1>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#6a7196;width:140px">Página</td><td style="padding:6px 0;font-weight:600">${esc(page)}</td></tr>
          <tr><td style="padding:6px 0;color:#6a7196">Mensaje</td><td style="padding:6px 0">${esc(texto)}</td></tr>
          <tr><td style="padding:6px 0;color:#6a7196">Ubicación</td><td style="padding:6px 0">${esc(ciudad ? `${decodeURIComponent(ciudad)}, ${pais}` : pais)}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
        <p style="font-size:12px;color:#6a7196;margin:0">
          Enviado desde mic.pe · ${fecha}
        </p>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: 'MIC Web <noreply@mic.pe>',
    to: ['sales@mic.pe'],
    subject: `WhatsApp — nuevo visitante desde ${page || 'la web'}`,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
