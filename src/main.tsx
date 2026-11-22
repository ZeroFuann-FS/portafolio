import { StrictMode, Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "motion/react";
import "./index.css";
import { Proveedor } from "./lib/estado";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Intro, { debeMostrarIntro, useIntroLista } from "./components/Intro";
import { Numeros, Proyectos, SobreMi } from "./components/Secciones";
import Stack from "./components/Stack";
import { ConIA, Contacto, Experiencia, LibroVisitas, Pie } from "./components/Final";

// El panel solo se descarga si alguien entra a /admin
const Admin = lazy(() => import("./pages/Admin"));
// Servicios también va aparte: el inicio no la necesita
const Servicios = lazy(() => import("./pages/Servicios"));

function DesplazamientoSuave() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -70 } });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return null;
}

/** Barra de progreso de lectura arriba de la página. */
function Progreso() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-ac" style={{ scaleX: x }} />;
}

// Se decide antes del primer pintado para que no se vea la página un instante antes de la intro
const CON_INTRO = debeMostrarIntro();
if (CON_INTRO) document.documentElement.setAttribute("data-intro", "");

function App() {
  const introLista = useIntroLista();
  const esServicios = location.pathname.startsWith("/servicios");
  if (location.pathname.startsWith("/admin")) return (
    <Proveedor>
      <Suspense fallback={<div className="grid min-h-screen place-items-center font-mono text-sm text-tenue">Cargando…</div>}><Admin /></Suspense>
    </Proveedor>
  );
  return (
    <Proveedor>
      <DesplazamientoSuave />
      <Progreso />
      {!esServicios && <Intro inicial={CON_INTRO} />}
      <div className="relative">
        <Nav servicios={esServicios} />
        <main>
          {esServicios ? <Suspense fallback={<div className="min-h-screen" />}><Servicios /></Suspense> : (
            <>
              {introLista ? <Hero /> : <div className="min-h-[100svh]" />}
              <Numeros />
              <SobreMi />
              <Proyectos />
              <Stack />
              <ConIA />
              <Experiencia />
              <LibroVisitas />
              <Contacto />
            </>
          )}
        </main>
        <Pie />
      </div>
    </Proveedor>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
