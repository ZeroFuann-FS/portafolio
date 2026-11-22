/*
 * Intro del logo: la «Z.» cae, se extiende hasta leer «ZeroFuann.», se compacta otra vez en «Z.»
 * y vuela a su lugar en el menú. Una vez por visita; se salta con un toque o una tecla;
 * no sale con "reducir movimiento". Clic en el logo del menú la repite.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAnimate } from "motion/react";

const CLAVE = "zf:intro-vista";
const TAM = 96;                 // lado del cuadro, en px
const RADIO = TAM * (15 / 64);  // mismo radio que el favicon
const PALABRA = "eroFuann";
const ease = [0.22, 1, 0.36, 1] as const;

/** ¿Ya terminó la intro? (el inicio espera a que termine para animar su titular) */
export function useIntroLista() {
  const [lista, setLista] = useState(() => !document.documentElement.hasAttribute("data-intro"));
  useEffect(() => {
    const fin = () => setLista(true);
    const inicio = () => setLista(false);
    addEventListener("zf:intro-fin", fin);
    addEventListener("zf:intro-inicio", inicio);
    return () => { removeEventListener("zf:intro-fin", fin); removeEventListener("zf:intro-inicio", inicio); };
  }, []);
  return lista;
}

/** Se llama antes de pintar: decide si toca intro en esta visita. */
export function debeMostrarIntro() {
  if (location.pathname !== "/") return false;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try { return !sessionStorage.getItem(CLAVE); } catch { return false; }
}

export function repetirIntro() {
  scrollTo({ top: 0 });
  dispatchEvent(new Event("zf:intro-repetir"));
}

export default function Intro({ inicial }: { inicial: boolean }) {
  const [activa, setActiva] = useState(inicial);
  const [vuelta, setVuelta] = useState(0);

  useEffect(() => {
    const otra = () => { setVuelta((v) => v + 1); setActiva(true); };
    addEventListener("zf:intro-repetir", otra);
    return () => removeEventListener("zf:intro-repetir", otra);
  }, []);

  useLayoutEffect(() => {
    if (!activa) return;
    document.documentElement.setAttribute("data-intro", "");
    document.body.style.overflow = "hidden";
    dispatchEvent(new Event("zf:intro-inicio"));
  }, [activa, vuelta]);

  const terminar = () => {
    try { sessionStorage.setItem(CLAVE, "1"); } catch { /* sin almacenamiento */ }
    document.documentElement.removeAttribute("data-intro");
    document.body.style.overflow = "";
    dispatchEvent(new Event("zf:intro-fin"));
    setActiva(false);
  };

  return activa ? <Escena key={vuelta} onFin={terminar} /> : null;
}

function Escena({ onFin }: { onFin: () => void }) {
  const [scope, animate] = useAnimate();
  const texto = useRef<HTMLSpanElement>(null);
  const fin = useRef(false);
  const terminarUnaVez = () => { if (!fin.current) { fin.current = true; onFin(); } };

  useEffect(() => {
    let cancelado = false;
    const saltar = () => terminarUnaVez();
    addEventListener("keydown", saltar);

    (async () => {
      await document.fonts.ready;                       // medir la palabra con la fuente real
      if (cancelado) return;
      const escala = Math.min(1.35, (innerWidth - 32) / 560);
      const anchoTexto = texto.current?.offsetWidth ?? 380;
      const inicioTexto = TAM * 0.74;                   // la palabra empieza justo después de la Z
      const ancho = inicioTexto + anchoTexto + TAM * 0.42;
      const xPunto = inicioTexto + anchoTexto + TAM * 0.06 - TAM * (51.5 / 64) + TAM * (4.5 / 64);

      // El grupo (escala, centrado y vuelo final) va con la API de animaciones del navegador
      const grupo = (scope.current as HTMLElement).querySelector<HTMLElement>("[data-grupo]")!;
      const mover = (x: number, y: number, s: number, ms: number, easing = "cubic-bezier(.22,1,.36,1)") =>
        grupo.animate([{ transform: grupo.style.transform || `scale(${escala})` }, { transform: `translate(${x}px, ${y}px) scale(${s})` }], { duration: ms, easing, fill: "forwards" })
          .finished.then(() => { grupo.style.transform = `translate(${x}px, ${y}px) scale(${s})`; });
      grupo.style.transform = `scale(${escala})`;
      const centro = -((ancho - TAM) / 2) * escala;   // al extenderse, el letrero queda centrado
      // 1 · cae y rebota (con un pequeño aplastón al tocar)
      await animate("[data-cuadro]", { y: ["-70vh", "0vh"], rotate: [-14, 0], opacity: [0, 1] }, { type: "spring", stiffness: 230, damping: 17, mass: 1 });
      if (cancelado) return;
      await animate("[data-cuadro]", { scaleY: [1, 0.86, 1.04, 1], scaleX: [1, 1.1, 0.98, 1] }, { duration: 0.32, ease: "easeOut" });
      // 2 · se extiende: el cuadro se alarga, salen las letras y el punto viaja al final
      animate("[data-cuadro]", { width: ancho }, { duration: 0.65, ease });
      mover(centro, 0, escala, 650);
      animate("[data-punto]", { x: xPunto }, { duration: 0.65, ease });
      await animate("[data-letra]", { y: ["60%", "0%"], opacity: [0, 1] }, { duration: 0.38, delay: (i) => 0.1 + i * 0.04, ease });
      if (cancelado) return;
      await animate("[data-punto]", { scale: [1, 1.5, 1] }, { duration: 0.3 });
      await new Promise((r) => setTimeout(r, 450));
      if (cancelado) return;
      // 3 · se compacta: las letras se recogen hacia la Z y el punto regresa
      animate("[data-letra]", { x: -28, opacity: 0 }, { duration: 0.32, delay: (i) => (PALABRA.length - 1 - i) * 0.035, ease: "easeIn" });
      animate("[data-punto]", { x: 0 }, { duration: 0.55, delay: 0.12, ease });
      setTimeout(() => mover(0, 0, escala, 550), 120);
      await animate("[data-cuadro]", { width: TAM }, { duration: 0.55, delay: 0.12, ease });
      if (cancelado) return;
      await animate("[data-z]", { rotate: [0, -8, 0] }, { duration: 0.28 });
      // 4 · vuela a su lugar en el menú
      const destino = document.querySelector("[data-marca]")?.getBoundingClientRect();
      const origen = (scope.current as HTMLElement).querySelector("[data-cuadro]")!.getBoundingClientRect();
      if (destino) {
        animate(scope.current, { backgroundColor: "rgba(0,0,0,0)" }, { duration: 0.5 });
        await mover(
          destino.left + destino.width / 2 - (origen.left + origen.width / 2),
          destino.top + destino.height / 2 - (origen.top + origen.height / 2),
          destino.width / TAM, 650, "cubic-bezier(.65,0,.35,1)",
        );
      }
      if (!cancelado) terminarUnaVez();
    })();

    return () => { cancelado = true; removeEventListener("keydown", saltar); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={scope} onClick={terminarUnaVez} role="presentation" aria-hidden
      className="fixed inset-0 z-[90] grid cursor-pointer place-items-center bg-bg">
      <div data-grupo className="relative" style={{ width: TAM, height: TAM }}>
        <div data-cuadro className="absolute left-0 top-0 overflow-hidden border border-borde bg-[#0b0a10] opacity-0"
          style={{ width: TAM, height: TAM, borderRadius: RADIO, transformOrigin: "50% 100%" }}>
          {/* La Z (misma forma que el favicon) */}
          <svg data-z width={TAM} height={TAM} viewBox="0 0 64 64" className="absolute left-0 top-0">
            <path d="M15 15h24.5a5.5 5.5 0 0 1 4.4 8.8L27.5 41H44v8H15v-5.5L32.7 23H15z" fill="#f1eff8" />
          </svg>
          {/* «eroFuann»: alineada a la base de la Z */}
          <span ref={texto} className="absolute flex whitespace-nowrap font-display font-extrabold leading-none tracking-[-0.04em] text-[#f1eff8]"
            style={{ left: TAM * 0.74, bottom: TAM * (15 / 64) - TAM * 0.02, fontSize: TAM * 0.62 }}>
            {PALABRA.split("").map((l, i) => <span key={i} data-letra className="inline-block opacity-0">{l}</span>)}
          </span>
          {/* El punto morado */}
          <span data-punto className="absolute rounded-full bg-[#a78bfa]"
            style={{ width: TAM * (9 / 64), height: TAM * (9 / 64), left: TAM * (47 / 64), top: TAM * (40.5 / 64) }} />
        </div>
      </div>
      <span className="absolute bottom-8 text-xs text-tenue">Toca para saltar</span>
    </div>
  );
}
