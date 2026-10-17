import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ClienteForm from '../ClienteForm'
import ClienteQuickActions from './ClienteQuickActions'

export const metadata = { title: 'Ficha de cliente — Admin MIC' }

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount)
}

const statusLabel: Record<string, string> = {
  pendiente: 'Pendiente', parcial: 'Parcial', pagado: 'Pagado', vencido: 'Vencido',
}
const statusColor: Record<string, string> = {
  pendiente: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  parcial: 'bg-blue-50 text-blue-700 border-blue-200',
  pagado: 'bg-green-50 text-green-700 border-green-200',
  vencido: 'bg-red-50 text-red-700 border-red-200',
}

export default async function FichaClientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [{ data: client }, { data: charges }] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, email, company_name, contact_name, ruc, currency, active')
      .eq('id', id)
      .eq('role', 'client')
      .single(),
    supabase
      .from('charges')
      .select('id, description, amount, amount_paid, currency, status, due_date')
      .eq('client_id', id)
      .order('created_at', { ascending: false }),
  ])

  if (!client) notFound()

  const pendingCharges = (charges ?? []).filter(c => c.status !== 'pagado')

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/clientes" className="text-xs text-[#6a7196] hover:text-[#193595] transition-colors">
          ← Clientes
        </Link>
        <span className="text-[#e5e7eb]">/</span>
        <span className="text-xs text-[#0a1133] font-medium">{client.company_name || client.email}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Edit form */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
          <h2 className="text-sm font-semibold text-[#0a1133] mb-5">Datos del cliente</h2>
          <ClienteForm client={client} />

          {/* Quick Actions */}
          <ClienteQuickActions
            clientId={client.id}
            clientEmail={client.email}
            pendingCharges={pendingCharges.map(c => ({
              id: c.id,
              description: c.description,
              amount: Number(c.amount),
              amount_paid: Number(c.amount_paid),
              currency: c.currency,
              status: c.status,
            }))}
          />
        </div>

        {/* Right: Charge history */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#0a1133]">Facturas</h2>
            <Link href={`/admin/cobros/nuevo?client=${id}`} className="text-xs text-[#193595] hover:underline">
              + Nueva factura
            </Link>
          </div>

          {(!charges || charges.length === 0) ? (
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 text-center">
              <p className="text-sm text-[#6a7196]">Sin facturas aún</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#e5e7eb] divide-y divide-[#f0f1f5]">
              {charges.map((c) => {
                const pending = Number(c.amount) - Number(c.amount_paid)
                return (
                  <Link key={c.id} href={`/admin/cobros/${c.id}`} className="flex items-start justify-between px-4 py-3.5 hover:bg-[#f6f7fb] transition-colors">
                    <div className="min-w-0 mr-3">
                      <p className="text-sm font-medium text-[#0a1133] truncate">{c.description}</p>
                      <p className="text-xs text-[#9ca3af] mt-0.5">
                        {new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(c.due_date))}
                      </p>
                      {pending > 0.01 && c.status !== 'pagado' && (
                        <p className="text-xs text-amber-700 mt-0.5">
                          Pendiente: {formatCurrency(pending, c.currency)}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="text-sm font-semibold text-[#0a1133]">{formatCurrency(Number(c.amount), c.currency)}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColor[c.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {statusLabel[c.status] ?? c.status}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
