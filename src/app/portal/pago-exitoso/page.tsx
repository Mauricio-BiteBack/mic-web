import { Suspense } from 'react'
import PagoExitosoContent from './PagoExitosoContent'

export const metadata = { title: 'Pago exitoso — Portal MIC' }

export default function PagoExitosoPage() {
  return (
    <div className="max-w-md mx-auto py-12">
      <Suspense>
        <PagoExitosoContent />
      </Suspense>
    </div>
  )
}
