// MIC channel catalog — placeholder data based on real MIC brands + plausible fillers
window.MIC_CHANNELS = [
  // FMH family
  { id: 'fmh-movies', name: 'FMH Movies', category: 'Películas', type: 'IP', lang: 'ES', color: '#E8078B', dark: '#5b0639', desc: 'Cine premium 24/7. Estrenos y clásicos.', featured: true },
  { id: 'fmh-kids', name: 'FMH Kids', category: 'Infantil', type: 'IP', lang: 'ES', color: '#ff7a3a', dark: '#7a2510', desc: 'Animación y series para niños.', featured: true },
  { id: 'fmh-family', name: 'FMH Family', category: 'Familia', type: 'IP', lang: 'ES', color: '#1ec48b', dark: '#08412c', desc: 'Contenido apto para toda la familia.', featured: true },
  { id: 'fmh-series', name: 'FMH Series', category: 'Series', type: 'IP', lang: 'ES', color: '#6c3eff', dark: '#1e0e58', desc: 'Series internacionales en HD.' },

  { id: 'pasiones', name: 'Pasiones', category: 'Telenovelas', type: 'IP', lang: 'ES', color: '#c2185b', dark: '#5a0a30', desc: 'Las mejores telenovelas latinas.', featured: true },
  { id: 'rpp-tv', name: 'RPP Televisión', category: 'Noticias', type: 'Lineal', lang: 'ES', color: '#1d4ed8', dark: '#0a1d56', desc: 'Distribución oficial RPP.', featured: true },
  { id: 'rpp-noticias', name: 'RPP Noticias', category: 'Noticias', type: 'IP', lang: 'ES', color: '#2664c5', dark: '#0a1d56', desc: 'Información 24 horas, en vivo.' },

  // FAST channels
  { id: 'cine-andino', name: 'Cine Andino', category: 'Películas', type: 'FAST', lang: 'ES', color: '#f5b015', dark: '#7a4f04', desc: 'Cine peruano y latinoamericano.', featured: true },
  { id: 'fast-action', name: 'Action FAST', category: 'Películas', type: 'FAST', lang: 'ES', color: '#ff3b6e', dark: '#7a0a25', desc: 'Acción sin parar, ad-supported.' },
  { id: 'fast-clasicos', name: 'Clásicos FAST', category: 'Películas', type: 'FAST', lang: 'ES', color: '#8e6b3a', dark: '#3a2a14', desc: 'Películas de oro, monetizado.' },

  // Sports
  { id: 'deportes-pe', name: 'Deportes Perú', category: 'Deportes', type: 'Lineal', lang: 'ES', color: '#0aa84f', dark: '#054a23', desc: 'Liga 1 y deporte nacional.' },
  { id: 'fight-arena', name: 'Fight Arena', category: 'Deportes', type: 'IP', lang: 'ES', color: '#dc2626', dark: '#5a0e0e', desc: 'Boxeo, MMA y combate.' },

  // Kids
  { id: 'kidoo', name: 'Kidoo', category: 'Infantil', type: 'IP', lang: 'ES', color: '#06b6d4', dark: '#0e3e4a', desc: 'Educación y diversión preescolar.' },
  { id: 'animados', name: 'Animados+', category: 'Infantil', type: 'FAST', lang: 'ES', color: '#a855f7', dark: '#3a1a5e', desc: 'Caricaturas clásicas y nuevas.' },

  // Lifestyle / Doc
  { id: 'gastromix', name: 'GastroMix', category: 'Gastronomía', type: 'IP', lang: 'ES', color: '#ea580c', dark: '#5a200a', desc: 'Cocina peruana y del mundo.' },
  { id: 'travel-pe', name: 'Travel Perú', category: 'Turismo', type: 'IP', lang: 'ES', color: '#14b8a6', dark: '#0a4a45', desc: 'Destinos imperdibles del país.' },
  { id: 'descubre', name: 'Descubre HD', category: 'Documentales', type: 'Lineal', lang: 'ES', color: '#92400e', dark: '#3a1808', desc: 'Documentales de naturaleza y cultura.' },
  { id: 'historia-tv', name: 'Historia TV', category: 'Documentales', type: 'IP', lang: 'ES', color: '#78350f', dark: '#3a1808', desc: 'Historia universal y latinoamericana.' },

  // Music
  { id: 'rpp-musica', name: 'RPP Música', category: 'Música', type: 'IP', lang: 'ES', color: '#1e40af', dark: '#0a1d56', desc: 'Hits y clásicos en video.' },
  { id: 'cumbia-tv', name: 'Cumbia TV', category: 'Música', type: 'FAST', lang: 'ES', color: '#facc15', dark: '#5a4a08', desc: 'Cumbia peruana 24/7.' },
  { id: 'reggaeton', name: 'Urban Beat', category: 'Música', type: 'IP', lang: 'ES', color: '#7c2d12', dark: '#3a1808', desc: 'Reggaetón y música urbana.' },

  // Series
  { id: 'novelas-classic', name: 'Novelas Clásicas', category: 'Telenovelas', type: 'FAST', lang: 'ES', color: '#be185d', dark: '#5a0a30', desc: 'Las novelas que marcaron una época.' },
  { id: 'drama-int', name: 'Drama Internacional', category: 'Series', type: 'IP', lang: 'EN/ES', color: '#581c87', dark: '#1e0e58', desc: 'Series internacionales subtituladas.' },
];

window.MIC_CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'Películas', label: 'Películas' },
  { id: 'Series', label: 'Series' },
  { id: 'Infantil', label: 'Infantil' },
  { id: 'Deportes', label: 'Deportes' },
  { id: 'Noticias', label: 'Noticias' },
  { id: 'Telenovelas', label: 'Telenovelas' },
  { id: 'Música', label: 'Música' },
  { id: 'Documentales', label: 'Documentales' },
  { id: 'Gastronomía', label: 'Gastronomía' },
  { id: 'Turismo', label: 'Turismo' },
];

window.MIC_TESTIMONIALS = [
  {
    quote: 'Pasamos de ofrecer 12 a 38 canales en cuatro semanas. La integración IP fue directa y el soporte respondió siempre antes de las dos horas.',
    name: 'Carlos Vega',
    role: 'Director Técnico',
    company: 'Cable Norte SAC · Trujillo',
    initials: 'CV'
  },
  {
    quote: 'El paquete FAST nos abrió una segunda vía de ingresos. AddFast empezó a monetizar desde el primer mes, sin tocar nuestra programación lineal.',
    name: 'María Fernández',
    role: 'Gerente Comercial',
    company: 'TeleAndina · Cusco',
    initials: 'MF'
  },
  {
    quote: 'Llevamos seis años con MIC. La distribución oficial de RPP nos da credibilidad y los canales FMH son los más vistos en nuestra grilla.',
    name: 'Jorge Aliaga',
    role: 'Gerente General',
    company: 'Cable Visión Selva · Iquitos',
    initials: 'JA'
  }
];

window.MIC_TRUST_LOGOS = [
  { name: 'FMH', letter: 'F', color: '#E8078B' },
  { name: 'Pasiones', letter: 'P', color: '#7c2d12' },
  { name: 'RPP', letter: 'R', color: '#193595' },
  { name: 'Grupo Max', letter: 'G', color: '#0a5e3f' },
  { name: 'NeoTech', letter: 'N', color: '#6c3eff' },
  { name: 'Olympia', letter: 'O', color: '#c2185b' },
  { name: 'Cinevisión', letter: 'C', color: '#ea580c' },
];
