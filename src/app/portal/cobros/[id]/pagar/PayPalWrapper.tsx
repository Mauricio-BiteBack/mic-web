'use client'

import dynamic from 'next/dynamic'

const PayPalPayment = dynamic(() => import('./PayPalPayment'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center gap-2 py-8">
      <div className="w-4 h-4 border-2 border-[#E8078B] border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-[#6a7196]">Cargando opciones de pago…</span>
    </div>
  ),
})

type Props = {
  chargeId: string
  pendingAmount: number
  currency: string
}

export default function PayPalWrapper(props: Props) {
  return <PayPalPayment {...props} />
}
