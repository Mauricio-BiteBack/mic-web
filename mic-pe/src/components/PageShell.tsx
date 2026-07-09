'use client';

import { useState, ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import CartDrawer from './CartDrawer';
import CotizarModal from './CotizarModal';
import { useCart } from './CartContext';

export default function PageShell({ children }: { children: ReactNode }) {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [cotizarOpen, setCotizarOpen] = useState(false);

  return (
    <>
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <main className="pt-[72px]">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCotizar={() => setCotizarOpen(true)}
      />
      {cotizarOpen && (
        <CotizarModal
          channels={cart.channels}
          onClose={() => setCotizarOpen(false)}
        />
      )}
    </>
  );
}
