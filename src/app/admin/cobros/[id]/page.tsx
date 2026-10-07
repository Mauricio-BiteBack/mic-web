import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import CobroForm from '../CobroForm'

export const metadata = { title: 'Editar cobro — Admin MIC' }

export default async function EditarCobroPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [{ data: charge }, { data: clients }, { data: payments }] = await Promise.all([
    supabase.from('charges').select('*').eq('id', id).single(),
    supabase.from('profiles').select('id, email, company_name, contact_name, currency').eq('role', 'client').eq('active', true).order('company_name'),
    supabase.from('payments').select('id, amount, currency, status, paid_at').eq('charge_id', id).order('paid_at', { ascending: false }),
  ])

  if (!charge) notFound()

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-[#0a1133] mb-2">Editar cobro</h1>
      <p className="text-sm text-[#6a7196] mb-8">{charge.description}</p>
      <CobroForm clients={clients ?? []} charge={charge} />

      {payments && payments.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-[#0a1133] mb-3">Pagos registrados</h2>
          <div className="bg-white rounded-2xl border border-[#e5e7eb] divide-y divide-[#f0f1f5]">
            {payments.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm font-medium text-[#0a1133]">
                    {p.currency === 'USD' ? '$' : 'S/ '}{Number(p.amount).toFixed(2)}
                  </div>
                  <div className="text-xs text-[#6a7196]">
                    {p.paid_at ? new Date(p.paid_at).toLocaleString('es-PE') : '—'}
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-green-50 text-green-700 border-green-200">
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
