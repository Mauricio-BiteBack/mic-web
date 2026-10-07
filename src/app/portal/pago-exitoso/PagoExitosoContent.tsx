'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function formatCurrency(amount: string, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: currency || 'USD', minimumFractionDigits: 2 }).format(Number(amount))
}

export default function PagoExitosoContent() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount') ?? '0'
  const currency = searchParams.get('currency') ?? 'USD'

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-[#0a1133] mb-2">¡Pago exitoso!</h1>
      <p className="text-[#6a7196] text-sm mb-6">Tu pago fue procesado correctamente.</p>

      <div className="bg-[#f6f7fb] rounded-xl p-4 mb-6">
        <p className="text-xs text-[#6a7196] uppercase tracking-wide mb-1">Monto pagado</p>
        <p className="text-3xl font-bold text-[#E8078B]">{formatCurrency(amount, currency)}</p>
      </div>

      <p className="text-sm text-[#6a7196] mb-6">
        Recibirás un recibo en tu correo electrónico.
      </p>

      <div className="flex flex-col gap-3">
        <Link
          href="/portal/cobros"
          className="w-full py-3 px-6 bg-[#E8078B] hover:bg-[#ff1e9f] text-white font-semibold rounded-xl transition-colors text-sm shadow-[0_4px_14px_rgba(232,7,139,0.35)]"
        >
          Ver mis cobros
        </Link>
        <Link
          href="/portal"
          className="w-full py-3 px-6 bg-white hover:bg-[#f6f7fb] text-[#0a1133] font-medium rounded-xl transition-colors text-sm border border-[#e5e7eb]"
        >
          Ir al Dashboard
        </Link>
      </div>
    </div>
  )
}
