'use client'

import { useState } from 'react'
import Link from 'next/link'

type Client = {
  id: string
  email: string
  company_name: string
  contact_name: string
  ruc: string | null
  currency: string
  active: boolean
}

export default function ClientesClient({ clients }: { clients: Client[] }) {
  const [search, setSearch] = useState('')

  const filtered = clients.filter(c => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      c.company_name.toLowerCase().includes(q) ||
      c.contact_name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.ruc ?? '').includes(q)
    )
  })

  return (
    <div>
      {/* Search */}
      <div className="relative mb-5">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por empresa, contacto, correo o RUC…"
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[#0a1133] text-sm focus:outline-none focus:ring-2 focus:ring-[#193595]/20 focus:border-[#193595] transition"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6a7196]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-[#6a7196]">
              {search ? `Sin resultados para "${search}"` : 'No hay clientes aún.'}
            </p>
            {!search && (
              <Link href="/admin/clientes/nuevo" className="text-sm font-medium text-[#193595] hover:underline mt-2 inline-block">
                Crear el primero
              </Link>
            )}
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
                {filtered.map((c) => (
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
                      <Link
                        href={`/admin/clientes/${c.id}`}
                        className="text-xs font-medium text-[#193595] hover:underline whitespace-nowrap"
                      >
                        Ver ficha →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {search && filtered.length > 0 && (
        <p className="text-xs text-[#9ca3af] mt-2 text-right">
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
