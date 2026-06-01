import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { nombre, empresa, email, whatsapp, ciudad, canales } = await req.json();

  const canalesHtml = Array.isArray(canales) && canales.length
    ? `<p style="margin-top:20px"><strong>Canales seleccionados (${canales.length}):</strong></p>
       <ul style="margin:4px 0 0;padding-left:20px">${canales.map((c: string) => `<li style="padding:2px 0">${c}</li>`).join('')}</ul>`
    : '';

  const { error } = await resend.emails.send({
    from: 'MIC Web <noreply@mic.pe>',
    to: ['sales@mic.pe'],
    replyTo: email,
    subject: `Nueva solicitud de cotización — ${nombre} (${empresa})`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a1133">
        <div style="background:#0D1E6B;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">Nueva solicitud de cotización</h1>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#6a7196;width:140px">Nombre</td><td style="padding:6px 0;font-weight:600">${nombre}</td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">Empresa</td><td style="padding:6px 0;font-weight:600">${empresa}</td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">Email</td><td style="padding:6px 0"><a href="mailto:${email}" style="color:#193595">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">WhatsApp</td><td style="padding:6px 0">${whatsapp || '—'}</td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">Ciudad / País</td><td style="padding:6px 0">${ciudad || '—'}</td></tr>
          </table>
          ${canalesHtml}
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
