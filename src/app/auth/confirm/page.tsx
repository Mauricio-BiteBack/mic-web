'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Handles implicit-flow tokens that land in the URL hash (#access_token=...)
// This happens with invite emails when Supabase is set to Implicit flow.
// Once you switch to PKCE in Supabase dashboard, /auth/callback handles it instead.
export default function AuthConfirmPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // onAuthStateChange fires immediately when there's a hash token
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          // Check if this is a first-time invite (no previous sign-in)
          const { data: { user } } = await supabase.auth.getUser()
          const isFirstLogin = user && !user.last_sign_in_at
          router.replace(isFirstLogin ? '/reset-password' : '/portal')
        }
      } else {
        router.replace('/login?error=link_invalido')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-[#E8078B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#6a7196] text-sm">Verificando acceso…</p>
      </div>
    </div>
  )
}
