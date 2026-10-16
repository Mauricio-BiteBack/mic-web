'use client'

import { useState } from 'react'

type Step = 'form' | 'pending'
type LoadingState = 'idle' | 'validating' | 'registering'
type ErrorType = 'crm_not_found' | 'service_error' | 'generic' | null

export default function RegistroForm() {
  const [step, setStep] = useState<Step>('form')
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')
  const [error, setError] = useState<string | null>(null)
  const [errorType, setErrorType] = useState<ErrorType>(null)
  const [form, setForm] = useState({
    email: '',
    password: '',
    company_name: '',
    contact_name: '',
    ruc: '',
    currency: 'USD',
  })

  const loading = loadingState !== 'idle'

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError(null)
    setErrorType(null)
  }

  function setErr(msg: string, type: ErrorType) {
    setError(msg)
    setErrorType(type)
    setLoadingState('idle')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password.length < 8) {
      setErr('La contraseña debe tener al menos 8 caracteres', 'generic')
      return
    }

    setError(null)
    setErrorType(null)

    // Step 1: validate email against Odoo CRM via n8n
    setLoadingState('validating')
    let odoo_partner_id: string | null = null

    try {
      const validationRes = await fetch('/api/auth/validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      })

      if (validationRes.status === 504) {
        setErr('No pudimos verificar tu correo en este momento. Por favor reintenta en unos minutos o contacta a soporte.', 'service_error')
        return
      }

      if (!validationRes.ok) {
        setErr('No pudimos verificar tu correo en este momento. Por favor reintenta en unos minutos o contacta a soporte.', 'service_error')
        return
      }

      const validation = await validationRes.json()

      if (!validation.valid) {
        setErr('crm_not_found', 'crm_not_found')
        return
      }

      odoo_partner_id = validation.odoo_partner_id ? String(validation.odoo_partner_id) : null
    } catch {
      setErr('No pudimos verificar tu correo en este momento. Por favor reintenta en unos minutos o contacta a soporte.', 'service_error')
      return
    }

    // Step 2: create account in Supabase
    setLoadingState('registering')

    try {
      const res = await fetch('/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, odoo_partner_id }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErr(data.error || 'Error al crear la cuenta', 'generic')
        return
      }

      setStep('pending')
    } catch {
      setErr('Error de conexión. Por favor reintenta.', 'generic')
    }
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
          <a href="mailto:soporte@mic.pe" className="text-[#193595] hover:underline">soporte@mic.pe</a>
        </p>
      </div>
    )
  }

  const mailtoHref = `mailto:soporte@mic.pe?subject=${encodeURIComponent(
    `Solicitud de Acceso al Portal de Clientes - ${form.email}`
  )}&body=${encodeURIComponent(
    `Hola equipo de soporte,\n\nSoy representante de la empresa ${form.company_name || '[mi empresa]'} y deseo solicitar el acceso al portal de clientes para el correo ${form.email}.\n\nPor favor su ayuda habilitando mi cuenta.\n\nSaludos.`
  )}`

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
          <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
            Tax ID / RUC / Doc. Identidad
            {form.currency === 'PEN' && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          <input
            type="text"
            value={form.ruc}
            onChange={e => set('ruc', e.target.value)}
            placeholder={form.currency === 'PEN' ? '20XXXXXXXXX' : 'Opcional'}
            maxLength={20}
            required={form.currency === 'PEN'}
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

      {error && errorType === 'crm_not_found' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
          <p className="font-medium mb-1">Correo no encontrado en nuestro sistema</p>
          <p className="text-xs text-amber-700 mb-3">
            Tu correo electrónico no está registrado como cliente internacional en nuestro CRM. Si ya eres cliente MIC, contacta a soporte para habilitar tu acceso.
          </p>
          <a
            href={mailtoHref}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contactar soporte vía email
          </a>
        </div>
      )}

      {error && errorType !== 'crm_not_found' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#E8078B] hover:bg-[#ff1e9f] disabled:opacity-50 text-white font-semibold rounded-xl transition-colors text-sm shadow-[0_4px_14px_rgba(232,7,139,0.35)]"
      >
        {loadingState === 'validating' && 'Verificando cuenta…'}
        {loadingState === 'registering' && 'Enviando solicitud…'}
        {loadingState === 'idle' && 'Solicitar acceso'}
      </button>
    </form>
  )
}

const inputCls = 'w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] text-sm focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition placeholder-[#6a7196]'
