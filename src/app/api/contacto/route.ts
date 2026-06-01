import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { nombre, empresa, email, whatsapp, pais, mensaje } = await req.json();

  const { error } = await resend.emails.send({
    from: 'MIC Web <noreply@mic.pe>',
    to: ['sales@mic.pe'],
    replyTo: email,
    subject: `Nuevo mensaje de contacto — ${nombre} (${empresa})`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a1133">
        <div style="background:#0D1E6B;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">Nuevo mensaje de contacto</h1>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#6a7196;width:140px">Nombre</td><td style="padding:6px 0;font-weight:600">${nombre}</td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">Empresa</td><td style="padding:6px 0;font-weight:600">${empresa}</td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">Email</td><td style="padding:6px 0"><a href="mailto:${email}" style="color:#193595">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">WhatsApp</td><td style="padding:6px 0">${whatsapp || '—'}</td></tr>
            <tr><td style="padding:6px 0;color:#6a7196">País</td><td style="padding:6px 0">${pais || '—'}</td></tr>
          </table>
          ${mensaje ? `<p style="margin-top:20px"><strong>Mensaje:</strong></p><p style="background:#f6f7fb;padding:12px;border-radius:8px;margin:4px 0">${mensaje}</p>` : ''}
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
