import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export const metadata = { title: 'Admin Dashboard — MIC' }

function StatCard({ label, value, sub, href, color }: { label: string; value: string | number; sub?: string; href?: string; color: string }) {
  const content = (
    <div className={`bg-white rounded-2xl p-6 border border-[#e5e7eb] hover:shadow-md transition-shadow`}>
      <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
      <div className="text-sm font-medium text-[#0a1133]">{label}</div>
      {sub && <div className="text-xs text-[#6a7196] mt-1">{sub}</div>}
    </div>
  )
  if (href) return <Link href={href}>{content}</Link>
  return content
}

export default async function AdminDashboard() {
  const headersList = await headers()
  const userId = headersList.get('x-user-id')!

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const now = new Date()
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [
    { count: totalClients },
    { count: activeClients },
    { count: pendingCharges },
    { data: paymentsThisMonth },
    { data: recentCharges },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client').eq('active', true),
    supabase.from('charges').select('*', { count: 'exact', head: true }).in('status', ['pendiente', 'parcial', 'vencido']),
    supabase.from('payments').select('amount, currency').eq('status', 'completed').gte('paid_at', firstOfMonth),
    supabase.from('charges')
      .select('id, description, amount, amount_paid, currency, status, due_date, profiles(company_name, contact_name)')
      .order('created_at', { ascending: false })
      .limit(8),
  ])

  const totalUSD = paymentsThisMonth?.filter(p => p.currency === 'USD').reduce((s, p) => s + Number(p.amount), 0) ?? 0
  const totalPEN = paymentsThisMonth?.filter(p => p.currency === 'PEN').reduce((s, p) => s + Number(p.amount), 0) ?? 0

  const statusLabel: Record<string, string> = {
    pendiente: 'Pendiente',
    parcial: 'Parcial',
    pagado: 'Pagado',
    vencido: 'Vencido',
  }
  const statusColor: Record<string, string> = {
    pendiente: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    parcial: 'bg-blue-50 text-blue-700 border-blue-200',
    pagado: 'bg-green-50 text-green-700 border-green-200',
    vencido: 'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1133]">Dashboard</h1>
          <p className="text-sm text-[#6a7196] mt-1">Resumen general</p>
        </div>
        <Link
          href="/admin/cobros/nuevo"
          className="bg-[#193595] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0a1133] transition-colors"
        >
          + Nuevo cobro
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Clientes activos" value={activeClients ?? 0} sub={`de ${totalClients ?? 0} totales`} href="/admin/clientes" color="text-[#193595]" />
        <StatCard label="Cobros pendientes" value={pendingCharges ?? 0} href="/admin/cobros" color="text-yellow-600" />
        <StatCard
          label="Cobrado este mes (USD)"
          value={`$${totalUSD.toFixed(2)}`}
          href="/admin/pagos"
          color="text-green-600"
        />
        <StatCard
          label="Cobrado este mes (PEN)"
          value={`S/ ${totalPEN.toFixed(2)}`}
          href="/admin/pagos"
          color="text-green-600"
        />
      </div>

      {/* Recent charges */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#0a1133]">Cobros recientes</h2>
          <Link href="/admin/cobros" className="text-xs text-[#193595] hover:underline">Ver todos</Link>
        </div>
        <div className="divide-y divide-[#f0f1f5]">
          {recentCharges?.length === 0 && (
            <div className="px-6 py-8 text-center text-sm text-[#6a7196]">Sin cobros aún</div>
          )}
          {recentCharges?.map((c) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const profile = (c as any).profiles as { company_name: string; contact_name: string } | null
            const pending = Number(c.amount) - Number(c.amount_paid)
            return (
              <Link key={c.id} href={`/admin/cobros/${c.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-[#f6f7fb] transition-colors">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[#0a1133] truncate">{profile?.company_name || profile?.contact_name || '—'}</div>
                  <div className="text-xs text-[#6a7196] truncate mt-0.5">{c.description}</div>
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#0a1133]">
                      {c.currency === 'USD' ? '$' : 'S/ '}{Number(c.amount).toFixed(2)}
                    </div>
                    {pending > 0.01 && (
                      <div className="text-xs text-[#6a7196]">
                        pendiente: {c.currency === 'USD' ? '$' : 'S/ '}{pending.toFixed(2)}
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColor[c.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {statusLabel[c.status] ?? c.status}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
