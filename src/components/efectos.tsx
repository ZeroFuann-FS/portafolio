/* Piezas de animación reutilizables. Todas respetan "reducir movimiento". */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Aparece al entrar en pantalla (sube y se desvanece). */
export function Revelar({ children, delay = 0, className = "", y = 18 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay, ease }}>
      {children}
    </motion.div>
  );
}

/** Texto que aparece palabra por palabra, desde abajo, como si saliera de una ranura. */
export function TextoDividido({ texto, className = "", delay = 0, cada = 0.06 }: { texto: string; className?: string; delay?: number; cada?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={texto}>
      {texto.split(" ").map((p, i) => (
        <span key={`${p}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span className="inline-block" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * cada, ease }}>
            {p}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Número que cuenta hasta su valor al aparecer. */
export function Contador({ valor, sufijo = "", sinAnimar = false }: { valor: number; sufijo?: string; sinAnimar?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(sinAnimar || reduce ? valor : 0);
  useEffect(() => {
    if (!visto || sinAnimar || reduce) return;
    const c = animate(0, valor, { duration: 1.6, ease, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [visto, valor, sinAnimar, reduce]);
  return <span ref={ref} className="num">{v}{sufijo}</span>;
}




/** Encabezado de sección: solo el título (los números "01, 02…" eran adorno). */
export function Encabezado({ titulo, sub }: { n?: string; titulo: string; sub?: string }) {
  return (
    <Revelar className="mb-12 md:mb-16">
      <h2 className="font-display text-4xl font-bold tracking-[-0.03em] md:text-6xl">{titulo}</h2>
      {sub && <p className="mt-4 max-w-2xl text-lg text-suave">{sub}</p>}
    </Revelar>
  );
}
