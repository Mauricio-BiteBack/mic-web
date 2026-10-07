'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [googlePending, setGooglePending] = useState(false)
  const searchParams = useSearchParams()
  const redirectParam = searchParams.get('redirect')

  async function handleGoogle() {
    setGooglePending(true)
    setError(null)
    const supabase = createClient()
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirectParam || '/portal'}`,
      },
    })
    if (oauthError) {
      setError('Error al iniciar sesión con Google')
      setGooglePending(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setPending(true)

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError || !data.user) {
      setError('Email o contraseña incorrectos')
      setPending(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, active')
      .eq('id', data.user.id)
      .single()

    if (profile && !profile.active) {
      await supabase.auth.signOut()
      setError('Tu cuenta está desactivada. Contacta a soporte.')
      setPending(false)
      return
    }

    const dest = redirectParam || (profile?.role === 'admin' ? '/admin' : '/portal')
    window.location.href = dest
  }

  return (
    <div className="space-y-5">
      {/* Google login */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={googlePending || pending}
        className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-white border border-[#e5e7eb] hover:bg-[#f6f7fb] disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-colors text-sm font-medium text-[#0a1133] shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {googlePending ? 'Redirigiendo…' : 'Entrar con Google'}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#e5e7eb]" />
        <span className="text-xs text-[#6a7196]">o con contraseña</span>
        <div className="flex-1 h-px bg-[#e5e7eb]" />
      </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="tucorreo@empresa.com"
          className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] placeholder-[#6a7196] focus:outline-none focus:ring-2 focus:ring-[#E8078B]/30 focus:border-[#E8078B] transition text-sm"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-[#0a1133]">
            Contraseña
          </label>
          <Link href="/forgot-password" className="text-xs text-[#193595] hover:text-[#E8078B] transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] placeholder-[#6a7196] focus:outline-none focus:ring-2 focus:ring-[#E8078B]/30 focus:border-[#E8078B] transition text-sm"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 px-6 bg-[#E8078B] hover:bg-[#ff1e9f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm shadow-[0_4px_14px_rgba(232,7,139,0.35)]"
      >
        {pending ? 'Ingresando…' : 'Ingresar'}
      </button>
    </form>
    </div>
  )
}
