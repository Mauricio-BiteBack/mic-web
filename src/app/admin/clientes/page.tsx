import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import ClientesClient from './ClientesClient'

export const metadata = { title: 'Clientes — Admin MIC' }

export default async function ClientesPage() {
  await headers()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: clients } = await supabase
    .from('profiles')
    .select('id, email, company_name, contact_name, ruc, currency, active, created_at')
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1133]">Clientes</h1>
          <p className="text-sm text-[#6a7196] mt-1">
            {clients?.length ?? 0} cliente{clients?.length !== 1 ? 's' : ''}
            {(clients?.filter(c => !c.active).length ?? 0) > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                {clients!.filter(c => !c.active).length} inactivo{clients!.filter(c => !c.active).length !== 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>
        <Link
          href="/admin/clientes/nuevo"
          className="bg-[#193595] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0a1133] transition-colors"
        >
          + Nuevo cliente
        </Link>
      </div>

      <ClientesClient clients={clients ?? []} />
    </div>
  )
}
