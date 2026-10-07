import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { capturePayPalOrder } from '@/lib/paypal'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  orderId: z.string(),
  chargeId: z.string().uuid(),
})

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount)
}

export async function POST(request: NextRequest) {
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll() {},
      },
    }
  )
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const userId = user.id

  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })

  const { orderId, chargeId } = parsed.data

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Idempotency check — don't capture twice
  const { data: existingPayment } = await supabase
    .from('payments')
    .select('id')
    .eq('paypal_order_id', orderId)
    .eq('status', 'completed')
    .single()

  if (existingPayment) {
    return NextResponse.json({ ok: true, alreadyCaptured: true })
  }

  // Capture the order with PayPal
  const capture = await capturePayPalOrder(orderId)

  if (capture.status !== 'COMPLETED') {
    console.error('PayPal capture failed:', capture)
    return NextResponse.json({ error: 'El pago no se completó' }, { status: 400 })
  }

  const captureUnit = capture.purchase_units?.[0]?.payments?.captures?.[0]
  const paidAmount = Number(captureUnit?.amount?.value ?? 0)
  const currency = captureUnit?.amount?.currency_code ?? 'USD'

  // Get charge to update
  const { data: charge, error: chargeError } = await supabase
    .from('charges')
    .select('*')
    .eq('id', chargeId)
    .single()

  if (chargeError) console.error('Charge query error:', chargeError)
  if (!charge) return NextResponse.json({ error: 'Cobro no encontrado' }, { status: 404 })

  // Get profile separately
  const { data: profileRow } = await supabase
    .from('profiles')
    .select('email, company_name, contact_name')
    .eq('id', charge.client_id)
    .single()

  const newAmountPaid = Number(charge.amount_paid) + paidAmount
  const newStatus = newAmountPaid >= Number(charge.amount) - 0.01 ? 'pagado' : 'parcial'

  // Update charge
  await supabase
    .from('charges')
    .update({ amount_paid: newAmountPaid, status: newStatus })
    .eq('id', chargeId)

  // Record payment
  const { data: payment } = await supabase
    .from('payments')
    .insert({
      charge_id: chargeId,
      client_id: userId,
      paypal_order_id: orderId,
      amount: paidAmount,
      currency,
      status: 'completed',
      paid_at: new Date().toISOString(),
    })
    .select()
    .single()

  // Send receipt email
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const profile = profileRow as { email: string; company_name: string; contact_name: string } | null
      if (!profile?.email) throw new Error('Profile not found')
      const amountFormatted = formatCurrency(paidAmount, currency)
      const pendingFormatted = formatCurrency(Math.max(0, Number(charge.amount) - newAmountPaid), currency)

      await resend.emails.send({
        from: 'MIC Pagos <info@mic.pe>',
        to: profile.email,
        subject: `Recibo de pago — ${amountFormatted}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #ffffff;">
            <img src="https://mic.pe/logo_3D.png" alt="MIC" style="height: 48px; margin-bottom: 24px;" />
            <h2 style="color: #0a1133; font-size: 20px; margin: 0 0 8px;">Pago recibido</h2>
            <p style="color: #6a7196; font-size: 14px; margin: 0 0 24px;">Hola ${profile.contact_name || profile.company_name}, confirmamos tu pago.</p>

            <div style="background: #f6f7fb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6a7196; font-size: 13px;">Concepto</span>
                <span style="color: #0a1133; font-size: 13px; font-weight: 600;">${charge.description}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6a7196; font-size: 13px;">Monto pagado</span>
                <span style="color: #E8078B; font-size: 16px; font-weight: 700;">${amountFormatted}</span>
              </div>
              ${newStatus === 'parcial' ? `
              <div style="display: flex; justify-content: space-between; border-top: 1px solid #e5e7eb; padding-top: 8px; margin-top: 8px;">
                <span style="color: #6a7196; font-size: 13px;">Saldo pendiente</span>
                <span style="color: #0a1133; font-size: 13px; font-weight: 600;">${pendingFormatted}</span>
              </div>` : ''}
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6a7196; font-size: 13px;">Estado</span>
                <span style="color: ${newStatus === 'pagado' ? '#16a34a' : '#2563eb'}; font-size: 13px; font-weight: 600;">${newStatus === 'pagado' ? 'Pagado' : 'Pago parcial'}</span>
              </div>
            </div>

            <p style="color: #6a7196; font-size: 12px; text-align: center;">¿Tienes dudas? Escríbenos a <a href="mailto:info@mic.pe" style="color: #193595;">info@mic.pe</a></p>
          </div>
        `,
      })
    } catch (e) {
      console.error('Error sending receipt email:', e)
    }
  }

  return NextResponse.json({
    ok: true,
    paymentId: payment?.id,
    amount: paidAmount,
    currency,
    status: newStatus,
  })
}
