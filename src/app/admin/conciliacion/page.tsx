import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import ConciliacionClient from './ConciliacionClient'

export const metadata = { title: 'Conciliación de Pagos — Admin MIC' }

export default async function ConciliacionPage() {
  await headers()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: payments } = await supabase
    .from('payments')
    .select('id, amount, currency, status, method, paid_at, paypal_order_id, notes, charges(description, amount), profiles(company_name, contact_name, email)')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1133]">Conciliación de Pagos</h1>
          <p className="text-sm text-[#6a7196] mt-1">
            {payments?.length ?? 0} pago{(payments?.length ?? 0) !== 1 ? 's' : ''} pendiente{(payments?.length ?? 0) !== 1 ? 's' : ''} de verificación
          </p>
        </div>
        {(payments?.length ?? 0) > 0 && (
          <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {payments!.length} por revisar
          </span>
        )}
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ConciliacionClient payments={(payments ?? []) as any} />
    </div>
  )
}
