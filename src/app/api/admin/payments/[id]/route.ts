import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const schema = z.object({
  action: z.enum(['approve', 'reject']),
  notes: z.string().optional(),
})

async function verifyAdmin(request: NextRequest) {
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => request.cookies.getAll(), setAll: () => {} } }
  )
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) return null
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  return profile?.role === 'admin' ? user : null
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(request)
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id: paymentId } = await params
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })

  const { action, notes } = parsed.data
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // Fetch payment
  const { data: payment } = await supabase
    .from('payments')
    .select('id, charge_id, client_id, amount, currency, status')
    .eq('id', paymentId)
    .single()

  if (!payment) return NextResponse.json({ error: 'Pago no encontrado' }, { status: 404 })
  if (payment.status !== 'pending') {
    return NextResponse.json({ error: `Este pago ya fue procesado (estado: ${payment.status})` }, { status: 400 })
  }

  if (action === 'approve') {
    // Update payment to completed
    const { error: payError } = await supabase
      .from('payments')
      .update({ status: 'completed', paid_at: new Date().toISOString(), notes: notes ?? null })
      .eq('id', paymentId)

    if (payError) return NextResponse.json({ error: payError.message }, { status: 400 })

    // Update charge amount_paid + status
    const { data: charge } = await supabase
      .from('charges')
      .select('amount, amount_paid')
      .eq('id', payment.charge_id)
      .single()

    if (charge) {
      const newAmountPaid = Number(charge.amount_paid) + Number(payment.amount)
      const newStatus = newAmountPaid >= Number(charge.amount) - 0.01 ? 'pagado' : 'parcial'
      await supabase
        .from('charges')
        .update({ amount_paid: newAmountPaid, status: newStatus })
        .eq('id', payment.charge_id)
    }

    // Trigger n8n webhook if configured
    const webhookUrl = process.env.N8N_PAYMENT_CONFIRM_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(process.env.N8N_WEBHOOK_SECRET ? { 'x-webhook-secret': process.env.N8N_WEBHOOK_SECRET } : {}),
          },
          body: JSON.stringify({
            paymentId,
            chargeId: payment.charge_id,
            clientId: payment.client_id,
            amount: payment.amount,
            currency: payment.currency,
            approvedBy: admin.id,
            approvedAt: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(8000),
        })
      } catch (e) {
        console.error('n8n webhook error:', e)
        // Non-blocking — payment is still approved even if webhook fails
      }
    }

    // Audit log
    await supabase.from('audit_logs').insert({
      actor_id: admin.id,
      action: 'approve_payment',
      target_type: 'payment',
      target_id: paymentId,
      metadata: { amount: payment.amount, currency: payment.currency, charge_id: payment.charge_id },
    })

    return NextResponse.json({ ok: true, action: 'approved' })
  }

  // Reject
  const { error } = await supabase
    .from('payments')
    .update({ status: 'failed', notes: notes ?? null })
    .eq('id', paymentId)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  await supabase.from('audit_logs').insert({
    actor_id: admin.id,
    action: 'reject_payment',
    target_type: 'payment',
    target_id: paymentId,
    metadata: { reason: notes ?? null },
  })

  return NextResponse.json({ ok: true, action: 'rejected' })
}
