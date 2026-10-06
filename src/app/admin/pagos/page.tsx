import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import PagosClient from './PagosClient'

export const metadata = { title: 'Pagos — Admin MIC' }

export default async function PagosAdminPage() {
  await headers()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: payments } = await supabase
    .from('payments')
    .select('id, amount, currency, status, paid_at, paypal_order_id, charges(description, amount), profiles(company_name, contact_name, email)')
    .eq('status', 'completed')
    .order('paid_at', { ascending: false })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PagosClient payments={(payments ?? []) as any} />
}
