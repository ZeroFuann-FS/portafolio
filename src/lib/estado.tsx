import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Idioma } from "../data/contenido";

export type Tema = "oscuro" | "claro";
interface Estado { idioma: Idioma; setIdioma: (i: Idioma) => void; tema: Tema; alternarTema: () => void }

const Ctx = createContext<Estado | null>(null);
const leer = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const guardar = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } };

export function Proveedor({ children }: { children: ReactNode }) {
  const [idioma, setI] = useState<Idioma>(() => (leer("zf:idioma") as Idioma) || (navigator.language.startsWith("es") ? "es" : "en"));
  const [tema, setTema] = useState<Tema>(() => (document.documentElement.dataset.tema as Tema) || "oscuro");

  useEffect(() => { document.documentElement.lang = idioma; }, [idioma]);
  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", tema === "oscuro" ? "#0b0a10" : "#f5f2ec");
  }, [tema]);

  const setIdioma = (i: Idioma) => { setI(i); guardar("zf:idioma", i); };
  const alternarTema = () => setTema((t) => { const n = t === "oscuro" ? "claro" : "oscuro"; guardar("zf:tema", n); return n; });
  return <Ctx.Provider value={{ idioma, setIdioma, tema, alternarTema }}>{children}</Ctx.Provider>;
}

export function useEstado() {
  const c = useContext(Ctx);
  if (!c) throw new Error("Falta <Proveedor>");
  return c;
}
/** Traduce un texto { es, en } al idioma actual. */
export function useT() {
  const { idioma } = useEstado();
  return (t: Record<Idioma, string>) => t[idioma];
}
