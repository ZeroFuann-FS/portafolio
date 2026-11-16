/* Inicio "Del mensaje al deploy": una historia real de Brío que se reproduce paso a paso. */
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PERFIL, TEXTOS } from "../data/contenido";
import { useT } from "../lib/estado";
import { Magnetico, TextoDividido, ease } from "./efectos";

function Historia() {
  const t = useT();
  const h = TEXTOS.hero.historia;
  const reduce = useReducedMotion();
  const [vuelta, setVuelta] = useState(0);
  const paso = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay: 0.6 + i * 0.85, duration: 0.6, ease },
  });
  return (
    <div className="relative">
      <div key={vuelta} className="flex flex-col gap-3.5">
        <motion.div {...paso(0)} className="max-w-[88%] rounded-[18px] rounded-bl-[6px] border border-[#2f4a39] bg-[#16231b] px-4 py-3.5 text-[15px] leading-relaxed text-[#e4f5ea]">
          {t(h.reporte)}
          <span className="mt-1.5 block font-mono text-[11px] text-[#7ea98c]">{t(h.quien)} · 18:02</span>
        </motion.div>
        <motion.div {...paso(1)} className="ml-auto max-w-[88%] rounded-[18px] rounded-br-[6px] border border-borde bg-chip px-4 py-3.5 text-[15px] leading-relaxed">
          {t(h.respuesta)}
          <span className="mt-1.5 block font-mono text-[11px] text-ac">{t(h.yo)} · 18:05</span>
        </motion.div>
        <motion.div {...paso(2)} className="rounded-2xl border border-borde bg-tarjeta px-4 py-3.5 font-mono text-[13px] leading-relaxed text-suave">
          <span className="text-[#7ee787]">feat(alimentos)</span>: {t(h.commit)}
          <span className="block text-tenue">{t(h.detalle)}</span>
        </motion.div>
        <motion.div {...paso(3)} className="flex items-center justify-between rounded-2xl border border-borde bg-tarjeta px-4 py-3.5 font-mono text-[13px] text-suave">
          <span><span className="text-[#7ee787]">✓ deploy</span> mi-brio.vercel.app</span>
          <span className="text-tenue">producción</span>
        </motion.div>
        <motion.div {...paso(4)} className="self-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-ac-fuerte px-5 py-3 font-mono text-sm font-semibold text-white shadow-[0_12px_40px_-10px_var(--ac-fuerte)]">
            {t(h.publicado)} ✓
          </span>
        </motion.div>
      </div>
      <button onClick={() => setVuelta((v) => v + 1)} className="absolute -bottom-10 right-0 font-mono text-xs text-tenue transition hover:text-ac">↻ {t(h.otraVez)}</button>
    </div>
  );
}

export default function Hero() {
  const t = useT();
  return (
    <section className="relative overflow-hidden pb-24 pt-28 md:pt-36">
      <div aria-hidden className="rejilla absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]" />
      <motion.div aria-hidden className="absolute -right-40 top-24 h-[520px] w-[520px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--brillo), transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-borde bg-chip px-3.5 py-1.5 font-mono text-xs text-ac">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ac opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-ac" /></span>
            {t(TEXTOS.hero.estado)}
          </motion.span>

          <h1 className="mt-7">
            <span className="block font-display text-[clamp(2rem,3.7vw,3.25rem)] font-extrabold leading-[1] tracking-[-0.045em]"><TextoDividido texto={t(TEXTOS.hero.linea1)} delay={0.15} /></span>
            <span className="block font-display text-[clamp(2rem,3.7vw,3.25rem)] font-extrabold leading-[1] tracking-[-0.045em]"><TextoDividido texto={t(TEXTOS.hero.linea2)} delay={0.35} /></span>
            <span className="mt-1 block font-serif text-[clamp(2.3rem,4.3vw,3.8rem)] italic leading-[1.05] tracking-[-0.03em] text-ac"><TextoDividido texto={t(TEXTOS.hero.linea3)} delay={0.6} /></span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease }} className="mt-7 max-w-xl text-lg leading-relaxed text-suave md:text-xl">
            {t(TEXTOS.hero.bajada)}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 flex items-center gap-4">
            <img src="/img/avatar.webp" alt={PERFIL.nombre} className="h-14 w-14 rounded-full border-2 border-ac object-cover" />
            <div>
              <p className="font-medium">{PERFIL.nombreCompleto}</p>
              <p className="font-mono text-xs text-tenue">{PERFIL.alias} · {t(TEXTOS.hero.meta)}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.6 }} className="mt-9 flex flex-wrap gap-3">
            <Magnetico>
              <a href="#proyectos" className="group inline-flex items-center gap-2 rounded-xl bg-ac-fuerte px-6 py-4 font-mono text-sm font-semibold text-white shadow-[0_10px_40px_-10px_var(--ac-fuerte)]">
                {t(TEXTOS.hero.verProyectos)} <span className="transition group-hover:translate-x-1">→</span>
              </a>
            </Magnetico>
            <Magnetico>
              <a href={PERFIL.cv} download className="inline-flex items-center gap-2 rounded-xl border border-borde px-6 py-4 font-mono text-sm font-semibold text-tx transition hover:border-ac">
                {t(TEXTOS.hero.cv)} <span>↓</span>
              </a>
            </Magnetico>
          </motion.div>
        </div>

        <Historia />
      </div>
    </section>
  );
}
