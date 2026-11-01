import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

const schema = z.object({
  nombre: z.string().min(2).max(120),
  empresa: z.string().min(1).max(120),
  email: z.string().email().max(200),
  whatsapp: z.string().max(30).optional(),
  ciudad: z.string().max(100).optional(),
  canales: z.array(z.string().max(200)).max(200).optional(),
  mensaje: z.string().max(3000).optional(),
  origen: z.enum(['contacto', 'cotizacion']).optional(),
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

  const { allowed } = await rateLimit({ action: 'cotizar', identifier: ip, limit: 5 })
  if (!allowed) return NextResponse.json({ ok: false }, { status: 429 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 })

  const { nombre, empresa, email, whatsapp, ciudad, canales, mensaje, origen, _hp } = parsed.data

  // Honeypot
  if (_hp) return NextResponse.json({ ok: true })

  const esContacto = origen === 'contacto'

  const sNombre = esc(nombre)
  const sEmpresa = esc(empresa)
  const sEmail = esc(email)
  const sWhatsapp = whatsapp ? esc(whatsapp) : '—'
  const sCiudad = ciudad ? esc(ciudad) : '—'

  const asunto = esContacto
    ? `Nuevo mensaje de contacto — ${sNombre} (${sEmpresa})`
    : `Nueva solicitud de cotizacion — ${sNombre} (${sEmpresa})`

  const canalesHtml = canales?.length
    ? `<p><strong>Canales seleccionados:</strong></p>
       <ul style="margin:4px 0 12px;padding-left:20px">
         ${canales.map(c => `<li>${esc(c)}</li>`).join('')}
       </ul>`
    : ''

  const mensajeHtml = mensaje
    ? `<p><strong>Mensaje:</strong></p><p style="background:#f6f7fb;padding:12px;border-radius:8px">${esc(mensaje)}</p>`
    : ''

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a1133">
      <div style="background:#0D1E6B;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:white;margin:0;font-size:20px">${asunto}</h1>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#6a7196;width:140px">Nombre</td><td style="padding:6px 0;font-weight:600">${sNombre}</td></tr>
          <tr><td style="padding:6px 0;color:#6a7196">Empresa</td><td style="padding:6px 0;font-weight:600">${sEmpresa}</td></tr>
          <tr><td style="padding:6px 0;color:#6a7196">Email</td><td style="padding:6px 0"><a href="mailto:${sEmail}" style="color:#193595">${sEmail}</a></td></tr>
          <tr><td style="padding:6px 0;color:#6a7196">WhatsApp</td><td style="padding:6px 0">${sWhatsapp}</td></tr>
          <tr><td style="padding:6px 0;color:#6a7196">Ciudad / Pais</td><td style="padding:6px 0">${sCiudad}</td></tr>
        </table>
        ${canalesHtml}
        ${mensajeHtml}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
        <p style="font-size:12px;color:#6a7196;margin:0">
          Enviado desde mic.pe · ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}
        </p>
      </div>
    </div>
  `

  const { error } = await resend.emails.send({
    from: 'MIC Web <noreply@mic.pe>',
    to: ['info@mic.pe'],
    replyTo: email,
    subject: asunto,
    html,
  });

  if (error) {
    console.error('Resend error sending cotizar email');
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
