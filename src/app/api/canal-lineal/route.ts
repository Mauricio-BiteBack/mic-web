import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { nombre, empresa, email, telefono, pais, tipoContenido, horas, comentarios } = await req.json();

  const { error } = await resend.emails.send({
    from: 'MIC Web <noreply@mic.pe>',
    to: ['ingenieria@mic.pe'],
    replyTo: email,
    subject: `Solicitud de canal lineal — ${nombre}${empresa ? ` (${empresa})` : ''}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a1133">
        <div style="background:#0D1E6B;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">Nueva solicitud de canal lineal 24/7</h1>
          <p style="color:rgba(255,255,255,0.65);margin:6px 0 0;font-size:14px">Formulario: Convierte tus videos en un canal de TV</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:7px 0;color:#6a7196;width:180px;font-size:14px">Nombre</td><td style="padding:7px 0;font-weight:600">${nombre}</td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Empresa / Organización</td><td style="padding:7px 0;font-weight:600">${empresa || '—'}</td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Correo electrónico</td><td style="padding:7px 0"><a href="mailto:${email}" style="color:#193595">${email}</a></td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Teléfono</td><td style="padding:7px 0">${telefono || '—'}</td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">País</td><td style="padding:7px 0">${pais || '—'}</td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Tipo de contenido</td><td style="padding:7px 0">${tipoContenido || '—'}</td></tr>
            <tr><td style="padding:7px 0;color:#6a7196;font-size:14px">Horas de material</td><td style="padding:7px 0">${horas || '—'}</td></tr>
          </table>
          ${comentarios ? `<p style="margin:20px 0 6px"><strong>Comentarios:</strong></p><p style="background:#f6f7fb;padding:14px;border-radius:8px;margin:0;font-size:14px;line-height:1.6">${comentarios}</p>` : ''}
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
