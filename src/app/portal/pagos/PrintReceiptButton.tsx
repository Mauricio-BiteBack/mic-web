'use client'

export type PaymentReceiptData = {
  id: string
  paid_at: string
  amount: number
  currency: string
  paypal_order_id: string | null
  status: string
  description: string
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount)
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(dateStr))
}

export default function PrintReceiptButton({ payment }: { payment: PaymentReceiptData }) {
  function handlePrint() {
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Comprobante de Pago — MIC</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Inter, system-ui, sans-serif; max-width: 480px; margin: 40px auto; padding: 32px 24px; color: #0a1133; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
    .logo { font-size: 24px; font-weight: 800; color: #193595; letter-spacing: -0.5px; }
    .badge { background: #dcfce7; color: #16a34a; border-radius: 8px; padding: 4px 12px; font-size: 12px; font-weight: 600; border: 1px solid #bbf7d0; }
    h1 { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
    .subtitle { font-size: 13px; color: #6a7196; margin-bottom: 28px; }
    .card { background: #f6f7fb; border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb; }
    .row { display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; gap: 16px; }
    .row:last-child { border-bottom: none; }
    .label { color: #6a7196; flex-shrink: 0; }
    .value { font-weight: 600; text-align: right; word-break: break-all; }
    .amount-value { font-size: 22px; font-weight: 800; color: #E8078B; }
    .txid { font-family: monospace; font-size: 11px; }
    .footer { margin-top: 32px; font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.6; }
    @media print {
      body { margin: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">MIC</div>
    <div class="badge">&#10003; Completado</div>
  </div>
  <h1>Comprobante de Pago</h1>
  <p class="subtitle">Este documento es el comprobante oficial de tu transacción.</p>
  <div class="card">
    <div class="row"><span class="label">Concepto</span><span class="value">${payment.description}</span></div>
    <div class="row"><span class="label">Fecha y hora</span><span class="value">${formatDate(payment.paid_at)}</span></div>
    <div class="row"><span class="label">Método de pago</span><span class="value">PayPal</span></div>
    ${payment.paypal_order_id ? `<div class="row"><span class="label">ID Transacción</span><span class="value txid">${payment.paypal_order_id}</span></div>` : ''}
    <div class="row"><span class="label">Moneda</span><span class="value">${payment.currency}</span></div>
    <div class="row"><span class="label">Estado</span><span class="value" style="color:#16a34a">Completado / Aprobado</span></div>
    <div class="row"><span class="label">Monto pagado</span><span class="value amount-value">${formatCurrency(payment.amount, payment.currency)}</span></div>
  </div>
  <div class="footer">
    MIC &mdash; Portal de Clientes<br />
    Documento generado el ${new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}<br />
    ¿Consultas? <a href="mailto:info@mic.pe" style="color:#193595;">info@mic.pe</a>
  </div>
  <div class="no-print" style="margin-top:24px;text-align:center;">
    <button onclick="window.print()" style="padding:10px 24px;background:#193595;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">
      Imprimir / Guardar PDF
    </button>
  </div>
</body>
</html>`

    const w = window.open('', '_blank', 'width=620,height=780')
    if (w) {
      w.document.write(html)
      w.document.close()
      w.focus()
    }
  }

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#193595] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors whitespace-nowrap"
      title="Ver Comprobante / Imprimir Recibo"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      Ver Comprobante
    </button>
  )
}
