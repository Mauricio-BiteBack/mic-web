import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, createSessionToken, verifyPassword } from '@/lib/adminAuth';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  // Rate limit: max 10 intentos por IP por hora para evitar fuerza bruta
  const ip = getClientIp(req);

  const { allowed } = await rateLimit({ action: 'admin-login', identifier: ip, limit: 10 });
  if (!allowed) {
    return NextResponse.json({ ok: false, error: 'Demasiados intentos. Espera un momento.' }, { status: 429 });
  }

  const { password } = await req.json().catch(() => ({ password: '' }));

  if (typeof password !== 'string' || !password) {
    return NextResponse.json({ ok: false, error: 'Ingresa una contrasena.' }, { status: 400 });
  }

  const valid = await verifyPassword(password);
  if (!valid) {
    return NextResponse.json({ ok: false, error: 'Contrasena incorrecta.' }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return res;
}
