'use client'

import { useActionState } from 'react'
import { forgotPassword, type ActionState } from '@/app/actions/auth'

export default function ForgotPasswordForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(forgotPassword, undefined)

  if (state?.success) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[#0a1133] font-medium">{state.success}</p>
        <p className="text-[#6a7196] text-sm mt-2">Revisa también tu carpeta de spam.</p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Email de tu cuenta
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

      {state?.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 px-6 bg-[#E8078B] hover:bg-[#ff1e9f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm shadow-[0_4px_14px_rgba(232,7,139,0.35)]"
      >
        {pending ? 'Enviando…' : 'Enviar link de recuperación'}
      </button>
    </form>
  )
}
