import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import CobrosClient from './CobrosClient'

export const metadata = { title: 'Cobros — Portal MIC' }

export default async function CobrosPage() {
  const headersList = await headers()
  const userId = headersList.get('x-user-id') ?? ''
  if (!userId) redirect('/login')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: charges } = await supabase
    .from('charges')
    .select('*')
    .eq('client_id', userId)
    .order('due_date', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0a1133] mb-1">Cobros</h1>
      <p className="text-[#6a7196] text-sm mb-8">Todos tus cobros y su estado de pago</p>
      <CobrosClient charges={charges ?? []} />
    </div>
  )
}
