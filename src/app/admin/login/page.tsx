'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin/epg/chiki-toonz';

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Contraseña incorrecta.');
        setLoading(false);
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError('Error de red. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f7fb] px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-[380px] bg-white rounded-[18px] border border-gray-200 shadow-sm p-8"
      >
        <h1 className="text-[20px] font-bold text-[#0a1133] mb-1">Panel de administración</h1>
        <p className="text-[13px] text-[#6a7196] mb-6">Ingresa la contraseña para continuar.</p>

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoFocus
          className="w-full px-4 py-3 rounded-[10px] border border-gray-200 text-[14px] outline-none focus:border-[#193595] transition-colors mb-3"
        />

        {error && <p className="text-[13px] text-red-600 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-3 bg-[#193595] text-white font-semibold rounded-[10px] hover:bg-[#0d1e6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
