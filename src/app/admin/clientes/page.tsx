import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export const metadata = { title: 'Clientes — Admin MIC' }

export default async function ClientesPage() {
  await headers() // ensure admin check ran in layout

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1133]">Clientes</h1>
          <p className="text-sm text-[#6a7196] mt-1">{clients?.length ?? 0} cliente{clients?.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/clientes/nuevo"
          className="bg-[#193595] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0a1133] transition-colors"
        >
          + Nuevo cliente
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
        {clients?.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-[#6a7196] mb-4">No hay clientes aún.</p>
            <Link href="/admin/clientes/nuevo" className="text-sm font-medium text-[#193595] hover:underline">Crear el primero</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f6f7fb]">
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Empresa / Contacto</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Email</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">RUC</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Moneda</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6a7196]">Estado</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f1f5]">
                {clients?.map((c) => (
                  <tr key={c.id} className="hover:bg-[#f6f7fb] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#0a1133]">{c.company_name || '—'}</div>
                      {c.contact_name && <div className="text-xs text-[#6a7196] mt-0.5">{c.contact_name}</div>}
                    </td>
                    <td className="px-6 py-4 text-[#6a7196]">{c.email}</td>
                    <td className="px-6 py-4 text-[#6a7196]">{c.ruc || '—'}</td>
                    <td className="px-6 py-4 text-[#6a7196]">{c.currency}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                        c.active
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-gray-50 text-gray-500 border-gray-200'
                      }`}>
                        {c.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/clientes/${c.id}`} className="text-xs font-medium text-[#193595] hover:underline">
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
