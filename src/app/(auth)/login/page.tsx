import { Suspense } from 'react'
import LoginForm from './LoginForm'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'Iniciar sesión — MIC' }

export default function LoginPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <Link href="/">
          <Image
            src="/logo_3D.png"
            alt="MIC"
            width={80}
            height={80}
            className="mx-auto mb-4"
            priority
          />
        </Link>
        <h1 className="text-2xl font-bold text-[#0a1133]">Portal de Clientes</h1>
        <p className="text-[#6a7196] mt-1 text-sm">Ingresa con tu cuenta MIC</p>
      </div>
      <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(13,30,107,0.10)] p-8">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
      <div className="mt-4">
        <Link
          href="/registro"
          className="block w-full text-center py-3 px-6 rounded-2xl border border-[#193595] text-[#193595] text-sm font-medium hover:bg-[#193595] hover:text-white transition-colors"
        >
          ¿No tienes cuenta? Solicitar acceso
        </Link>
      </div>
      <p className="text-center text-xs text-[#6a7196] mt-4">
        ¿Problemas?{' '}
        <a href="mailto:info@mic.pe" className="text-[#193595] hover:underline">
          Contacta a soporte
        </a>
      </p>
    </div>
  )
}
