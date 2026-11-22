import { useEffect, useRef, useState, type FormEvent, type JSX } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { CERTIFICADOS, EXPERIENCIA, PERFIL, TEXTOS } from "../data/contenido";
import { useEstado, useT } from "../lib/estado";
import { enviarComentario, enviarMensaje, leerComentarios, type Comentario } from "../lib/servicios-externos";
import { IcoArriba, IcoCopiar, IcoCorreo, IcoEnviar, IcoExterno, IcoFlecha, IcoGitHub, IcoLinkedIn, IcoMas, IcoPalomita } from "./iconos";
import { Logo } from "./Nav";
import { Encabezado, Revelar } from "./efectos";

/** Palomita que se dibuja (confirma que algo salió bien). */
function PalomitaDibujada({ tam = 64 }: { tam?: number }) {
  return (
    <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="mx-auto grid place-items-center rounded-full bg-ac-fuerte text-white" style={{ width: tam, height: tam }}>
      <svg width={tam * 0.5} height={tam * 0.5} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <motion.path d="m5 12.5 4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }} />
      </svg>
    </motion.span>
  );
}
/** Texto del botón mientras se envía: girito + "Enviando…". */
const Enviando = ({ es }: { es: boolean }) => <span className="inline-flex items-center gap-2"><span className="cargando" aria-hidden />{es ? "Enviando…" : "Sending…"}</span>;

const campo = "w-full rounded-xl border border-borde bg-bg px-4 py-3.5 text-tx outline-none transition placeholder:text-tenue focus:border-ac";

/* ---------- Cómo trabajo con IA ---------- */
export function ConIA() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const ancho = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <Encabezado n="04" titulo={t(TEXTOS.ia.titulo)} sub={t(TEXTOS.ia.sub)} />
      <div ref={ref} className="relative">
        <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-borde md:block" />
        <motion.div className="absolute left-0 top-[27px] hidden h-px bg-ac md:block" style={{ width: ancho }} />
        <div className="grid gap-6 md:grid-cols-4">
          {TEXTOS.ia.pasos.map((p, i) => (
            <Revelar key={p.n} delay={i * 0.12}>
              <div className="relative">
                <span className="num relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-ac bg-bg font-display text-sm font-bold text-ac">{p.n}</span>
                <h3 className="mt-5 font-display text-xl font-bold">{t(p.t)}</h3>
                <p className="mt-2 text-suave">{t(p.d)}</p>
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experiencia (acordeón) y certificaciones ---------- */
export function Experiencia() {
  const t = useT();
  const { idioma } = useEstado();
  const [abierto, setAbierto] = useState(0);
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <Encabezado n="05" titulo={t(TEXTOS.experiencia.titulo)} />
      <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-4">
          {EXPERIENCIA.map((e, i) => {
            const on = abierto === i;
            return (
              <Revelar key={i} delay={i * 0.08}>
                <div className={`overflow-hidden rounded-card border transition-colors ${on ? "border-ac bg-tarjeta" : "border-borde bg-tarjeta/60 hover:border-ac/50"}`}>
                  <button onClick={() => setAbierto(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center gap-5 p-6 text-left">
                    <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-sm font-bold transition ${on ? "bg-ac-fuerte text-white" : "bg-chip text-ac"}`}>{e.ini}</span>
                    <span className="min-w-0 flex-1">
                      <span className="num block text-sm font-medium text-ac">{t(e.fecha)}</span>
                      <span className="mt-1 block font-display text-xl font-bold">{t(e.puesto)}</span>
                      <span className="block text-suave">{typeof e.lugar === "string" ? e.lugar : e.lugar[idioma]}</span>
                    </span>
                    <motion.span animate={{ rotate: on ? 45 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-borde text-ac"><IcoMas size={16} /></motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                        <div className="border-t border-linea px-6 pb-6 pt-5 md:pl-[100px]">
                          <p className="text-suave">{t(e.d)}</p>
                          <ul className="mt-4 space-y-1.5">{e.puntos.map((x, j) => <li key={j} className="flex gap-2 text-sm"><IcoFlecha size={15} className="mt-0.5 text-ac" />{t(x)}</li>)}</ul>
                          <div className="mt-4 flex flex-wrap gap-1.5">{e.tec.map((x) => <span key={x} className="rounded-full border border-borde px-2.5 py-1 font-mono text-[11px] text-suave">{x}</span>)}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Revelar>
            );
          })}
        </div>
        <div>
          <p className="lab mb-5">{t(TEXTOS.experiencia.certTitulo)}</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {CERTIFICADOS.map((c, i) => {
              const Caja = c.url ? "a" : "div";
              return (
                <Revelar key={c.n} delay={i * 0.06}>
                  <Caja {...(c.url ? { href: c.url, target: "_blank", rel: "noreferrer" } : {})}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-borde bg-tarjeta p-5 transition duration-300 hover:-translate-y-1 hover:border-ac">
                    <p className="lab num">{c.e} · {c.f}</p>
                    <p className="mt-2 font-semibold leading-snug">{c.n}</p>
                    <p className="mt-3 inline-flex items-center gap-1 text-sm text-tenue transition group-hover:text-ac">{c.url ? <>{t(TEXTOS.experiencia.verificar)} <IcoExterno size={14} /></> : <IcoPalomita size={15} />}</p>
                  </Caja>
                </Revelar>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Libro de visitas (reseñas con estrellas) ---------- */
function Estrellas({ valor, onCambio, tam = 18 }: { valor: number; onCambio?: (n: number) => void; tam?: number }) {
  const [hover, setHover] = useState(0);
  const v = hover || valor;
  const estrella = (n: number) => (
    <svg width={tam} height={tam} viewBox="0 0 24 24" className={n <= v ? "fill-ac text-ac" : "fill-transparent text-borde"} stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2 6.4 20.2l1.1-6.3L2.9 9.5l6.3-.9z" strokeLinejoin="round" />
    </svg>
  );
  return (
    <span className="inline-flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => onCambio ? (
        <button key={n} type="button" onClick={() => onCambio(n)} onMouseEnter={() => setHover(n)} aria-label={`${n} / 5`} className="transition hover:scale-125">{estrella(n)}</button>
      ) : <span key={n}>{estrella(n)}</span>)}
    </span>
  );
}

export function LibroVisitas() {
  const t = useT();
  const { idioma } = useEstado();
  const [lista, setLista] = useState<Comentario[] | null>(null);
  const [f, setF] = useState({ nombre: "", rol: "", mensaje: "", estrellas: 5, web: "" });
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");
  useEffect(() => { leerComentarios().then(setLista).catch(() => setLista([])); }, []);
  const conEstrellas = (lista ?? []).filter((c) => c.estrellas);
  const promedio = conEstrellas.length ? conEstrellas.reduce((a, c) => a + (c.estrellas ?? 0), 0) / conEstrellas.length : 0;
  // Un promedio con 1 o 2 reseñas no dice nada (y se ve raro): se muestra a partir de 3
  const MIN_PROMEDIO = 3;

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (f.web) return; // trampa para bots
    if (!f.nombre.trim() || f.mensaje.trim().length < 3) return;
    setEstado("enviando");
    try { await enviarComentario(f); setEstado("ok"); setF({ nombre: "", rol: "", mensaje: "", estrellas: 5, web: "" }); }
    catch { setEstado("error"); }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <Encabezado n="06" titulo={t(TEXTOS.visitas.titulo)} sub={t(TEXTOS.visitas.sub)} />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <Revelar>
          <div className="lg:sticky lg:top-24">
            {conEstrellas.length >= MIN_PROMEDIO && (
              <div className="mb-5 flex items-center gap-4 rounded-card border border-borde bg-tarjeta p-5">
                <p className="num font-display text-4xl font-bold">{promedio.toFixed(1)}</p>
                <div>
                  <Estrellas valor={Math.round(promedio)} />
                  <p className="num mt-1 text-sm text-tenue">{t(TEXTOS.visitas.promedio).replace("{n}", String(conEstrellas.length))}</p>
                </div>
              </div>
            )}
            <form onSubmit={enviar} className="space-y-3 rounded-card border border-borde bg-tarjeta p-6">
              <div>
                <p className="mb-2 text-sm text-suave">{t(TEXTOS.visitas.califica)}</p>
                <Estrellas valor={f.estrellas} onCambio={(n) => setF({ ...f, estrellas: n })} tam={28} />
              </div>
              <input className={campo} placeholder={t(TEXTOS.visitas.nombre)} value={f.nombre} maxLength={60} onChange={(e) => setF({ ...f, nombre: e.target.value })} required />
              <input className={campo} placeholder={t(TEXTOS.visitas.rol)} value={f.rol} maxLength={60} onChange={(e) => setF({ ...f, rol: e.target.value })} />
              <textarea className={`${campo} min-h-[120px] resize-none`} placeholder={t(TEXTOS.visitas.mensaje)} value={f.mensaje} maxLength={500} onChange={(e) => setF({ ...f, mensaje: e.target.value })} required />
              <input className="hidden" tabIndex={-1} autoComplete="off" value={f.web} onChange={(e) => setF({ ...f, web: e.target.value })} aria-hidden />
              <button disabled={estado === "enviando"} className="w-full rounded-xl bg-ac-fuerte py-4 text-[15px] font-semibold text-white transition hover:brightness-110 active:scale-[0.98] disabled:opacity-70">
                {estado === "enviando" ? <Enviando es={idioma === "es"} /> : t(TEXTOS.visitas.enviar)}
              </button>
              <AnimatePresence>
                {(estado === "ok" || estado === "error") && (
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex items-center gap-2 text-sm ${estado === "ok" ? "text-ac" : "text-red-400"}`}>
                    {estado === "ok" && <IcoPalomita size={16} />}{estado === "ok" ? t(TEXTOS.visitas.gracias) : t(TEXTOS.visitas.error)}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </Revelar>
        <div className="columns-1 gap-4 md:columns-2 [&>*]:mb-4">
          {lista === null && [0, 1].map((k) => (
            <div key={k} className="break-inside-avoid space-y-3 rounded-card border border-borde p-6" aria-hidden>
              <div className="esqueleto h-4 w-24 rounded" /><div className="esqueleto h-5 w-full rounded" /><div className="esqueleto h-5 w-3/4 rounded" />
              <div className="flex items-center gap-3 pt-2"><div className="esqueleto h-9 w-9 rounded-full" /><div className="esqueleto h-4 w-28 rounded" /></div>
            </div>
          ))}
          {lista?.length === 0 && (
            <div className="break-inside-avoid rounded-card border border-dashed border-borde p-10 text-center">
              <p className="font-serif text-4xl italic text-ac">“ ”</p>
              <p className="mt-2 text-suave">{t(TEXTOS.visitas.vacio)}</p>
            </div>
          )}
          {lista?.map((c, i) => (
            <Revelar key={c.id} delay={(i % 4) * 0.06} className="break-inside-avoid">
              <figure className="rounded-card border border-borde bg-tarjeta p-6 transition hover:border-ac/60">
                {c.estrellas ? <Estrellas valor={c.estrellas} tam={15} /> : null}
                <blockquote className="mt-3 font-serif text-xl italic leading-snug">“{c.mensaje}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-chip text-sm font-bold text-ac">{c.nombre.charAt(0).toUpperCase()}</span>
                  <span>
                    <span className="block text-sm font-medium">{c.nombre}</span>
                    <span className="text-sm text-tenue">{c.rol ? `${c.rol} · ` : ""}{new Date(c.creado).toLocaleDateString(idioma === "es" ? "es-MX" : "en-US", { month: "short", year: "numeric" })}</span>
                  </span>
                </figcaption>
              </figure>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contacto: tarjetas con logo + formulario tipo ventana de correo ---------- */
function BotonCopiar({ texto }: { texto: string }) {
  const t = useT();
  const [ok, setOk] = useState(false);
  return (
    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigator.clipboard?.writeText(texto).then(() => { setOk(true); setTimeout(() => setOk(false), 1600); }); }}
      aria-live="polite" className="inline-flex items-center gap-1.5 rounded-lg border border-borde px-2.5 py-1 text-xs font-medium text-suave transition hover:border-ac hover:text-tx active:scale-95">
      {ok ? <><IcoPalomita size={13} className="text-ac" />{t(TEXTOS.contacto.copiado)}</> : <><IcoCopiar size={13} />{t(TEXTOS.contacto.copiar)}</>}
    </button>
  );
}

export function TarjetaMedio({ href, color, icono, titulo, valor, accion, copiar }: { href: string; color: string; icono: JSX.Element; titulo: string; valor: string; accion: string; copiar?: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      className="group flex min-w-0 items-center gap-4 rounded-[24px] border border-borde bg-tarjeta p-4 transition duration-300 hover:-translate-y-0.5 hover:border-ac">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg text-white" style={{ background: color }}>{icono}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-base font-bold">{titulo}</span>
        <span className="block truncate text-sm text-suave">{valor}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-2">
        {copiar && <BotonCopiar texto={copiar} />}
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-ac">{accion} <IcoExterno size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
      </span>
    </a>
  );
}

export function Contacto() {
  const t = useT();
  const { idioma } = useEstado();
  const motivos = TEXTOS.contacto.motivos[idioma];
  const vacio = { nombre: "", correo: "", empresa: "", mensaje: "", motivo: motivos[0], _honey: "" };
  const [f, setF] = useState(vacio);
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");
  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (f._honey) return;
    setEstado("enviando");
    try {
      await enviarMensaje({ origen: "portafolio", tipo: f.motivo, nombre: f.nombre, contacto: f.correo, empresa: f.empresa, mensaje: f.mensaje }, `Portafolio · ${f.motivo} · ${f.nombre}`);
      setEstado("ok"); setF(vacio);
    } catch { setEstado("error"); }
  };
  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden py-28">
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Revelar>
          <h2 className="font-display text-[clamp(3rem,10vw,8.5rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
            {t(TEXTOS.contacto.titulo)}<span className="text-ac">.</span>
          </h2>
          <p className="mt-6 max-w-xl text-xl text-suave">{t(TEXTOS.contacto.sub)}</p>
        </Revelar>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.25fr] [&>*]:min-w-0">
          <div className="min-w-0 space-y-4">
            <Revelar><TarjetaMedio href={`mailto:${PERFIL.correo}`} color="#8b5cf6" icono={<IcoCorreo size={26} />} titulo={idioma === "es" ? "Correo" : "Email"} valor={PERFIL.correo} accion={idioma === "es" ? "Escribir" : "Write"} copiar={PERFIL.correo} /></Revelar>
            <Revelar delay={0.07}><TarjetaMedio href={PERFIL.linkedin} color="#0a66c2" icono={<IcoLinkedIn size={24} />} titulo="LinkedIn" valor="in/josejuanjuarezmartinez" accion={idioma === "es" ? "Conectar" : "Connect"} /></Revelar>
            <Revelar delay={0.14}><TarjetaMedio href={PERFIL.github} color="#24292f" icono={<IcoGitHub size={26} />} titulo="GitHub" valor="ZeroFuann-FS" accion={idioma === "es" ? "Ver código" : "See code"} /></Revelar>
          </div>

          <Revelar delay={0.1}>
            <div className="overflow-hidden rounded-card border border-borde bg-tarjeta">
              <div className="flex items-center gap-3 border-b border-borde px-5 py-3.5">
                <span className="flex gap-1.5">{[0, 1, 2].map((k) => <span key={k} className="h-2.5 w-2.5 rounded-full bg-borde" />)}</span>
                <span className="text-xs text-tenue">{idioma === "es" ? "Nuevo mensaje" : "New message"}</span>
              </div>
              <AnimatePresence mode="wait">
                {estado === "ok" ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="grid min-h-[440px] place-items-center p-8 text-center">
                    <div>
                      <PalomitaDibujada />
                      <p className="mt-5 font-display text-2xl font-bold">{t(TEXTOS.contacto.enviado)}</p>
                      <button onClick={() => setEstado("idle")} className="mt-6 text-sm font-semibold text-ac hover:underline">{t(TEXTOS.contacto.otraVez)}</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="f" onSubmit={enviar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 p-6 md:p-7">
                    <div className="flex min-w-0 items-center gap-3 border-b border-linea pb-4 text-sm">
                      <span className="text-tenue">{idioma === "es" ? "Para:" : "To:"}</span>
                      <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-chip py-1 pl-1 pr-3 text-tx"><img src="/img/avatar.webp" alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" /><span className="truncate">{PERFIL.nombreCompleto}</span></span>
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-suave">{t(TEXTOS.contacto.motivo)}</p>
                      <div className="flex flex-wrap gap-2">
                        {motivos.map((m) => (
                          <button type="button" key={m} onClick={() => setF({ ...f, motivo: m })}
                            aria-pressed={f.motivo === m} className={`rounded-full border px-4 py-2 text-sm transition active:scale-95 ${f.motivo === m ? "border-ac bg-ac-fuerte text-white" : "border-borde text-suave hover:text-tx"}`}>{m}</button>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input className={campo} placeholder={t(TEXTOS.contacto.nombre)} value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} required />
                      <input className={campo} type="email" placeholder={t(TEXTOS.contacto.correo)} value={f.correo} onChange={(e) => setF({ ...f, correo: e.target.value })} required />
                    </div>
                    <input className={campo} placeholder={t(TEXTOS.contacto.empresa)} value={f.empresa} onChange={(e) => setF({ ...f, empresa: e.target.value })} />
                    <div className="relative">
                      <textarea className={`${campo} min-h-[140px] resize-none pb-7`} placeholder={t(TEXTOS.contacto.mensaje)} value={f.mensaje} maxLength={2000} onChange={(e) => setF({ ...f, mensaje: e.target.value })} required />
                      <span className="num pointer-events-none absolute bottom-3 right-4 text-xs text-tenue">{f.mensaje.length}/2000</span>
                    </div>
                    <input className="hidden" tabIndex={-1} autoComplete="off" value={f._honey} onChange={(e) => setF({ ...f, _honey: e.target.value })} aria-hidden />
                    <div className="flex flex-col-reverse items-start justify-between gap-4 pt-1 sm:flex-row sm:items-center">
                      <p className="max-w-xs text-xs text-tenue">{t(TEXTOS.contacto.nota)}</p>
                      <button disabled={estado === "enviando"} className="group inline-flex items-center gap-2 rounded-xl bg-ac-fuerte px-7 py-4 text-[15px] font-semibold text-white transition hover:brightness-110 active:scale-[0.97] disabled:opacity-70">
                        {estado === "enviando" ? <Enviando es={idioma === "es"} /> : <>{t(TEXTOS.contacto.enviar)} <IcoEnviar className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></>}
                      </button>
                    </div>
                    {estado === "error" && <p className="text-sm text-red-400">{t(TEXTOS.contacto.error)}</p>}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}

export function Pie() {
  const t = useT();
  const redes = [
    { h: `mailto:${PERFIL.correo}`, l: "Correo", i: <IcoCorreo size={18} /> },
    { h: PERFIL.linkedin, l: "LinkedIn", i: <IcoLinkedIn size={17} /> },
    { h: PERFIL.github, l: "GitHub", i: <IcoGitHub size={18} /> },
  ];
  return (
    <footer className="border-t border-linea">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-10 md:grid-cols-3 md:px-10">
        <div>
          <Logo />
          <p className="num mt-2 text-sm text-tenue">© {new Date().getFullYear()} {PERFIL.nombreCompleto}</p>
        </div>
        <p className="text-suave md:text-center">{t(TEXTOS.pie.lugar)}</p>
        <div className="flex items-center gap-2 md:justify-end">
          {redes.map((r) => (
            <a key={r.l} href={r.h} target={r.h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={r.l}
              className="grid h-10 w-10 place-items-center rounded-full border border-borde text-suave transition hover:-translate-y-0.5 hover:border-ac hover:text-ac">{r.i}</a>
          ))}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="group ml-2 inline-flex h-10 items-center gap-2 rounded-full border border-borde px-4 text-sm font-medium text-suave transition hover:border-ac hover:text-ac">
            {t(TEXTOS.pie.arriba)} <IcoArriba size={15} className="transition group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
