import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import PrintReceiptButton from './PrintReceiptButton'

export const metadata = { title: 'Historial de pagos — Portal MIC' }

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount)
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(dateStr))
}

export default async function PagosPage() {
  const headersList = await headers()
  const userId = headersList.get('x-user-id') ?? ''
  if (!userId) redirect('/login')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: payments } = await supabase
    .from('payments')
    .select('*, charges(description)')
    .eq('client_id', userId)
    .eq('status', 'completed')
    .order('paid_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0a1133] mb-1">Historial de pagos</h1>
      <p className="text-[#6a7196] text-sm mb-8">Registro de todos tus pagos completados</p>

      {(!payments || payments.length === 0) ? (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-12 text-center">
          <svg className="w-12 h-12 text-[#e5e7eb] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-[#6a7196] text-sm font-medium">Sin pagos registrados aún</p>
          <p className="text-xs text-[#6a7196] mt-1">Tus pagos completados aparecerán aquí.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f6f7fb]">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[#6a7196] uppercase tracking-wide whitespace-nowrap">Fecha y Hora</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[#6a7196] uppercase tracking-wide">Concepto</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[#6a7196] uppercase tracking-wide whitespace-nowrap">Monto / Moneda</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[#6a7196] uppercase tracking-wide">Método</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[#6a7196] uppercase tracking-wide whitespace-nowrap">ID Transacción</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[#6a7196] uppercase tracking-wide">Estado</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[#6a7196] uppercase tracking-wide">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb]">
                {payments.map((payment) => {
                  const description = (payment.charges as { description: string } | null)?.description ?? 'Pago'
                  return (
                    <tr key={payment.id} className="hover:bg-[#f6f7fb]/60 transition-colors">
                      <td className="px-5 py-4 text-xs text-[#6a7196] whitespace-nowrap">
                        {payment.paid_at ? formatDate(payment.paid_at) : '—'}
                      </td>
                      <td className="px-5 py-4 font-medium text-[#0a1133] max-w-[180px]">
                        <span className="block truncate" title={description}>{description}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-bold text-[#0a1133]">{formatCurrency(payment.amount, payment.currency)}</span>
                        <span className="ml-1.5 text-xs text-[#6a7196] bg-[#f6f7fb] border border-[#e5e7eb] rounded-md px-1.5 py-0.5 font-mono">
                          {payment.currency}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#193595] bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1 font-medium whitespace-nowrap">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
                          </svg>
                          PayPal
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {payment.paypal_order_id ? (
                          <span className="text-xs font-mono text-[#6a7196] block max-w-[140px] truncate" title={payment.paypal_order_id}>
                            {payment.paypal_order_id}
                          </span>
                        ) : (
                          <span className="text-xs text-[#9ca3af]">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Completado
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <PrintReceiptButton payment={{
                          id: payment.id,
                          paid_at: payment.paid_at,
                          amount: payment.amount,
                          currency: payment.currency,
                          paypal_order_id: payment.paypal_order_id,
                          status: payment.status,
                          description,
                        }} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-[#e5e7eb]">
            {payments.map((payment) => {
              const description = (payment.charges as { description: string } | null)?.description ?? 'Pago'
              return (
                <div key={payment.id} className="px-4 py-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#0a1133] truncate">{description}</p>
                      <p className="text-xs text-[#6a7196] mt-0.5">
                        {payment.paid_at ? formatDate(payment.paid_at) : '—'}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-[#0a1133]">{formatCurrency(payment.amount, payment.currency)}</p>
                      <span className="text-xs text-[#6a7196] font-mono">{payment.currency}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 rounded-lg px-2 py-0.5 text-xs font-medium">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Completado
                      </span>
                      <span className="text-xs text-[#6a7196] bg-blue-50 border border-blue-100 rounded-md px-1.5 py-0.5">PayPal</span>
                    </div>
                    <PrintReceiptButton payment={{
                      id: payment.id,
                      paid_at: payment.paid_at,
                      amount: payment.amount,
                      currency: payment.currency,
                      paypal_order_id: payment.paypal_order_id,
                      status: payment.status,
                      description,
                    }} />
                  </div>
                  {payment.paypal_order_id && (
                    <p className="text-xs text-[#9ca3af] font-mono truncate">ID: {payment.paypal_order_id}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
