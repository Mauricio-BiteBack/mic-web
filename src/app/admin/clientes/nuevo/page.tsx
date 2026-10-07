import ClienteForm from '../ClienteForm'

export const metadata = { title: 'Nuevo cliente — Admin MIC' }

export default function NuevoClientePage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-[#0a1133] mb-2">Nuevo cliente</h1>
      <p className="text-sm text-[#6a7196] mb-8">Se creará la cuenta y el cliente recibirá sus credenciales.</p>
      <ClienteForm />
    </div>
  )
}
