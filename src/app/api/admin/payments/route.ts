import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const schema = z.object({
  chargeId: z.string().uuid(),
  clientId: z.string().uuid(),
  amount: z.number().positive(),
  notes: z.string().optional(),
  method: z.enum(['manual', 'transfer', 'sepa']).default('manual'),
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

export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request)
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })

  const { chargeId, clientId, amount, notes, method } = parsed.data
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // Validate charge
  const { data: charge } = await supabase
    .from('charges')
    .select('id, amount, amount_paid, currency, status, client_id')
    .eq('id', chargeId)
    .eq('client_id', clientId)
    .single()

  if (!charge) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })
  if (charge.status === 'pagado') return NextResponse.json({ error: 'Esta factura ya está pagada' }, { status: 400 })

  const pending = Number(charge.amount) - Number(charge.amount_paid)
  if (amount > pending + 0.01) {
    return NextResponse.json({ error: 'El monto excede el saldo pendiente' }, { status: 400 })
  }

  // Create pending payment for reconciliation
  const { data: payment, error } = await supabase
    .from('payments')
    .insert({
      charge_id: chargeId,
      client_id: clientId,
      amount,
      currency: charge.currency,
      status: 'pending',
      method,
      notes: notes ?? null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  await supabase.from('audit_logs').insert({
    actor_id: admin.id,
    action: 'register_manual_payment',
    target_type: 'payment',
    target_id: payment.id,
    metadata: { charge_id: chargeId, client_id: clientId, amount, method, notes },
  })

  return NextResponse.json({ ok: true, paymentId: payment.id })
}
