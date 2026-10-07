'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

export type ActionState = { error?: string; success?: string } | undefined

const profileSchema = z.object({
  company_name: z.string().trim().min(1, 'El nombre de empresa es requerido'),
  contact_name: z.string().trim().min(1, 'El nombre de contacto es requerido'),
  ruc: z.string().trim().regex(/^\d{11}$/, 'El RUC debe tener 11 dígitos').or(z.literal('')).optional(),
  currency: z.enum(['USD', 'PEN']),
})

const passwordSchema = z.object({
  password: z.string().min(8, 'Mínimo 8 caracteres').regex(/[A-Z]/, 'Debe tener al menos una mayúscula').regex(/[0-9]/, 'Debe tener al menos un número'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: 'Las contraseñas no coinciden', path: ['confirmPassword'] })

export async function updateProfile(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const raw = {
    company_name: formData.get('company_name') as string,
    contact_name: formData.get('contact_name') as string,
    ruc: formData.get('ruc') as string,
    currency: formData.get('currency') as string,
  }

  const parsed = profileSchema.safeParse(raw)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const { error } = await supabase
    .from('profiles')
    .update({
      company_name: parsed.data.company_name,
      contact_name: parsed.data.contact_name,
      ruc: parsed.data.ruc || null,
      currency: parsed.data.currency,
    })
    .eq('id', user.id)

  if (error) return { error: 'No se pudieron guardar los cambios.' }

  revalidatePath('/portal/perfil')
  return { success: 'Datos actualizados correctamente.' }
}

export async function updatePassword(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = {
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const parsed = passwordSchema.safeParse(raw)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password })

  if (error) return { error: 'No se pudo actualizar la contraseña.' }

  return { success: 'Contraseña actualizada correctamente.' }
}
