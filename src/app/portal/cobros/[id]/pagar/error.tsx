'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function PagarError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Pagar page error:', error)
  }, [error])

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-[#0a1133] mb-2">Error al cargar la página de pago</h2>
        <p className="text-sm text-[#6a7196] mb-6">
          {error.message || 'Ocurrió un error inesperado. Por favor intenta de nuevo.'}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-[#193595] text-white text-sm font-medium rounded-xl hover:bg-[#0a1133] transition-colors"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/portal/cobros"
            className="px-4 py-2 border border-[#e5e7eb] text-sm text-[#6a7196] rounded-xl hover:bg-[#f6f7fb] transition-colors"
          >
            Volver a cobros
          </Link>
        </div>
      </div>
    </div>
  )
}
