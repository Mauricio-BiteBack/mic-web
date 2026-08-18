// Uses only Web Crypto (crypto.subtle) so this works in both the Edge
// middleware runtime and Node.js API routes — no Buffer, no Node `crypto`.

export const ADMIN_SESSION_COOKIE = 'mic_admin_session';
const SESSION_TTL_SECONDS = 12 * 60 * 60; // 12h

const encoder = new TextEncoder();

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_EPG_PASSWORD;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET or ADMIN_EPG_PASSWORD env var must be set');
  }
  return secret;
}

function bufToHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hmacHex(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return bufToHex(sig);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(): Promise<string> {
  const expiry = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const sig = await hmacHex(String(expiry));
  return `${expiry}.${sig}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [expiryStr, sig] = token.split('.');
  if (!expiryStr || !sig) return false;
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < Math.floor(Date.now() / 1000)) return false;
  const expected = await hmacHex(expiryStr);
  return timingSafeEqual(expected, sig);
}

export async function verifyPassword(candidate: string): Promise<boolean> {
  const expected = process.env.ADMIN_EPG_PASSWORD;
  if (!expected) return false;
  // Compare HMAC digests rather than the raw strings so the comparison is
  // constant-time regardless of where the candidate first differs.
  const [a, b] = await Promise.all([hmacHex(candidate), hmacHex(expected)]);
  return timingSafeEqual(a, b);
}
