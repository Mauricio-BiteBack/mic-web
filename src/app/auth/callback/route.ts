import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/portal'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return NextResponse.redirect(`${origin}/login?error=sin_usuario`)

      const isOAuth = user.app_metadata?.provider !== 'email'

      if (isOAuth) {
        // Verify email is a registered client
        const adminClient = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        const { data: profile } = await adminClient
          .from('profiles')
          .select('id, active, role')
          .eq('email', user.email!)
          .single()

        if (!profile) {
          // Not a registered client — sign out and redirect
          await supabase.auth.signOut()
          return NextResponse.redirect(`${origin}/sin-acceso`)
        }

        if (!profile.active) {
          await supabase.auth.signOut()
          return NextResponse.redirect(`${origin}/sin-acceso?razon=inactivo`)
        }

        // Profile exists — redirect based on role
        const dest = profile.role === 'admin' ? '/admin' : next
        return NextResponse.redirect(`${origin}${dest}`)
      }

      // Password login invite flow
      const isInvite = user.app_metadata?.provider === 'email' && !user.last_sign_in_at
      if (isInvite) {
        return NextResponse.redirect(`${origin}/reset-password`)
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=link_invalido`)
}
