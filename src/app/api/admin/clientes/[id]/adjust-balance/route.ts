import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const schema = z.object({
  chargeId: z.string().uuid(),
  amount: z.number().positive(),
  reason: z.string().min(1),
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

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(request)
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id: clientId } = await params
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })

  const { chargeId, amount, reason } = parsed.data
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // Fetch charge — verify it belongs to this client
  const { data: charge } = await supabase
    .from('charges')
    .select('id, amount, amount_paid, currency, status')
    .eq('id', chargeId)
    .eq('client_id', clientId)
    .single()

  if (!charge) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })

  const pending = Number(charge.amount) - Number(charge.amount_paid)
  if (amount > pending + 0.01) {
    return NextResponse.json({ error: `El descuento (${amount}) excede el saldo pendiente (${pending.toFixed(2)})` }, { status: 400 })
  }

  const newAmountPaid = Number(charge.amount_paid) + amount
  const newStatus = newAmountPaid >= Number(charge.amount) - 0.01 ? 'pagado' : charge.status

  const { error } = await supabase
    .from('charges')
    .update({ amount_paid: newAmountPaid, status: newStatus })
    .eq('id', chargeId)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Audit log
  await supabase.from('audit_logs').insert({
    actor_id: admin.id,
    action: 'adjust_balance',
    target_type: 'charge',
    target_id: chargeId,
    metadata: { client_id: clientId, adjustment: amount, reason, new_amount_paid: newAmountPaid, new_status: newStatus },
  })

  return NextResponse.json({ ok: true, newStatus })
}
