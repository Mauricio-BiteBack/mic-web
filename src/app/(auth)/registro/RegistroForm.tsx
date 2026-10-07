'use client'

import { useState } from 'react'

type Step = 'form' | 'pending'

export default function RegistroForm() {
  const [step, setStep] = useState<Step>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    email: '',
    password: '',
    company_name: '',
    contact_name: '',
    ruc: '',
    currency: 'USD',
  })

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    setLoading(true)
    setError(null)

    const res = await fetch('/api/auth/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Error al crear la cuenta')
      return
    }

    setStep('pending')
  }

  if (step === 'pending') {
    return (
      <div className="text-center py-4">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-[#0a1133] mb-2">¡Solicitud enviada!</h2>
        <p className="text-sm text-[#6a7196]">
          Tu cuenta está siendo revisada por nuestro equipo. Te avisaremos por email cuando esté activa.
        </p>
        <p className="text-xs text-[#6a7196] mt-3">
          ¿Dudas? Escríbenos a{' '}
          <a href="mailto:info@mic.pe" className="text-[#193595] hover:underline">info@mic.pe</a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={e => set('email', e.target.value)}
          required
          placeholder="tucorreo@empresa.com"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Contraseña <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          value={form.password}
          onChange={e => set('password', e.target.value)}
          required
          minLength={8}
          placeholder="Mínimo 8 caracteres"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Empresa <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.company_name}
          onChange={e => set('company_name', e.target.value)}
          required
          placeholder="Razón social"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Nombre de contacto
        </label>
        <input
          type="text"
          value={form.contact_name}
          onChange={e => set('contact_name', e.target.value)}
          placeholder="Tu nombre completo"
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-[#0a1133] mb-1.5">RUC</label>
          <input
            type="text"
            value={form.ruc}
            onChange={e => set('ruc', e.target.value)}
            placeholder="20XXXXXXXXX"
            maxLength={11}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0a1133] mb-1.5">Moneda</label>
          <select value={form.currency} onChange={e => set('currency', e.target.value)} className={inputCls}>
            <option value="USD">USD</option>
            <option value="PEN">PEN</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#E8078B] hover:bg-[#ff1e9f] disabled:opacity-50 text-white font-semibold rounded-xl transition-colors text-sm shadow-[0_4px_14px_rgba(232,7,139,0.35)]"
      >
        {loading ? 'Enviando solicitud…' : 'Solicitar acceso'}
      </button>
    </form>
  )
}

const inputCls = 'w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] text-sm focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition placeholder-[#6a7196]'
