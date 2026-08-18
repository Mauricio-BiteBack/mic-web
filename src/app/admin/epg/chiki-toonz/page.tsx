'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

interface SuccessResult {
  ok: true;
  warnings: string[];
  updatedDays: string[];
  totalDays: number;
}

interface ErrorResult {
  ok: false;
  error: string;
  details?: string[];
}

type UploadResult = SuccessResult | ErrorResult;

export default function ChikiToonzEpgAdminPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('month', month);

    try {
      const res = await fetch('/api/admin/epg/chiki-toonz', { method: 'POST', body: formData });
      const data: UploadResult = await res.json();
      setResult(data);
      if (data.ok && fileInputRef.current) {
        fileInputRef.current.value = '';
        setFileName('');
      }
    } catch {
      setResult({ ok: false, error: 'Error de red al subir el archivo. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] py-12 px-6">
      <div className="max-w-[640px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[22px] font-bold text-[#0a1133]">Programación — Chiki Toonz</h1>
          <button onClick={logout} className="text-[13px] text-[#6a7196] hover:text-[#193595] cursor-pointer">
            Cerrar sesión
          </button>
        </div>

        <form onSubmit={submit} className="bg-white rounded-[16px] border border-gray-200 shadow-sm p-6 mb-6">
          <p className="text-[13px] text-[#6a7196] mb-5">
            Sube el Excel semanal de programación (.xlsx). Se fusiona con los días ya guardados —
            si subes solo una semana, el resto del mes no se toca.
          </p>

          <label className="block text-[13px] font-semibold text-[#0a1133] mb-1.5">Mes</label>
          <select
            value={month}
            onChange={e => setMonth(e.target.value)}
            className="w-full px-4 py-2.5 rounded-[10px] border border-gray-200 text-[14px] outline-none focus:border-[#193595] mb-4 bg-white"
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </select>

          <label className="block text-[13px] font-semibold text-[#0a1133] mb-1.5">Archivo Excel (.xlsx)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            onChange={e => setFileName(e.target.files?.[0]?.name || '')}
            className="w-full text-[13px] text-[#6a7196] file:mr-3 file:py-2 file:px-4 file:rounded-[8px] file:border-0 file:bg-[#193595] file:text-white file:font-semibold file:cursor-pointer mb-5 cursor-pointer"
          />

          <button
            type="submit"
            disabled={loading || !fileName}
            className="w-full py-3 bg-[#E8078B] text-white font-semibold rounded-[10px] hover:bg-[#ff1e9f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Procesando…' : 'Subir y actualizar programación'}
          </button>
        </form>

        {result && (
          <div
            className={`rounded-[16px] border p-6 ${
              result.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            {result.ok ? (
              <>
                <p className="text-[15px] font-bold text-green-800 mb-2">✓ Programación actualizada</p>
                <p className="text-[13px] text-green-700 mb-1">
                  {result.updatedDays.length} día(s) actualizados de esta subida. Total en el mes: {result.totalDays} día(s).
                </p>
                {result.warnings.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-[12.5px] font-semibold text-green-800 mb-1.5">Avisos:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.warnings.map((w, i) => (
                        <li key={i} className="text-[12.5px] text-green-700">{w}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-[15px] font-bold text-red-800 mb-2">✕ No se pudo procesar el archivo</p>
                <p className="text-[13px] text-red-700">{result.error}</p>
                {result.details && result.details.length > 0 && (
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {result.details.map((d, i) => (
                      <li key={i} className="text-[12.5px] text-red-700">{d}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
