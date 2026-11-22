import { StrictMode, Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "motion/react";
import "./index.css";
import { Proveedor } from "./lib/estado";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
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

function App() {
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
      <div className="relative">
        <Nav servicios={esServicios} />
        <main>
          {esServicios ? <Suspense fallback={<div className="min-h-screen" />}><Servicios /></Suspense> : (
            <>
              <Hero />
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
