/* Página para clientes (solo español). */
import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PERFIL } from "../data/contenido";
import { enlaceWhatsApp, enviarMensaje } from "../lib/servicios-externos";
import { IcoCopiar, IcoCorreo, IcoEnviar, IcoExterno, IcoFlecha, IcoMas, IcoPalomita, IcoWhatsApp } from "../components/iconos";
import { Encabezado, Revelar, TextoDividido, ease } from "../components/efectos";

const WA = enlaceWhatsApp("¡Hola Jose Juan! Vi tu página y me gustaría cotizar un proyecto.");
const campo = "w-full rounded-xl border border-borde bg-bg px-4 py-3.5 text-tx outline-none transition placeholder:text-tenue focus:border-ac";

/* Sitios reales que van pasando en la ventana del inicio */
const VITRINA = [
  { tipo: "Catálogo industrial", n: "Lupac Industrial", url: "lu-pac.com", img: "/img/lupac-laptop.webp" },
  { tipo: "Tienda en línea", n: "Minea Company", url: "minea05-company.vercel.app", img: "/img/minea-productos.webp" },
  { tipo: "Sitio con cotizador", n: "Grupo MANBAL", url: "zerofuann-fs.github.io/manbal", img: "/img/manbal-laptop.webp" },
  { tipo: "Sistema web completo", n: "Brío", url: "mi-brio.vercel.app", img: "/img/brio-laptop-oscuro.webp" },
];

const ICONOS = {
  web: <path d="M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01" />,
  tienda: <path d="M4 7h16l-1.5 11h-13zM9 7a3 3 0 0 1 6 0" />,
  sistema: <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" />,
  soporte: <path d="M12 3a9 9 0 1 0 9 9M12 7v5l3 2M21 3v5h-5" />,
};

const SERVICIOS: { n: string; i: keyof typeof ICONOS; t: string; d: string; inc: string[]; ideal: string }[] = [
  { n: "01", i: "web", t: "Páginas web", d: "Que tu negocio aparezca en Google y te contacten.", inc: ["Diseño con tu marca", "Adaptable a celular", "SEO desde el inicio", "WhatsApp, mapa y formulario"], ideal: "Negocios locales, despachos, profesionistas" },
  { n: "02", i: "tienda", t: "Tiendas y catálogos", d: "Muestra tus productos y recibe pedidos sin complicarte.", inc: ["Catálogo con fotos y precios", "Pedidos por WhatsApp", "Fácil de actualizar", "Rápida con muchos productos"], ideal: "Emprendimientos, distribuidores, artesanos" },
  { n: "03", i: "sistema", t: "Sistemas a la medida", d: "Deja el papel y Excel con herramientas hechas para ti.", inc: ["Cotizadores y calculadoras", "Reservas y citas", "Usuarios y paneles", "Inventarios y reportes"], ideal: "Empresas con procesos que hoy son manuales" },
  { n: "04", i: "soporte", t: "Mantenimiento", d: "Tu página al día, sin que tengas que pensar en ella.", inc: ["Cambios de textos y fotos", "Dominio y alojamiento", "Respaldos y seguridad", "Soporte directo conmigo"], ideal: "Quien ya tiene página y quiere olvidarse de ella" },
];

/** Trabajos entregados. estado: aclaración honesta cuando el negocio ya cerró (el sitio sigue como muestra). */
const TRABAJOS: { n: string; g: string; d: string; img: string; url?: string; estado?: string }[] = [
  { n: "Lupac Industrial", g: "Maquinaria industrial", d: "Catálogo por modelos con enfoque en SEO y dominio propio.", img: "/img/lupac-laptop.webp", url: "https://lu-pac.com" },
  { n: "Minea Company", g: "Dulces artesanales", d: "Tienda en línea con carrito que arma el pedido para WhatsApp.", img: "/img/minea-productos.webp", url: "https://minea05-company.vercel.app", estado: "El negocio ya cerró; el sitio queda como muestra." },
  { n: "Grupo MANBAL", g: "Topografía", d: "Sitio con cotizador en línea de medición de terrenos.", img: "/img/manbal-laptop.webp", url: "https://zerofuann-fs.github.io/manbal/", estado: "El negocio ya cerró; el sitio queda como muestra." },
  { n: "FANA", g: "Ingeniería vial", d: "Sitio informativo con proyectos y normativas.", img: "/img/fana-laptop.webp", url: "https://zerofuann-fs.github.io/fana/", estado: "El negocio ya cerró; el sitio queda como muestra." },
];

const PASOS = [
  { t: "Platicamos", d: "Me cuentas tu negocio y lo que necesitas. Sin compromiso y sin tecnicismos." },
  { t: "Propuesta", d: "Te mando por escrito qué incluye, cuánto tarda y cuánto cuesta." },
  { t: "Desarrollo", d: "Construyo y te enseño avances para que opines en cada etapa." },
  { t: "Publicación", d: "Lo pongo en línea con tu dominio y te explico cómo usarlo." },
];

const RAZONES = [
  { t: "Hablas directo conmigo", d: "Quien te atiende es quien programa. Sin intermediarios ni mensajes que se pierden.", p: "4 negocios atendidos así desde 2023" },
  { t: "Pensado para el celular", d: "La mayoría de tus clientes te va a ver desde el teléfono, así que diseño primero para ahí.", p: "Todos mis sitios se adaptan a cualquier pantalla" },
  { t: "Que te encuentren", d: "Títulos, descripciones y velocidad cuidados para que Google entienda tu página.", p: "Lupac está en línea con su propio dominio" },
  { t: "No te quedas solo", d: "Te explico cómo hacer cambios sencillos y sigo disponible cuando necesites algo más.", p: "Ajustes después de publicar" },
];

const PREGUNTAS = [
  { p: "¿Cuánto cuesta una página?", r: "Depende de lo que necesites: no cuesta lo mismo una página de presentación que una tienda o un sistema. Platícame tu idea y te mando una cotización gratis con todo por escrito, sin costos escondidos." },
  { p: "¿Cuánto tiempo tarda?", r: "Una página sencilla suele estar en una o dos semanas. Tiendas y sistemas dependen de lo que lleven; el tiempo exacto va en la propuesta antes de empezar." },
  { p: "¿Necesito tener dominio y alojamiento?", r: "No. Te ayudo a elegir y comprar tu dominio (por ejemplo, tunegocio.com) y me encargo de publicarla. El dominio queda a tu nombre." },
  { p: "¿Qué necesito para empezar?", r: "Saber qué ofreces y a quién. Si tienes logo, fotos o textos, perfecto; si no, te guío para conseguirlos o los preparamos juntos." },
  { p: "¿Puedo hacer cambios después?", r: "Sí. Te enseño a cambiar lo básico y, si prefieres que yo me encargue, puedo darle mantenimiento." },
  { p: "¿Solo trabajas en Misantla?", r: "No. Trabajo en línea con negocios de cualquier parte de México: platicamos por videollamada o WhatsApp." },
];

/** Ventana de navegador que va mostrando sitios reales, con su tipo. */
function Vitrina() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % VITRINA.length), 3200); return () => clearInterval(t); }, []);
  const v = VITRINA[i];
  return (
      <div className="overflow-hidden rounded-card border border-borde bg-tarjeta">
        <div className="flex items-center gap-3 border-b border-borde px-4 py-3">
          <span className="flex gap-1.5">{[0, 1, 2].map((k) => <span key={k} className="h-2.5 w-2.5 rounded-full bg-borde" />)}</span>
          <AnimatePresence mode="wait">
            <motion.span key={v.url} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex-1 truncate rounded-md bg-bg px-3 py-1 text-xs text-suave">{v.url}</motion.span>
          </AnimatePresence>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-bg2">
          <AnimatePresence initial={false}>
            <motion.img key={v.img} src={v.img} alt={v.n} className="absolute inset-0 h-full w-full object-cover object-top"
              initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease }} />
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <AnimatePresence mode="wait">
            <motion.div key={v.n} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}>
              <p className="lab">{v.tipo}</p>
              <p className="font-display text-lg font-bold">{v.n}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-1.5">{VITRINA.map((_, k) => <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-ac" : "w-1.5 bg-borde"}`} />)}</div>
        </div>
      </div>
  );
}

function Pregunta({ p, r, i }: { p: string; r: string; i: number }) {
  const [a, setA] = useState(i === 0);
  return (
    <div className={`rounded-2xl border transition-colors ${a ? "border-ac bg-tarjeta" : "border-borde"}`}>
      <button onClick={() => setA(!a)} aria-expanded={a} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="font-display text-lg font-bold">{p}</span>
        <motion.span animate={{ rotate: a ? 45 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-borde text-ac"><IcoMas size={16} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {a && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-6 pb-6 text-suave">{r}</motion.p>}
      </AnimatePresence>
    </div>
  );
}

function CopiarCorreo() {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" onClick={() => navigator.clipboard?.writeText(PERFIL.correo).then(() => { setOk(true); setTimeout(() => setOk(false), 1600); })}
      aria-live="polite" className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-borde px-3 py-1.5 text-xs font-medium text-suave transition hover:border-ac hover:text-tx active:scale-95">{ok ? <><IcoPalomita size={13} className="text-ac" />Copiado</> : <><IcoCopiar size={13} />Copiar</>}</button>
  );
}

function FormCotizacion() {
  const [f, setF] = useState({ nombre: "", negocio: "", servicio: "Página web", contacto: "", mensaje: "", _honey: "" });
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");
  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (f._honey) return;
    setEstado("enviando");
    try { await enviarMensaje({ origen: "servicios", tipo: f.servicio, nombre: f.nombre, contacto: f.contacto, empresa: f.negocio, mensaje: f.mensaje }, `Cotización: ${f.servicio} · ${f.negocio || f.nombre}`); setEstado("ok"); }
    catch { setEstado("error"); }
  };
  if (estado === "ok") return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="grid min-h-[380px] place-items-center rounded-card border border-ac bg-tarjeta p-8 text-center">
      <div><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ac-fuerte text-white"><IcoPalomita size={26} /></span><p className="mt-4 font-display text-3xl font-bold">¡Gracias!</p><p className="mt-3 text-suave">Recibí tu mensaje. Te contacto muy pronto.</p></div>
    </motion.div>
  );
  return (
    <form onSubmit={enviar} className="space-y-3 rounded-card border border-borde bg-tarjeta p-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <input className={campo} placeholder="Tu nombre" value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} required />
        <input className={campo} placeholder="Tu negocio (opcional)" value={f.negocio} onChange={(e) => setF({ ...f, negocio: e.target.value })} />
      </div>
      <p className="pt-1 text-sm text-suave">¿Qué necesitas?</p>
      <div className="flex flex-wrap gap-2">
        {["Página web", "Tienda o catálogo", "Sistema a la medida", "Mantenimiento", "No sé todavía"].map((s) => (
          <button type="button" key={s} onClick={() => setF({ ...f, servicio: s })}
            aria-pressed={f.servicio === s} className={`rounded-full border px-4 py-2 text-sm transition active:scale-95 ${f.servicio === s ? "border-ac bg-ac-fuerte text-white" : "border-borde text-suave hover:text-tx"}`}>{s}</button>
        ))}
      </div>
      <input className={campo} placeholder="Tu WhatsApp o correo" value={f.contacto} onChange={(e) => setF({ ...f, contacto: e.target.value })} required />
      <textarea className={`${campo} min-h-[120px] resize-none`} placeholder="Cuéntame un poco de tu idea" value={f.mensaje} onChange={(e) => setF({ ...f, mensaje: e.target.value })} required />
      <input className="hidden" tabIndex={-1} autoComplete="off" value={f._honey} onChange={(e) => setF({ ...f, _honey: e.target.value })} aria-hidden />
      <button disabled={estado === "enviando"} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ac-fuerte py-4 text-[15px] font-semibold text-white transition hover:brightness-110 active:scale-[0.98] disabled:opacity-70">{estado === "enviando" ? <><span className="cargando" aria-hidden />Enviando…</> : <>Pedir cotización gratis <IcoEnviar className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></>}</button>
      {estado === "error" && <p className="text-sm text-red-400">No se pudo enviar. Escríbeme por WhatsApp o a {PERFIL.correo}.</p>}
    </form>
  );
}

export default function Servicios() {
  useEffect(() => { document.title = "Desarrollo web y sistemas · ZeroFuann"; document.documentElement.lang = "es"; }, []);
  return (
    <>
      {/* Inicio: mensaje a la izquierda, vitrina de sitios reales a la derecha */}
      <section className="relative pt-32 md:pt-40">
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="min-w-0">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lab">Desarrollo web y sistemas · Misantla y todo México</motion.p>
            <h1 className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
              <TextoDividido texto="Páginas, tiendas y sistemas" delay={0.1} />
              <span className="block text-ac"><TextoDividido texto="que trabajan por tu negocio." delay={0.4} /></span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-7 max-w-xl text-lg leading-relaxed text-suave md:text-xl">
              Desde la primera plática hasta que está publicado y tus clientes lo usan. Trato directo conmigo, sin intermediarios.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-9 flex flex-wrap gap-3">
              <a href={WA} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-xl bg-[#25d366] px-7 py-4 text-base font-semibold text-[#062b14] transition hover:brightness-105 active:scale-[0.97]"><IcoWhatsApp size={20} />Escríbeme por WhatsApp</a>
              <a href="#contacto" className="group inline-flex items-center gap-2 py-2 text-[15px] font-semibold text-tx underline decoration-borde underline-offset-[6px] transition hover:decoration-ac">Cotiza gratis <IcoFlecha size={16} className="transition group-hover:translate-x-1" /></a>
            </motion.div>
          </div>
          <motion.div className="min-w-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }}>
            <Vitrina />
          </motion.div>
        </div>
        <div className="relative mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-6 border-t border-linea px-5 pt-8 md:grid-cols-4 md:px-10">
          {[["4", "negocios atendidos"], ["2023", "trabajando con clientes"], ["100%", "adaptable a celular"], ["1 a 1", "trato directo conmigo"]].map(([v, l], i) => (
            <Revelar key={l} delay={i * 0.06}><p className="num font-display text-3xl font-bold tracking-[-0.03em]">{v}</p><p className="mt-1 text-sm text-suave">{l}</p></Revelar>
          ))}
        </div>
      </section>

      {/* Servicios: 4 tarjetas con la misma estructura */}
      <section id="servicios" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-28 md:px-10">
        <Encabezado titulo="Lo que puedo hacer por tu negocio" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {SERVICIOS.map((s, i) => (
            <Revelar key={s.n} delay={i * 0.08} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-card border border-borde bg-tarjeta p-7 transition duration-300 hover:-translate-y-1 hover:border-ac">
                <div className="relative flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-chip text-ac transition group-hover:bg-ac-fuerte group-hover:text-white">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONOS[s.i]}</svg>
                  </span>
                </div>
                <h3 className="relative mt-6 flex min-h-[4rem] items-end font-display text-2xl font-bold leading-tight tracking-[-0.03em]">{s.t}</h3>
                <p className="relative mt-2 min-h-[4.6rem] text-suave">{s.d}</p>
                <ul className="relative mt-5 space-y-2 border-t border-linea pt-5">
                  {s.inc.map((x) => <li key={x} className="flex gap-2 text-sm"><IcoPalomita size={16} className="mt-0.5 text-ac" />{x}</li>)}
                </ul>
                <p className="relative mt-auto pt-6 text-sm leading-relaxed text-tenue"><span className="font-semibold text-ac">Ideal para:</span> {s.ideal}</p>
              </div>
            </Revelar>
          ))}
        </div>
      </section>

      {/* Trabajos: cuadrícula tranquila; la imagen se desliza hacia abajo al pasar el mouse */}
      <section id="trabajos" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 md:px-10">
        <Encabezado titulo="Trabajos entregados" sub="Sitios que hice para negocios reales. Algunos ya cerraron, pero sus páginas siguen en línea como muestra." />
        <div className="grid gap-6 md:grid-cols-2">
          {TRABAJOS.map((w, i) => (
            <Revelar key={w.n} delay={(i % 2) * 0.1}>
              <a href={w.url} target={w.url ? "_blank" : undefined} rel="noreferrer" className="group block overflow-hidden rounded-card border border-borde bg-tarjeta transition hover:border-ac">
                <div className="relative aspect-[16/10] overflow-hidden bg-bg2">
                  <img src={w.img} alt={w.n} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-[object-position,transform] duration-[2500ms] ease-out group-hover:scale-[1.03] group-hover:object-bottom" />
                </div>
                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="lab">{w.g}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold">{w.n}</h3>
                    <p className="mt-2 text-suave">{w.d}</p>
                    {w.estado && <p className="mt-2 text-sm text-tenue">{w.estado}</p>}
                  </div>
                  {w.url && <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-borde text-ac transition group-hover:bg-ac-fuerte group-hover:text-white"><IcoExterno size={16} /></span>}
                </div>
              </a>
            </Revelar>
          ))}
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-28 md:px-10">
        <Encabezado titulo="Así trabajamos" sub="Cuatro pasos claros. Siempre sabes en qué va tu proyecto." />
        <div className="grid gap-5 md:grid-cols-4">
          {PASOS.map((p, i) => (
            <Revelar key={p.t} delay={i * 0.12}>
              <div className="relative h-full rounded-card border border-borde bg-tarjeta p-6">
                <span className="num font-display text-4xl font-bold text-ac">{i + 1}</span>
                <h3 className="mt-2 font-display text-xl font-bold">{p.t}</h3>
                <p className="mt-2 text-suave">{p.d}</p>
              </div>
            </Revelar>
          ))}
        </div>
      </section>

      {/* Por qué conmigo */}
      <section className="border-y border-linea bg-bg2/50 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Revelar><h2 className="font-display text-4xl font-bold tracking-[-0.03em] md:text-5xl">¿Por qué <span className="text-ac">conmigo</span>?</h2></Revelar>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {RAZONES.map((r, i) => (
              <Revelar key={r.t} delay={i * 0.08}>
                <div className="flex h-full gap-5 rounded-card border border-borde bg-tarjeta p-6">
                  <span className="num font-display text-2xl font-bold text-ac">{i + 1}</span>
                  <div>
                    <p className="font-display text-xl font-bold">{r.t}</p>
                    <p className="mt-2 text-suave">{r.d}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ac"><IcoPalomita size={15} />{r.p}</p>
                  </div>
                </div>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      {/* Preguntas */}
      <section id="preguntas" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-28 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <Revelar>
            <h2 className="font-display text-4xl font-bold tracking-[-0.03em] md:text-5xl">Lo que más me preguntan</h2>
            <p className="mt-4 text-suave">¿Tienes otra duda? <a href={WA} target="_blank" rel="noreferrer" className="text-ac underline-offset-4 hover:underline">Pregúntame por WhatsApp</a>.</p>
          </Revelar>
          <div className="space-y-3">{PREGUNTAS.map((q, i) => <Revelar key={q.p} delay={i * 0.04}><Pregunta {...q} i={i} /></Revelar>)}</div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="relative scroll-mt-20 py-28">
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <Revelar>
            <h2 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em]">Cuéntame tu <span className="text-ac">idea</span>.</h2>
            <p className="mt-6 max-w-xl text-xl text-suave">La cotización es gratis y sin compromiso. Te respondo lo antes posible.</p>
          </Revelar>
          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] [&>*]:min-w-0">
            <div className="min-w-0 space-y-4">
              {/* WhatsApp: tarjeta verde con vista previa del mensaje */}
              <Revelar>
                <a href={WA} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-card bg-[#128c4a] p-7 text-white transition duration-300 hover:-translate-y-1">
                  <span className="relative flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur"><IcoWhatsApp size={26} /></span>
                    <span><span className="block font-display text-xl font-bold">WhatsApp</span><span className="block text-sm text-white/80">La forma más rápida de platicar</span></span>
                  </span>
                  <span className="relative mt-6 block max-w-[85%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[15px] text-[#0b3d22] shadow-lg">
                    ¡Hola Jose Juan! Vi tu página y me gustaría cotizar un proyecto.
                    <span className="mt-1 block text-right text-[11px] text-[#5b8a6e]">✓✓</span>
                  </span>
                  <span className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-[#062b14] px-5 py-2.5 text-sm font-semibold">Abrir chat <IcoFlecha size={15} className="transition group-hover:translate-x-1" /></span>
                </a>
              </Revelar>
              {/* Correo */}
              <Revelar delay={0.08}>
                <div className="flex min-w-0 items-center gap-4 rounded-card border border-borde bg-tarjeta p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ac-fuerte text-white"><IcoCorreo size={24} /></span>
                  <a href={`mailto:${PERFIL.correo}`} className="min-w-0 flex-1">
                    <span className="block font-display font-bold">Correo</span>
                    <span className="block truncate text-sm text-suave hover:text-ac">{PERFIL.correo}</span>
                  </a>
                  <CopiarCorreo />
                </div>
              </Revelar>
            </div>
            <Revelar delay={0.1}><FormCotizacion /></Revelar>
          </div>
        </div>
      </section>

      {/* WhatsApp flotante */}
      <motion.a href={WA} target="_blank" rel="noreferrer" aria-label="Escríbeme por WhatsApp" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring" }}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] shadow-lg">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#062b14" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .3-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.4.3.2.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" /></svg>
      </motion.a>
    </>
  );
}
