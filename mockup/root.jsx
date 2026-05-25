/* MIC — root */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cotizarChannels, setCotizarChannels] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  // sync body data attrs for CSS-driven tweaks
  useEffect(() => {
    document.body.dataset.heroVariant = tweaks.heroVariant;
    document.body.dataset.hero = tweaks.heroVariant;
    document.body.dataset.density = tweaks.density;
    document.documentElement.style.setProperty('--accent', tweaks.accent);
  }, [tweaks]);

  const onCotizar = (channels) => {
    setCotizarChannels(channels);
  };

  return (
    <>
      <Header cart={cart} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero channelCount={tweaks.channelCount} />
        {tweaks.showTrustBar && <TrustBar />}
        <Services />
        <Configurator cart={cart} onCotizar={onCotizar} />
        <CatalogPreview cart={cart} />
        <Testimonials />
        <CTAStrip />
      </main>
      <Footer />
      <WhatsAppFloat context={cart.channels} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onCotizar={onCotizar} />
      <CotizarModal channels={cotizarChannels} onClose={() => setCotizarChannels(null)} />
      <MicTweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
