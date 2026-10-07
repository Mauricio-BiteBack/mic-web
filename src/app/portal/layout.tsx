import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import PortalSidebar from './PortalSidebar'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const userId = headersList.get('x-user-id')

  if (!userId) redirect('/login')

  // Use service role to bypass RLS — safe because userId comes from verified middleware
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (!profile || !profile.active) redirect('/login')

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex">
      <PortalSidebar profile={profile} />
      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
