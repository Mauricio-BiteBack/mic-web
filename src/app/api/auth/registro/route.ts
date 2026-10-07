import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  company_name: z.string().min(1),
  contact_name: z.string().default(''),
  ruc: z.string().optional(),
  currency: z.enum(['USD', 'PEN']).default('USD'),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const { email, password, company_name, contact_name, ruc, currency } = parsed.data

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Check if email already exists
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Ya existe una cuenta con ese email' }, { status: 400 })
  }

  // Create auth user — inactive until admin approves
  const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { company_name, contact_name },
  })

  if (authError || !newUser.user) {
    return NextResponse.json({ error: authError?.message ?? 'Error al crear la cuenta' }, { status: 400 })
  }

  // Update profile: set data + active = false (pending admin approval)
  await supabase
    .from('profiles')
    .update({
      company_name,
      contact_name,
      ruc: ruc || null,
      currency,
      active: false,
    })
    .eq('id', newUser.user.id)

  return NextResponse.json({ ok: true })
}
