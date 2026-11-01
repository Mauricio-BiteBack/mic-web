import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

const schema = z.object({
  nombre: z.string().min(2).max(120),
  empresa: z.string().max(120).optional(),
  email: z.string().email().max(200),
  telefono: z.string().max(30).optional(),
  pais: z.string().max(80).optional(),
  tipoContenido: z.string().max(200).optional(),
  horas: z.string().max(50).optional(),
  comentarios: z.string().max(3000).optional(),
  // Honeypot: debe estar vacio; bots lo rellenan
  _hp: z.string().max(0).optional(),
})

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const { allowed } = await rateLimit({ action: 'canal-lineal', identifier: ip, limit: 3 })
  if (!allowed) return NextResponse.json({ ok: false }, { status: 429 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 })

  const { nombre, empresa, email, telefono, pais, tipoContenido, horas, comentarios, _hp } = parsed.data

  // Honeypot
  if (_hp) return NextResponse.json({ ok: true })

  const sNombre = esc(nombre)
  const sEmpresa = empresa ? esc(empresa) : '—'
  const sEmail = esc(email)
  const sTelefono = telefono ? esc(telefono) : '—'
  const sPais = pais ? esc(pais) : '—'
  const sTipo = tipoContenido ? esc(tipoContenido) : '—'
  const sHoras = horas ? esc(horas) : '—'

  const { error } = await resend.emails.send({
    from: 'MIC Web <noreply@mic.pe>',
    to: ['ingenieria@mic.pe'],
    replyTo: email,
    subject: `Solicitud de canal lineal — ${sNombre}${empresa ? ` (${sEmpresa})` : ''}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a1133">
        <div style="background:#0D1E6B;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">Nueva solicitud de canal lineal 24/7</h1>
          <p style="color:rgba(255,255,255,0.65);margin:6px 0 0;font-size:14px">Formulario: Convierte tus videos en un canal de TV</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:7px 0;color:#6a7196;width:180px;font-size:14px">Nombre</td><td style="padding:7px 0;font-weight:600">${sNombre}</td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Empresa / Organizacion</td><td style="padding:7px 0;font-weight:600">${sEmpresa}</td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Correo electronico</td><td style="padding:7px 0"><a href="mailto:${sEmail}" style="color:#193595">${sEmail}</a></td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Telefono</td><td style="padding:7px 0">${sTelefono}</td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Pais</td><td style="padding:7px 0">${sPais}</td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Tipo de contenido</td><td style="padding:7px 0">${sTipo}</td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Horas de material</td><td style="padding:7px 0">${sHoras}</td></tr>
          </table>
          ${comentarios ? `<p style="margin:20px 0 6px"><strong>Comentarios:</strong></p><p style="background:#f6f7fb;padding:14px;border-radius:8px;margin:0;font-size:14px;line-height:1.6">${esc(comentarios)}</p>` : ''}
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
          <p style="font-size:12px;color:#6a7196;margin:0">Enviado desde mic.pe · ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error sending canal-lineal email');
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
