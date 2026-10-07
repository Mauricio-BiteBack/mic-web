import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata = { title: 'Dashboard — Portal MIC' }

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr))
}

export default async function PortalPage() {
  const headersList = await headers()
  const userId = headersList.get('x-user-id') ?? ''
  if (!userId) redirect('/login')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile } = await supabase
    .from('profiles')
    .select('company_name, ruc, currency')
    .eq('id', userId)
    .single()

  // Fetch charges
  const { data: charges } = await supabase
    .from('charges')
    .select('*')
    .eq('client_id', userId)
    .order('due_date', { ascending: true })

  // Fetch last completed payment
  const { data: lastPayments } = await supabase
    .from('payments')
    .select('*')
    .eq('client_id', userId)
    .eq('status', 'completed')
    .order('paid_at', { ascending: false })
    .limit(1)

  const pendingCharges = charges?.filter(c => c.status === 'pendiente' || c.status === 'parcial' || c.status === 'vencido') ?? []
  const overdueCharges = charges?.filter(c => c.status === 'vencido') ?? []

  // Sum pending amounts (amount - amount_paid) grouped by currency
  const pendingByUSD = pendingCharges.filter(c => c.currency === 'USD').reduce((sum: number, c: { amount: number; amount_paid: number }) => sum + (c.amount - c.amount_paid), 0)
  const pendingByPEN = pendingCharges.filter(c => c.currency === 'PEN').reduce((sum: number, c: { amount: number; amount_paid: number }) => sum + (c.amount - c.amount_paid), 0)

  // Next due date
  const nextDue = [...pendingCharges].sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())[0]

  const lastPayment = lastPayments?.[0]

  const stats = [
    {
      label: 'Saldo pendiente USD',
      value: formatCurrency(pendingByUSD, 'USD'),
      sub: pendingByPEN > 0 ? `+ ${formatCurrency(pendingByPEN, 'PEN')} en soles` : `${pendingCharges.length} cobro(s)`,
      color: pendingByUSD > 0 ? 'text-red-600' : 'text-green-600',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Próximo vencimiento',
      value: nextDue ? formatDate(nextDue.due_date) : '—',
      sub: nextDue ? nextDue.description : 'Sin cobros pendientes',
      color: overdueCharges.length > 0 ? 'text-red-600' : 'text-[#0a1133]',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Último pago',
      value: lastPayment ? formatCurrency(lastPayment.amount, lastPayment.currency) : '—',
      sub: lastPayment && lastPayment.paid_at ? formatDate(lastPayment.paid_at) : 'Sin pagos registrados',
      color: 'text-[#0a1133]',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1133] mb-1">Dashboard</h1>
          <p className="text-[#6a7196] text-sm">Resumen de tu cuenta</p>
        </div>
        {profile?.ruc && (
          <div className="bg-white border border-[#e5e7eb] rounded-xl px-4 py-2.5 text-right">
            <p className="text-xs text-[#6a7196]">RUC</p>
            <p className="text-sm font-bold text-[#0a1133] font-mono tracking-wide">{profile.ruc}</p>
          </div>
        )}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-[#e5e7eb]">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium text-[#6a7196] uppercase tracking-wide">{stat.label}</span>
              <span className="text-[#6a7196]">{stat.icon}</span>
            </div>
            <div className={`text-xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-[#6a7196]">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Overdue alert */}
      {overdueCharges.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-red-700">Tienes {overdueCharges.length} cobro(s) vencido(s)</p>
            <p className="text-xs text-red-600 mt-0.5">
              Por favor regulariza tu cuenta para evitar interrupciones en el servicio.{' '}
              <Link href="/portal/cobros" className="underline font-medium">Ver cobros</Link>
            </p>
          </div>
        </div>
      )}

      {/* Recent charges */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#0a1133]">Cobros recientes</h2>
          <Link href="/portal/cobros" className="text-xs text-[#193595] hover:text-[#E8078B] transition-colors font-medium">
            Ver todos →
          </Link>
        </div>
        {(!charges || charges.length === 0) ? (
          <div className="px-6 py-12 text-center">
            <p className="text-[#6a7196] text-sm">No tienes cobros registrados aún.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e5e7eb]">
            {charges.slice(0, 5).map((charge) => (
              <div key={charge.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#0a1133] truncate">{charge.description}</p>
                  <p className="text-xs text-[#6a7196] mt-0.5">Vence: {formatDate(charge.due_date)}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0a1133]">{formatCurrency(charge.amount, charge.currency)}</p>
                    {charge.amount_paid > 0 && (
                      <p className="text-xs text-green-600">Abonado: {formatCurrency(charge.amount_paid, charge.currency)}</p>
                    )}
                  </div>
                  <StatusBadge status={charge.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
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
