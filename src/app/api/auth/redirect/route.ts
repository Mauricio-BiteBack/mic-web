import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

/**
 * GET /api/auth/redirect
 *
 * Called after a successful client-side signInWithPassword.
 * Uses the service role key (bypasses RLS) to read the user's role,
 * then redirects to /admin or /portal accordingly.
 *
 * Admins always go to /admin — the redirectParam is intentionally ignored
 * so that a stale ?redirect=/portal in the URL never traps an admin in
 * the client portal.
 */
export async function GET(request: NextRequest) {
  const { origin, searchParams } = new URL(request.url)
  const fallbackRedirect = searchParams.get('fallback') ?? '/portal'

  // Read the session from cookies (set by the browser Supabase client after signInWithPassword)
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: () => {},
      },
    }
  )

  const { data: { user } } = await supabaseAuth.auth.getUser()

  if (!user) {
    return NextResponse.redirect(`${origin}/login`)
  }

  // Use service role to bypass RLS — guaranteed to get the real role
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile } = await adminClient
    .from('profiles')
    .select('role, active')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.active) {
    await supabaseAuth.auth.signOut()
    return NextResponse.redirect(`${origin}/login?error=cuenta_inactiva`)
  }

  // Admins always go to /admin — never trust a client-supplied redirectParam for admins
  const dest = profile.role === 'admin' ? '/admin' : fallbackRedirect
  return NextResponse.redirect(`${origin}${dest}`)
}
