'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Services from '@/components/Services';
import PackageConfigurator from '@/components/PackageConfigurator';
import CatalogPreview from '@/components/CatalogPreview';
import Testimonials from '@/components/Testimonials';
import CTAStrip from '@/components/CTAStrip';
import RPPBanner from '@/components/RPPBanner';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CartDrawer from '@/components/CartDrawer';
import CotizarModal from '@/components/CotizarModal';
import { useCart } from '@/components/CartContext';

export default function HomePage() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [cotizarOpen, setCotizarOpen] = useState(false);

  return (
    <>
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <main>
        <Hero />
        <TrustBar />
        <RPPBanner />
        <CatalogPreview />
        <PackageConfigurator onCotizar={() => setCotizarOpen(true)} />
        <Services />
        <Testimonials />
        <CTAStrip />
      </main>

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
