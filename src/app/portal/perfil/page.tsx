import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import PerfilForm from './PerfilForm'

export const metadata = { title: 'Perfil — Portal MIC' }

export default async function PerfilPage() {
  const headersList = await headers()
  const userId = headersList.get('x-user-id') ?? ''
  if (!userId) redirect('/login')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (!profile) redirect('/login')

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0a1133] mb-1">Perfil</h1>
      <p className="text-[#6a7196] text-sm mb-8">Datos de tu empresa y seguridad</p>
      <PerfilForm profile={profile} />
    </div>
  )
}
