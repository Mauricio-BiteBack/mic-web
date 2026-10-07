import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export const metadata = { title: 'Cobros — Admin MIC' }

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

export default async function CobrosAdminPage() {
  await headers()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: charges } = await supabase
    .from('charges')
    .select('id, description, amount, amount_paid, currency, status, due_date, created_at, profiles(company_name, contact_name, email, ruc)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1133]">Cobros</h1>
          <p className="text-sm text-[#6a7196] mt-1">{charges?.length ?? 0} cobro{charges?.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/cobros/nuevo"
          className="bg-[#193595] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0a1133] transition-colors"
        >
          + Nuevo cobro
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
        {charges?.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-[#6a7196] mb-4">No hay cobros aún.</p>
            <Link href="/admin/cobros/nuevo" className="text-sm font-medium text-[#193595] hover:underline">Crear el primero</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f6f7fb]">
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Cliente</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Descripción</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Monto</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Vencimiento</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Estado</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f1f5]">
                {charges?.map((c) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const profile = (c as any).profiles as { company_name: string; contact_name: string; email: string; ruc?: string } | null
                  const pending = Number(c.amount) - Number(c.amount_paid)
                  const dueDate = new Date(c.due_date)
                  const isOverdue = c.status !== 'pagado' && dueDate < new Date()
                  return (
                    <tr key={c.id} className="hover:bg-[#f6f7fb] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#0a1133]">{profile?.company_name || profile?.contact_name || '—'}</div>
                        {profile?.ruc && <div className="text-xs font-mono text-[#193595]">RUC {profile.ruc}</div>}
                        <div className="text-xs text-[#6a7196]">{profile?.email}</div>
                      </td>
                      <td className="px-6 py-4 text-[#6a7196] max-w-[200px] truncate">{c.description}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#0a1133]">
                          {c.currency === 'USD' ? '$' : 'S/ '}{Number(c.amount).toFixed(2)}
                        </div>
                        {pending > 0.01 && (
                          <div className="text-xs text-[#6a7196]">
                            pendiente: {c.currency === 'USD' ? '$' : 'S/ '}{pending.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className={`px-6 py-4 ${isOverdue ? 'text-red-600 font-medium' : 'text-[#6a7196]'}`}>
                        {dueDate.toLocaleDateString('es-PE')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColor[c.status] ?? ''}`}>
                          {statusLabel[c.status] ?? c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/cobros/${c.id}`} className="text-xs font-medium text-[#193595] hover:underline">
                          Editar
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
