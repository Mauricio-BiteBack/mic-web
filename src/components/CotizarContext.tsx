'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useCart } from './CartContext';
import CotizarModal from './CotizarModal';

interface CotizarCtx {
  open: () => void;
}

const CotizarContext = createContext<CotizarCtx | null>(null);

export function CotizarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useCart();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <CotizarContext.Provider value={{ open }}>
      {children}
      {isOpen && <CotizarModal channels={cart.channels} onClose={close} />}
    </CotizarContext.Provider>
  );
}

export function useCotizar() {
  const ctx = useContext(CotizarContext);
  if (!ctx) throw new Error('useCotizar must be used inside CotizarProvider');
  return ctx;
}
