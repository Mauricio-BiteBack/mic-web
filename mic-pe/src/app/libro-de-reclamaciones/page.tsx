'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

type TipoReclamo = 'reclamo' | 'queja';

interface FormState {
  tipo: TipoReclamo;
  // Datos del reclamante
  nombres: string;
  apellidos: string;
  tipoDoc: string;
  numDoc: string;
  email: string;
  telefono: string;
  empresa: string;
  // Detalle
  descripcion: string;
  pedido: string;
}

const INITIAL: FormState = {
  tipo: 'reclamo',
  nombres: '',
  apellidos: '',
  tipoDoc: 'DNI',
  numDoc: '',
  email: '',
  telefono: '',
  empresa: '',
  descripcion: '',
  pedido: '',
};

export default function LibroReclamacionesPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a brief delay (replace with real API call if needed)
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const folio = `MIC-${Date.now().toString().slice(-8)}`;

  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-[#0D1E6B] text-white py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(700px 500px at 70% 50%, rgba(232,7,139,0.10), transparent 70%)' }}
        />
        <div className="max-w-[1240px] mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-full text-[13px] font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
              Libro de Reclamaciones
            </div>
            <h1 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.08] tracking-[-0.025em] mb-4">
              Libro de Reclamaciones
            </h1>
            <p className="text-[16px] text-white/70 leading-relaxed">
              De conformidad con el Código de Protección y Defensa del Consumidor (Ley N° 29571), MIC pone a disposición este Libro de Reclamaciones para que puedas registrar tu reclamo o queja de manera rápida y transparente.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-[780px] mx-auto">

          {/* Info banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#fffbeb] border border-[#fbbf24]/40 rounded-[16px] p-5 flex gap-4 mb-10"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-[10px] bg-[#f59e0b]/15 text-[#d97706] grid place-items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#0a1133] mb-0.5">¿Reclamo o queja?</p>
              <p className="text-[13px] text-[#6a7196] leading-relaxed">
                <strong>Reclamo:</strong> disconformidad relacionada con los productos o servicios contratados.{' '}
                <strong>Queja:</strong> disconformidad relacionada con la atención al cliente o trato recibido. Los reclamos son atendidos en un plazo de 30 días calendario.
              </p>
            </div>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16 px-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#0aa84f]/10 text-[#0aa84f] grid place-items-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="text-[26px] font-bold text-[#0a1133] mb-3">Tu {form.tipo} fue registrado</h2>
              <p className="text-[#6a7196] mb-6 leading-relaxed">
                Hemos recibido tu {form.tipo} correctamente. Un representante de MIC se pondrá en contacto contigo en un plazo máximo de 30 días calendario.
              </p>
              <div className="inline-block bg-[#f6f7fb] border border-gray-200 rounded-[14px] px-6 py-4 mb-8">
                <span className="text-[12px] text-[#6a7196] block mb-1 uppercase tracking-wider font-semibold">N° de folio</span>
                <span className="text-[22px] font-extrabold text-[#193595] tracking-tight">{folio}</span>
              </div>
              <br />
              <button
                onClick={() => { setSubmitted(false); setForm(INITIAL); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] border border-gray-200 text-[14px] font-semibold text-[#0a1133] hover:border-[#193595] hover:text-[#193595] transition-all"
              >
                Registrar otro {form.tipo}
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Tipo */}
              <div>
                <label className="block text-[13px] font-bold text-[#0a1133] uppercase tracking-wider mb-3">
                  Tipo de registro
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['reclamo', 'queja'] as TipoReclamo[]).map(t => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => set('tipo', t)}
                      className={`flex items-center gap-3 p-4 rounded-[14px] border-2 text-left transition-all duration-150 ${
                        form.tipo === t
                          ? 'border-[#193595] bg-[#193595]/5 text-[#193595]'
                          : 'border-gray-200 bg-white text-[#6a7196] hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 grid place-items-center ${
                        form.tipo === t ? 'border-[#193595]' : 'border-gray-300'
                      }`}>
                        {form.tipo === t && <div className="w-2 h-2 rounded-full bg-[#193595]" />}
                      </div>
                      <div>
                        <strong className="block text-[14px] capitalize">{t}</strong>
                        <span className="text-[12px] opacity-75">{t === 'reclamo' ? 'Producto o servicio' : 'Atención al cliente'}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Datos del reclamante */}
              <div>
                <h3 className="text-[13px] font-bold text-[#0a1133] uppercase tracking-wider mb-4">Datos del reclamante</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nombres *" value={form.nombres} onChange={v => set('nombres', v)} placeholder="Ingresa tus nombres" required />
                  <Field label="Apellidos *" value={form.apellidos} onChange={v => set('apellidos', v)} placeholder="Ingresa tus apellidos" required />
                  <div>
                    <label className="block text-[13px] font-semibold text-[#0a1133] mb-1.5">Tipo de documento *</label>
                    <select
                      value={form.tipoDoc}
                      onChange={e => set('tipoDoc', e.target.value)}
                      className="w-full h-11 px-3.5 rounded-[10px] border border-gray-200 bg-white text-[14px] text-[#0a1133] focus:outline-none focus:border-[#193595] transition-colors"
                      required
                    >
                      <option>DNI</option>
                      <option>RUC</option>
                      <option>CE (Carné de Extranjería)</option>
                      <option>Pasaporte</option>
                    </select>
                  </div>
                  <Field label="N° de documento *" value={form.numDoc} onChange={v => set('numDoc', v)} placeholder="Número de documento" required />
                  <Field label="Correo electrónico *" type="email" value={form.email} onChange={v => set('email', v)} placeholder="tu@correo.com" required />
                  <Field label="Teléfono *" type="tel" value={form.telefono} onChange={v => set('telefono', v)} placeholder="+51 999 000 000" required />
                  <div className="sm:col-span-2">
                    <Field label="Empresa / Razón social" value={form.empresa} onChange={v => set('empresa', v)} placeholder="Nombre de tu empresa (opcional)" />
                  </div>
                </div>
              </div>

              {/* Detalle del reclamo */}
              <div>
                <h3 className="text-[13px] font-bold text-[#0a1133] uppercase tracking-wider mb-4">Detalle del {form.tipo}</h3>
                <div className="space-y-4">
                  <Field
                    label="N° de pedido o contrato (si aplica)"
                    value={form.pedido}
                    onChange={v => set('pedido', v)}
                    placeholder="Ejemplo: MIC-2025-001"
                  />
                  <div>
                    <label className="block text-[13px] font-semibold text-[#0a1133] mb-1.5">
                      Descripción del {form.tipo} *
                    </label>
                    <textarea
                      value={form.descripcion}
                      onChange={e => set('descripcion', e.target.value)}
                      placeholder={`Describe detalladamente tu ${form.tipo}. Incluye qué sucedió, cuándo y cuál es el resultado que esperas...`}
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-white text-[14px] text-[#0a1133] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#193595] transition-colors resize-none leading-relaxed"
                    />
                    <p className="text-[12px] text-[#9ca3af] mt-1.5">{form.descripcion.length}/2000 caracteres</p>
                  </div>
                </div>
              </div>

              {/* Legal note */}
              <div className="bg-[#f6f7fb] rounded-[14px] border border-gray-200 p-4">
                <p className="text-[12px] text-[#6a7196] leading-relaxed">
                  Al enviar este formulario, consientes el tratamiento de tus datos personales por parte de MIC para gestionar tu {form.tipo}, conforme a nuestra{' '}
                  <a href="/privacidad" className="text-[#193595] font-medium hover:text-[#E8078B] transition-colors">Política de Privacidad</a>.
                  {' '}MIC atenderá tu {form.tipo} en un plazo máximo de 30 días calendario, conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571).
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 h-[52px] rounded-[14px] bg-[#193595] text-white font-bold text-[15px] hover:bg-[#0d1e6b] transition-all duration-200 shadow-[0_6px_20px_rgba(25,53,149,0.30)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Enviar {form.tipo}
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#0a1133] mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full h-11 px-3.5 rounded-[10px] border border-gray-200 bg-white text-[14px] text-[#0a1133] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#193595] transition-colors"
      />
    </div>
  );
}
