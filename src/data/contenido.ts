/**
 * Todo el texto del portafolio en un solo lugar (español e inglés).
 * Para cambiar algo del sitio, casi siempre basta con editar este archivo.
 */
export type Idioma = "es" | "en";
type T = Record<Idioma, string>;

export const PERFIL = {
  nombre: "Jose Juan Juarez",
  nombreCompleto: "Jose Juan Juarez Martinez",
  alias: "ZeroFuann",
  correo: "josejuanjuarezmartinez28@gmail.com",
  // El número no se muestra escrito en el sitio: solo se usa en el enlace de WhatsApp.
  whatsapp: (import.meta.env.VITE_WHATSAPP as string | undefined) ?? "",
  linkedin: "https://www.linkedin.com/in/josejuanjuarezmartinez",
  github: "https://github.com/ZeroFuann-FS",
  cv: "/cv/CV-Jose-Juan-Juarez-Martinez.pdf",
  ubicacion: "Misantla, Veracruz · MX",
};

export const TEXTOS = {
  nav: {
    proyectos: { es: "Proyectos", en: "Projects" },
    sobreMi: { es: "Sobre mí", en: "About" },
    stack: { es: "Stack", en: "Stack" },
    servicios: { es: "Servicios", en: "Services" },
    contacto: { es: "Contacto", en: "Contact" },
  },
  hero: {
    estado: { es: "Residente en Synesia Labs · abierto a oportunidades", en: "Resident at Synesia Labs · open to opportunities" },
    linea1: { es: "Escucho el problema,", en: "I listen to the problem," },
    linea2: { es: "lo construyo con IA", en: "build it with AI" },
    linea3: { es: "y lo llevo a producción.", en: "and ship it to production." },
    bajada: {
      es: "Así trabajo con quienes usan lo que hago: me escriben, entiendo qué pasa y lo resuelvo. Rápido, de punta a punta y con el código bajo control.",
      en: "That's how I work with the people who use what I build: they write to me, I figure out what's wrong and I fix it. Fast, end to end, with the code under control.",
    },
    historia: {
      reporte: { es: "“Iba a registrar mi comida y no me dejó poner empanadas de queso”", en: "“I was logging my meal and it wouldn't let me add cheese empanadas”" },
      quien: { es: "Usuaria de Brío", en: "Brío user" },
      respuesta: { es: "Ya lo vi: no estaban en la base y el buscador era muy estricto. Lo arreglo.", en: "Found it: they weren't in the database and the search was too strict. On it." },
      yo: { es: "Yo", en: "Me" },
      commit: { es: "empanadas, antojitos veracruzanos y búsqueda flexible", en: "empanadas, Veracruz street food and flexible search" },
      detalle: { es: "+28 alimentos · el buscador ya entiende “de” y “con”", en: "+28 foods · search now ignores filler words" },
      publicado: { es: "Publicado el mismo día", en: "Shipped the same day" },
      otraVez: { es: "Ver de nuevo", en: "Replay" },
    },
    meta: { es: "Camino a Forward Deployed Engineer", en: "On my way to Forward Deployed Engineer" },
    verProyectos: { es: "Ver proyectos", en: "See projects" },
    cv: { es: "Descargar CV", en: "Download CV" },
    desliza: { es: "desliza", en: "scroll" },
  },
  numeros: [
    { valor: 4, sufijo: "", t: { es: "empresas como clientes freelance", en: "companies as freelance clients" } },
    { valor: 2024, sufijo: "", t: { es: "trabajando con clientes reales", en: "working with real clients" }, sinAnimar: true },
    { valor: 6, sufijo: "+", t: { es: "proyectos publicados en línea", en: "projects live online" } },
    { valor: 5, sufijo: "", t: { es: "certificaciones (Pega, Anthropic, Huawei)", en: "certifications (Pega, Anthropic, Huawei)" } },
  ],
  sobreMi: {
    titulo: { es: "Sobre mí", en: "About me" },
    frase: { es: "Me gusta entender el problema antes de escribir una línea de código.", en: "I like to understand the problem before writing a single line of code." },
    parrafos: [
      {
        es: "Estudio Ingeniería en Tecnologías de la Información y Comunicaciones en el Instituto Tecnológico Superior de Misantla y hago mi residencia como Software Engineering Resident en Synesia Labs.",
        en: "I study Information and Communication Technologies Engineering at the Instituto Tecnológico Superior de Misantla and I'm doing my professional residency as a Software Engineering Resident at Synesia Labs.",
      },
      {
        es: "Desde 2024 hago sitios para empresas reales: me siento con el cliente, entiendo cómo trabaja y entrego algo que su gente usa. Esa es la parte que más disfruto, y por eso quiero crecer como Forward Deployed Engineer.",
        en: "Since 2024 I've built websites for real businesses: I sit down with the client, understand how they work and deliver something their people actually use. That's the part I enjoy the most, and why I want to grow as a Forward Deployed Engineer.",
      },
      {
        es: "Fuera del código: gym, finanzas personales y aprender algo nuevo cada semana.",
        en: "Outside of code: gym, personal finance and learning something new every week.",
      },
    ],
    lineaTitulo: { es: "Mi camino", en: "My path" },
  },
  linea: [
    { fecha: "2022", tipo: "trabajo", tag: { es: "Primer trabajo", en: "First job" }, titulo: { es: "Servicio social", en: "Social service" }, t: { es: "Bases de datos de expedientes en la Jurisdicción Sanitaria IV.", en: "Record databases at Jurisdicción Sanitaria IV." } },
    { fecha: "2022", tipo: "escuela", tag: { es: "Escuela", en: "School" }, titulo: { es: "Ingeniería en TICs", en: "ICT Engineering" }, t: { es: "Entro al Instituto Tecnológico Superior de Misantla.", en: "I start at Instituto Tecnológico Superior de Misantla." } },
    { fecha: "2024", tipo: "trabajo", tag: { es: "Clientes", en: "Clients" }, titulo: { es: "Primer cliente freelance", en: "First freelance client" }, t: { es: "Grupo MANBAL me busca para su sitio; lo entrego en 2025.", en: "Grupo MANBAL hires me for its site; delivered in 2025." } },
    { fecha: "2025", tipo: "proyecto", tag: { es: "IA y negocio", en: "AI & business" }, titulo: { es: "SystCo IA · Pega", en: "SystCo AI · Pega" }, t: { es: "Visión por computadora y Certified Pega Business Architect.", en: "Computer vision and Certified Pega Business Architect." } },
    { fecha: "2026", tipo: "proyecto", tag: { es: "Producto", en: "Product" }, titulo: { es: "Synesia Labs · Brío", en: "Synesia Labs · Brío" }, t: { es: "Residencia, certificaciones de Anthropic y lanzo Brío.", en: "Residency, Anthropic certifications and I launch Brío." } },
    { fecha: "→", tipo: "meta", tag: { es: "Siguiente", en: "Next" }, titulo: { es: "Forward Deployed Engineer", en: "Forward Deployed Engineer" }, t: { es: "Cerca del cliente, de la idea a producción.", en: "Close to the client, from idea to production." }, meta: true },
  ],
  proyectos: {
    titulo: { es: "Proyectos destacados", en: "Featured projects" },
    sub: { es: "Casos reales: qué problema había, qué construí y con qué.", en: "Real cases: what the problem was, what I built and how." },
    problema: { es: "El problema", en: "The problem" },
    solucion: { es: "Lo que construí", en: "What I built" },
    verSitio: { es: "Ver en vivo", en: "Live site" },
    verCodigo: { es: "Código", en: "Code" },
    otros: { es: "Otros proyectos", en: "Other projects" },
  },
  stack: {
    titulo: { es: "Stack", en: "Stack" },
    sub: { es: "Pasa el mouse (o toca) cada tecnología para ver dónde la usé.", en: "Hover (or tap) each technology to see where I used it." },
  },
  ia: {
    titulo: { es: "Cómo trabajo con IA", en: "How I work with AI" },
    sub: {
      es: "Uso Claude y Claude Code todos los días. La IA me hace más rápido; las decisiones y la revisión son mías.",
      en: "I use Claude and Claude Code every day. AI makes me faster; the decisions and the review are mine.",
    },
    pasos: [
      { n: "01", t: { es: "Entiendo", en: "Understand" }, d: { es: "Hablo con quien tiene el problema y defino qué significa 'listo'.", en: "I talk to whoever has the problem and define what 'done' means." } },
      { n: "02", t: { es: "Diseño", en: "Design" }, d: { es: "Decido la arquitectura, los datos y los riesgos antes de generar código.", en: "I decide the architecture, data and risks before generating code." } },
      { n: "03", t: { es: "Construyo con IA", en: "Build with AI" }, d: { es: "Claude Code acelera la implementación en ciclos cortos.", en: "Claude Code speeds up implementation in short cycles." } },
      { n: "04", t: { es: "Reviso y pruebo", en: "Review and test" }, d: { es: "Leo, pruebo y corrijo todo lo que se sube. Nada sale sin revisar.", en: "I read, test and fix everything that ships. Nothing goes out unreviewed." } },
    ],
  },
  experiencia: {
    titulo: { es: "Experiencia", en: "Experience" },
    certTitulo: { es: "Certificaciones", en: "Certifications" },
    verificar: { es: "Verificar", en: "Verify" },
  },
  visitas: {
    titulo: { es: "Libro de visitas", en: "Guestbook" },
    sub: { es: "¿Pasaste por aquí, trabajamos juntos o usaste algo que hice? Déjame una reseña. Las reviso antes de publicarlas.", en: "Stopped by, worked with me or used something I built? Leave a review. I check them before they're published." },
    califica: { es: "¿Cómo calificarías lo que viste?", en: "How would you rate what you saw?" },
    promedio: { es: "de 5 · {n} reseñas", en: "out of 5 · {n} reviews" },
    nombre: { es: "Tu nombre", en: "Your name" },
    rol: { es: "¿A qué te dedicas? (opcional)", en: "What do you do? (optional)" },
    mensaje: { es: "Tu mensaje", en: "Your message" },
    enviar: { es: "Enviar mensaje", en: "Send message" },
    gracias: { es: "¡Gracias! Tu mensaje aparecerá cuando lo apruebe.", en: "Thanks! Your message will appear once I approve it." },
    vacio: { es: "Aún no hay mensajes. ¡Sé el primero!", en: "No messages yet. Be the first!" },
    error: { es: "No se pudo enviar. Intenta de nuevo en un momento.", en: "Couldn't send it. Please try again in a moment." },
  },
  contacto: {
    titulo: { es: "Hablemos", en: "Let's talk" },
    sub: { es: "¿Tienes una vacante, un proyecto o una idea? Escríbeme.", en: "Have a role, a project or an idea? Write to me." },
    nombre: { es: "Nombre", en: "Name" },
    correo: { es: "Correo", en: "Email" },
    mensaje: { es: "Mensaje", en: "Message" },
    enviar: { es: "Enviar", en: "Send" },
    enviado: { es: "¡Listo! Te respondo pronto.", en: "Done! I'll get back to you soon." },
    empresa: { es: "Empresa (opcional)", en: "Company (optional)" },
    motivo: { es: "¿De qué se trata?", en: "What's it about?" },
    motivos: { es: ["Vacante", "Proyecto freelance", "Colaboración", "Solo saludar"], en: ["Job opening", "Freelance project", "Collaboration", "Just saying hi"] },
    nota: { es: "Tu mensaje llega directo a mi correo. No comparto tus datos.", en: "Your message goes straight to my inbox. I don't share your data." },
    otraVez: { es: "Enviar otro mensaje", en: "Send another message" },
    copiar: { es: "Copiar", en: "Copy" },
    copiado: { es: "Copiado", en: "Copied" },
    error: { es: "No se pudo enviar. Escríbeme directo al correo.", en: "Couldn't send it. Email me directly." },
  },
  pie: {
    lugar: { es: "Hecho en Misantla, Veracruz", en: "Made in Misantla, Veracruz" },
    arriba: { es: "Volver arriba", en: "Back to top" },
  },
};

export interface Proyecto {
  id: string;
  nombre: string;
  tipo: T;
  anio: string;
  /** Si el negocio ya cerró u otra aclaración honesta; se muestra bajo el tipo. */
  estado?: T;
  problema: T;
  solucion: T;
  logros: T[];
  tec: string[];
  img: string;
  imgClaro?: string;
  movil?: string;
  vivo?: string;
  codigo?: string;
}

export const PROYECTOS: Proyecto[] = [
  {
    id: "brio", nombre: "Brío", anio: "2026",
    tipo: { es: "Producto propio · App web de salud", en: "Own product · Health web app" },
    problema: {
      es: "Para llevar comida, gym y hábitos hacían falta tres apps de pago, ninguna pensada para comida mexicana ni para quien no tiene refri o cocina con poco.",
      en: "Tracking food, gym and habits took three paid apps, none designed for Mexican food or for people on a tight budget.",
    },
    solucion: {
      es: "Una sola app, gratis, que funciona sin internet: registro de comida con buscador y escáner, menú semanal por reglas, lista del súper que descuenta la despensa, rutinas de gym, hábitos y avisos push.",
      en: "One free app that works offline: food logging with search and barcode scanner, rule-based weekly menu, a shopping list that subtracts your pantry, gym routines, habits and push notifications.",
    },
    logros: [
      { es: "Usuarios reales que me dan comentarios y los convierto en mejoras", en: "Real users whose feedback I turn into improvements" },
      { es: "Datos sincronizados de forma segura con Postgres y RLS", en: "Data synced securely with Postgres and RLS" },
      { es: "Más de 120 recetas con calorías y costo calculados", en: "120+ recipes with calculated calories and cost" },
    ],
    tec: ["React", "TypeScript", "Supabase", "PostgreSQL", "PWA", "Vercel"],
    img: "/img/brio-laptop-oscuro.webp", imgClaro: "/img/brio-laptop-claro.webp", movil: "/img/brio-hoy.webp",
    vivo: "https://mi-brio.vercel.app/conoce", codigo: "https://github.com/ZeroFuann-FS/brio",
  },
  {
    id: "nexus", nombre: "Nexus-TIC", anio: "2026",
    tipo: { es: "Proyecto escolar · Orientador con voz", en: "School project · Voice career advisor" },
    problema: {
      es: "Los estudiantes de TICs no sabían qué empresa elegir para su residencia ni cuál encajaba con lo que les gusta.",
      en: "ICT students didn't know which company to choose for their residency or which one matched their interests.",
    },
    solucion: {
      es: "Un chat de diagnóstico de cinco preguntas que compara tu perfil con cada empresa y las ordena por compatibilidad, con voz opcional y en español e inglés.",
      en: "A five-question diagnostic chat that compares your profile with each company and ranks them by match, with optional voice, in Spanish and English.",
    },
    logros: [
      { es: "Voz opcional en el navegador: con voz femenina, masculina o solo texto", en: "Optional in-browser voice: female, male or text only" },
      { es: "Resultados con porcentaje de compatibilidad y ficha en PDF", en: "Results with a match percentage and a PDF summary" },
      { es: "Bilingüe español / inglés, modo claro y oscuro", en: "Bilingual Spanish / English, light and dark mode" },
    ],
    tec: ["React", "TypeScript", "Framer Motion", "Web Speech API"],
    img: "/img/nexus-laptop.webp", movil: "/img/nexus-celular.webp",
    vivo: "https://nexus-tic.vercel.app", codigo: "https://github.com/ZeroFuann-FS/nexus-tic",
  },
  {
    id: "lupac", nombre: "Lupac Industrial", anio: "",
    tipo: { es: "Cliente freelance · Catálogo industrial", en: "Freelance client · Industrial catalog" },
    problema: {
      es: "Una empresa de maquinaria industrial necesitaba que la encontraran en Google y mostrar su catálogo sin depender de PDFs.",
      en: "An industrial machinery company needed to be found on Google and show its catalog without relying on PDFs.",
    },
    solucion: {
      es: "Un sitio rápido con catálogo por modelos y enfoque en SEO, adaptable al celular y publicado con dominio propio.",
      en: "A fast site with a model-based catalog and SEO focus, mobile-friendly and live on its own domain.",
    },
    logros: [
      { es: "En línea con dominio propio: lu-pac.com", en: "Live on its own domain: lu-pac.com" },
      { es: "Catálogo organizado por modelos", en: "Catalog organized by model" },
    ],
    tec: ["React", "Vite", "Tailwind CSS", "SEO"],
    img: "/img/lupac-laptop.webp", movil: "/img/lupac-celular.webp",
    vivo: "https://lu-pac.com", codigo: "https://github.com/ZeroFuann-FS/lupac-industrial",
  },
  {
    id: "minea", nombre: "Minea Company", anio: "2026",
    tipo: { es: "Cliente freelance · Tienda en línea", en: "Freelance client · Online store" },
    estado: { es: "La microempresa ya cerró; el sitio sigue en línea como muestra.", en: "The business has closed; the site stays online as a showcase." },
    problema: {
      es: "Una microempresa de dulces artesanales tomaba pedidos a mano y su catálogo vivía en fotos sueltas.",
      en: "A small artisan candy business took orders by hand and its catalog lived in scattered photos.",
    },
    solucion: {
      es: "Una tienda en línea con catálogo y un carrito que arma el pedido listo para WhatsApp, pensada primero para celular.",
      en: "An online store with a catalog and a cart that builds the order ready for WhatsApp, designed mobile first.",
    },
    logros: [
      { es: "Carrito que arma el pedido con productos, cantidades y total", en: "A cart that builds the order with products, quantities and total" },
      { es: "Catálogo que se consulta desde cualquier lugar", en: "A catalog anyone can browse from anywhere" },
    ],
    tec: ["React", "TypeScript", "Tailwind CSS"],
    img: "/img/minea-laptop.webp", movil: "/img/minea-celular.webp",
    vivo: "https://minea05-company.vercel.app", codigo: "https://github.com/ZeroFuann-FS/minea-company",
  },
];

export const OTROS = [
  { nombre: "Grupo MANBAL", t: { es: "Despacho topográfico con cotizador de medición de terrenos (mi primer cliente; el negocio ya cerró)", en: "Surveying firm with a land measurement quote tool (my first client; the business has closed)" }, tec: "HTML · CSS · JavaScript", url: "https://zerofuann-fs.github.io/manbal/", img: "/img/manbal-laptop.webp" },
  { nombre: "FANA", t: { es: "Sitio informativo de ingeniería vial (el negocio ya cerró)", en: "Road engineering informational site (the business has closed)" }, tec: "HTML · CSS · JavaScript", url: "https://zerofuann-fs.github.io/fana/", img: "/img/fana-laptop.webp" },
  { nombre: "SystCo IA", t: { es: "Estacionamiento inteligente con visión por computadora (frontend y apoyo con YOLO)", en: "Smart parking with computer vision (frontend and YOLO support)" }, tec: "Vue.js · YOLO", img: "" },
  { nombre: "Plantillas de portafolio", t: { es: "Dos plantillas libres (HTML y React) para que otros armen el suyo", en: "Two free templates (HTML and React) for others to build theirs" }, tec: "HTML · React · MIT", url: "https://github.com/ZeroFuann-FS/plantilla-portafolio-react", img: "" },
];

/**
 * Stack: solo lo que he usado de verdad, con un nivel honesto.
 * nivel: 0 = lo que más uso · 1 = uso frecuente · 2 = lo conozco / lo he usado · 3 = estudiándolo ahora
 * icono: archivo en /public/stack; si no hay logo, se muestra un ícono sencillo (simbolo).
 */
export type CategoriaStack = "lenguajes" | "frontend" | "backend" | "ia" | "herramientas" | "metodo";
export interface Tecnologia { id: string; n: string; icono?: string; simbolo?: string; cat: CategoriaStack; nivel: 0 | 1 | 2 | 3; uso: T }
export const STACK: Tecnologia[] = [
  // Lenguajes
  { id: "ts", n: "TypeScript", icono: "/stack/ts.svg", cat: "lenguajes", nivel: 0, uso: { es: "Mi lenguaje principal: Brío, Nexus-TIC y este portafolio", en: "My main language: Brío, Nexus-TIC and this portfolio" } },
  { id: "js", n: "JavaScript", icono: "/stack/js.svg", cat: "lenguajes", nivel: 0, uso: { es: "MANBAL y FANA, y la base de todo lo que hago en web", en: "MANBAL and FANA, and the base of everything I do on the web" } },
  { id: "html", n: "HTML", icono: "/stack/html.svg", cat: "lenguajes", nivel: 0, uso: { es: "Todos mis sitios, con estructura pensada para SEO y accesibilidad", en: "All my sites, structured for SEO and accessibility" } },
  { id: "css", n: "CSS", icono: "/stack/css.svg", cat: "lenguajes", nivel: 0, uso: { es: "Diseños adaptables a celular en MANBAL, FANA y más", en: "Responsive layouts in MANBAL, FANA and more" } },
  { id: "php", n: "PHP", icono: "/stack/php.svg", cat: "lenguajes", nivel: 2, uso: { es: "Backends con Laravel en proyectos escolares", en: "Laravel backends in school projects" } },
  { id: "python", n: "Python", icono: "/stack/python.svg", cat: "lenguajes", nivel: 2, uso: { es: "Apoyo en el modelo de visión por computadora de SystCo IA", en: "Support on SystCo AI's computer vision model" } },
  { id: "java", n: "Java", icono: "/stack/java.svg", cat: "lenguajes", nivel: 2, uso: { es: "Programación orientada a objetos en la carrera", en: "Object-oriented programming at university" } },
  // Frontend
  { id: "react", n: "React", icono: "/stack/react.svg", cat: "frontend", nivel: 0, uso: { es: "Brío, Nexus-TIC, Lupac y Minea", en: "Brío, Nexus-TIC, Lupac and Minea" } },
  { id: "tailwind", n: "Tailwind CSS", icono: "/stack/tailwind.svg", cat: "frontend", nivel: 0, uso: { es: "Estilos de casi todos mis proyectos", en: "Styling in almost all my projects" } },
  { id: "vite", n: "Vite", icono: "/stack/vite.svg", cat: "frontend", nivel: 1, uso: { es: "Empaquetador de mis apps de React", en: "Bundler for my React apps" } },
  { id: "vue", n: "Vue.js", icono: "/stack/vue.svg", cat: "frontend", nivel: 1, uso: { es: "Frontend de SystCo IA (visión por computadora)", en: "SystCo AI frontend (computer vision)" } },
  { id: "bootstrap", n: "Bootstrap", icono: "/stack/bootstrap.svg", cat: "frontend", nivel: 2, uso: { es: "Maquetación rápida en proyectos anteriores", en: "Fast layouts in earlier projects" } },
  { id: "motion", n: "Animaciones (Motion)", simbolo: "motion", cat: "frontend", nivel: 3, uso: { es: "Las uso en Nexus-TIC y este portafolio; las estoy estudiando a fondo", en: "Used in Nexus-TIC and this portfolio; studying them in depth" } },
  { id: "pwa", n: "PWA", icono: "/stack/pwa.svg", cat: "frontend", nivel: 3, uso: { es: "Brío funciona sin internet y se instala como app; estoy profundizando", en: "Brío works offline and installs as an app; going deeper" } },
  // Backend y datos
  { id: "supabase", n: "Supabase", icono: "/stack/supabase.svg", cat: "backend", nivel: 0, uso: { es: "Base de datos, login y seguridad de Brío y de este portafolio", en: "Database, auth and security for Brío and this portfolio" } },
  { id: "postgres", n: "PostgreSQL", icono: "/stack/postgres.svg", cat: "backend", nivel: 1, uso: { es: "Tablas con seguridad por fila (RLS) en Brío", en: "Tables with row-level security (RLS) in Brío" } },
  { id: "nodejs", n: "Node.js", icono: "/stack/nodejs.svg", cat: "backend", nivel: 1, uso: { es: "Herramientas, scripts y funciones del servidor", en: "Tooling, scripts and server functions" } },
  { id: "laravel", n: "Laravel", icono: "/stack/laravel.svg", cat: "backend", nivel: 2, uso: { es: "Backends en PHP para proyectos escolares", en: "PHP backends for school projects" } },
  { id: "firebase", n: "Firebase", icono: "/stack/firebase.svg", cat: "backend", nivel: 2, uso: { es: "Login y datos en tiempo real en proyectos anteriores", en: "Auth and realtime data in earlier projects" } },
  { id: "mysql", n: "MySQL", icono: "/stack/mysql.svg", cat: "backend", nivel: 2, uso: { es: "Bases de datos relacionales en la escuela", en: "Relational databases at school" } },
  // IA y visión
  { id: "claude", n: "Claude y Claude Code", icono: "/stack/claude.svg", cat: "ia", nivel: 0, uso: { es: "Mi herramienta diaria en Synesia Labs y en Brío; certificado por Anthropic", en: "My daily tool at Synesia Labs and on Brío; Anthropic certified" } },
  { id: "prompts", n: "Prompt engineering", simbolo: "prompt", cat: "ia", nivel: 1, uso: { es: "Traducir requerimientos en instrucciones claras para la IA", en: "Turning requirements into clear instructions for AI" } },
  { id: "yolo", n: "YOLO", simbolo: "vision", cat: "ia", nivel: 2, uso: { es: "Detección de vehículos en SystCo IA (apoyo en el modelo)", en: "Vehicle detection in SystCo AI (model support)" } },
  // Herramientas y despliegue
  { id: "git", n: "Git y GitHub", icono: "/stack/github.svg", cat: "herramientas", nivel: 1, uso: { es: "Crear y subir proyectos, historial claro y revisar cambios", en: "Creating and pushing projects, clean history, reviewing changes" } },
  { id: "vercel", n: "Vercel", icono: "/stack/vercel.svg", cat: "herramientas", nivel: 0, uso: { es: "Publico todo aquí, con deploy automático desde GitHub", en: "Where I ship everything, auto-deployed from GitHub" } },
  { id: "vscode", n: "VS Code", icono: "/stack/vscode.svg", cat: "herramientas", nivel: 0, uso: { es: "Mi editor de todos los días", en: "My everyday editor" } },
  { id: "docker", n: "Docker", icono: "/stack/docker.svg", cat: "herramientas", nivel: 2, uso: { es: "Contenedores para levantar entornos de desarrollo", en: "Containers to spin up dev environments" } },
  { id: "linux", n: "Linux", icono: "/stack/linux.svg", cat: "herramientas", nivel: 2, uso: { es: "Terminal y WSL para herramientas de línea de comandos", en: "Terminal and WSL for command-line tools" } },
  { id: "postman", n: "Postman", icono: "/stack/postman.svg", cat: "herramientas", nivel: 2, uso: { es: "Probar APIs antes de conectarlas al frontend", en: "Testing APIs before wiring them to the frontend" } },
  { id: "figma", n: "Figma", icono: "/stack/figma.svg", cat: "herramientas", nivel: 2, uso: { es: "Bocetos y diseño de interfaces antes de programar", en: "Sketches and UI design before coding" } },
  { id: "canva", n: "Canva", icono: "/stack/canva.svg", cat: "herramientas", nivel: 2, uso: { es: "Gráficos y materiales para clientes y presentaciones", en: "Graphics and materials for clients and presentations" } },
  { id: "arduino", n: "Arduino", icono: "/stack/arduino.svg", cat: "herramientas", nivel: 2, uso: { es: "Proyectos de IoT en la carrera y el curso HCIA-IoT", en: "IoT projects at university and the HCIA-IoT course" } },
  // Metodologías y negocio
  { id: "scrum", n: "Scrum", simbolo: "scrum", cat: "metodo", nivel: 2, uso: { es: "Trabajo por sprints en proyectos en equipo", en: "Sprint-based work in team projects" } },
  { id: "pega", n: "Pega (visión de negocio)", simbolo: "negocio", cat: "metodo", nivel: 2, uso: { es: "Certified Pega Business Architect: alinear el software con el negocio", en: "Certified Pega Business Architect: aligning software with the business" } },
  { id: "clientes", n: "Trato con clientes", simbolo: "clientes", cat: "metodo", nivel: 0, uso: { es: "Levantar requerimientos y entregar de punta a punta desde 2024", en: "Gathering requirements and delivering end to end since 2024" } },
];

export const EXPERIENCIA = [
  {
    puesto: { es: "Software Engineering Resident", en: "Software Engineering Resident" }, lugar: "Synesia Labs",
    fecha: { es: "Ago 2026 – Actual", en: "Aug 2026 – Present" },
    d: { es: "Desarrollo asistido por IA con Claude Code: de requerimientos a arquitectura, prototipos rápidos, revisión de código y pruebas.", en: "AI-assisted development with Claude Code: from requirements to architecture, fast prototypes, code review and testing." },
    puntos: [
      { es: "Traduzco requerimientos operativos en arquitectura, lógica de negocio e interfaces", en: "I turn operational requirements into architecture, business logic and interfaces" },
      { es: "Prototipos en ciclos cortos para validar con el equipo", en: "Prototypes in short cycles to validate with the team" },
      { es: "Reviso, depuro y refactorizo el código generado con IA", en: "I review, debug and refactor AI-generated code" },
    ],
    tec: ["Claude Code", "Prompt engineering", "Code review", "CI"], ini: "SL", actual: true,
  },
  {
    puesto: { es: "Desarrollador web freelance", en: "Freelance web developer" }, lugar: { es: "Autónomo", en: "Self-employed" },
    fecha: { es: "2024 – Actual", en: "2024 – Present" },
    d: { es: "Sitios para 4 empresas, de la primera reunión a la publicación: Lupac, Minea, MANBAL y FANA.", en: "Websites for 4 companies, from the first meeting to launch: Lupac, Minea, MANBAL and FANA." },
    puntos: [
      { es: "Levanto requerimientos directamente con cada cliente", en: "I gather requirements directly with each client" },
      { es: "Diseño, desarrollo, dominio, publicación y ajustes posteriores", en: "Design, development, domain, launch and follow-up changes" },
      { es: "Un cotizador en línea de medición de terrenos para MANBAL", en: "An online land-measurement quote tool for MANBAL" },
    ],
    tec: ["React", "TypeScript", "Tailwind CSS", "SEO", "Vercel"], ini: "FL", actual: true,
  },
  {
    puesto: { es: "Administrador de base de datos (servicio social)", en: "Database administrator (social service)" }, lugar: "Jurisdicción Sanitaria IV",
    fecha: { es: "2022", en: "2022" },
    d: { es: "Organicé expedientes clínicos y generé reportes durante la contingencia por COVID-19.", en: "Organized clinical records and produced reports during the COVID-19 contingency." },
    puntos: [
      { es: "Depuré bases de datos de expedientes en Excel y Access", en: "Cleaned up record databases in Excel and Access" },
      { es: "Reportes para la toma de decisiones en la contingencia", en: "Reports for decision-making during the contingency" },
    ],
    tec: ["Excel", "Access", "SQL"], ini: "JS", actual: false,
  },
];

export const CERTIFICADOS = [
  { n: "Certified Pega Business Architect", e: "Pegasystems", f: "2025" },
  { n: "Claude Code 101", e: "Anthropic", f: "2026", url: "https://verify.skilljar.com/c/c9y7v4ffoudj" },
  { n: "Claude Platform 101", e: "Anthropic", f: "2026", url: "https://verify.skilljar.com/c/fgozju7db5yq" },
  { n: "Claude 101", e: "Anthropic", f: "2026", url: "https://verify.skilljar.com/c/6pm7bappna2d" },
  { n: "HCIA-IoT V3.0 (curso)", e: "Huawei", f: "2026" },
];

export const tr = (t: T, i: Idioma) => t[i];
