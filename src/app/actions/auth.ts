'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loginSchema, forgotPasswordSchema, resetPasswordSchema } from '@/lib/validations'

export type ActionState = {
  error?: string
  success?: string
} | undefined

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    return { error: 'Email o contraseña incorrectos' }
  }

  // Get user role to redirect appropriately
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Error al iniciar sesión' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, active')
    .eq('id', user.id)
    .single()

  if (profile && !profile.active) {
    await supabase.auth.signOut()
    return { error: 'Tu cuenta está desactivada. Contacta a soporte.' }
  }

  return { success: profile?.role === 'admin' ? '/admin' : '/portal' }
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function forgotPassword(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = { email: formData.get('email') as string }
  const parsed = forgotPasswordSchema.safeParse(raw)

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  })

  if (error) {
    return { error: 'No se pudo enviar el email. Inténtalo de nuevo.' }
  }

  return { success: 'Revisa tu email para restablecer tu contraseña.' }
}

export async function resetPassword(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = {
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const parsed = resetPasswordSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password })

  if (error) {
    return { error: 'No se pudo actualizar la contraseña. El link puede haber expirado.' }
  }

  redirect('/portal')
}
