/* Stack: pestañas por categoría + mosaico + panel de detalle con nivel honesto. */
import { useState, type JSX } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { PROYECTOS, STACK, TEXTOS, type CategoriaStack, type Tecnologia } from "../data/contenido";
import { useEstado, useT } from "../lib/estado";
import { Encabezado, Revelar } from "./efectos";
import { IcoFlecha } from "./iconos";

/** En celular se ven las primeras; el resto con "Ver todas". */
const EN_CELULAR = 12;

const CATEGORIAS: { id: "todo" | CategoriaStack; t: Record<"es" | "en", string> }[] = [
  { id: "todo", t: { es: "Todo", en: "All" } },
  { id: "lenguajes", t: { es: "Lenguajes", en: "Languages" } },
  { id: "frontend", t: { es: "Frontend", en: "Frontend" } },
  { id: "backend", t: { es: "Backend y datos", en: "Backend & data" } },
  { id: "ia", t: { es: "IA y visión", en: "AI & vision" } },
  { id: "herramientas", t: { es: "Herramientas", en: "Tools" } },
  { id: "metodo", t: { es: "Método y negocio", en: "Method & business" } },
];
const NIVEL = {
  es: ["Lo que más uso", "Uso frecuente", "Lo he usado", "Estudiándolo ahora"],
  en: ["My core stack", "Use often", "Have used", "Studying it now"],
};
const ANCHO = ["92%", "70%", "45%", "30%"];

/* Íconos sencillos para lo que no tiene logo oficial */
const SIMBOLOS: Record<string, JSX.Element> = {
  ia: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  prompt: <path d="M4 6h16v10H8l-4 4zM8 10h8M8 13h5" />,
  vision: <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
  motion: <path d="M3 17c3 0 3-10 6-10s3 10 6 10 3-10 6-10" />,
  pwa: <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM11 18h2M9 8l3 3 3-3" />,
  scrum: <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />,
  negocio: <path d="M3 20h18M6 16V9M11 16V5M16 16v-5M21 16v-8" />,
  clientes: <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 11a3 3 0 1 0 0-6M18 14c2.4.6 4 2.9 4 6" />,
};
function Icono({ s, size = 40 }: { s: Tecnologia; size?: number }) {
  if (s.icono) return <img src={s.icono} alt="" style={{ width: size, height: size }} />;
  return (
    <span className="grid place-items-center rounded-[22%] bg-chip text-ac" style={{ width: size, height: size }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{SIMBOLOS[s.simbolo ?? "ia"]}</svg>
    </span>
  );
}

const proyectosDe = (s: Tecnologia) => {
  const clave = s.n.toLowerCase().split(" ")[0].replace(".js", "");
  return PROYECTOS.filter((p) => p.tec.some((x) => x.toLowerCase().startsWith(clave)));
};

export default function Stack() {
  const t = useT();
  const { idioma } = useEstado();
  const [cat, setCat] = useState<"todo" | CategoriaStack>("todo");
  const [sel, setSel] = useState<Tecnologia>(STACK.find((s) => s.id === "react")!);
  const [todas, setTodas] = useState(false);
  const lista = STACK.filter((s) => cat === "todo" || s.cat === cat);
  const usados = proyectosDe(sel);

  return (
    <section id="stack" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-10">
      <Encabezado n="03" titulo={t(TEXTOS.stack.titulo)} sub={t(TEXTOS.stack.sub)} />

      <LayoutGroup>
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIAS.map((c) => {
            const n = c.id === "todo" ? STACK.length : STACK.filter((s) => s.cat === c.id).length;
            return (
              <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className="relative rounded-full px-4 py-2 text-sm font-medium">
                {cat === c.id && <motion.span layoutId="pestana" className="absolute inset-0 rounded-full bg-ac-fuerte" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className={`relative ${cat === c.id ? "text-white" : "text-suave hover:text-tx"}`}>{c.t[idioma]} <span className="num opacity-60">{n}</span></span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <motion.div layout className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {lista.map((s, i) => {
              const on = sel.id === s.id;
              const escondida = !todas && i >= EN_CELULAR;
              return (
                <motion.button layout key={s.id} onClick={() => setSel(s)} onMouseEnter={() => setSel(s)}
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.3, delay: Math.min(i, 12) * 0.02 }}
                  className={`group relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border bg-tarjeta transition-colors ${on ? "border-ac" : "border-borde hover:border-ac/60"} ${escondida ? "max-lg:hidden" : ""}`}>
                  {on && <motion.span layoutId="brillo-stack" className="absolute inset-0 bg-chip" />}
                  <span className="relative transition duration-300 group-hover:-translate-y-1 group-hover:scale-110"><Icono s={s} /></span>
                  <span className="relative line-clamp-2 px-1.5 text-center text-xs leading-tight text-suave">{s.n}</span>
                  {s.nivel === 0 && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-ac" />}
                  {s.nivel === 3 && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full border border-ac" title={idioma === "es" ? "Estudiándolo" : "Learning"} />}
                </motion.button>
              );
            })}
          </AnimatePresence>
          {!todas && lista.length > EN_CELULAR && (
            <button onClick={() => setTodas(true)} className="col-span-full rounded-2xl border border-dashed border-borde py-3.5 text-sm font-semibold text-suave transition hover:border-ac hover:text-tx active:scale-[0.98] lg:hidden">
              {idioma === "es" ? `Ver todas (${lista.length})` : `See all (${lista.length})`}
            </button>
          )}
        </motion.div>

        <Revelar>
          <div className="sticky top-24 overflow-hidden rounded-card border border-borde bg-tarjeta p-7">
            <AnimatePresence mode="wait">
              <motion.div key={sel.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <div className="flex items-center gap-4">
                  <Icono s={sel} size={56} />
                  <div>
                    <p className="lab">{NIVEL[idioma][sel.nivel]}</p>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.03em]">{sel.n}</h3>
                  </div>
                </div>
                <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-linea">
                  <motion.div className={`h-full rounded-full bg-ac ${sel.nivel === 3 ? "opacity-50" : ""}`} initial={{ width: 0 }} animate={{ width: ANCHO[sel.nivel] }} transition={{ duration: 0.8, ease: "easeOut" }} />
                </div>
                <p className="mt-6 text-xl leading-snug">{t(sel.uso)}</p>
                {usados.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {usados.map((p) => <a key={p.id} href="#proyectos" className="group inline-flex items-center gap-1 rounded-full border border-borde px-3 py-1 text-sm text-suave transition hover:border-ac hover:text-tx">{p.nombre} <IcoFlecha size={13} className="transition group-hover:translate-x-0.5" /></a>)}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 grid grid-cols-2 gap-2 border-t border-linea pt-4 text-xs text-tenue">
              {NIVEL[idioma].map((l, i) => <span key={l} className="flex items-center gap-2"><span className="h-1.5 rounded-full bg-ac" style={{ width: [18, 14, 9, 6][i], opacity: i === 3 ? 0.5 : 1 }} />{l}</span>)}
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
