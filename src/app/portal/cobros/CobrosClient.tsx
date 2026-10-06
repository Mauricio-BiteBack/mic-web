'use client'

import { useState } from 'react'
import Link from 'next/link'

type Charge = {
  id: string
  description: string
  amount: number
  amount_paid: number
  currency: string
  due_date: string
  status: string
}

const STATUS_FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'parcial', label: 'Parcial' },
  { value: 'vencido', label: 'Vencido' },
  { value: 'pagado', label: 'Pagado' },
]

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount)
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateStr + 'T00:00:00'))
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    pendiente: { label: 'Pendiente', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    parcial: { label: 'Parcial', className: 'bg-blue-50 text-blue-700 border-blue-200' },
    pagado: { label: 'Pagado', className: 'bg-green-50 text-green-700 border-green-200' },
    vencido: { label: 'Vencido', className: 'bg-red-50 text-red-700 border-red-200' },
  }
  const s = map[status] ?? { label: status, className: 'bg-gray-50 text-gray-700 border-gray-200' }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${s.className}`}>
      {s.label}
    </span>
  )
}

export default function CobrosClient({ charges }: { charges: Charge[] }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? charges : charges.filter(c => c.status === filter)
  const canPay = (c: Charge) => c.status === 'pendiente' || c.status === 'parcial' || c.status === 'vencido'

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUS_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
              filter === f.value
                ? 'bg-[#E8078B] text-white border-[#E8078B] shadow-[0_2px_8px_rgba(232,7,139,0.25)]'
                : 'bg-white text-[#6a7196] border-[#e5e7eb] hover:border-[#193595] hover:text-[#193595]'
            }`}
          >
            {f.label}
            {f.value !== 'all' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({charges.filter(c => c.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-12 text-center">
          <svg className="w-12 h-12 text-[#e5e7eb] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-[#6a7196] text-sm">No hay cobros con este estado.</p>
        </div>
      )}

      {/* Charges list */}
      {filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
          <div className="divide-y divide-[#e5e7eb]">
            {filtered.map((charge) => {
              const pending = charge.amount - charge.amount_paid
              return (
                <div key={charge.id} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#0a1133]">{charge.description}</p>
                        <p className="text-xs text-[#6a7196] mt-1">
                          Vencimiento: {formatDate(charge.due_date)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-base font-bold text-[#0a1133]">{formatCurrency(charge.amount, charge.currency)}</p>
                      {charge.amount_paid > 0 && (
                        <p className="text-xs text-green-600">
                          Abonado: {formatCurrency(charge.amount_paid, charge.currency)}
                        </p>
                      )}
                      {charge.amount_paid > 0 && pending > 0 && (
                        <p className="text-xs text-[#6a7196]">
                          Pendiente: {formatCurrency(pending, charge.currency)}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={charge.status} />
                    {canPay(charge) && (
                      <Link
                        href={`/portal/cobros/${charge.id}/pagar`}
                        className="px-4 py-2 bg-[#E8078B] hover:bg-[#ff1e9f] text-white text-xs font-semibold rounded-xl transition-colors shadow-[0_2px_8px_rgba(232,7,139,0.25)] whitespace-nowrap"
                      >
                        Pagar
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
