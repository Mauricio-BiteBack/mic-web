'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Client = {
  id: string
  email: string
  company_name: string
  contact_name: string
  ruc: string | null
  currency: string
  active: boolean
}

export default function ClienteForm({ client }: { client?: Client }) {
  const router = useRouter()
  const isEdit = !!client

  const [form, setForm] = useState({
    email: client?.email ?? '',
    password: '',
    company_name: client?.company_name ?? '',
    contact_name: client?.contact_name ?? '',
    ruc: client?.ruc ?? '',
    currency: client?.currency ?? 'USD',
    active: client?.active ?? true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const url = isEdit ? `/api/admin/clientes/${client.id}` : '/api/admin/clientes'
    const method = isEdit ? 'PATCH' : 'POST'
    const body = isEdit
      ? { company_name: form.company_name, contact_name: form.contact_name, ruc: form.ruc, currency: form.currency, active: form.active }
      : { email: form.email, password: form.password, company_name: form.company_name, contact_name: form.contact_name, ruc: form.ruc, currency: form.currency }

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Error inesperado')
      return
    }

    router.push('/admin/clientes')
    router.refresh()
  }

  async function handleDelete() {
    if (!client) return
    if (!confirm(`¿Desactivar a ${client.company_name || client.email}? Puede reactivarlo después.`)) return
    setLoading(true)
    await fetch(`/api/admin/clientes/${client.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: false }),
    })
    setLoading(false)
    router.push('/admin/clientes')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!isEdit && (
        <>
          <Field label="Email" required>
            <input
              type="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              required
              className={inputCls}
              placeholder="cliente@empresa.com"
            />
          </Field>
          <Field label="Contraseña temporal" required>
            <input
              type="password"
              value={form.password}
              onChange={e => set('password', e.target.value)}
              required
              minLength={8}
              className={inputCls}
              placeholder="Mínimo 8 caracteres"
            />
          </Field>
        </>
      )}

      <Field label="Empresa">
        <input
          type="text"
          value={form.company_name}
          onChange={e => set('company_name', e.target.value)}
          className={inputCls}
          placeholder="Razón social"
        />
      </Field>

      <Field label="Nombre de contacto">
        <input
          type="text"
          value={form.contact_name}
          onChange={e => set('contact_name', e.target.value)}
          className={inputCls}
          placeholder="Nombre completo"
        />
      </Field>

      <Field label="RUC">
        <input
          type="text"
          value={form.ruc}
          onChange={e => set('ruc', e.target.value)}
          className={inputCls}
          placeholder="20XXXXXXXXX"
          maxLength={11}
        />
      </Field>

      <Field label="Moneda por defecto">
        <select value={form.currency} onChange={e => set('currency', e.target.value)} className={inputCls}>
          <option value="USD">USD — Dólares</option>
          <option value="PEN">PEN — Soles</option>
        </select>
      </Field>

      {isEdit && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => set('active', !form.active)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.active ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.active ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="text-sm text-[#0a1133]">{form.active ? 'Cliente activo' : 'Cliente inactivo'}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#193595] text-white text-sm font-medium py-3 rounded-xl hover:bg-[#0a1133] transition-colors disabled:opacity-50"
        >
          {loading ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear cliente'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm text-[#6a7196] hover:bg-[#f6f7fb] transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

const inputCls = 'w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] text-sm focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition'

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
