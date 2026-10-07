'use client'

type Payment = {
  id: string
  amount: number
  currency: string
  status: string
  paid_at: string | null
  paypal_order_id: string | null
  charges: { description: string; amount: number } | null
  profiles: { company_name: string; contact_name: string; email: string } | null
}

function exportCSV(payments: Payment[]) {
  const headers = ['Fecha', 'Cliente', 'Email', 'Descripción', 'Monto', 'Moneda', 'PayPal Order ID']
  const rows = payments.map(p => [
    p.paid_at ? new Date(p.paid_at).toLocaleString('es-PE') : '',
    p.profiles?.company_name || p.profiles?.contact_name || '',
    p.profiles?.email || '',
    p.charges?.description || '',
    Number(p.amount).toFixed(2),
    p.currency,
    p.paypal_order_id || '',
  ])
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pagos_mic_${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function PagosClient({ payments }: { payments: Payment[] }) {
  const totalUSD = payments.filter(p => p.currency === 'USD').reduce((s, p) => s + Number(p.amount), 0)
  const totalPEN = payments.filter(p => p.currency === 'PEN').reduce((s, p) => s + Number(p.amount), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1133]">Pagos</h1>
          <p className="text-sm text-[#6a7196] mt-1">{payments.length} pago{payments.length !== 1 ? 's' : ''} completado{payments.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => exportCSV(payments)}
          className="flex items-center gap-2 bg-white border border-[#e5e7eb] text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#f6f7fb] transition-colors text-[#0a1133]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exportar CSV
        </button>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
          <div className="text-xs text-[#6a7196] mb-1">Total cobrado USD</div>
          <div className="text-xl font-bold text-green-600">${totalUSD.toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
          <div className="text-xs text-[#6a7196] mb-1">Total cobrado PEN</div>
          <div className="text-xl font-bold text-green-600">S/ {totalPEN.toFixed(2)}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
        {payments.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-[#6a7196]">No hay pagos registrados aún.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f6f7fb]">
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Fecha</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Cliente</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Concepto</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Monto</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">PayPal ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f1f5]">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-[#f6f7fb] transition-colors">
                    <td className="px-6 py-4 text-[#6a7196] whitespace-nowrap">
                      {p.paid_at ? new Date(p.paid_at).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#0a1133]">{p.profiles?.company_name || p.profiles?.contact_name || '—'}</div>
                      <div className="text-xs text-[#6a7196]">{p.profiles?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-[#6a7196] max-w-[200px] truncate">{p.charges?.description ?? '—'}</td>
                    <td className="px-6 py-4 font-semibold text-green-700">
                      {p.currency === 'USD' ? '$' : 'S/ '}{Number(p.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#6a7196] font-mono truncate max-w-[140px]">
                      {p.paypal_order_id ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
