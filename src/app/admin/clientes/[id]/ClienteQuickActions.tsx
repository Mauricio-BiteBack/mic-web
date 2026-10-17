'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Charge = {
  id: string
  description: string
  amount: number
  amount_paid: number
  currency: string
  status: string
}

type Props = {
  clientId: string
  clientEmail: string
  pendingCharges: Charge[]
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount)
}

type ModalType = 'email' | 'balance' | 'markpaid' | null

export default function ClienteQuickActions({ clientId, clientEmail, pendingCharges }: Props) {
  const router = useRouter()
  const [modal, setModal] = useState<ModalType>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Email modal state
  const [newEmail, setNewEmail] = useState(clientEmail)

  // Balance modal state
  const [selectedChargeId, setSelectedChargeId] = useState(pendingCharges[0]?.id ?? '')
  const [adjustAmount, setAdjustAmount] = useState('')
  const [adjustReason, setAdjustReason] = useState('')

  // Mark paid modal state
  const [markChargeId, setMarkChargeId] = useState(pendingCharges[0]?.id ?? '')
  const [markNotes, setMarkNotes] = useState('')

  function closeModal() {
    setModal(null)
    setError(null)
    setSuccess(null)
    setNewEmail(clientEmail)
    setAdjustAmount('')
    setAdjustReason('')
    setMarkNotes('')
  }

  async function handleUpdateEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!newEmail.trim() || newEmail === clientEmail) return
    setLoading(true)
    setError(null)
    const res = await fetch(`/api/admin/clientes/${clientId}/update-email`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newEmail.trim() }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Error al actualizar correo'); return }
    setSuccess('Correo actualizado correctamente')
    setTimeout(() => { closeModal(); router.refresh() }, 1500)
  }

  async function handleAdjustBalance(e: React.FormEvent) {
    e.preventDefault()
    const amount = Number(adjustAmount)
    if (!amount || amount <= 0 || !adjustReason.trim() || !selectedChargeId) return
    setLoading(true)
    setError(null)
    const res = await fetch(`/api/admin/clientes/${clientId}/adjust-balance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chargeId: selectedChargeId, amount, reason: adjustReason.trim() }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Error al ajustar saldo'); return }
    setSuccess('Ajuste aplicado correctamente')
    setTimeout(() => { closeModal(); router.refresh() }, 1500)
  }

  async function handleMarkPaid(e: React.FormEvent) {
    e.preventDefault()
    if (!markChargeId) return
    setLoading(true)
    setError(null)
    const res = await fetch(`/api/admin/clientes/${clientId}/mark-paid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chargeId: markChargeId, notes: markNotes.trim() }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Error al marcar como pagado'); return }
    setSuccess('Factura marcada como saldada')
    setTimeout(() => { closeModal(); router.refresh() }, 1500)
  }

  const selectedCharge = pendingCharges.find(c => c.id === selectedChargeId)
  const markCharge = pendingCharges.find(c => c.id === markChargeId)

  return (
    <>
      {/* Quick action buttons */}
      <div className="mt-8 border-t border-[#e5e7eb] pt-6">
        <h3 className="text-sm font-semibold text-[#0a1133] mb-4">Acciones rápidas</h3>
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => { setModal('email'); setError(null) }}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#e5e7eb] bg-white hover:bg-[#f6f7fb] transition-colors text-left"
          >
            <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-medium text-[#0a1133]">Editar Correo de Acceso</div>
              <div className="text-xs text-[#6a7196]">Actualiza el correo en Supabase Auth</div>
            </div>
          </button>

          <button
            onClick={() => { setModal('balance'); setError(null) }}
            disabled={pendingCharges.length === 0}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#e5e7eb] bg-white hover:bg-[#f6f7fb] transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-medium text-[#0a1133]">Ajustar Saldo / Descuento</div>
              <div className="text-xs text-[#6a7196]">Aplica un crédito o descuento a una factura</div>
            </div>
          </button>

          <button
            onClick={() => { setModal('markpaid'); setError(null) }}
            disabled={pendingCharges.length === 0}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#e5e7eb] bg-white hover:bg-[#f6f7fb] transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-medium text-[#0a1133]">Marcar Factura como Saldada</div>
              <div className="text-xs text-[#6a7196]">Para pagos fuera del portal (transferencia, efectivo)</div>
            </div>
          </button>
        </div>

        {pendingCharges.length === 0 && (
          <p className="text-xs text-[#9ca3af] mt-3">Sin facturas pendientes — las acciones de saldo no están disponibles.</p>
        )}
      </div>

      {/* Modal backdrop */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-[#e5e7eb]">
            {/* Edit email modal */}
            {modal === 'email' && (
              <form onSubmit={handleUpdateEmail}>
                <div className="px-6 py-5 border-b border-[#e5e7eb]">
                  <h2 className="text-base font-semibold text-[#0a1133]">Editar Correo de Acceso</h2>
                  <p className="text-xs text-[#6a7196] mt-1">Actualiza el email en Supabase Auth y en el perfil del cliente.</p>
                </div>
                <div className="px-6 py-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#6a7196] mb-1.5">Correo actual</label>
                    <p className="text-sm text-[#0a1133] bg-[#f6f7fb] px-3 py-2.5 rounded-lg border border-[#e5e7eb]">{clientEmail}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#0a1133] mb-1.5">Nuevo correo <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#0a1133] focus:outline-none focus:ring-2 focus:ring-[#193595]/20 focus:border-[#193595]"
                    />
                  </div>
                  {error && <p className="text-xs text-red-600">{error}</p>}
                  {success && <p className="text-xs text-green-600">{success}</p>}
                </div>
                <div className="px-6 py-4 border-t border-[#e5e7eb] flex gap-3">
                  <button type="submit" disabled={loading || newEmail === clientEmail}
                    className="flex-1 bg-[#193595] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#0a1133] transition-colors disabled:opacity-40">
                    {loading ? 'Guardando…' : 'Actualizar correo'}
                  </button>
                  <button type="button" onClick={closeModal} className="px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-sm text-[#6a7196] hover:bg-[#f6f7fb]">
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {/* Adjust balance modal */}
            {modal === 'balance' && (
              <form onSubmit={handleAdjustBalance}>
                <div className="px-6 py-5 border-b border-[#e5e7eb]">
                  <h2 className="text-base font-semibold text-[#0a1133]">Ajustar Saldo / Descuento</h2>
                  <p className="text-xs text-[#6a7196] mt-1">Aplica un crédito que reduce el saldo pendiente. Se registra en el historial de auditoría.</p>
                </div>
                <div className="px-6 py-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#0a1133] mb-1.5">Factura <span className="text-red-500">*</span></label>
                    <select
                      value={selectedChargeId}
                      onChange={e => setSelectedChargeId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#0a1133] focus:outline-none focus:ring-2 focus:ring-[#193595]/20 focus:border-[#193595]"
                    >
                      {pendingCharges.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.description} — pendiente: {formatCurrency(c.amount - c.amount_paid, c.currency)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedCharge && (
                    <div className="bg-[#f6f7fb] rounded-lg px-3 py-2 text-xs text-[#6a7196]">
                      Total: {formatCurrency(selectedCharge.amount, selectedCharge.currency)} · Abonado: {formatCurrency(selectedCharge.amount_paid, selectedCharge.currency)} · Pendiente: {formatCurrency(selectedCharge.amount - selectedCharge.amount_paid, selectedCharge.currency)}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-[#0a1133] mb-1.5">Monto a descontar ({selectedCharge?.currency ?? 'USD'}) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      value={adjustAmount}
                      onChange={e => setAdjustAmount(e.target.value)}
                      required
                      min="0.01"
                      max={selectedCharge ? (selectedCharge.amount - selectedCharge.amount_paid).toFixed(2) : undefined}
                      step="0.01"
                      placeholder="0.00"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#0a1133] focus:outline-none focus:ring-2 focus:ring-[#193595]/20 focus:border-[#193595]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#0a1133] mb-1.5">Motivo <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={adjustReason}
                      onChange={e => setAdjustReason(e.target.value)}
                      required
                      placeholder="Ej: Descuento por pago anticipado"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#0a1133] focus:outline-none focus:ring-2 focus:ring-[#193595]/20 focus:border-[#193595]"
                    />
                  </div>
                  {error && <p className="text-xs text-red-600">{error}</p>}
                  {success && <p className="text-xs text-green-600">{success}</p>}
                </div>
                <div className="px-6 py-4 border-t border-[#e5e7eb] flex gap-3">
                  <button type="submit" disabled={loading || !adjustAmount || !adjustReason.trim()}
                    className="flex-1 bg-amber-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-40">
                    {loading ? 'Aplicando…' : 'Aplicar ajuste'}
                  </button>
                  <button type="button" onClick={closeModal} className="px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-sm text-[#6a7196] hover:bg-[#f6f7fb]">
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {/* Mark as paid modal */}
            {modal === 'markpaid' && (
              <form onSubmit={handleMarkPaid}>
                <div className="px-6 py-5 border-b border-[#e5e7eb]">
                  <h2 className="text-base font-semibold text-[#0a1133]">Marcar Factura como Saldada</h2>
                  <p className="text-xs text-[#6a7196] mt-1">Para pagos recibidos fuera del portal. Se registra un pago manual y la factura queda como pagada.</p>
                </div>
                <div className="px-6 py-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#0a1133] mb-1.5">Factura <span className="text-red-500">*</span></label>
                    <select
                      value={markChargeId}
                      onChange={e => setMarkChargeId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#0a1133] focus:outline-none focus:ring-2 focus:ring-[#193595]/20 focus:border-[#193595]"
                    >
                      {pendingCharges.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.description} — {formatCurrency(c.amount - c.amount_paid, c.currency)} pendiente
                        </option>
                      ))}
                    </select>
                  </div>
                  {markCharge && (
                    <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
                      <p className="text-xs text-green-800 font-medium">Se registrará un pago de <span className="font-bold">{formatCurrency(markCharge.amount - markCharge.amount_paid, markCharge.currency)}</span> y la factura quedará como <strong>Pagado</strong>.</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-[#0a1133] mb-1.5">Notas / Referencia de transferencia</label>
                    <input
                      type="text"
                      value={markNotes}
                      onChange={e => setMarkNotes(e.target.value)}
                      placeholder="Ej: Transf. BCP #123456"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#0a1133] focus:outline-none focus:ring-2 focus:ring-[#193595]/20 focus:border-[#193595]"
                    />
                  </div>
                  {error && <p className="text-xs text-red-600">{error}</p>}
                  {success && <p className="text-xs text-green-600">{success}</p>}
                </div>
                <div className="px-6 py-4 border-t border-[#e5e7eb] flex gap-3">
                  <button type="submit" disabled={loading || !markChargeId}
                    className="flex-1 bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-40">
                    {loading ? 'Procesando…' : 'Marcar como saldada'}
                  </button>
                  <button type="button" onClick={closeModal} className="px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-sm text-[#6a7196] hover:bg-[#f6f7fb]">
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
