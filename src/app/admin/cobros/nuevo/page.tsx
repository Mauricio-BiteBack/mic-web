import { createClient } from '@supabase/supabase-js'
import CobroForm from '../CobroForm'

export const metadata = { title: 'Nuevo cobro — Admin MIC' }

export default async function NuevoCobroPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: clients } = await supabase
    .from('profiles')
    .select('id, email, company_name, contact_name, currency')
    .eq('role', 'client')
    .eq('active', true)
    .order('company_name')

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-[#0a1133] mb-2">Nuevo cobro</h1>
      <p className="text-sm text-[#6a7196] mb-8">El cobro aparecerá en el portal del cliente inmediatamente.</p>
      <CobroForm clients={clients ?? []} />
    </div>
  )
}
