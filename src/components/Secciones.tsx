import { useRef, type JSX } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { OTROS, PERFIL, PROYECTOS, TEXTOS, type Proyecto } from "../data/contenido";
import { useEstado, useT } from "../lib/estado";
import { Contador, Encabezado, Revelar, ease } from "./efectos";
import { IcoExterno, IcoPalomita } from "./iconos";

/* ---------- Números ---------- */
export function Numeros() {
  const t = useT();
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 py-20 md:grid-cols-4 md:px-10">
      {TEXTOS.numeros.map((n, i) => (
        <Revelar key={i} delay={i * 0.08} className="border-l border-borde px-5 py-4 first:border-l-0 md:px-8">
          <p className="num font-display text-4xl font-bold tracking-[-0.04em] md:text-5xl"><Contador valor={n.valor} sufijo={n.sufijo} sinAnimar={n.sinAnimar} /></p>
          <p className="mt-2 text-sm text-suave">{t(n.t)}</p>
        </Revelar>
      ))}
    </section>
  );
}

/* ---------- Sobre mí ---------- */
const DATOS = [
  { k: { es: "Base", en: "Based in" }, v: { es: "Misantla, Veracruz", en: "Misantla, Veracruz" } },
  { k: { es: "Ahora", en: "Now" }, v: { es: "Residente en Synesia Labs", en: "Resident at Synesia Labs" } },
  { k: { es: "Idiomas", en: "Languages" }, v: { es: "Español · inglés (aprendiendo)", en: "Spanish · English (learning)" } },
  { k: { es: "Fuera del código", en: "Off the clock" }, v: { es: "Gym y finanzas personales", en: "Gym and personal finance" } },
];

const ICONO_TIPO: Record<string, JSX.Element> = {
  escuela: <path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5" />,
  trabajo: <path d="M4 8h16v11H4zM9 8V5h6v3" />,
  proyecto: <path d="M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z" />,
  meta: <path d="M5 12h14M13 6l6 6-6 6" />,
};

/** Línea de tiempo horizontal: la línea se dibuja y cada hito se enciende en orden al aparecer. En celular, vertical. */
function LineaTiempo() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const visto = useInView(ref, { once: true, margin: "-120px" });
  const n = TEXTOS.linea.length;
  const icono = (tipo: string) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONO_TIPO[tipo]}</svg>
  );
  return (
    <div ref={ref} className="mt-24">
      <Revelar><p className="lab mb-12">{t(TEXTOS.sobreMi.lineaTitulo)}</p></Revelar>

      {/* Escritorio */}
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-[86px] h-px bg-borde" />
        <motion.div className="absolute left-0 top-[86px] h-px origin-left bg-ac" style={{ width: "100%" }}
          initial={{ scaleX: 0 }} animate={visto ? { scaleX: 1 } : {}} transition={{ duration: 2.2, ease }} />
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {TEXTOS.linea.map((h, i) => {
            const d = 0.2 + (i / (n - 1)) * 2;
            return (
              <div key={i} className="group relative px-2">
                <motion.p initial={{ opacity: 0, y: 10 }} animate={visto ? { opacity: 1, y: 0 } : {}} transition={{ delay: d, duration: 0.5 }}
                  className={`num h-[60px] font-display text-4xl font-bold tracking-[-0.04em] ${h.meta ? "text-ac" : "text-tenue transition group-hover:text-tx"}`}>{h.fecha}</motion.p>
                <motion.span initial={{ scale: 0 }} animate={visto ? { scale: 1 } : {}} transition={{ delay: d, type: "spring", stiffness: 300, damping: 15 }}
                  className={`relative z-10 mt-[18px] grid h-4 w-4 place-items-center rounded-full border-2 border-ac ${h.meta ? "bg-ac" : "bg-bg group-hover:bg-ac"}`} />
                <motion.div initial={{ opacity: 0, y: 16 }} animate={visto ? { opacity: 1, y: 0 } : {}} transition={{ delay: d + 0.1, duration: 0.6, ease }}
                  className={`mt-6 h-[calc(100%-110px)] rounded-2xl border p-4 transition duration-300 group-hover:-translate-y-1 ${h.meta ? "border-ac bg-chip" : "border-borde bg-tarjeta group-hover:border-ac"}`}>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ac">{icono(h.tipo)}{t(h.tag)}</span>
                  <p className={`mt-3 font-display text-[15px] font-bold leading-snug ${h.meta ? "text-ac" : ""}`}>{t(h.titulo)}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-suave">{t(h.t)}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Celular y tableta */}
      <ul className="relative space-y-4 border-l border-borde pl-6 lg:hidden">
        {TEXTOS.linea.map((h, i) => (
          <Revelar key={i} delay={i * 0.05}>
            <li className="relative">
              <span className={`absolute -left-[33px] top-5 h-4 w-4 rounded-full border-2 border-ac ${h.meta ? "bg-ac" : "bg-bg"}`} />
              <div className={`rounded-2xl border p-4 ${h.meta ? "border-ac bg-chip" : "border-borde bg-tarjeta"}`}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ac">{icono(h.tipo)}{t(h.tag)}</span>
                  <span className="num font-display text-lg font-bold text-tenue">{h.fecha}</span>
                </div>
                <p className="mt-2 font-display font-bold">{t(h.titulo)}</p>
                <p className="mt-1 text-sm text-suave">{t(h.t)}</p>
              </div>
            </li>
          </Revelar>
        ))}
      </ul>
    </div>
  );
}

export function SobreMi() {
  const t = useT();
  return (
    <section id="sobre-mi" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-10">
      <Encabezado n="01" titulo={t(TEXTOS.sobreMi.titulo)} />
      <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Foto de noche en marco, con brillo morado */}
        <Revelar>
          <div className="relative mx-auto max-w-[400px]">
              <div className="relative overflow-hidden rounded-card border border-borde">
                <img src="/img/foto-noche.webp" alt="Jose Juan Juarez" loading="lazy" className="aspect-[4/5] w-full object-cover object-[55%_40%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-sm text-white/75">{PERFIL.alias}</p>
                  <p className="font-display text-lg font-bold leading-tight text-white">{PERFIL.nombreCompleto}</p>
                </div>
              </div>
          </div>
        </Revelar>

        <div>
          <Revelar><p className="font-serif text-3xl italic leading-snug md:text-4xl">“{t(TEXTOS.sobreMi.frase)}”</p></Revelar>
          <div className="mt-7 space-y-4 text-lg leading-relaxed text-suave">
            {TEXTOS.sobreMi.parrafos.slice(0, 2).map((p, i) => <Revelar key={i} delay={i * 0.08}><p>{t(p)}</p></Revelar>)}
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-card border border-borde bg-borde sm:grid-cols-2">
            {DATOS.map((d, i) => (
              <Revelar key={i} delay={0.1 + i * 0.06} className="bg-tarjeta px-5 py-4">
                <p className="lab">{t(d.k)}</p>
                <p className="mt-1">{t(d.v)}</p>
              </Revelar>
            ))}
          </div>
        </div>
      </div>
      <LineaTiempo />
    </section>
  );
}

/* ---------- Proyectos: uno por bloque, alternando lados, sin apilarse ---------- */
function BloqueProyecto({ p, i }: { p: Proyecto; i: number }) {
  const t = useT();
  const { tema } = useEstado();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yMovil = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const img = tema === "claro" && p.imgClaro ? p.imgClaro : p.img;
  const derecha = i % 2 === 1;
  return (
    <article ref={ref} className="grid items-center gap-10 border-t border-borde py-16 lg:grid-cols-2 lg:gap-16">
      <Revelar className={derecha ? "lg:order-2" : ""}>
        <div className="relative pb-10">
          <motion.div className="overflow-hidden rounded-card border border-borde bg-bg2"
            initial={{ clipPath: "inset(0 0 100% 0 round 20px)" }} whileInView={{ clipPath: "inset(0 0 0% 0 round 20px)" }}
            viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.9, ease }}>
            <div className="flex gap-1.5 border-b border-borde px-4 py-3">{[0, 1, 2].map((k) => <span key={k} className="h-2.5 w-2.5 rounded-full bg-borde" />)}</div>
            <img src={img} alt={`${p.nombre} en computadora`} loading="lazy" className="w-full" />
          </motion.div>
          {p.movil && (
            <motion.img style={{ y: yMovil }} src={p.movil} alt={`${p.nombre} en celular`} loading="lazy"
              className={`absolute bottom-0 w-[24%] rounded-[18px] border-4 border-[#111] shadow-xl ${derecha ? "left-0 lg:-left-3" : "right-0 lg:-right-3"}`} />
          )}
        </div>
      </Revelar>
      <div>
        <Revelar>
          <p className="num text-sm text-tenue">{t(p.tipo)}{p.anio && ` · ${p.anio}`}</p>
          <h3 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] md:text-5xl">{p.nombre}</h3>
        </Revelar>
        <Revelar delay={0.08} className="mt-6 space-y-5">
          <div><p className="lab !text-tenue">{t(TEXTOS.proyectos.problema)}</p><p className="mt-1.5 text-suave">{t(p.problema)}</p></div>
          <div><p className="lab">{t(TEXTOS.proyectos.solucion)}</p><p className="mt-1.5 text-tx">{t(p.solucion)}</p></div>
        </Revelar>
        <Revelar delay={0.14}>
          <ul className="mt-6 space-y-1.5">{p.logros.map((l, j) => <li key={j} className="flex gap-2 text-sm text-suave"><IcoPalomita size={16} className="mt-0.5 text-ac" />{t(l)}</li>)}</ul>
          <div className="mt-6 flex flex-wrap gap-1.5">{p.tec.map((x) => <span key={x} className="rounded-full border border-borde px-2.5 py-1 font-mono text-[11px] text-suave">{x}</span>)}</div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] font-semibold">
            {p.vivo && <a href={p.vivo} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 rounded-xl bg-ac-fuerte px-5 py-3 text-white transition hover:brightness-110 active:scale-[0.97]">{t(TEXTOS.proyectos.verSitio)} <IcoExterno size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>}
            {p.codigo && <a href={p.codigo} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-suave transition hover:text-tx">{t(TEXTOS.proyectos.verCodigo)} <IcoExterno size={16} /></a>}
          </div>
        </Revelar>
      </div>
    </article>
  );
}

export function Proyectos() {
  const t = useT();
  return (
    <section id="proyectos" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-10">
      <Encabezado n="02" titulo={t(TEXTOS.proyectos.titulo)} sub={t(TEXTOS.proyectos.sub)} />
      <div>{PROYECTOS.map((p, i) => <BloqueProyecto key={p.id} p={p} i={i} />)}</div>

      <Revelar className="mt-20"><p className="lab mb-6">{t(TEXTOS.proyectos.otros)}</p></Revelar>
      <div className="border-t border-borde">
        {OTROS.map((o, i) => {
          const Fila = o.url ? "a" : "div";
          return (
            <Revelar key={o.nombre} delay={i * 0.05}>
              <Fila {...(o.url ? { href: o.url, target: "_blank", rel: "noreferrer" } : {})}
                className="group relative grid grid-cols-[40px_1fr] items-baseline gap-x-4 border-b border-linea py-5 md:grid-cols-[60px_1fr_1.4fr_200px_30px]">
                <span className="num text-sm text-tenue">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl font-bold tracking-[-0.02em] transition group-hover:translate-x-2 group-hover:text-ac md:text-2xl">{o.nombre}</span>
                <span className="col-start-2 text-sm text-suave md:col-start-auto">{t(o.t)}</span>
                <span className="col-start-2 font-mono text-xs text-tenue md:col-start-auto">{o.tec}</span>
                <span className="hidden text-ac opacity-0 transition group-hover:opacity-100 md:block">{o.url ? <IcoExterno size={18} /> : null}</span>
                {o.img && <img src={o.img} alt="" aria-hidden loading="lazy"
                  className="pointer-events-none absolute right-24 top-1/2 z-10 hidden w-56 -translate-y-1/2 scale-95 rounded-lg border border-borde opacity-0 shadow-xl transition duration-300 group-hover:scale-100 group-hover:opacity-100 lg:block" />}
              </Fila>
            </Revelar>
          );
        })}
      </div>
    </section>
  );
}
