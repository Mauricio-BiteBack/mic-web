import { createClient } from '@supabase/supabase-js'
import { redirect, notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import PayPalWrapper from './PayPalWrapper'

export const metadata = { title: 'Realizar pago — Portal MIC' }

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount)
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr + 'T00:00:00'))
}

export default async function PagarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const headersList = await headers()
  const userId = headersList.get('x-user-id') ?? ''
  if (!userId) redirect('/login')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: charge } = await supabase
    .from('charges')
    .select('*')
    .eq('id', id)
    .eq('client_id', userId)
    .single()

  if (!charge) notFound()
  if (charge.status === 'pagado') redirect('/portal/cobros')

  const pending = Number(charge.amount) - Number(charge.amount_paid)

  return (
    <div className="max-w-lg mx-auto">
      <Link href="/portal/cobros" className="inline-flex items-center gap-2 text-sm text-[#6a7196] hover:text-[#193595] transition-colors mb-6">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Volver a cobros
      </Link>

      <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
        <div className="bg-gradient-to-r from-[#0D1E6B] to-[#193595] px-6 py-5">
          <p className="text-white/70 text-xs font-medium uppercase tracking-wide mb-1">Cobro</p>
          <h1 className="text-white text-lg font-bold">{charge.description}</h1>
          <p className="text-white/60 text-sm mt-1">Vence: {formatDate(charge.due_date)}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-[#f6f7fb] rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#6a7196]">Monto total</span>
              <span className="font-medium text-[#0a1133]">{formatCurrency(Number(charge.amount), charge.currency)}</span>
            </div>
            {Number(charge.amount_paid) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#6a7196]">Ya abonado</span>
                <span className="font-medium text-green-600">− {formatCurrency(Number(charge.amount_paid), charge.currency)}</span>
              </div>
            )}
            <div className="border-t border-[#e5e7eb] pt-2 flex justify-between">
              <span className="text-sm font-semibold text-[#0a1133]">Saldo pendiente</span>
              <span className="text-base font-bold text-[#E8078B]">{formatCurrency(pending, charge.currency)}</span>
            </div>
          </div>

          <PayPalWrapper
            chargeId={charge.id}
            pendingAmount={pending}
            currency={charge.currency}
          />

          <p className="text-xs text-[#6a7196] text-center">
            ¿Dudas sobre este cobro?{' '}
            <a href="mailto:info@mic.pe" className="text-[#193595] hover:underline">Contacta a soporte</a>
          </p>
        </div>
      </div>
    </div>
  )
}
