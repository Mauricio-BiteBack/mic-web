import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import ClienteForm from '../ClienteForm'

export const metadata = { title: 'Editar cliente — Admin MIC' }

export default async function EditarClientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: client } = await supabase
    .from('profiles')
    .select('id, email, company_name, contact_name, ruc, currency, active')
    .eq('id', id)
    .eq('role', 'client')
    .single()

  if (!client) notFound()

  // Get charge summary for this client
  const { data: charges } = await supabase
    .from('charges')
    .select('id, amount, amount_paid, currency, status')
    .eq('client_id', id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-[#0a1133] mb-2">Editar cliente</h1>
      <p className="text-sm text-[#6a7196] mb-8">{client.email}</p>
      <ClienteForm client={client} />

      {charges && charges.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-[#0a1133] mb-3">Cobros recientes</h2>
          <div className="bg-white rounded-2xl border border-[#e5e7eb] divide-y divide-[#f0f1f5]">
            {charges.map((c) => {
              const statusColor: Record<string, string> = {
                pendiente: 'bg-yellow-50 text-yellow-700 border-yellow-200',
                parcial: 'bg-blue-50 text-blue-700 border-blue-200',
                pagado: 'bg-green-50 text-green-700 border-green-200',
                vencido: 'bg-red-50 text-red-700 border-red-200',
              }
              return (
                <div key={c.id} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-[#0a1133]">
                    {c.currency === 'USD' ? '$' : 'S/ '}{Number(c.amount).toFixed(2)}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColor[c.status] ?? ''}`}>
                    {c.status}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
