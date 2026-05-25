/* MIC Redesign — main app */
const { useState, useEffect, useMemo, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "mosaic",
  "density": "default",
  "accent": "#E8078B",
  "showTrustBar": true,
  "channelCount": "40+"
}/*EDITMODE-END*/;

// ——————————————————————————————————————
// Cart Hook
// ——————————————————————————————————————
function useCart() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mic-cart');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });
  useEffect(() => {
    try { localStorage.setItem('mic-cart', JSON.stringify([...items])); } catch {}
  }, [items]);
  const toggle = (id) => setItems(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const add = (id) => setItems(s => { const n = new Set(s); n.add(id); return n; });
  const remove = (id) => setItems(s => { const n = new Set(s); n.delete(id); return n; });
  const clear = () => setItems(new Set());
  const has = (id) => items.has(id);
  const channels = useMemo(() => window.MIC_CHANNELS.filter(c => items.has(c.id)), [items]);
  return { items, channels, toggle, add, remove, clear, has, count: items.size };
}

// ——————————————————————————————————————
// Header
// ——————————————————————————————————————
function Header({ cart, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const prevCount = useRef(cart.count);
  useEffect(() => {
    if (cart.count > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 500);
      prevCount.current = cart.count;
      return () => clearTimeout(t);
    }
    prevCount.current = cart.count;
  }, [cart.count]);
  return (
    <header className={`site-header ${scrolled ? '' : 'over-dark'}`}>
      <div className="container header-inner">
        <a href="#" className="brand">
          <span className="brand-mark">m</span>
          <span>mic</span>
        </a>
        <nav className="nav">
          <a href="#servicios">Servicios</a>
          <a href="#configurador">Configurador</a>
          <a href="#catalogo">Catálogo</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="header-actions">
          <span className="header-phone">
            <span className="dot"></span>
            +51 991 688 980
          </span>
          <button className={`cart-btn ${bump ? 'bump' : ''}`} onClick={onOpenCart} aria-label="Mi cotización">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4"/>
              <circle cx="9" cy="20" r="1.5"/>
              <circle cx="18" cy="20" r="1.5"/>
            </svg>
            <span className="cart-label">Mi paquete</span>
            {cart.count > 0 && <span className="cart-badge">{cart.count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

// ——————————————————————————————————————
// Hero
// ——————————————————————————————————————
function Hero({ channelCount }) {
  return (
    <section className="hero">
      <div className="hero-grid-bg" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div>
          <div className="hero-eyebrow">
            <span className="pill">14 años</span>
            <span>distribuyendo señales en 14 países</span>
          </div>
          <h1>
            Todo lo que necesita tu operador para ofrecer <em>más canales este mes.</em>
          </h1>
          <p className="lede">
            Distribución de señales IP, lineales 24x7, contenidos FAST y publicidad programática para cableoperadores de Latinoamérica.
          </p>
          <div className="hero-ctas">
            <a href="#configurador" className="btn btn-primary btn-lg btn-arrow">Armar mi paquete</a>
            <a href="#catalogo" className="btn btn-secondary btn-lg">Ver catálogo</a>
          </div>
          <div className="hero-metrics">
            <div className="hero-metric">
              <span className="num">{channelCount}</span>
              <span className="label">Canales disponibles</span>
            </div>
            <div className="hero-metric">
              <span className="num">14</span>
              <span className="label">Países en LATAM</span>
            </div>
            <div className="hero-metric">
              <span className="num">RPP</span>
              <span className="label">Distribuidor oficial</span>
            </div>
            <div className="hero-metric">
              <span className="num">24/7</span>
              <span className="label">Soporte técnico</span>
            </div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img className="hero-cast" src={window.HERO_CAST_SRC} alt="" />
          <div className="hero-cast-fade"></div>
          <div className="hero-floater">
            <div className="avatar">+</div>
            <div className="text">
              <strong>3 nuevos canales</strong>
              <span>agregados esta semana</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————————————
// Trust bar
// ——————————————————————————————————————
function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="container trust-bar-inner">
        <div className="trust-bar-label">Trabajan con nosotros</div>
        <div className="trust-logos">
          {window.MIC_TRUST_LOGOS.map(l => (
            <span className="trust-logo" key={l.name} style={{ color: l.color }}>
              <span className="mini-mark" data-letter={l.letter}></span>
              {l.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ——————————————————————————————————————
// Services (4 cards)
// ——————————————————————————————————————
function Services() {
  const cards = [
    {
      num: '01', verb: 'Distribuye',
      title: 'Canales IP',
      desc: 'Integra señales premium directamente a tu headend vía streaming. 40+ canales en HD listos para grilla.',
      accent: false,
    },
    {
      num: '02', verb: 'Crea',
      title: 'Lineal 24x7',
      desc: 'Construimos tu canal lineal a partir de tu propia biblioteca. Programación continua, sin gaps.',
      accent: false,
    },
    {
      num: '03', verb: 'Monetiza',
      title: 'FAST Channels',
      desc: 'Canales gratuitos sostenidos por publicidad. Una segunda vía de ingresos sin alterar tu grilla.',
      accent: true,
    },
    {
      num: '04', verb: 'Inserta',
      title: 'AddFast',
      desc: 'Publicidad programática con pricing en tiempo real. Inventario premium con CPMs competitivos.',
      accent: false,
    },
  ];
  return (
    <section id="servicios">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Servicios</span>
          <h2>Cuatro formas de hacer crecer tu operador.</h2>
          <p>Sin contratos atados, sin volúmenes mínimos. Empieza con lo que necesitas hoy y escala cuando convenga.</p>
        </div>
        <div className="services-grid">
          {cards.map(c => (
            <div className={`service-card ${c.accent ? 'accent' : ''}`} key={c.num}>
              <div className="deco"></div>
              <div className="num">{c.num}</div>
              <div className="icon-box">
                <ServiceIcon kind={c.title} />
              </div>
              <span className="verb">{c.verb}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <a href="#" className="more">Saber más</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ServiceIcon({ kind }) {
  const props = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'Canales IP') return <svg {...props}><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/></svg>;
  if (kind === 'Lineal 24x7') return <svg {...props}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>;
  if (kind === 'FAST Channels') return <svg {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
}

Object.assign(window, { Header, Hero, TrustBar, Services, useCart });
