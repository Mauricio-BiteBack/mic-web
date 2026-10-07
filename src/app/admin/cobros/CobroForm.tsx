'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Client = { id: string; email: string; company_name: string; contact_name: string; currency: string }

type Charge = {
  id: string
  client_id: string
  description: string
  amount: number
  amount_paid: number
  currency: string
  due_date: string
  status: string
}

export default function CobroForm({ clients, charge }: { clients: Client[]; charge?: Charge }) {
  const router = useRouter()
  const isEdit = !!charge

  const [form, setForm] = useState({
    client_id: charge?.client_id ?? '',
    description: charge?.description ?? '',
    amount: charge ? String(charge.amount) : '',
    currency: charge?.currency ?? 'USD',
    due_date: charge?.due_date ? charge.due_date.split('T')[0] : '',
    status: charge?.status ?? 'pendiente',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  // Auto-fill currency when client changes
  function handleClientChange(clientId: string) {
    const client = clients.find(c => c.id === clientId)
    setForm(prev => ({ ...prev, client_id: clientId, currency: client?.currency ?? prev.currency }))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.client_id) { setError('Selecciona un cliente'); return }
    if (!form.amount || Number(form.amount) <= 0) { setError('El monto debe ser mayor a 0'); return }
    if (!form.due_date) { setError('Ingresa la fecha de vencimiento'); return }

    setLoading(true)
    setError(null)

    const url = isEdit ? `/api/admin/cobros/${charge.id}` : '/api/admin/cobros'
    const method = isEdit ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: form.client_id,
        description: form.description,
        amount: Number(form.amount),
        currency: form.currency,
        due_date: form.due_date,
        status: form.status,
      }),
    })
    const data = await res.json()
    setLoading(false)

    if (!res.ok) { setError(data.error || 'Error inesperado'); return }

    router.push('/admin/cobros')
    router.refresh()
  }

  async function handleDelete() {
    if (!charge) return
    if (!confirm('¿Eliminar este cobro? Esta acción no se puede deshacer.')) return
    setLoading(true)
    await fetch(`/api/admin/cobros/${charge.id}`, { method: 'DELETE' })
    setLoading(false)
    router.push('/admin/cobros')
    router.refresh()
  }

  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Cliente <span className="text-red-500">*</span>
        </label>
        <select
          value={form.client_id}
          onChange={e => handleClientChange(e.target.value)}
          disabled={isEdit}
          className={inputCls}
        >
          <option value="">Seleccionar cliente…</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>
              {c.company_name || c.contact_name || c.email}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Descripción <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.description}
          onChange={e => set('description', e.target.value)}
          required
          className={inputCls}
          placeholder="Ej: Servicio de streaming — Octubre 2026"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
            Monto <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={form.amount}
            onChange={e => set('amount', e.target.value)}
            required
            min="0.01"
            step="0.01"
            className={inputCls}
            placeholder="0.00"
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

      <div>
        <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Vencimiento <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={form.due_date}
          onChange={e => set('due_date', e.target.value)}
          required
          min={todayStr}
          className={inputCls}
        />
      </div>

      {isEdit && (
        <div>
          <label className="block text-sm font-medium text-[#0a1133] mb-1.5">Estado</label>
          <select value={form.status} onChange={e => set('status', e.target.value)} className={inputCls}>
            <option value="pendiente">Pendiente</option>
            <option value="parcial">Parcial</option>
            <option value="pagado">Pagado</option>
            <option value="vencido">Vencido</option>
          </select>
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
          {loading ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear cobro'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm text-[#6a7196] hover:bg-[#f6f7fb] transition-colors"
        >
          Cancelar
        </button>
      </div>

      {isEdit && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="w-full py-3 rounded-xl border border-red-200 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          Eliminar cobro
        </button>
      )}
    </form>
  )
}

const inputCls = 'w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] text-sm focus:outline-none focus:ring-2 focus:ring-[#193595]/30 focus:border-[#193595] transition'
