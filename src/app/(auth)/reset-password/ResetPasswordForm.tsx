'use client'

import { useActionState } from 'react'
import { resetPassword, type ActionState } from '@/app/actions/auth'

export default function ResetPasswordForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(resetPassword, undefined)

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Nueva contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Mínimo 8 caracteres"
          className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] placeholder-[#6a7196] focus:outline-none focus:ring-2 focus:ring-[#E8078B]/30 focus:border-[#E8078B] transition text-sm"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Repite la contraseña"
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
        {pending ? 'Guardando…' : 'Guardar nueva contraseña'}
      </button>
    </form>
  )
}
