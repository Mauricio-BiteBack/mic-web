export interface ChannelDetail {
  displayCategory?: string;
  longDesc: string;
  videoUrls?: string[];
  specs?: { label: string; value: string }[];
}

function yt(url: string): string {
  // Extract YouTube video ID and return embed URL
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export const CHANNEL_DETAILS: Record<string, ChannelDetail> = {
  'comercio-tv': {
    longDesc: `Comercio TV es un canal de noticias financieras en español basado en Estados Unidos, que ofrece contenido relevante sobre la economía y los mercados financieros estadounidenses, y su impacto en América Latina. Nuestra programación incluye análisis de mercado en tiempo real, noticias económicas, entrevistas con líderes del sector, y reportajes sobre tendencias clave que conectan a EE.UU. con la región.\n\nCon una cobertura 24/7 a través de cable, satélite y plataformas digitales, Comercio TV se posiciona como una fuente esencial para los operadores de televisión interesados en ofrecer a su audiencia acceso directo a la información financiera que define el mercado estadounidense y su influencia global.`,
    videoUrls: [yt('https://youtu.be/lFDVrmg3Rkg')],
    specs: [{ label: 'Código', value: 'Comercio TV' }],
  },
  'suyai-tv': {
    longDesc: `Este proyecto en formato televisivo busca ser un medio vinculante entre las culturas, las artes y las comunidades de telespectadores. La propuesta consiste en generar y desarrollar una plataforma cultural al servicio de la comunidad, a través de la difusión de las artes, las culturas y los patrimonios en sus distintas dimensiones: local, nacional e internacional. También es un espacio de expresión para propuestas artísticas y sus diversos gestores.`,
    videoUrls: [yt('https://youtu.be/tZNlHibYbrI')],
    specs: [{ label: 'Código', value: 'SUYAI TV' }],
  },
  'memorias-toons': {
    longDesc: `Las mejores series animadas de tu vida. Los toons más clásicos y exclusivos.\n\nBienvenidos al canal que celebra las mejores series animadas infantiles clásicas y antiguas. Aquí encontrarás a los personajes que marcaron generaciones, aventuras llenas de nostalgia y valores que nunca pasan de moda. Es el lugar perfecto para revivir los momentos mágicos de tu infancia y compartirlos con las nuevas generaciones. ¡La magia de lo clásico está más viva que nunca!`,
    videoUrls: [yt('https://youtu.be/Wesk18sBlbs')],
    specs: [{ label: 'Código', value: 'Memorias Toons' }],
  },
  'memorias-pop-latino': {
    longDesc: `Descubre el ritmo y la pasión en nuestro canal dedicado a la música latina y moderna. Disfruta de los éxitos más recientes de pop, reguetón, latin y mucho más, junto con los clásicos que marcaron generaciones. ¡Vive la esencia musical que conecta culturas y celebra nuestras raíces latinas!`,
    videoUrls: [yt('https://youtu.be/wUiupTLalNw')],
    specs: [{ label: 'Código', value: 'Memorias Pop Latino' }],
  },
  'la-cantina-de-memorias': {
    longDesc: `Disfruta lo mejor de la música popular: las rancheras que tocan el alma y el vallenato romántico que enamora corazones. Un canal dedicado a los sonidos que narran historias de amor, desamor y tradición, con los grandes clásicos y los artistas que mantienen viva la esencia musical.`,
    videoUrls: [yt('https://youtu.be/NmTGt8_PIPk')],
    specs: [{ label: 'Código', value: 'La Cantina de Memorias' }],
  },
  'comedy-channel': {
    longDesc: `Comedy Channel es el canal donde la risa nunca termina. Disfruta de los programas de TV más divertidos, bromas ingeniosas y pranks inesperados que te harán estallar de risa. ¡Humor sin límites, solo en Comedy Channel!`,
    videoUrls: [yt('https://youtube.com/shorts/IFyEIk3Ik-U')],
    specs: [{ label: 'Código', value: 'Comedy Channel' }],
  },
  'horizons-explore': {
    longDesc: `El mundo está lleno de maravillas esperando a ser descubiertas. Horizons Explore te lleva a recorrer los rincones más asombrosos del planeta, explorando sus culturas, tradiciones y, por supuesto, su gastronomía. Desde aventuras en ciudades vibrantes hasta escapadas a lugares remotos, cada historia es una invitación a viajar sin límites.\n\nDelétate con los sabores del mundo, conoce a chefs y artesanos locales y sumérgete en experiencias inolvidables. Si sueñas con viajar o simplemente quieres conocer el mundo desde la comodidad de tu hogar, este es tu destino.`,
    videoUrls: [yt('https://youtu.be/BTTQofaimWs')],
    specs: [{ label: 'Código', value: 'Horizons Explore' }],
  },
  'juntos-tv': {
    longDesc: `La J es más que una letra. Juntos TV, la señal donde el entretenimiento, el bienestar, los deportes, la gastronomía, el hogar, la información, la moda, el emprendimiento y la familia se encuentran en un solo lugar.\n\nDestaca programas como Tanto por Leer (literatura), Como en Casa (cocina), Chef Market (gastronomía peruana), Auténticos (lugares emblemáticos de Lima) y Terra Nostra (telenovela). Además de contenido de deportes, moda, cultura y bienestar.`,
    videoUrls: [yt('https://youtu.be/ZPmbnoWDen8')],
    specs: [{ label: 'Código', value: 'Juntos TV' }],
  },
  'piura-tv': {
    longDesc: `Piura TV: la señal que conecta con el norte del Perú.\n\nVive lo mejor de Piura con una programación auténtica, cercana y con identidad regional. Noticias, cultura, entretenimiento y mucho más, directamente desde el corazón del norte para todo el país. Piura TV es la voz de su gente, el reflejo de su historia y el impulso de su futuro.`,
    specs: [{ label: 'Código', value: 'PIURA TV' }],
  },
  'pbo': {
    longDesc: `PBO Digital es un canal multiplataforma peruano que conecta a la audiencia con la información, el análisis y la opinión de manera clara, directa y sin rodeos.\n\nCon un estilo único, cercano y auténtico, PBO Digital acompaña a los televidentes en cada momento, ofreciendo contenidos que informan, cuestionan y generan debate. Se ha consolidado como el espacio donde la información en tiempo real se encuentra con la opinión directa y el análisis que mueve la conversación en el Perú.`,
    specs: [{ label: 'Código', value: 'PBO' }],
  },
  'eco-tv': {
    longDesc: `ECO TV Perú es un canal de televisión comprometido con la información, la cultura y el entretenimiento familiar. Su programación combina contenido educativo, noticioso y recreativo para acompañarte en cada momento del día.\n\nDesde la mañana con clásicos animados como El Chavo del 8, Los Supersónicos y Thundercats, hasta programas de actualidad y opinión. En las tardes, espacios de bienestar como Vida Natura y Vida Jade, y por las noches, el mejor cine familiar. Con ECO TV, la televisión regional, conciencia ambiental y producción nacional se fusionan en una señal que informa, inspira y conecta con el Perú.`,
    videoUrls: [yt('https://youtu.be/tskqFsfLajE')],
    specs: [{ label: 'Código', value: 'ECO TV' }],
  },
  'tv-y-tv': {
    longDesc: `Canal de entretenimiento familiar con una programación variada que combina series, películas, realities y contenidos ligeros, ideal para todo público. TV y TV ofrece una parrilla dinámica, cercana y accesible, pensada para acompañar el día a día de los hogares con contenidos fáciles de disfrutar y de alta rotación.\n\nEs una señal versátil que se adapta muy bien a parrillas básicas y ampliadas, aportando entretenimiento continuo y una experiencia amigable para audiencias diversas.`,
    videoUrls: [yt('https://youtu.be/Rc6kkozb6BI')],
    specs: [{ label: 'Código', value: 'TV Y TV' }],
  },
  'exitosa': {
    longDesc: `Exitosa es uno de los canales informativos más influyentes del Perú, reconocido por su cobertura periodística inmediata, plural y cercana a la ciudadanía. Su programación combina noticias de actualidad, análisis político, información económica, temas sociales y entrevistas, conectando con la audiencia a través de un enfoque directo y participativo.\n\nEl canal destaca por su presencia nacional, su capacidad de reacción ante los hechos más relevantes del día y por contar con conductores y analistas de amplia trayectoria, lo que lo convierte en una fuente confiable para mantenerse informado en tiempo real.`,
    videoUrls: [yt('https://youtu.be/bXLSDVVF5tA')],
    specs: [{ label: 'Código', value: 'EXITOSA' }],
  },
  'karibena': {
    longDesc: `Karibeña es uno de los canales musicales más reconocidos del Perú, especializado en cumbia, salsa, música tropical y ritmos populares que conectan directamente con el público. Su programación combina videoclips, programas musicales, animación en vivo y espacios de entretenimiento, creando una experiencia dinámica y cercana para la audiencia.\n\nEl canal destaca por su alto nivel de identificación popular, su constante interacción con el público y su capacidad de generar audiencias fieles, convirtiéndose en una señal ideal para operadores que buscan contenido de alto consumo y gran rotación dentro de su grilla.`,
    videoUrls: [yt('https://youtu.be/xMED-powBWg')],
    specs: [{ label: 'Código', value: 'KARIBEÑA' }],
  },
  'bethel': {
    longDesc: `Bethel es un canal religioso peruano enfocado en la transmisión de contenidos cristianos, orientados a fortalecer la fe, la esperanza y los valores familiares. Su programación incluye mensajes bíblicos, prédicas, espacios de reflexión, música cristiana y contenidos espirituales, diseñados para acompañar a la audiencia en su vida diaria.\n\nEl canal se caracteriza por su tono cercano, inspirador y positivo, convirtiéndose en una señal de acompañamiento espiritual constante para hogares que buscan contenido con propósito y mensaje edificante.`,
    videoUrls: [yt('https://youtu.be/fIMguqHIdNQ')],
    specs: [{ label: 'Código', value: 'BETHEL' }],
  },
  'energeek-radio': {
    longDesc: `Radio Energeek es el espacio ideal para los amantes de la música y la cultura coreana. Con una propuesta única, fusionamos los géneros Rock, Pop, K-Pop y lo mejor de la cultura coreana en una experiencia auditiva vibrante y llena de energía.\n\nDesde los ritmos más intensos del rock hasta los éxitos más populares del K-Pop, Radio Energeek es tu portal a un mundo sonoro sin fronteras. Nos mantenemos conectados con lo último en tendencias y cultura coreana, celebrando la diversidad musical. ¡Porque en Energeek, la música es una aventura sin límites!`,
    videoUrls: [yt('https://youtu.be/1eoBQQ-e5WA')],
    specs: [{ label: 'Código', value: 'ENERGEEK RADIO' }],
  },
  'albricias-tv': {
    longDesc: `Albricias TV es la señal que trae lo mejor de la vida en la granja y la música que conecta a todos. Desde los encantadores documentales sobre animales de granja hasta una selección de música variada, Albricias TV tiene algo para todos.\n\nDisfruta de contenido que celebra las tradiciones, la naturaleza y el ritmo vibrante de la música que te hace bailar, mientras exploras el mundo rural de una manera entretenida y educativa.`,
    specs: [{ label: 'Código', value: 'ALBRICIAS TV' }],
  },
  'lejano-oeste': {
    longDesc: `En Lejano Oeste revivimos la esencia del viejo oeste con las historias que marcaron generaciones. Un canal dedicado a las películas que celebran el honor, la valentía, la justicia y el espíritu indomable de los hombres y mujeres que forjaron su destino en tierras salvajes.\n\nDisfruta de grandes producciones llenas de duelos inolvidables, paisajes desérticos, héroes solitarios y relatos donde el coraje siempre tiene la última palabra. Lejano Oeste es más que un canal de cine: es una experiencia que revive la aventura, la tradición y la emoción de un género que nunca pasa de moda.`,
    videoUrls: [yt('https://youtu.be/a25qeIp5Xi4')],
    specs: [{ label: 'Código', value: 'LEJANO OESTE' }],
  },
  'sumac-tv': {
    longDesc: `SUMAC TV es el canal que celebra la esencia de la música huayno en vivo, llevando a los hogares la energía, pasión y tradición de la cultura andina. A través de transmisiones en directo, conciertos, presentaciones especiales y artistas invitados, el canal conecta al público con nuestras raíces y el talento nacional.\n\nCon una programación 100% dedicada al huayno y a la identidad cultural peruana, SUMAC TV se convierte en una ventana permanente para disfrutar de la música que representa el sentimiento del pueblo.`,
    videoUrls: [yt('https://youtu.be/50gNVG9oOrY')],
    specs: [{ label: 'Código', value: 'SUMAC TV' }],
  },
  'planeta-salvaje': {
    longDesc: `Planeta Salvaje es un canal documental que conecta a la audiencia latinoamericana con la fuerza y belleza de la vida en estado natural. Desde la sabana africana y los grandes depredadores como los leones, hasta los ecosistemas marinos y paisajes imponentes del planeta.\n\nDiseñado para un público amplio que valora el contenido de calidad, presenta producciones que exploran la fauna, la naturaleza y los territorios donde la supervivencia define cada historia. Planeta Salvaje es más que un canal de animales; es una ventana al dominio de la naturaleza y a la vida salvaje en su máxima expresión.`,
    videoUrls: [yt('https://youtu.be/lwkaFCIrbGU')],
    specs: [{ label: 'Código', value: 'PLANETA SALVAJE' }],
  },
  'cajamarca-tv': {
    longDesc: `El canal de líderes, la voz de Cajamarca. Cajamarca TV tiene como objetivo principal informar y revalorar la rica cultura cajamarquina, promoviendo el orgullo regional a través de una comunicación efectiva y plural.\n\nCon contenido local de calidad, el canal se dedica a mostrar las historias, tradiciones y eventos que definen a esta maravillosa región. A través de una programación diversa y comprometida con la comunidad, Cajamarca TV se establece como el medio de comunicación que conecta a los cajamarquinos, reflejando su identidad y fortaleciendo su presencia.`,
    videoUrls: [yt('https://youtu.be/zDfXgC-au0E')],
    specs: [{ label: 'Código', value: 'CAJAMARCA TV' }],
  },
  'memorias-corazon': {
    longDesc: `Memorias Corazón es el canal dedicado a los románticos de alma. Con una selección única de música romántica de todos los tiempos, ofrece a su audiencia una experiencia sonora llena de sentimientos profundos y emociones que tocan el corazón.\n\nDesde baladas clásicas hasta los grandes éxitos del amor contemporáneo, Memorias Corazón crea el ambiente perfecto para revivir esos momentos especiales, acompañados de las melodías que han marcado historias de amor inolvidables.`,
    videoUrls: [yt('https://youtu.be/00TuFq7DHFo')],
    specs: [{ label: 'Código', value: 'MEMORIAS CORAZON' }],
  },
  'retro-x': {
    longDesc: `RetroX es el canal que revive la magia de las grandes series que marcaron generaciones. Disfruta de íconos inolvidables como Los Picapiedras, He-Man, Candy Candy, Mazinger Z, Mi Bella Genio y muchas más producciones que siguen conquistando corazones.\n\nUn espacio dedicado a la nostalgia, donde la aventura, la fantasía y el entretenimiento clásico se mantienen más vivos que nunca. RetroX: la televisión que nunca pasa de moda.`,
    videoUrls: [yt('https://youtu.be/jxF_yA3ASL4')],
    specs: [{ label: 'Código', value: 'RETRO X' }],
  },
  'planeta-historia': {
    longDesc: `Planeta Historia es un canal dedicado a explorar los momentos más fascinantes que han marcado a la humanidad. A través de documentales, series y producciones de alta calidad, recorre civilizaciones antiguas, grandes personajes, misterios históricos y acontecimientos que transformaron el mundo, ofreciendo contenido educativo y entretenido para toda la familia.`,
    specs: [{ label: 'Código', value: 'PLANETA HISTORIA' }],
  },
  'rumbo-minero': {
    longDesc: `Rumbo Minero TV es el canal líder en información especializada sobre minería, energía y las decisiones clave que mueven la industria. Con una programación 24/7, ofrece análisis profundos de los temas más relevantes del sector, con contenidos actualizados y exclusivos.\n\nDesde noticias sobre recursos naturales hasta informes sobre innovación tecnológica y políticas gubernamentales, Rumbo Minero TV conecta a los actores más importantes del sector con los desafíos y oportunidades que definen el futuro de la minería y la energía.`,
    videoUrls: [yt('https://youtu.be/rs1cD33ja6c')],
    specs: [{ label: 'Código', value: 'RUMBO MINERO' }],
  },
  'nina-tv': {
    longDesc: `NINA TV: El ritmo que mueve tus sentidos. Canal musical y de entretenimiento con una programación dinámica que reúne videoclips de artistas internacionales y grandes referentes de la música urbana y latina como J Balvin, Daddy Yankee, Paulo Londra, Rombay y muchos más.\n\nUna propuesta fresca y actual que acompaña a la audiencia durante todo el día, conectando distintas generaciones a través de la música, la energía y las tendencias del momento.`,
    videoUrls: [yt('https://youtube.com/shorts/t5FPK1_svYk')],
    specs: [{ label: 'Código', value: 'NINA TV' }],
  },
  'mac-tv': {
    longDesc: `MAC TV es un canal dinámico y versátil que reúne lo mejor del entretenimiento y la información en una sola señal. Su programación combina espacios informativos, contenido de anime, novelas y una destacada oferta musical, con énfasis en ritmos como la cumbia y la música cajamarquina.\n\nDiseñado para conectar con audiencias diversas, MAC TV ofrece una experiencia variada que acompaña al espectador durante todo el día, integrando actualidad, cultura y entretenimiento en una propuesta fresca y cercana.`,
    specs: [{ label: 'Código', value: 'MAC TV' }],
  },
  'peru-go-tv': {
    longDesc: `Perú Go Televisión es un medio de comunicación con enfoque turístico, ambientalista, salud, música y noticiero. El canal de Cusco que el mundo ve.`,
    videoUrls: [yt('https://youtu.be/NsoiN7t1O6Q')],
    specs: [{ label: 'Código', value: 'Perú Go TV' }],
  },
  'memorias-tv': {
    longDesc: `El canal 24/7 con los mejores videos de la música romántica de los años 1960s, 1970s, 1980s y 1990s. Una selección inigualable de baladas, boleros y canciones que marcaron generaciones enteras en toda Latinoamérica.`,
    videoUrls: [yt('https://youtu.be/m9v8xGBDXs0')],
    specs: [
      { label: 'Código', value: 'Memorias TV' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'memorias-classic': {
    longDesc: `Los mejores videos clásicos del pop y rock en inglés de los maravillosos años 80s y 90s. Una ventana a la época dorada de la música anglosajona, con los grandes éxitos que siguen sonando a través del tiempo.`,
    videoUrls: [yt('https://youtu.be/K7cxNkPon7c')],
    specs: [
      { label: 'Código', value: 'Memorias Classic' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'gamarra-tv': {
    longDesc: `Señal de contenido peruano que muestra el Emporio Textil de Gamarra y la cultura gastronómica, artesanal, musical y turística de nuestro país. Una ventana al corazón económico y cultural del Perú.`,
    videoUrls: [yt('https://youtu.be/9zD5YUcAcvM')],
    specs: [{ label: 'Código', value: 'Gamarra TV' }],
  },
  'inka-vision': {
    longDesc: `Somos Inka Visión, señal abierta en Cusco. Un canal cultural, educativo e informativo con una programación totalmente en vivo desde el corazón del Imperio Inca. Conectamos al Cusco con el mundo.`,
    videoUrls: [yt('https://youtu.be/jJslVUEfz8I')],
    specs: [{ label: 'Código', value: 'Inka Vision' }],
  },
  'tv-tropical-cumbia': {
    longDesc: `Tropical Cumbia TV es el canal definitivo para los amantes de la cumbia. Ofrecemos una selección vibrante de los mejores éxitos y conciertos en vivo, junto con programas dedicados a la historia y evolución de este género. ¡Siente el ritmo y celebra la cultura cumbiera con nosotros las 24 horas del día!`,
    videoUrls: [yt('https://youtu.be/m6smTnO0fjk')],
    specs: [{ label: 'Código', value: 'TV Tropical Cumbia' }],
  },
  'tvm-sur-chile': {
    longDesc: `TVM es un canal digital con oficinas centrales en la Comuna de Los Muermos, Décima Región de Los Lagos. Su foco central es entregar información que aporte a la construcción de una sociedad participativa e incluyente, a través de contenidos informativos, culturales, deportivos y educativos en múltiples plataformas.`,
    videoUrls: [yt('https://youtu.be/pVFHuvDgwMk')],
    specs: [{ label: 'Código', value: '03' }],
  },
  'tv-libertad': {
    longDesc: `Somos un medio de comunicación hispanoamericano con enfoque global, que defiende y promueve la libertad individual, el estado de derecho y la propiedad privada como ejes fundamentales de nuestra sociedad.\n\nUna propuesta audiovisual con programación que promueve los valores occidentales de una sociedad libre, justa y democrática. Desarrollamos formatos con altos estándares de calidad en política, economía, finanzas, tecnología, ciencia, salud, bienestar, educación, cultura y deportes.`,
    videoUrls: [yt('https://youtu.be/GlxBVyGm9Wg')],
    specs: [{ label: 'Código', value: 'TV Libertad' }],
  },
  'ruidos-tv': {
    longDesc: `Ruido TV es un canal vibrante dedicado a la música rock independiente de toda Latinoamérica. En sus transmisiones, los espectadores pueden descubrir nuevos talentos, sumergirse en sonidos alternativos y disfrutar de una mezcla auténtica de géneros y estilos provenientes de diversos países.\n\nRuido TV se posiciona como un espacio único para promover bandas emergentes y conectarlas con una audiencia apasionada por la música independiente y la cultura rockera.`,
    specs: [{ label: 'Código', value: 'Ruidos TV' }],
  },
  'el-mundo-del-campo': {
    longDesc: `Programa dedicado al agro colombiano donde cada día mostramos las cosas buenas que hace la gente del campo. A lo largo de 20 años hemos visto con satisfacción que el campo de nuestro país está lleno de gente empeñada a dar lo mejor de sí misma por sacar adelante su actividad agropecuaria.`,
    videoUrls: [yt('https://youtube.com/shorts/erGJxJaKXNI')],
    specs: [{ label: 'Código', value: 'El Mundo del Campo' }],
  },
  'chikitoonz': {
    longDesc: `Chiki Toonz es el canal donde la música y la educación se convierten en diversión para los más pequeños. Acompañados de Chiki Pink, Chiki Purple, Chiki Yellow, Chiki Blue y Chiki Orange, los niños en edad preescolar aprenden cantando y bailando con canciones llenas de energía y mensajes positivos.\n\nDesde números, letras, formas y colores, hasta valores que fomentan la creatividad, imaginación y desarrollo emocional, Chiki Toonz transforma cada momento frente a la pantalla en una experiencia educativa única y entretenida.`,
    videoUrls: [yt('https://youtu.be/0rJZYc0Pasc')],
    specs: [{ label: 'Código', value: 'Chikitoonz' }],
  },
  'horizons-wild': {
    longDesc: `La vida salvaje está llena de historias sorprendentes que esperan ser contadas. Horizons Wild es una ventana a la naturaleza en su estado más puro, desde majestuosos paisajes hasta la vida oculta en los rincones más inesperados.\n\nDescubre la lucha por la supervivencia de especies extraordinarias, sigue de cerca a los exploradores que documentan la biodiversidad del planeta y aprende sobre la importancia de conservar nuestros ecosistemas. Aquí, la realidad supera la ficción y cada imagen es un recordatorio de la belleza y el poder del mundo natural.`,
    videoUrls: [yt('https://youtu.be/WAdDQsqwUc4')],
    specs: [{ label: 'Código', value: 'Horizons Wild' }],
  },
  'horizons': {
    longDesc: `Donde la historia, la ciencia y la ingeniería se encuentran. Horizons te lleva al corazón de la innovación, el ingenio y la grandeza humana. Sumérgete en documentales que revelan los secretos de megaestructuras colosales, ciudades futuristas, hazañas de la ingeniería moderna y los desafíos que moldean nuestro planeta.\n\nDesde rascacielos imposibles hasta túneles submarinos que conectan continentes, pasando por tecnologías que están cambiando la forma en que vivimos, Horizons es un viaje intelectual y visual por los límites del conocimiento y la civilización.`,
    videoUrls: [yt('https://youtu.be/XpmELFqe9TQ')],
    specs: [{ label: 'Código', value: 'VISION PLUS' }],
  },
  'mix-music-channel': {
    longDesc: `Un canal de música variada. Disfruta de lo mejor de tus artistas favoritos en una programación que recorre todos los géneros musicales. Desde Latinoamérica para el mundo.`,
    videoUrls: [yt('https://youtu.be/_CZBcFn2LRw')],
    specs: [
      { label: 'Código', value: 'Mix Music Channel' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'Venezuela' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'e-sports-go': {
    longDesc: `E-SPORTS GO: Tu destino definitivo para sumergirte en el mundo apasionante de los videojuegos y los deportes electrónicos. Desde las batallas épicas en los campos de batalla virtuales hasta los análisis profundos de los juegos más populares, en E-Sports GO encontrarás todo lo que necesitas para mantener tu pasión por el gaming en lo más alto.`,
    videoUrls: [yt('https://youtu.be/SZjYu9haVe8')],
    specs: [
      { label: 'Código', value: 'E-SPORTS GO' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'Perú' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'memorias-series': {
    longDesc: `Las mejores series clásicas y antológicas de aquellos años inolvidables. Un recorrido por las producciones que marcaron la televisión de generaciones enteras.`,
    videoUrls: [yt('https://youtu.be/66yXUFLkuKg')],
    specs: [{ label: 'Código', value: 'Memorias Series' }],
  },
  'classic-series': {
    longDesc: `Las series más emblemáticas que marcaron generaciones. Desde las comedias que te hicieron reír hasta los dramas que te conmovieron. Un canal dedicado a revivir las grandes producciones de la televisión clásica.`,
    videoUrls: [yt('https://youtu.be/GWit2eSB7nY')],
    specs: [{ label: 'Código', value: 'Classic' }],
  },
  'tvn-chile': {
    longDesc: `TVN Chile es el canal público líder en entretenimiento, noticias y cultura, con cobertura en todo el país y una programación pensada para toda la familia. Con contenidos actuales, cercanos y diversos, TVN conecta a los chilenos con lo que importa, destacando lo mejor de la identidad nacional. Además, ofrece señales como NTV, 24 Horas y TV Chile, y está presente en todas las plataformas digitales.`,
    videoUrls: [yt('https://youtu.be/iQ6gqVUjDgs')],
    specs: [{ label: 'Código', value: 'TVN CHILE' }],
  },
  'entertainment-play': {
    displayCategory: 'Cine / Terror',
    longDesc: `Entretenimiento terrorífico al máximo. Series clásicas de suspenso y las mejores películas de terror y drama. Un canal para los amantes del género que buscan suspenso y emoción sin parar.`,
    videoUrls: [yt('https://youtu.be/e2CXhV4NHew')],
    specs: [{ label: 'Código', value: 'Entertainment Play' }],
  },
  'classic-western': {
    displayCategory: 'Cine Western',
    longDesc: `Classic Western trae a tu pantalla los westerns más icónicos de la historia del cine. Duelos legendarios, héroes solitarios, justicia en tierras salvajes y la épica del Viejo Oeste en su máxima expresión. Un canal para quienes aprecian el género que definió una era del cine mundial.`,
    videoUrls: [yt('https://youtu.be/WGLzF8dSLTU')],
    specs: [{ label: 'Código', value: '01' }],
  },
  'fierro-a-fondo': {
    longDesc: `Fierro a Fondo es el canal premium que acelera la pasión por el mundo automotor. Con una programación exclusiva sobre novedades del sector, lanzamientos, pruebas de rendimiento y superdeportivos, ofrece una experiencia única para los verdaderos fanáticos de los autos.\n\nSu propuesta va más allá del entretenimiento: explora la cultura de la personalización automotriz, el diseño innovador y los talleres más exclusivos. Fierro a Fondo: donde la velocidad, la tecnología y el estilo se encuentran en un canal hecho para los amantes de los autos.`,
    videoUrls: [yt('https://youtu.be/ICzhtFLJLCY')],
    specs: [{ label: 'Código', value: 'Fierro a Fondo' }],
  },
  'ztv': {
    displayCategory: 'Cine Anime',
    longDesc: `ZTV es un canal dedicado exclusivamente a la transmisión de películas de animación japonesa. Se enfoca en traer lo mejor del anime, desde clásicos que han marcado generaciones hasta estrenos recientes que capturan la esencia de la cultura nipona.\n\nEs el refugio para los amantes del anime, ofreciendo una programación diversa que abarca películas de acción, fantasía, ciencia ficción, dramas emocionales y comedias ligeras.`,
    videoUrls: [yt('https://youtu.be/wx3sB0_TWKQ')],
    specs: [{ label: 'Código', value: 'Ztv' }],
  },
  'memorias-film': {
    longDesc: `Memorias Film: Donde los Clásicos Viven. Revive la magia de las décadas doradas con el canal que te transporta a los inolvidables años 70 y 80. Disfruta de las películas que marcaron generaciones, con historias llenas de emoción, aventuras y nostalgia.\n\nDesde comedias icónicas hasta dramas legendarios, Memorias Film rescata los mejores momentos de la televisión clásica para que vuelvas a sentir la esencia de aquellos tiempos. Tu máquina del tiempo está a un clic de distancia. ¡Vuelve a soñar como antes!`,
    videoUrls: [yt('https://youtube.com/shorts/clB07IweuBM')],
    specs: [{ label: 'Código', value: 'Memorias Film' }],
  },
  'rpp-tv': {
    longDesc: `RPP noticias del Perú y el mundo, actualizadas minuto a minuto, con deportes y entretenimiento. El canal informativo de referencia en el Perú con distribución exclusiva a nivel nacional.`,
    videoUrls: [yt('https://youtu.be/jEtuq15V87o')],
    specs: [
      { label: 'Código', value: 'RPP TV' },
      { label: 'Distribución', value: 'Perú (exclusiva)' },
      { label: 'País de origen', value: 'Perú' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'zkids': {
    longDesc: `Z Kids está diseñado específicamente para los más pequeños, enfocándose en contenido educativo y entretenido que promueve el aprendizaje temprano. La programación incluye una variedad de series animadas que no solo entretienen, sino que también ayudan a desarrollar habilidades cognitivas, emocionales y sociales en niños de preescolar.`,
    videoUrls: [yt('https://youtu.be/xPoZ9FcD1nc')],
    specs: [{ label: 'Código', value: 'Zkids' }],
  },
  'animash': {
    longDesc: `¿Te apasiona el anime? ¿Anhelas sumergirte en mundos de aventura, romance y magia? ¡Entonces, prepárate para una experiencia única en Animash! Este es el canal de televisión que te llevará a un emocionante viaje a través del fascinante universo del anime.`,
    videoUrls: [yt('https://youtu.be/CMrOuCDS8ns')],
    specs: [{ label: 'Código', value: 'Animash' }],
  },
  'aliento-vision': {
    longDesc: `Somos una cadena de televisión en español, enfocada en transmitir aliento, fe y esperanza en un mundo plagado de dificultades, con el fin de fortalecer la familia y el matrimonio.\n\nNuestra meta es impactar al mundo con el mensaje cristiano de aliento, esperanza y fe con una programación edificante, inspiradora, educativa, informativa y divertida.`,
    videoUrls: [yt('https://youtu.be/cL0de2vP27w')],
    specs: [
      { label: 'Código', value: 'Aliento Visión' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'USA' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'like-tv': {
    longDesc: `Like TV recorre y da cobertura a los mejores espectáculos y conciertos en tiempo real, junto a los eventos en vivo que se desarrollan en América Latina. Entrevistas a artistas musicales del momento y videoclips de artistas emergentes del género urbano, tropical y Pop Latino.\n\nUn espacio único que muestra todo lo mejor que quieras escuchar y ver, para alegrar tu hogar cada día.`,
    videoUrls: [yt('https://youtu.be/iHBmSEdp02E')],
    specs: [
      { label: 'Código', value: 'Like TV' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'Perú' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'gracia-tv': {
    longDesc: `Gracia TV es un canal familiar cristiano de Chile para el mundo. Entrega el mensaje de fe de forma positiva, entretenida y con valores. Una señal que inspira y fortalece a las familias a través de programación edificante y esperanzadora.`,
    videoUrls: [yt('https://youtu.be/xbJmruCyvvE')],
    specs: [
      { label: 'Código', value: 'Gracia TV' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'conecta2-tv': {
    longDesc: `¡Conéctate a Conecta2 TV! Un canal informativo misceláneo que trae el mejor contenido para todos los integrantes de tu hogar. Somos un canal que no solo te informa sino también un medio donde puedes participar con tus opiniones y consultas en vivo, porque nos acercamos a ti desde cualquier plataforma.`,
    videoUrls: [yt('https://youtu.be/zWfLQ5AmYz0')],
    specs: [
      { label: 'Código', value: 'Conecta2 TV' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'Perú' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'tropical-salsa': {
    longDesc: `Canal de salsa, ritmos afrocaribeños y eventos musicales desde Panamá. Una propuesta vibrante que celebra la música tropical en toda su riqueza rítmica y cultural.`,
    videoUrls: [yt('https://www.youtube.com/watch?v=m6smTnO0fjk')],
    specs: [
      { label: 'Código', value: 'Tropical Salsa' },
      { label: 'País de origen', value: 'Panamá' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'odtv': {
    longDesc: `Onda Digital es un canal misceláneo peruano con enfoque noticioso y de opinión sobre temas de actualidad como política, salud y belleza, así como diversas problemáticas sociales nacionales. Un espacio de debate y reflexión desde el Perú.`,
    videoUrls: [yt('https://youtu.be/aNxGyoZQgV0')],
    specs: [
      { label: 'Código', value: 'ODTV' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'Perú' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'tropical-urban-tv': {
    longDesc: `Urban TV es el canal del género urbano y eventos musicales desde Panamá. Una propuesta dinámica que conecta con las audiencias jóvenes a través de los ritmos más actuales del reggaetón, trap y música urbana.`,
    videoUrls: [yt('https://www.youtube.com/watch?v=m6smTnO0fjk')],
    specs: [
      { label: 'Código', value: 'Tropical Urban TV' },
      { label: 'País de origen', value: 'Panamá' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'tropical-cultour-tv': {
    longDesc: `Cultour TV es el canal de jazz, latin jazz y eventos culturales desde Panamá. Una propuesta sofisticada que celebra la música de jazz y las expresiones culturales más refinadas de América Latina.`,
    videoUrls: [yt('https://www.youtube.com/watch?v=m6smTnO0fjk')],
    specs: [
      { label: 'Código', value: 'Tropical Cultura TV' },
      { label: 'País de origen', value: 'Panamá' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'nativa': {
    longDesc: `Nativa: ¡Un canal inteligente! Somos un medio de comunicación independiente que promueve la libertad, la pluralidad y el diálogo. Alentamos las ideas positivas y contribuimos generando contenidos de alta calidad en todas nuestras plataformas.`,
    videoUrls: [yt('https://youtu.be/Y8IElyaXE0M'), yt('https://youtu.be/pYvLmCwiWJk'), yt('https://youtu.be/iz1BpwA4Q6g')],
    specs: [
      { label: 'Código', value: 'Nativa' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'Perú' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'kizzi': {
    longDesc: `Todos se reúnen para disfrutar de lo mejor de la música de las mejores décadas. Kizzi te lo lleva a casa, sin cortes ni interrupciones. FMH con su canal Kizzi te invita a vivir esta aventura donde padres e hijos pueden disfrutar de los mejores videos musicales de los 70, 80 y 90s en la comodidad de tu hogar.`,
    videoUrls: [yt('https://youtu.be/YbqfzdBdDLI')],
    specs: [
      { label: 'Código', value: 'Kizzi' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'Chile' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'pasiones': {
    longDesc: `Pasiones es un canal multicultural, dedicado a telenovelas y series de televisión de diversos géneros, con producciones latinoamericanas que lideraron las mediciones de audiencia y marcaron una época en Venezuela, Colombia, Argentina, Brasil, Chile, México, Perú y Estados Unidos hispano.\n\nLas 24 horas, los 7 días de la semana, Pasiones ofrece la mejor combinación de los más recientes éxitos y los clásicos de siempre. Distribución exclusiva para Perú.`,
    videoUrls: [yt('https://youtu.be/2m7ueEb-kzQ')],
    specs: [
      { label: 'Código', value: 'Pasiones' },
      { label: 'Distribución', value: 'Perú (exclusiva)' },
      { label: 'País de origen', value: 'USA' },
      { label: 'Receptor', value: 'Cisco 9865D' },
      { label: 'Satélite', value: 'SES 6' },
      { label: 'Tecnología', value: 'Satelital' },
    ],
  },
  'acocina': {
    longDesc: `Programa de cocina dedicado a la gastronomía andaluza. El espacio ofrece recetas, consejos y trucos que ayudarán a los espectadores a introducirse en el arte culinario. Una ventana a la riquísima tradición gastronómica de Andalucía, España.`,
    videoUrls: [yt('https://youtu.be/uZo4zm-Z_uU')],
    specs: [
      { label: 'Código', value: 'ACocina' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'España' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'aturismo': {
    longDesc: `ATurismo emite contenidos provenientes de Andalucía Turismo. Un canal temático que ofrece las costumbres, tradiciones, gastronomía, fiestas y paisajes de la geografía andaluza, mediante reportajes y publirreportajes de alta calidad.`,
    videoUrls: [yt('https://youtu.be/yP478sB_wLg')],
    specs: [
      { label: 'Código', value: 'ATurismo' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'España' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'rusia-tv': {
    longDesc: `Rusia TV presenta boletines de noticias, documentales, programas de entrevistas y debates, además de noticias deportivas y programas culturales destinados al mercado de noticias extranjero, desde un punto de vista ruso.`,
    specs: [
      { label: 'Código', value: 'Rusia TV' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'agrotendencia': {
    longDesc: `Agrotendencia Televisión es un canal dedicado a promover información y prácticas sostenibles para el desarrollo del sector agroalimentario latinoamericano. Cuenta con programas relacionados a la agricultura, ganadería, piscicultura, forestal, medio ambiente y todos los temas transversales: cambio climático, género y juventud rural, bioeconomía, bienestar animal y nutrición.`,
    videoUrls: [yt('https://youtu.be/KKBRsCAVjl4')],
    specs: [{ label: 'Código', value: 'Agrotendencia' }],
  },
  'atlas': {
    longDesc: `Atlas: bienvenidos a un nuevo destino para todos. Viajamos por el mundo para traer a tu pantalla los mejores documentales y visiones de nuestro planeta, espacio y sociedad.\n\nRecorre vastos paisajes, planetas y mundos distantes junto a la naturaleza, flora y fauna. Conoce la vida de distintas personalidades del mundo y aprende de la historia: el origen de las civilizaciones, la caída de grandes imperios, las guerras y las obras del ser humano. Acompáñanos en este viaje solo con ATLAS.`,
    videoUrls: [yt('https://youtu.be/yaisTcE0KTg')],
    specs: [{ label: 'Código', value: 'Atlas' }],
  },
  'titan-channel': {
    longDesc: `Contenidos sobre deportes de contacto. Eventos internacionales TOP en directo, reportajes, programas, noticias, entrevistas y miles de combates. Lo mejor en MMA, Kick Boxing, Muay Thai, Boxeo, BJJ, Grappling… todo en un solo canal.\n\nTitan Channel, ¡Donde está la acción! Librería de contenidos de 600 horas+, servicio SVOD y producciones propias.`,
    videoUrls: [yt('https://youtu.be/yL3m8L9H8G0')],
    specs: [
      { label: 'Código', value: 'Titan Channel' },
      { label: 'Distribución', value: 'Chile, Perú, Ecuador, Bolivia, Paraguay' },
      { label: 'País de origen', value: 'España' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'cine-latino': {
    longDesc: `El canal número uno de películas contemporáneas en español, que ofrece los títulos más recientes y taquilleros de México, Latinoamérica y España, de los cuales la gran mayoría han sido ganadores de premios y aclamados por la crítica y en festivales de cine internacionales.\n\nCine Latino transmite las 24 horas del día sin cortes comerciales. Aquí encontrarás las películas con las estrellas latinas más destacadas como Diego Luna, Demián Bichir, Gael García Bernal, Antonio Banderas, entre muchos otros.`,
    videoUrls: [yt('https://youtu.be/xHDyDHQYFMM'), yt('https://youtu.be/_To3g34eV64')],
    specs: [{ label: 'Código', value: 'Cine Latino' }],
  },
  'funbox': {
    longDesc: `Fun Box es un canal infantil chileno disponible para Ecuador, República Dominicana y Panamá. Su programación exhibe tanto series animadas como películas enfocadas principalmente a niños de 4 a 8 años, con contenido educativo y entretenido de alta calidad.`,
    videoUrls: [yt('https://youtu.be/QnVjRRMuZEU')],
    specs: [{ label: 'Código', value: 'Funbox' }],
  },
  'fmh-movies': {
    displayCategory: 'Cine',
    longDesc: `FMH Movies es un canal pensado para todos los amantes del cine que buscan lo más nuevo, estrenos y novedades. 24 horas de entretenimiento con los actores y personajes que quieras ver.\n\nVive la experiencia del mejor cine, con los más destacados estrenos a nivel mundial: acción, aventura, ciencia ficción, drama, suspenso, thriller y los más recientes de la pantalla grande, directo a tus dispositivos de video.`,
    videoUrls: [yt('https://youtu.be/ov2KeivPLg0')],
    specs: [{ label: 'Código', value: 'FMH Movies' }],
  },
  'dm-kids': {
    displayCategory: 'Cine Infantil',
    longDesc: `Un canal de entretenimiento y diversión para los más pequeños de casa. Aprendizaje, canciones infantiles y dibujos animados que acompañan a los niños en su desarrollo con contenido sano y entretenido.`,
    videoUrls: [yt('https://youtu.be/qzy3AYQ3QRU')],
    specs: [{ label: 'Código', value: 'Dm Kids' }],
  },
  'fmh-family': {
    displayCategory: 'Cine Familiar',
    longDesc: `Todos se reúnen para disfrutar de lo mejor del cine familiar, en el único canal que recopila las más divertidas películas. FMH Family te invita a vivir esta aventura donde padres e hijos se encuentran en torno a las más variadas historias.\n\nNo lo dudes más y dispón junto a los tuyos de un momento entretenido que te brindará hermosas y mágicas experiencias de vida.`,
    videoUrls: [yt('https://youtu.be/EKmf0rElzSQ')],
    specs: [{ label: 'Código', value: 'FMH Family' }],
  },
  'fmh-kids': {
    displayCategory: 'Cine',
    longDesc: `FMH Kids es un canal pensado para los más pequeños de casa. Con las mejores películas animadas, tus pequeños vivirán experiencias únicas.\n\nLas mejores películas animadas las encuentras en FMH Kids.`,
    videoUrls: [yt('https://youtu.be/1YpfQVn6epI')],
    specs: [{ label: 'Código', value: 'FMH Kids' }],
  },
  'antena-1': {
    longDesc: `Antena 1: ¿Cansado de no encontrar tus programas favoritos? En Antena 1 encontrarás lo que buscas. Noticias, música, cultura, tradición y mucho más. Antena 1, un canal diferente e innovador, porque sabemos lo que te gusta.`,
    videoUrls: [yt('https://youtu.be/xnWTygYcTnk')],
    specs: [
      { label: 'Código', value: 'Antena 1' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'Perú' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'ovacion': {
    longDesc: `OVACIÓN es el canal de TV dedicado las 24 horas del día a los hinchas aficionados del deporte nacional e internacional. Los oyentes interactúan con los conductores a través de comentarios telefónicos y redes sociales, creando una comunidad deportiva activa y apasionada.`,
    videoUrls: [yt('https://youtu.be/XeDSaYrWlgM')],
    specs: [{ label: 'Código', value: 'Ovacion' }],
  },
  'comic-pop': {
    longDesc: `Cómic POP: Sumérgete en la nostalgia y redescubre los clásicos de la animación. Desde las legendarias series hasta los favoritos de la infancia de generaciones pasadas, estamos aquí para llevarte en un viaje lleno de risas, aventuras y recuerdos inolvidables.`,
    videoUrls: [yt('https://youtu.be/H6D4m3_8pWs')],
    specs: [{ label: 'Código', value: 'Comic Pop' }],
  },
  'clover': {
    displayCategory: 'Cine',
    longDesc: `Llega a América Latina un nuevo canal de cine para una audiencia que merece programación profesional. No hay que buscar entre varias opciones: aquí están las grandes estrellas. Ríase una y otra vez con las mejores comedias. Descubra nuevamente los más impactantes dramas con sus actores favoritos.\n\nLas mejores películas por los genios del cine: S. Spielberg, A. Minghella, Hnos. Coen, B. Bertolucci, entre otros.`,
    videoUrls: [yt('https://youtu.be/1N1Gjn8EPa8')],
    specs: [{ label: 'Código', value: 'Clover' }],
  },
  'rewind': {
    displayCategory: 'Cine',
    longDesc: `REWIND es un canal que presenta excelentes películas, sin cortes y sin comerciales, destacando todo el espectro de la historia del cine. Además, se renueva día a día buscando aquellas joyas del séptimo arte escondidas en el tiempo y en la memoria colectiva, desde 1920 hasta la actualidad.\n\nSu programación abarca títulos para niños, jóvenes y adultos, quienes se encantan día a día rememorando aquellos pasajes de la historia fílmica que marcaron épocas y vidas.`,
    videoUrls: [yt('https://youtu.be/kBpmF2R-fTc')],
    specs: [{ label: 'Código', value: 'Rewind' }],
  },
  'energeek': {
    longDesc: `Este canal, parte de la familia EnerGeek, ofrece una programación diversa las 24 horas del día. Desde emocionantes caricaturas hasta cautivadoras series de animación japonesa, pasando por vibrantes series live-action y divertidas sitcoms, es el destino perfecto para todos los amantes del entretenimiento.`,
    videoUrls: [yt('https://youtu.be/aA5QeV3A9hs')],
    specs: [{ label: 'Código', value: 'ENERGEEK' }],
  },
  'classic-plus': {
    displayCategory: 'Cine Clásico',
    longDesc: `Classic+ es el canal con las mejores películas clásicas de siempre. Una selección cuidadosa de los grandes títulos que han marcado la historia del cine, presentados sin interrupciones para que disfrutes de la experiencia completa.`,
    videoUrls: [yt('https://youtu.be/WGLzF8dSLTU')],
    specs: [{ label: 'Código', value: 'Classic' }],
  },
  'vpi': {
    longDesc: `VPI TV es un canal creado para ofrecer a los venezolanos información sin censura, de calidad y con acceso directo. Un canal hecho por venezolanos para venezolanos en cualquier parte del mundo.\n\nNoticias en vivo, los mejores programas con periodistas destacados y contenido actualizado en salud, deportes, economía, arte, espectáculos, belleza y cocina. Lo urgente, lo importante y lo interesante sobre Venezuela y el mundo.`,
    videoUrls: [yt('https://youtu.be/cEZG-N_GxSg')],
    specs: [
      { label: 'Código', value: 'VPI' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'USA' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'asiri': {
    longDesc: `Un canal de televisión con la mejor cobertura y programación en Noticias, Cultura y Entretenimiento. Somos Asiri TV, ¡Crece Contigo! Una propuesta peruana con contenido diverso y de calidad para toda la audiencia.`,
    videoUrls: [yt('https://youtu.be/_QDlhUcAdQM')],
    specs: [
      { label: 'Código', value: 'Asiri' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'Perú' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'telelima': {
    longDesc: `Un canal con bloques informativos, periodísticos, magazine familiar, salud, emprendimiento, arte, folklore peruano, cultura y entretenimiento interactivo. Telelima, uniendo a toda la familia peruana con programación cercana y de contenido local de calidad.`,
    videoUrls: [yt('https://youtu.be/gIk92AH1x1k')],
    specs: [{ label: 'Código', value: 'Telelima' }],
  },
  'animotion': {
    longDesc: `Animotion trae a la pantalla aquellos dibujos animados clásicos de antaño, con los cuales han crecido los que alguna vez fueron niños, y quieren rememorar aquellos clásicos de ayer y hoy. Contamos con una selección de dibujos animados clásicos en español, 24 horas, sin cortes y sin comerciales.`,
    videoUrls: [yt('https://youtu.be/yaisTcE0KTg')],
    specs: [{ label: 'Código', value: 'Animotion' }],
  },
  'grupo-cadena-madrid': {
    longDesc: `Un canal de TV actual, cultural, fresco y plural. Contenidos útiles y entretenidos para la sociedad, destinados a estimular la creatividad, fomentar la participación social, informar, educar y divertir a la comunidad de Madrid y toda Latinoamérica.`,
    specs: [
      { label: 'Código', value: 'Grupo Cadena Media Madrid' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'España' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'radio-carioca-tv': {
    longDesc: `Radio Carioca es un canal musical dedicado a celebrar la riqueza de la música y la cultura brasileña a través de una programación dinámica y entretenida. Con una propuesta única en español, ofrece una combinación de videoclips, especiales musicales, biografías de artistas, contenido exclusivo detrás de cámaras y cobertura de los eventos más emblemáticos de Brasil.\n\nEntre sus principales atractivos destaca la cobertura especial del famoso Carnaval de Río de Janeiro, acercando a la audiencia toda la energía, color y tradición de una de las festividades más importantes del mundo.\n\nRadio Carioca es una ventana al ritmo, la cultura y la pasión de Brasil, diseñada para conectar a los espectadores con los artistas, historias y sonidos que han marcado generaciones.`,
    videoUrls: [yt('https://youtu.be/2dw1o6jnB5I')],
    specs: [
      { label: 'Contenido', value: 'Musicales · Biografías · Backstage · Carnaval de Río de Janeiro' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'rfi': {
    longDesc: `RFI (Radio France Internationale) es una reconocida emisora internacional que conecta a sus oyentes con la actualidad del mundo a través de noticias, análisis, cultura y contenidos de interés global. Con una cobertura informativa confiable y una mirada internacional, RFI ofrece programación en múltiples idiomas, acercando a las audiencias a los acontecimientos más relevantes de política, economía, sociedad y cultura. Una señal pensada para quienes buscan información de calidad, perspectiva global y conexión con el mundo sin fronteras.`,
    videoUrls: [yt('https://youtu.be/Kbf5NnHh9OU?si=Dm1ZjY6Yq13zRFn5')],
    specs: [
      { label: 'Código', value: 'RFI' },
      { label: 'País de origen', value: 'Francia' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'entertainment-play-classic': {
    displayCategory: 'Cine Clásico',
    longDesc: `Entertainment Play Classic\n\nLos grandes clásicos del entretenimiento que marcaron generaciones\n\nEntertainment Play Classic es un canal dedicado a revivir la época dorada de la televisión y el cine, ofreciendo una selección de series icónicas, comedias inolvidables y películas que han trascendido el paso del tiempo. Su programación reúne producciones legendarias que continúan cautivando a audiencias de todas las edades.\n\nDisfruta de personajes entrañables, historias memorables y el humor que definió a generaciones enteras, en una propuesta ideal para los amantes de la nostalgia y el entretenimiento clásico.\n\nEntertainment Play Classic: Donde los clásicos viven para siempre.`,
    videoUrls: [yt('https://youtu.be/bko0izo7P1k')],
    specs: [
      { label: 'Código', value: 'Entertainment Play Classic' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'cine-d': {
    displayCategory: 'Cine Religioso',
    longDesc: `Cine D: Películas que Iluminan el Alma\n\nEn Cine D, te ofrecemos una selección única de películas que nos acercan a la fe y la espiritualidad. Disfruta de historias inspiradas en la Biblia, películas sobre Jesús, y contenidos cristianos que te conectarán con el mensaje de esperanza y amor.\n\nNuestro canal es el lugar ideal para quienes buscan entretenimiento enriquecedor, con historias que edifican, testimonios de fe, y películas religiosas que transforman vidas. Desde clásicos cristianos hasta producciones modernas, Cine D trae a la pantalla grandes relatos basados en los principios y valores cristianos.\n\nCon Cine D, no solo verás una película; vivirás una experiencia que te acerca más a la palabra de Dios.\n\n¡Únete a nuestra comunidad y deja que el cine te guíe en el camino de la fe!`,
    specs: [
      { label: 'Código', value: 'Cine D' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'ewtn': {
    longDesc: `EWTN es una señal que acompaña a millones de personas alrededor del mundo con contenido que inspira, fortalece la fe y brinda esperanza en el día a día. Con transmisiones de la Santa Misa, mensajes de reflexión, noticias del Vaticano, testimonios, programas familiares y espacios de formación espiritual, EWTN conecta con quienes buscan una televisión con propósito, valores y un mensaje que toque el corazón. Una compañía de fe y esperanza disponible las 24 horas del día.`,
    specs: [
      { label: 'Código', value: 'EWTN' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'tv-carioca-internacional': {
    longDesc: `TV Carioca Internacional\n\nLa esencia del entretenimiento brasileño para toda Latinoamérica\n\nTV Carioca Internacional es una señal dedicada a llevar lo mejor de la televisión clásica, el cine, la comedia y la cultura de Brasil a las audiencias de habla hispana. Con programación en portugués y subtítulos en español, ofrece una experiencia única que acerca al público a la riqueza cultural y artística brasileña.\n\nDisfruta de grandes clásicos del entretenimiento mundial como Charles Chaplin, El Gordo y el Flaco, Los Tres Chiflados, Yo Amo a Lucy y Mi Bella Genio, además de espacios musicales, cine y programas especiales que reflejan la alegría y el espíritu de Brasil.\n\nLa señal también presenta coberturas especiales de eventos emblemáticos como el Carnaval de Río de Janeiro, llevando toda la energía, color y tradición de una de las celebraciones más reconocidas del mundo.\n\nTV Carioca Internacional combina nostalgia, diversión y cultura en una propuesta ideal para toda la familia.`,
    videoUrls: [yt('https://youtu.be/TSroykhqoTU')],
    specs: [
      { label: 'Código', value: 'TV Carioca Internacional' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'sportsmax-news': {
    longDesc: `SportsMax News: Un canal de noticias deportivas 24/7 con las últimas novedades del deporte mundial en tiempo real. Cobertura continua para los fanáticos del deporte que no quieren perderse nada.`,
    videoUrls: [yt('https://youtu.be/jyfwLiUh6_A')],
    specs: [
      { label: 'Código', value: 'SportsMax News' },
      { label: 'Distribución', value: 'Latinoamérica' },
      { label: 'País de origen', value: 'Venezuela' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'esports-max': {
    longDesc: `E Sport Max es el canal dedicado a los torneos de juegos electrónicos más emocionantes del mundo. Una propuesta pensada para adolescentes y jóvenes apasionados por el gaming competitivo, con cobertura de las principales competencias de esports, análisis de jugadas y todo lo que necesitas saber del universo gamer.`,
    videoUrls: [yt('https://www.youtube.com/watch?v=ulXfNySOEgg')],
    specs: [
      { label: 'Código', value: 'E Sport Max' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'horse-racing-max': {
    longDesc: `Horse Racing Max es el canal especializado en carreras de caballos, transmitiendo en vivo y en diferido las competencias hípicas más importantes del mundo. Una señal única para los aficionados a las carreras, con cobertura de los principales hipódromos, análisis de ejemplares y toda la emoción del deporte hípico.`,
    videoUrls: [yt('https://www.youtube.com/watch?v=qlfsxOPrnZo')],
    specs: [
      { label: 'Código', value: 'Horse Racing Max' },
      { label: 'Tecnología', value: 'IP' },
    ],
  },
  'max-anime': {
    longDesc: `Un canal 100% anime, de acción y aventura. Todo el universo del anime japonés en un solo lugar, con las mejores series y películas de acción y aventura para los fanáticos del género.`,
    videoUrls: [yt('https://youtu.be/GrgvBNWXu2c')],
    specs: [{ label: 'Código', value: 'Max Anime' }],
  },
};
