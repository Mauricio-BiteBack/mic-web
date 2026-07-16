'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Services from '@/components/Services';
import PackageConfigurator from '@/components/PackageConfigurator';
import CatalogPreview from '@/components/CatalogPreview';
import WhatsAppTestimonials from '@/components/WhatsAppTestimonials';
import CTAStrip from '@/components/CTAStrip';
import RPPBanner from '@/components/RPPBanner';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/components/CartContext';
import { useCotizar } from '@/components/CotizarContext';

export default function HomePage() {
  const cart = useCart();
  const cotizar = useCotizar();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <main>
        <Hero />
        <TrustBar />
        <RPPBanner />
        <CatalogPreview />
        <PackageConfigurator onCotizar={cotizar.open} />
        <Services />
        <WhatsAppTestimonials />
        <CTAStrip />
      </main>

      <Footer />
      <WhatsAppFloat />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCotizar={cotizar.open}
      />
    </>
  );
}
