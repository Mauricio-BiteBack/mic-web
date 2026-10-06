'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const searchParams = useSearchParams()
  const redirectParam = searchParams.get('redirect')

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
  )
}
