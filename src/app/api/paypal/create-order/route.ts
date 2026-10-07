import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { createPayPalOrder } from '@/lib/paypal'
import { z } from 'zod'

const schema = z.object({
  chargeId: z.string().uuid(),
  amount: z.number().positive(),
})

export async function POST(request: NextRequest) {
  // Verify session from cookies
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

  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })

  const { chargeId, amount } = parsed.data

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: charge } = await supabase
    .from('charges')
    .select('*')
    .eq('id', chargeId)
    .eq('client_id', user.id)
    .single()

  if (!charge) return NextResponse.json({ error: 'Cobro no encontrado' }, { status: 404 })
  if (charge.status === 'pagado') return NextResponse.json({ error: 'Este cobro ya está pagado' }, { status: 400 })

  const pending = Number(charge.amount) - Number(charge.amount_paid)
  if (amount > pending + 0.01) {
    return NextResponse.json({ error: 'El monto excede el saldo pendiente' }, { status: 400 })
  }

  const order = await createPayPalOrder(amount, charge.currency, chargeId)

  if (!order.id) {
    console.error('PayPal create order error:', order)
    return NextResponse.json({ error: 'Error al crear la orden de pago' }, { status: 500 })
  }

  return NextResponse.json({ orderId: order.id })
}
