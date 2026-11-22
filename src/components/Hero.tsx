/* Inicio "Del mensaje al deploy": una historia real de Brío que se reproduce paso a paso. */
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PERFIL, TEXTOS } from "../data/contenido";
import { useT } from "../lib/estado";
import { TextoDividido, ease } from "./efectos";
import { IcoDescargar, IcoFlecha, IcoPalomita, IcoRepetir } from "./iconos";

function Historia() {
  const t = useT();
  const h = TEXTOS.hero.historia;
  const reduce = useReducedMotion();
  const [vuelta, setVuelta] = useState(0);
  const paso = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.6 + i * 0.85, duration: 0.5, ease },
  });
  return (
    <div className="relative">
      <div key={vuelta} className="flex flex-col gap-3">
        <motion.div {...paso(0)} className="max-w-[88%] rounded-[18px] rounded-bl-md border border-[#2f4a39] bg-[#16231b] px-4 py-3.5 text-[15px] leading-relaxed text-[#e4f5ea]">
          {t(h.reporte)}
          <span className="num mt-1.5 block font-mono text-[11px] text-[#8fbb9c]">{t(h.quien)} · 18:02</span>
        </motion.div>
        <motion.div {...paso(1)} className="ml-auto max-w-[88%] rounded-[18px] rounded-br-md border border-borde bg-chip px-4 py-3.5 text-[15px] leading-relaxed">
          {t(h.respuesta)}
          <span className="num mt-1.5 block font-mono text-[11px] text-ac">{t(h.yo)} · 18:05</span>
        </motion.div>
        <motion.div {...paso(2)} className="rounded-2xl border border-borde bg-tarjeta px-4 py-3.5 font-mono text-[13px] leading-relaxed text-suave">
          <span className="text-[#7ee787]">feat(alimentos)</span>: {t(h.commit)}
          <span className="block text-tenue">{t(h.detalle)}</span>
        </motion.div>
        <motion.div {...paso(3)} className="flex items-center justify-between gap-3 rounded-2xl border border-borde bg-tarjeta px-4 py-3.5 font-mono text-[13px] text-suave">
          <span className="inline-flex items-center gap-1.5"><IcoPalomita size={15} className="text-[#7ee787]" /><span className="text-[#7ee787]">deploy</span> mi-brio.vercel.app</span>
          <span className="text-tenue">producción</span>
        </motion.div>
        <motion.p {...paso(4)} className="inline-flex items-center gap-2 self-center text-sm font-semibold text-ac">
          <IcoPalomita size={18} /> {t(h.publicado)}
        </motion.p>
      </div>
      <button onClick={() => setVuelta((v) => v + 1)} className="absolute -bottom-9 right-0 inline-flex items-center gap-1.5 text-xs text-tenue transition hover:text-ac">
        <IcoRepetir size={13} /> {t(h.otraVez)}
      </button>
    </div>
  );
}

export default function Hero() {
  const t = useT();
  return (
    <section className="relative pb-24 pt-28 md:pt-36">
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 text-sm text-suave">
            <span className="h-2 w-2 rounded-full bg-[#7ee787]" aria-hidden />
            {t(TEXTOS.hero.estado)}
          </motion.p>

          <h1 className="mt-6 max-w-[15ch] font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.045em]">
            <TextoDividido texto={t(TEXTOS.hero.linea1)} delay={0.15} />
            <TextoDividido texto={t(TEXTOS.hero.linea2)} delay={0.35} />
            <TextoDividido texto={t(TEXTOS.hero.linea3)} delay={0.55} className="text-ac" />
          </h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6, ease }} className="mt-7 max-w-xl text-lg leading-relaxed text-suave md:text-xl">
            {t(TEXTOS.hero.bajada)}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-8 flex items-center gap-4">
            <img src="/img/avatar.webp" alt={PERFIL.nombre} width={56} height={56} className="h-14 w-14 rounded-full border-2 border-ac object-cover" />
            <div>
              <p className="font-semibold">{PERFIL.nombreCompleto}</p>
              <p className="text-sm text-tenue">{PERFIL.alias} · {t(TEXTOS.hero.meta)}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.5 }} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#proyectos" className="group inline-flex items-center gap-2.5 rounded-xl bg-ac-fuerte px-7 py-4 text-base font-semibold text-white transition hover:brightness-110 active:scale-[0.97]">
              {t(TEXTOS.hero.verProyectos)} <IcoFlecha size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a href={PERFIL.cv} download className="group inline-flex items-center gap-2 py-2 text-[15px] font-semibold text-tx underline decoration-borde underline-offset-[6px] transition hover:decoration-ac">
              {t(TEXTOS.hero.cv)} <IcoDescargar size={16} className="transition group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <Historia />
      </div>
    </section>
  );
}
