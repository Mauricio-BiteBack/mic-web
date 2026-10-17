'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Payment = {
  id: string
  amount: number
  currency: string
  status: string
  method: string | null
  paid_at: string | null
  paypal_order_id: string | null
  notes: string | null
  charges: { description: string; amount: number } | null
  profiles: { company_name: string; contact_name: string; email: string } | null
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount)
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateStr))
}

const methodLabel: Record<string, string> = {
  paypal: 'PayPal',
  manual: 'Manual',
  transfer: 'Transferencia',
  sepa: 'SEPA',
}

export default function ConciliacionClient({ payments }: { payments: Payment[] }) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [rejectModal, setRejectModal] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleApprove(paymentId: string) {
    setLoadingId(paymentId)
    setErrors(prev => ({ ...prev, [paymentId]: '' }))
    const res = await fetch(`/api/admin/payments/${paymentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'approve' }),
    })
    const data = await res.json()
    setLoadingId(null)
    if (!res.ok) {
      setErrors(prev => ({ ...prev, [paymentId]: data.error || 'Error al aprobar' }))
      return
    }
    router.refresh()
  }

  async function handleReject() {
    if (!rejectModal) return
    setLoadingId(rejectModal)
    const res = await fetch(`/api/admin/payments/${rejectModal}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reject', notes: rejectReason.trim() }),
    })
    const data = await res.json()
    setLoadingId(null)
    if (!res.ok) {
      setErrors(prev => ({ ...prev, [rejectModal]: data.error || 'Error al rechazar' }))
      return
    }
    setRejectModal(null)
    setRejectReason('')
    router.refresh()
  }

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-12 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-medium text-[#0a1133]">Sin pagos pendientes de conciliación</p>
        <p className="text-xs text-[#6a7196] mt-1">Todos los pagos han sido procesados.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {payments.map((p) => {
          const clientName = p.profiles?.company_name || p.profiles?.contact_name || '—'
          const isLoading = loadingId === p.id
          return (
            <div key={p.id} className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  {/* Client + amount header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div>
                      <p className="text-sm font-semibold text-[#0a1133]">{clientName}</p>
                      <p className="text-xs text-[#6a7196]">{p.profiles?.email}</p>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <div>
                      <p className="text-xs text-[#9ca3af] mb-0.5">Monto</p>
                      <p className="text-sm font-bold text-[#0a1133]">{formatCurrency(p.amount, p.currency)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#9ca3af] mb-0.5">Método</p>
                      <p className="text-sm text-[#0a1133]">{methodLabel[p.method ?? 'manual'] ?? p.method}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-[#9ca3af] mb-0.5">Concepto</p>
                      <p className="text-sm text-[#0a1133] truncate">{p.charges?.description ?? '—'}</p>
                    </div>
                    {p.paypal_order_id && (
                      <div className="col-span-2 sm:col-span-4">
                        <p className="text-xs text-[#9ca3af] mb-0.5">ID PayPal</p>
                        <p className="text-xs font-mono text-[#6a7196]">{p.paypal_order_id}</p>
                      </div>
                    )}
                    {p.notes && (
                      <div className="col-span-2 sm:col-span-4">
                        <p className="text-xs text-[#9ca3af] mb-0.5">Notas</p>
                        <p className="text-xs text-[#6a7196]">{p.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleApprove(p.id)}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap shadow-sm"
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    Aprobar y Confirmar
                  </button>
                  <button
                    onClick={() => { setRejectModal(p.id); setRejectReason('') }}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-sm font-medium rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Rechazar / Reclamar
                  </button>
                </div>
              </div>

              {errors[p.id] && (
                <p className="text-xs text-red-600 mt-2">{errors[p.id]}</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Reject modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={e => { if (e.target === e.currentTarget) setRejectModal(null) }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-[#e5e7eb]">
            <div className="px-6 py-5 border-b border-[#e5e7eb]">
              <h2 className="text-base font-semibold text-[#0a1133]">Rechazar pago</h2>
              <p className="text-xs text-[#6a7196] mt-1">El pago quedará en estado fallido. Puedes incluir una razón para el registro.</p>
            </div>
            <div className="px-6 py-5">
              <label className="block text-xs font-medium text-[#0a1133] mb-1.5">Motivo / Notas (opcional)</label>
              <input
                type="text"
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Ej: Datos de transferencia incorrectos"
                className="w-full px-3 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#0a1133] focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400"
              />
            </div>
            <div className="px-6 py-4 border-t border-[#e5e7eb] flex gap-3">
              <button
                onClick={handleReject}
                disabled={loadingId === rejectModal}
                className="flex-1 bg-red-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loadingId === rejectModal ? 'Procesando…' : 'Confirmar rechazo'}
              </button>
              <button
                onClick={() => setRejectModal(null)}
                className="px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-sm text-[#6a7196] hover:bg-[#f6f7fb]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
