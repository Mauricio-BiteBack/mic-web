import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const schema = z.object({
  chargeId: z.string().uuid(),
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

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(request)
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id: clientId } = await params
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })

  const { chargeId, notes } = parsed.data
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // Fetch charge — verify it belongs to this client and is not already paid
  const { data: charge } = await supabase
    .from('charges')
    .select('id, amount, amount_paid, currency, status')
    .eq('id', chargeId)
    .eq('client_id', clientId)
    .single()

  if (!charge) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })
  if (charge.status === 'pagado') return NextResponse.json({ error: 'Esta factura ya está pagada' }, { status: 400 })

  const remaining = Number(charge.amount) - Number(charge.amount_paid)

  // Mark charge as fully paid
  const { error: chargeError } = await supabase
    .from('charges')
    .update({ amount_paid: Number(charge.amount), status: 'pagado' })
    .eq('id', chargeId)

  if (chargeError) return NextResponse.json({ error: chargeError.message }, { status: 400 })

  // Create manual payment record
  const { error: paymentError } = await supabase
    .from('payments')
    .insert({
      charge_id: chargeId,
      client_id: clientId,
      amount: remaining,
      currency: charge.currency,
      status: 'completed',
      method: 'manual',
      notes: notes ?? null,
      paid_at: new Date().toISOString(),
    })

  if (paymentError) return NextResponse.json({ error: paymentError.message }, { status: 400 })

  // Audit log
  await supabase.from('audit_logs').insert({
    actor_id: admin.id,
    action: 'mark_paid',
    target_type: 'charge',
    target_id: chargeId,
    metadata: { client_id: clientId, amount: remaining, currency: charge.currency, notes: notes ?? null },
  })

  return NextResponse.json({ ok: true })
}
