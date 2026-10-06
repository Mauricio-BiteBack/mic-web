import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

// Rate limiting: máx 3 envíos por IP por hora
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isSpam(text: string): boolean {
  const lower = text.toLowerCase();
  // Patrones comunes de spam/SEO bots
  const patterns = [
    /https?:\/\//i,
    /\bviagra\b/i,
    /\bcasino\b/i,
    /\bseo\b.*\bservice/i,
    /\bbacklink/i,
    /\bloan\b/i,
    /\bcrypto\b/i,
    /\bbitcoin\b/i,
    /click here/i,
  ];
  return patterns.some(p => p.test(lower));
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ──────────────────────────────────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (entry) {
    if (now < entry.resetAt) {
      if (entry.count >= 3) {
        return NextResponse.json({ ok: false }, { status: 429 });
      }
      entry.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
  }

  const body = await req.json();
  const { nombre, empresa, email, whatsapp, pais, mensaje, _hp, _t } = body;

  // ── Honeypot ───────────────────────────────────────────────────
  if (_hp) {
    // Bot llenó el campo oculto — aceptar silenciosamente para no revelar la defensa
    return NextResponse.json({ ok: true });
  }

  // ── Timing check ──────────────────────────────────────────────
  // Menos de 2 segundos desde que cargó el formulario = bot
  if (typeof _t !== 'number' || _t < 2000) {
    return NextResponse.json({ ok: true });
  }

  // ── Validación básica ──────────────────────────────────────────
  if (
    typeof nombre !== 'string' || nombre.trim().length < 2 || nombre.length > 120 ||
    typeof empresa !== 'string' || empresa.trim().length < 1 || empresa.length > 120 ||
    typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200 ||
    typeof mensaje !== 'string' || mensaje.trim().length < 5 || mensaje.length > 3000
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // ── Detección de contenido spam ────────────────────────────────
  const allText = [nombre, empresa, mensaje, whatsapp ?? '', pais ?? ''].join(' ');
  if (isSpam(allText)) {
    return NextResponse.json({ ok: true }); // silencioso
  }

  // ── Sanitizar antes de insertar en HTML ───────────────────────
  const sNombre = esc(nombre.trim());
  const sEmpresa = esc(empresa.trim());
  const sEmail = esc(email.trim());
  const sWhatsapp = whatsapp ? esc(String(whatsapp).trim()) : '—';
  const sPais = pais ? esc(String(pais).trim()) : '—';
  const sMensaje = esc(mensaje.trim());

  const { error } = await resend.emails.send({
    from: 'MIC Web <noreply@mic.pe>',
    to: ['sales@mic.pe'],
    replyTo: email.trim(),
    subject: `Nuevo mensaje de contacto — ${sNombre} (${sEmpresa})`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a1133">
        <div style="background:#0D1E6B;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">Nuevo mensaje de contacto</h1>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#6a7196;width:140px">Nombre</td><td style="padding:6px 0;font-weight:600">${sNombre}</td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">Empresa</td><td style="padding:6px 0;font-weight:600">${sEmpresa}</td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">Email</td><td style="padding:6px 0"><a href="mailto:${sEmail}" style="color:#193595">${sEmail}</a></td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">WhatsApp</td><td style="padding:6px 0">${sWhatsapp}</td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">País</td><td style="padding:6px 0">${sPais}</td></tr>
          </table>
          <p style="margin-top:20px"><strong>Mensaje:</strong></p>
          <p style="background:#f6f7fb;padding:12px;border-radius:8px;margin:4px 0;white-space:pre-wrap">${sMensaje}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
          <p style="font-size:12px;color:#6a7196;margin:0">Enviado desde mic.pe · ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
