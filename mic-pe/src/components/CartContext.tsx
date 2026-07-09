'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { Channel, CHANNELS } from '@/data/channels';

interface CartCtx {
  items: Set<string>;
  channels: Channel[];
  count: number;
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
}

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const saved = localStorage.getItem('mic-cart');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mic-cart', JSON.stringify([...items]));
    } catch {}
  }, [items]);

  const toggle = useCallback((id: string) =>
    setItems(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; }), []);
  const add = useCallback((id: string) =>
    setItems(s => { const n = new Set(s); n.add(id); return n; }), []);
  const remove = useCallback((id: string) =>
    setItems(s => { const n = new Set(s); n.delete(id); return n; }), []);
  const clear = useCallback(() => setItems(new Set()), []);
  const has = useCallback((id: string) => items.has(id), [items]);

  const channels = useMemo(() => CHANNELS.filter(c => items.has(c.id)), [items]);

  return (
    <CartContext.Provider value={{ items, channels, count: items.size, toggle, add, remove, clear, has }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
