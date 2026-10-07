import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const cookiesToSet: { name: string; value: string; options: Record<string, unknown> }[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            cookiesToSet.push({ name, value, options: options ?? {} })
          })
        },
      },
    }
  )

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.user) {
    return NextResponse.json({ ok: false, error: 'Email o contraseña incorrectos' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, active')
    .eq('id', data.user.id)
    .single()

  if (profile && !profile.active) {
    return NextResponse.json({ ok: false, error: 'Tu cuenta está desactivada.' }, { status: 403 })
  }

  const dest = profile?.role === 'admin' ? '/admin' : '/portal'
  const res = NextResponse.json({ ok: true, redirect: dest })

  // Set cookies with SameSite=lax so they are sent on the next navigation
  cookiesToSet.forEach(({ name, value }) => {
    res.cookies.set({
      name,
      value,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // localhost — no HTTPS
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  })

  console.log('[login] cookies set:', cookiesToSet.map(c => c.name).join(', '))

  return res
}
