'use client'

import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'

type Props = {
  chargeId: string
  pendingAmount: number
  currency: string
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount)
}

export default function PayPalPayment({ chargeId, pendingAmount, currency }: Props) {
  const router = useRouter()
  const [amount, setAmount] = useState(pendingAmount.toFixed(2))
  const [amountError, setAmountError] = useState<string | null>(null)
  const [payError, setPayError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const numAmount = Number(amount)
  const isValidAmount = numAmount > 0 && numAmount <= pendingAmount + 0.01

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmountError(null)
    setPayError(null)
    setAmount(e.target.value)
  }

  function validateAmount() {
    const n = Number(amount)
    if (isNaN(n) || n <= 0) {
      setAmountError('Ingresa un monto válido')
      return false
    }
    if (n > pendingAmount + 0.01) {
      setAmountError(`El máximo es ${formatCurrency(pendingAmount, currency)}`)
      return false
    }
    return true
  }

  return (
    <div className="space-y-4">
      {/* Amount input */}
      <div>
        <label className="block text-sm font-medium text-[#0a1133] mb-1.5">
          Monto a pagar ({currency})
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a7196] text-sm font-medium">
            {currency === 'USD' ? '$' : 'S/'}
          </span>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            onBlur={validateAmount}
            min="0.01"
            max={pendingAmount.toFixed(2)}
            step="0.01"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] focus:outline-none focus:ring-2 focus:ring-[#E8078B]/30 focus:border-[#E8078B] transition text-sm"
          />
        </div>
        {amountError && (
          <p className="text-xs text-red-600 mt-1">{amountError}</p>
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => { setAmount(pendingAmount.toFixed(2)); setAmountError(null) }}
            className="text-xs text-[#193595] hover:text-[#E8078B] transition-colors"
          >
            Pagar total ({formatCurrency(pendingAmount, currency)})
          </button>
        </div>
      </div>

      {payError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {payError}
        </div>
      )}

      {/* PayPal button */}
      {isValidAmount && !amountError && (
        <PayPalScriptProvider options={{
          clientId: (process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '').trim(),
          currency,
          intent: 'capture',
        }}>
          <PayPalButtons
            style={{ layout: 'vertical', shape: 'rect', label: 'pay', height: 48 }}
            disabled={loading}
            createOrder={async () => {
              if (!validateAmount()) throw new Error('Monto inválido')
              setPayError(null)
              setLoading(true)
              const res = await fetch('/api/paypal/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chargeId, amount: Number(amount) }),
              })
              const data = await res.json()
              setLoading(false)
              if (!data.orderId) {
                setPayError(data.error || 'Error al crear la orden')
                throw new Error(data.error)
              }
              return data.orderId
            }}
            onApprove={async (data) => {
              setLoading(true)
              const res = await fetch('/api/paypal/capture', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: data.orderID, chargeId }),
              })
              const result = await res.json()
              setLoading(false)
              if (!result.ok) {
                setPayError(result.error || 'Error al confirmar el pago')
                return
              }
              router.push(`/portal/pago-exitoso?charge=${chargeId}&amount=${result.amount}&currency=${result.currency}`)
            }}
            onError={(err) => {
              console.error('PayPal error:', err)
              setPayError('Ocurrió un error con PayPal. Inténtalo de nuevo.')
              setLoading(false)
            }}
            onCancel={() => {
              setPayError('Pago cancelado.')
              setLoading(false)
            }}
          />
        </PayPalScriptProvider>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-2 py-2">
          <div className="w-4 h-4 border-2 border-[#E8078B] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[#6a7196]">Procesando pago…</span>
        </div>
      )}
    </div>
  )
}
