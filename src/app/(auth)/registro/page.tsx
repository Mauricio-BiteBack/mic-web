import Link from 'next/link'
import Image from 'next/image'
import RegistroForm from './RegistroForm'

export const metadata = { title: 'Crear cuenta — Portal MIC' }

export default function RegistroPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-8">
      <div className="flex justify-center mb-6">
        <Image src="/logo_3D.png" alt="MIC" width={48} height={48} />
      </div>
      <h1 className="text-xl font-bold text-[#0a1133] text-center mb-1">Crear cuenta</h1>
      <p className="text-sm text-[#6a7196] text-center mb-6">
        Completa tus datos para solicitar acceso al portal
      </p>
      <RegistroForm />
      <p className="text-center text-xs text-[#6a7196] mt-6">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-[#193595] hover:text-[#E8078B] font-medium transition-colors">
          Ingresar
        </Link>
      </p>
    </div>
  )
}
