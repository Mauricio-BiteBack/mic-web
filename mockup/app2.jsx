/* MIC Redesign — configurator + catalog + testimonials + footer + WA */

// ——————————————————————————————————————
// Configurador
// ——————————————————————————————————————
function Configurator({ cart, onCotizar }) {
  const [tab, setTab] = useState('all');
  const channels = window.MIC_CHANNELS;
  const cats = window.MIC_CATEGORIES;

  const visible = useMemo(() => (
    tab === 'all' ? channels : channels.filter(c => c.category === tab)
  ), [tab, channels]);

  const counts = useMemo(() => {
    const m = {};
    cats.forEach(c => m[c.id] = c.id === 'all' ? channels.length : channels.filter(ch => ch.category === c.id).length);
    return m;
  }, [cats, channels]);

  return (
    <section id="configurador" className="configurator">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Configurador</span>
          <h2>Arma tu paquete. Cotiza en 30 segundos.</h2>
          <p>Selecciona los canales que quieres ofrecer en tu grilla. Tu selección se guarda en <strong>Mi paquete</strong> — agrega más desde el catálogo y pide cotización cuando estés listo.</p>
        </div>
        <div className="config-shell">
          <div className="config-main">
            <div className="config-tabs">
              {cats.map(c => (
                <button
                  key={c.id}
                  className={`config-tab ${tab === c.id ? 'active' : ''}`}
                  onClick={() => setTab(c.id)}
                >
                  {c.label}
                  <span className="count">{counts[c.id]}</span>
                </button>
              ))}
            </div>
            <div className="config-channels">
              {visible.map(ch => (
                <button
                  key={ch.id}
                  className={`channel-pill ${cart.has(ch.id) ? 'selected' : ''}`}
                  onClick={() => cart.toggle(ch.id)}
                >
                  <span className="ch-logo" style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.dark})` }}>
                    {ch.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </span>
                  <span className="ch-info">
                    <span className="ch-name">{ch.name}</span>
                    <span className="ch-meta">
                      <span>{ch.type}</span>
                      <span className="dot"></span>
                      <span>{ch.category}</span>
                      <span className="dot"></span>
                      <span>{ch.lang}</span>
                    </span>
                  </span>
                  <span className="ch-check"></span>
                </button>
              ))}
            </div>
          </div>
          <aside className="config-summary">
            <h3>Tu paquete</h3>
            <div className="count-big">
              {cart.count}<span className="max"> / {channels.length}</span>
            </div>
            <div className="count-label">canales en tu cotización</div>
            <div className="selected-list">
              {cart.channels.map(ch => (
                <span className="selected-tag" key={ch.id}>
                  {ch.name}
                  <span className="x" onClick={() => cart.remove(ch.id)}>×</span>
                </span>
              ))}
            </div>
            <div className="est">
              <span>Tipos incluidos</span>
              <strong>{[...new Set(cart.channels.map(c => c.type))].join(' · ') || '—'}</strong>
            </div>
            <button
              className="send-btn"
              disabled={cart.count === 0}
              onClick={() => onCotizar(cart.channels)}
            >
              {cart.count === 0 ? 'Selecciona al menos 1 canal' : `Solicitar cotización (${cart.count})`}
            </button>
            <p className="privacy">Recibirás una propuesta personalizada en menos de 24 horas hábiles. No spam.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————————————
// Catalog preview
// ——————————————————————————————————————
function CatalogPreview({ cart }) {
  const featured = window.MIC_CHANNELS.filter(c => c.featured).slice(0, 6);
  return (
    <section id="catalogo">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Catálogo</span>
          <h2>Una selección. El catálogo completo tiene mucho más.</h2>
          <p>Filtra por categoría, tipo de distribución (IP, lineal, FAST) e idioma para encontrar la mezcla exacta.</p>
        </div>
        <div className="catalog-grid">
          {featured.map(ch => {
            const inCart = cart.has(ch.id);
            return (
              <article className="catalog-card" key={ch.id}>
                <div className={`poster`} style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.dark})` }}>
                  <span className="ch-tag">{ch.category}</span>
                  <span className="ch-type">{ch.type}</span>
                  <span className="ch-name">{ch.name}</span>
                </div>
                <div className="meta">
                  <div className="title-row">
                    <h4>{ch.name}</h4>
                    <span className="lang">{ch.lang}</span>
                  </div>
                  <p className="desc">{ch.desc}</p>
                  <button
                    className={`catalog-add ${inCart ? 'added' : ''}`}
                    onClick={() => cart.toggle(ch.id)}
                  >
                    {inCart ? (
                      <><span className="ico">✓</span> En tu paquete</>
                    ) : (
                      <><span className="ico">+</span> Agregar a cotización</>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <div className="catalog-cta">
          <div className="text">
            <strong>{window.MIC_CHANNELS.length} canales más en el catálogo completo</strong>
            <span>Filtros por categoría, tipo (IP / Lineal / FAST) e idioma.</span>
          </div>
          <a href="#" className="btn btn-dark btn-lg btn-arrow">Ver catálogo completo</a>
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————————————
// Testimonials
// ——————————————————————————————————————
function Testimonials() {
  const items = window.MIC_TESTIMONIALS;
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Lo que dicen</span>
          <h2>Operadores que ya escalaron con MIC.</h2>
          <p>Testimonios de directores y gerentes de cableoperadores del país.</p>
        </div>
        <div className="testimonials-grid">
          {items.map((t, i) => (
            <div className="testimonial" key={i}>
              <span className="placeholder-tag">Placeholder</span>
              <span className="quote-mark">“</span>
              <blockquote>{t.quote}</blockquote>
              <div className="person">
                <span className="avatar">{t.initials}</span>
                <div className="person-info">
                  <strong>{t.name}</strong>
                  <span>{t.role} · {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————————————
// CTA strip
// ——————————————————————————————————————
function CTAStrip() {
  return (
    <section className="cta-strip" id="contacto">
      <div className="container cta-strip-inner">
        <div>
          <h2>Habla con un especialista esta semana.</h2>
          <p>Te asesoramos sobre integración técnica, modelos comerciales y cómo armar la grilla ideal para tu zona.</p>
        </div>
        <div className="cta-strip-actions">
          <a href="#configurador" className="btn btn-primary btn-lg">Armar mi paquete</a>
          <a href="#" className="btn btn-secondary btn-lg">Agendar llamada</a>
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————————————
// Footer
// ——————————————————————————————————————
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="brand">
              <span className="brand-mark">m</span>
              <span>mic</span>
            </a>
            <p>Canales de TV y tecnología para el cableoperador. 14 años distribuyendo señales en Latinoamérica.</p>
            <div className="socials">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="YouTube">yt</a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Servicios</h5>
            <ul>
              <li><a href="#">Canales IP</a></li>
              <li><a href="#">Lineal 24x7</a></li>
              <li><a href="#">FAST Channels</a></li>
              <li><a href="#">AddFast</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Empresa</h5>
            <ul>
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Catálogo</a></li>
              <li><a href="#">Casos de éxito</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contacto</h5>
            <ul>
              <li>+51 991 688 980</li>
              <li>comercial@mic.pe</li>
              <li>San Isidro, Lima</li>
              <li>Miami, FL · USA</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MIC. Todos los derechos reservados.</span>
          <span><a href="#">Términos</a> · <a href="#">Privacidad</a> · <a href="#">Libro de Reclamaciones</a></span>
        </div>
      </div>
    </footer>
  );
}

// ——————————————————————————————————————
// WhatsApp Float (contextual)
// ——————————————————————————————————————
function WhatsAppFloat({ context }) {
  const [open, setOpen] = useState(true);
  const message = useMemo(() => {
    if (context && context.length > 0) {
      const names = context.map(c => c.name).join(', ');
      return `Hola, me interesa cotizar ${names} para mi operador.`;
    }
    return 'Hola, me interesa conocer el catálogo de MIC para mi operador.';
  }, [context]);
  const link = `https://wa.me/51991688980?text=${encodeURIComponent(message)}`;
  return (
    <div className="wa-float">
      {open && (
        <div className="wa-bubble">
          <span className="x" onClick={() => setOpen(false)}>×</span>
          <div>
            <strong>Conversemos por WhatsApp</strong>
            <span className="ctx">
              {context && context.length > 0
                ? `Mensaje pre-armado con tus ${context.length} canal${context.length > 1 ? 'es' : ''} seleccionado${context.length > 1 ? 's' : ''}.`
                : 'Respondemos en menos de 30 minutos en horario laboral.'}
            </span>
            <a href={link} className="send-link" target="_blank" rel="noopener">Abrir chat →</a>
          </div>
        </div>
      )}
      <a href={link} className="wa-btn" target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-.9-2.3-.3-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
      </a>
    </div>
  );
}

// ——————————————————————————————————————
// Cotizar modal
// ——————————————————————————————————————
function CotizarModal({ channels, onClose }) {
  if (!channels) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(10,17,51,.7)', backdropFilter: 'blur(8px)',
      zIndex: 100, display: 'grid', placeItems: 'center', padding: 20
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 22, padding: 40, maxWidth: 520, width: '100%',
        boxShadow: 'var(--shadow-lg)', maxHeight: '85vh', overflow: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#E8078B' }}>Cotización</span>
          <button onClick={onClose} style={{ fontSize: 24, color: '#6a7196', lineHeight: 1 }}>×</button>
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
          Tu paquete de {channels.length} canal{channels.length > 1 ? 'es' : ''}
        </h3>
        <p style={{ color: '#6a7196', margin: '0 0 24px', fontSize: 15 }}>
          Completá tus datos y te enviamos una propuesta personalizada en menos de 24 horas.
        </p>
        <div style={{ background: '#f6f7fb', borderRadius: 12, padding: 16, marginBottom: 24, maxHeight: 140, overflow: 'auto' }}>
          {channels.map(c => (
            <span key={c.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #e6e8f2',
              padding: '4px 10px', borderRadius: 999, fontSize: 12.5, margin: '0 4px 6px 0', fontWeight: 500
            }}>
              {c.name} <span style={{ color: '#6a7196', fontSize: 11 }}>· {c.type}</span>
            </span>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          <input placeholder="Nombre completo" style={inputStyle} />
          <input placeholder="Empresa / Operador" style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input placeholder="Email" type="email" style={inputStyle} />
            <input placeholder="Teléfono" type="tel" style={inputStyle} />
          </div>
          <input placeholder="Ciudad / País" style={inputStyle} />
          <button className="btn btn-primary btn-lg" style={{ marginTop: 8 }}>
            Enviar solicitud
          </button>
        </div>
      </div>
    </div>
  );
}
const inputStyle = {
  border: '1.5px solid #e6e8f2', borderRadius: 10, padding: '12px 14px', fontSize: 14,
  fontFamily: 'inherit', background: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box'
};

// ——————————————————————————————————————
// Cart Drawer
// ——————————————————————————————————————
function CartDrawer({ open, onClose, cart, onCotizar }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const grouped = useMemo(() => {
    const m = {};
    cart.channels.forEach(c => { (m[c.type] = m[c.type] || []).push(c); });
    return m;
  }, [cart.channels]);

  return (
    <>
      <div className={`cart-overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <header className="cart-head">
          <div>
            <span className="cart-eyebrow">Mi paquete</span>
            <h3>{cart.count} canal{cart.count !== 1 ? 'es' : ''} para cotizar</h3>
          </div>
          <button className="cart-close" onClick={onClose} aria-label="Cerrar">×</button>
        </header>
        <div className="cart-body">
          {cart.count === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4"/>
                  <circle cx="9" cy="20" r="1.5"/>
                  <circle cx="18" cy="20" r="1.5"/>
                </svg>
              </div>
              <h4>Tu paquete está vacío</h4>
              <p>Agregá canales desde el configurador o el catálogo. Tu selección se guarda automáticamente — podés volver cuando quieras.</p>
              <a href="#configurador" className="btn btn-primary" onClick={onClose}>Ir al configurador</a>
            </div>
          ) : (
            <>
              {Object.entries(grouped).map(([type, list]) => (
                <div className="cart-group" key={type}>
                  <div className="cart-group-head">
                    <span className="cart-type-tag" data-type={type}>{type}</span>
                    <span>{list.length} canal{list.length !== 1 ? 'es' : ''}</span>
                  </div>
                  {list.map(ch => (
                    <div className="cart-item" key={ch.id}>
                      <span className="ch-logo" style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.dark})` }}>
                        {ch.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </span>
                      <div className="cart-item-info">
                        <strong>{ch.name}</strong>
                        <span>{ch.category} · {ch.lang}</span>
                      </div>
                      <button className="cart-item-remove" onClick={() => cart.remove(ch.id)} aria-label="Quitar">×</button>
                    </div>
                  ))}
                </div>
              ))}
              <button className="cart-clear" onClick={cart.clear}>Vaciar paquete</button>
            </>
          )}
        </div>
        {cart.count > 0 && (
          <footer className="cart-foot">
            <div className="cart-summary">
              <span>Tipos incluidos</span>
              <strong>{[...new Set(cart.channels.map(c => c.type))].join(' · ')}</strong>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => { onCotizar(cart.channels); onClose(); }}>
              Solicitar cotización ({cart.count})
            </button>
            <p className="cart-foot-note">Recibirás una propuesta personalizada en menos de 24h hábiles.</p>
          </footer>
        )}
      </aside>
    </>
  );
}

Object.assign(window, { Configurator, CatalogPreview, Testimonials, CTAStrip, Footer, WhatsAppFloat, CotizarModal, CartDrawer });
