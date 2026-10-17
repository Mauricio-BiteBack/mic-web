import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

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

  const { id } = await params
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Email inválido' }, { status: 400 })

  const { email } = parsed.data
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // Update Supabase Auth user email
  const { error: authError } = await supabase.auth.admin.updateUserById(id, { email })
  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

  // Update profiles.email
  const { error: profileError } = await supabase.from('profiles').update({ email }).eq('id', id)
  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 400 })

  // Audit log
  await supabase.from('audit_logs').insert({
    actor_id: admin.id,
    action: 'update_email',
    target_type: 'profile',
    target_id: id,
    metadata: { new_email: email },
  })

  return NextResponse.json({ ok: true })
}
