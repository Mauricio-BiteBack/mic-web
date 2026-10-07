import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Historial de pagos — Portal MIC' }

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount)
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
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
          <div className="divide-y divide-[#e5e7eb]">
            {payments.map((payment) => (
              <div key={payment.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0a1133] truncate">
                      {(payment.charges as { description: string } | null)?.description ?? 'Pago'}
                    </p>
                    <p className="text-xs text-[#6a7196] mt-0.5">
                      {payment.paid_at ? formatDate(payment.paid_at) : '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-base font-bold text-[#0a1133]">
                    {formatCurrency(payment.amount, payment.currency)}
                  </span>
                  {payment.receipt_url && (
                    <a
                      href={payment.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#6a7196] hover:text-[#193595] hover:bg-[#f6f7fb] rounded-lg transition-colors"
                      title="Descargar recibo"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
