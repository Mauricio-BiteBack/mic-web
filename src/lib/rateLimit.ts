/**
 * Rate limiting portable: funciona en Vercel (Node.js) y Cloudflare Workers.
 *
 * Modo 1 — Upstash Redis (recomendado, tier gratuito):
 *   Define UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN en las variables
 *   de entorno. El contador persiste entre instancias y Workers.
 *   Alta: https://upstash.com — crear cuenta, nueva base Redis, copiar las URLs.
 *
 * Modo 2 — Fallback en memoria (Map):
 *   Funciona por proceso. En serverless sin Upstash, el limite es por instancia,
 *   no distribuido. Util para reducir spam pero no es una barrera fuerte.
 */

import type { NextRequest } from 'next/server';

/**
 * Extrae la IP real del cliente de forma segura según el entorno.
 *
 * En Vercel (process.env.VERCEL definido):
 *   - Usa x-real-ip (inyectado por el edge de Vercel, no falsificable).
 *   - Fallback: primer valor de x-forwarded-for.
 *   - NUNCA usa cf-connecting-ip: en Vercel esa cabecera puede venir del
 *     cliente y no es de confianza.
 *
 * En Cloudflare Workers / otro (process.env.VERCEL no definido):
 *   - Usa cf-connecting-ip (Cloudflare la sobreescribe siempre, el cliente
 *     no puede falsificarla).
 *   - Fallback: x-real-ip.
 *
 * Si no se puede determinar la IP devuelve "unknown". El bucket "unknown"
 * recibe la mitad del límite configurado (ver rateLimit()).
 */
export function getClientIp(req: NextRequest): string {
  if (process.env.VERCEL) {
    return (
      req.headers.get('x-real-ip') ??
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      'unknown'
    );
  }
  // Cloudflare Workers (OpenNext) u otro entorno
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

const inMemoryStore = new Map<string, { count: number; resetAt: number }>()

async function upstashIncr(
  key: string,
  windowMs: number
): Promise<{ count: number; allowed: boolean; limit: number } | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  try {
    const pipeline = [
      ['INCR', key],
      ['PEXPIRE', key, String(windowMs)],
    ]
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(pipeline),
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) return null
    const data = await res.json() as [{ result: number }, { result: number }]
    return { count: data[0].result, allowed: true, limit: 0 }
  } catch {
    return null
  }
}

export interface RateLimitOptions {
  /** Identificador unico de la accion (e.g. 'admin-login') */
  action: string
  /** IP o identificador del cliente */
  identifier: string
  /** Maximo de peticiones permitidas en la ventana */
  limit: number
  /** Duracion de la ventana en ms (default: 60 * 60 * 1000 = 1 hora) */
  windowMs?: number
}

export interface RateLimitResult {
  /** true si la peticion esta dentro del limite */
  allowed: boolean
  /** Numero de peticiones en la ventana actual */
  count: number
}

export async function rateLimit({
  action,
  identifier,
  limit,
  windowMs = 60 * 60 * 1000,
}: RateLimitOptions): Promise<RateLimitResult> {
  // Las IPs desconocidas comparten un único bucket; aplicar límite más estricto
  // para que ese bucket compartido no sea un vector de bypass.
  const effectiveLimit = identifier === 'unknown' ? Math.max(1, Math.floor(limit / 2)) : limit;
  const key = `rl:${action}:${identifier}`

  // Intentar con Upstash
  const upstash = await upstashIncr(key, windowMs)
  if (upstash !== null) {
    return { allowed: upstash.count <= effectiveLimit, count: upstash.count }
  }

  // Fallback a Map en memoria
  const now = Date.now()
  const entry = inMemoryStore.get(key)

  if (!entry || now >= entry.resetAt) {
    inMemoryStore.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, count: 1 }
  }

  entry.count++
  return { allowed: entry.count <= effectiveLimit, count: entry.count }
}
