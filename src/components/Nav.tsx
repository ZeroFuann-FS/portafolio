import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { TEXTOS } from "../data/contenido";
import { useEstado, useT } from "../lib/estado";

export function Logo() {
  return (
    <a href="/" className="font-mono text-[15px] font-semibold tracking-tight text-tx">
      ZeroFuann<span className="text-ac">.</span>
    </a>
  );
}

export function BotonTema() {
  const { tema, alternarTema } = useEstado();
  return (
    <button onClick={alternarTema} aria-label={tema === "oscuro" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-borde text-suave transition hover:text-tx">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={tema} initial={{ y: -14, opacity: 0, rotate: -90 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: 14, opacity: 0, rotate: 90 }} transition={{ duration: 0.25 }}>
          {tema === "oscuro" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Nav({ servicios = false }: { servicios?: boolean }) {
  const t = useT();
  const { idioma, setIdioma } = useEstado();
  const { scrollY } = useScroll();
  const [oculto, setOculto] = useState(false);
  const [arriba, setArriba] = useState(true);
  const [menu, setMenu] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setOculto(y > prev && y > 200 && !menu);
    setArriba(y < 20);
  });
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; }, [menu]);

  const links = servicios
    ? [["#servicios", "Servicios"], ["#trabajos", "Trabajos"], ["#proceso", "Proceso"], ["#preguntas", "Preguntas"], ["#contacto", "Contacto"]]
    : [["#proyectos", t(TEXTOS.nav.proyectos)], ["#sobre-mi", t(TEXTOS.nav.sobreMi)], ["#stack", t(TEXTOS.nav.stack)], ["/servicios", t(TEXTOS.nav.servicios)], ["#contacto", t(TEXTOS.nav.contacto)]];

  return (
    <motion.header animate={{ y: oculto ? -90 : 0 }} transition={{ duration: 0.35 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${arriba ? "" : "border-b border-linea bg-bg/80 backdrop-blur-xl"}`}>
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 md:px-10">
        <div className="flex items-center gap-3">
          <Logo />
          {servicios && <span className="hidden font-mono text-xs text-tenue sm:inline">/ servicios</span>}
        </div>
        <ul className="hidden items-center gap-8 font-mono text-[13px] text-suave md:flex">
          {links.map(([h, l]) => <li key={h}><a href={h} className="transition hover:text-tx">{l}</a></li>)}
          {servicios && <li><a href="/" className="text-ac hover:underline">← Portafolio</a></li>}
        </ul>
        <div className="flex items-center gap-2">
          {!servicios && (
            <button onClick={() => setIdioma(idioma === "es" ? "en" : "es")} className="h-9 rounded-full border border-borde px-3 font-mono text-xs text-suave transition hover:text-tx" aria-label="Cambiar idioma">
              <span className={idioma === "es" ? "text-tx" : ""}>ES</span> / <span className={idioma === "en" ? "text-tx" : ""}>EN</span>
            </button>
          )}
          <BotonTema />
          <button onClick={() => setMenu((m) => !m)} className="grid h-9 w-9 place-items-center rounded-full border border-borde md:hidden" aria-label="Menú" aria-expanded={menu}>
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-tx transition ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-tx transition ${menu ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[68px] bottom-0 bg-bg px-6 pt-8 md:hidden">
            <ul className="space-y-6">
              {[...links, ...(servicios ? [["/", "← Portafolio"]] : [])].map(([h, l], i) => (
                <motion.li key={h} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <a href={h} onClick={() => setMenu(false)} className="font-display text-3xl font-bold">{l}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
