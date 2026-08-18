import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, createSessionToken, verifyPassword } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: '' }));

  if (typeof password !== 'string' || !password) {
    return NextResponse.json({ ok: false, error: 'Ingresa una contraseña.' }, { status: 400 });
  }

  const valid = await verifyPassword(password);
  if (!valid) {
    return NextResponse.json({ ok: false, error: 'Contraseña incorrecta.' }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return res;
}
