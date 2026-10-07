import Link from 'next/link'
import Image from 'next/image'

export const metadata = { title: 'Sin acceso — MIC' }

export default function SinAccesoPage() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Image src="/logo_3D.png" alt="MIC" width={48} height={48} />
        </div>

        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-[#0a1133] mb-2">Sin acceso</h1>
        <p className="text-sm text-[#6a7196] mb-6">
          Tu cuenta de Google no está registrada como cliente de MIC. Contacta a tu ejecutivo para que te dé acceso.
        </p>

        <a
          href="mailto:info@mic.pe"
          className="block w-full py-3 bg-[#193595] text-white text-sm font-medium rounded-xl hover:bg-[#0a1133] transition-colors mb-3"
        >
          Escribir a info@mic.pe
        </a>

        <Link
          href="/login"
          className="block w-full py-3 border border-[#e5e7eb] text-sm text-[#6a7196] rounded-xl hover:bg-[#f6f7fb] transition-colors"
        >
          Volver al login
        </Link>
      </div>
    </div>
  )
}
