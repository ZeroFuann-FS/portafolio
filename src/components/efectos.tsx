/* Piezas de animación reutilizables. Todas respetan "reducir movimiento". */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Aparece al entrar en pantalla (sube y se desvanece). */
export function Revelar({ children, delay = 0, className = "", y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay, ease }}>
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
  return <span ref={ref}>{v}{sufijo}</span>;
}

/** Botón o enlace que se acerca un poco al cursor. */
export function Magnetico({ children, className = "", fuerza = 0.3 }: { children: ReactNode; className?: string; fuerza?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16 }), y = useSpring(0, { stiffness: 220, damping: 16 });
  const reduce = useReducedMotion();
  return (
    <motion.div ref={ref} className={`inline-block ${className}`} style={{ x, y }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * fuerza); y.set((e.clientY - r.top - r.height / 2) * fuerza);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

/** Tarjeta que se inclina en 3D siguiendo el cursor. */
export function Inclinar({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 160, damping: 18 });
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}>
      {children}
    </motion.div>
  );
}

/** Brillo morado que sigue al cursor por toda la página. */
export function BrilloCursor() {
  const x = useSpring(-500, { stiffness: 90, damping: 20 }), y = useSpring(-500, { stiffness: 90, damping: 20 });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || matchMedia("(pointer: coarse)").matches) return;
    const m = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    addEventListener("pointermove", m);
    return () => removeEventListener("pointermove", m);
  }, [reduce, x, y]);
  if (reduce) return null;
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] rounded-full"
      style={{ x, y, translateX: "-50%", translateY: "-50%", background: "radial-gradient(circle, var(--brillo), transparent 65%)" }} />
  );
}

/** Encabezado de sección con número y línea. */
export function Encabezado({ n, titulo, sub }: { n: string; titulo: string; sub?: string }) {
  return (
    <Revelar className="mb-12 md:mb-16">
      <div className="flex items-center gap-4">
        <span className="lab">{n}</span>
        <span className="h-px flex-1 bg-borde" />
      </div>
      <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.03em] md:text-6xl">{titulo}</h2>
      {sub && <p className="mt-4 max-w-2xl text-lg text-suave">{sub}</p>}
    </Revelar>
  );
}
