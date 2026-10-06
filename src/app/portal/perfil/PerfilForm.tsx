'use client'

import { useState, useActionState } from 'react'
import { updateProfile, updatePassword, type ActionState } from '@/app/actions/profile'

type Profile = {
  id: string
  company_name: string
  contact_name: string
  email: string
  ruc: string | null
  currency: string
}

export default function PerfilForm({ profile }: { profile: Profile }) {
  const [profileState, profileAction, profilePending] = useActionState<ActionState, FormData>(updateProfile, undefined)
  const [passwordState, passwordAction, passwordPending] = useActionState<ActionState, FormData>(updatePassword, undefined)
  const [activeTab, setActiveTab] = useState<'datos' | 'seguridad'>('datos')

  return (
    <div className="max-w-2xl">
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-xl border border-[#e5e7eb] p-1 w-fit">
        {(['datos', 'seguridad'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-[#E8078B] text-white shadow-[0_2px_8px_rgba(232,7,139,0.25)]'
                : 'text-[#6a7196] hover:text-[#0a1133]'
            }`}
          >
            {tab === 'datos' ? 'Datos de empresa' : 'Seguridad'}
          </button>
        ))}
      </div>

      {activeTab === 'datos' && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
          <form action={profileAction} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#0a1133] mb-1.5">Empresa</label>
                <input
                  name="company_name"
                  defaultValue={profile.company_name}
                  placeholder="Nombre de la empresa"
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] placeholder-[#6a7196] focus:outline-none focus:ring-2 focus:ring-[#E8078B]/30 focus:border-[#E8078B] transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0a1133] mb-1.5">Contacto</label>
                <input
                  name="contact_name"
                  defaultValue={profile.contact_name}
                  placeholder="Nombre del contacto"
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] placeholder-[#6a7196] focus:outline-none focus:ring-2 focus:ring-[#E8078B]/30 focus:border-[#E8078B] transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0a1133] mb-1.5">Email</label>
              <input
                value={profile.email}
                disabled
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#6a7196] text-sm cursor-not-allowed"
              />
              <p className="text-xs text-[#6a7196] mt-1">El email no puede cambiarse aquí.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#0a1133] mb-1.5">RUC</label>
                <input
                  name="ruc"
                  defaultValue={profile.ruc ?? ''}
                  placeholder="20XXXXXXXXX"
                  maxLength={11}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] placeholder-[#6a7196] focus:outline-none focus:ring-2 focus:ring-[#E8078B]/30 focus:border-[#E8078B] transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0a1133] mb-1.5">Moneda preferida</label>
                <select
                  name="currency"
                  defaultValue={profile.currency}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] focus:outline-none focus:ring-2 focus:ring-[#E8078B]/30 focus:border-[#E8078B] transition text-sm"
                >
                  <option value="USD">USD — Dólares</option>
                  <option value="PEN">PEN — Soles</option>
                </select>
              </div>
            </div>

            {profileState?.error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{profileState.error}</div>
            )}
            {profileState?.success && (
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">{profileState.success}</div>
            )}

            <button
              type="submit"
              disabled={profilePending}
              className="px-6 py-3 bg-[#E8078B] hover:bg-[#ff1e9f] disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm shadow-[0_4px_14px_rgba(232,7,139,0.35)]"
            >
              {profilePending ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'seguridad' && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
          <form action={passwordAction} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#0a1133] mb-1.5">Nueva contraseña</label>
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] placeholder-[#6a7196] focus:outline-none focus:ring-2 focus:ring-[#E8078B]/30 focus:border-[#E8078B] transition text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0a1133] mb-1.5">Confirmar contraseña</label>
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Repite la contraseña"
                className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f7fb] text-[#0a1133] placeholder-[#6a7196] focus:outline-none focus:ring-2 focus:ring-[#E8078B]/30 focus:border-[#E8078B] transition text-sm"
              />
            </div>

            {passwordState?.error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{passwordState.error}</div>
            )}
            {passwordState?.success && (
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">{passwordState.success}</div>
            )}

            <button
              type="submit"
              disabled={passwordPending}
              className="px-6 py-3 bg-[#0D1E6B] hover:bg-[#193595] disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              {passwordPending ? 'Actualizando…' : 'Actualizar contraseña'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
