import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const webhookUrl = process.env.N8N_VALIDATE_EMAIL_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('N8N_VALIDATE_EMAIL_WEBHOOK_URL not configured')
    return NextResponse.json({ error: 'Servicio de validación no configurado' }, { status: 503 })
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (process.env.N8N_WEBHOOK_SECRET) {
    headers['x-webhook-secret'] = process.env.N8N_WEBHOOK_SECRET
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    let n8nRes: Response
    try {
      n8nRes = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email: parsed.data.email }),
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!n8nRes.ok) {
      console.error('n8n webhook returned', n8nRes.status)
      return NextResponse.json({ error: 'Error en el servicio de validación' }, { status: 502 })
    }

    const result = await n8nRes.json()

    // Expected n8n response shape: { valid: boolean, odoo_partner_id?: string|number, reason?: string }
    return NextResponse.json({
      valid: result.valid === true,
      odoo_partner_id: result.odoo_partner_id ?? null,
      reason: result.reason ?? null,
    })
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      return NextResponse.json({ error: 'timeout' }, { status: 504 })
    }
    console.error('validate-email error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
