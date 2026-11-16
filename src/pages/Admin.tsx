/* Panel privado (/admin): aprobar reseñas y atender mensajes. Entra con tu cuenta de Brío; solo funciona para administradores. */
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "motion/react";
import { BotonTema } from "../components/Nav";
import { IcoCorreo, IcoWhatsApp } from "../components/iconos";

const sb = createClient(import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_ANON_KEY as string, {
  auth: { storageKey: "zf-admin", persistSession: true, detectSessionInUrl: true },
});

interface Resena { id: number; nombre: string; rol: string | null; mensaje: string; estrellas: number | null; aprobado: boolean; creado: string }
interface Mensaje { id: number; origen: "portafolio" | "servicios"; tipo: string | null; nombre: string; contacto: string; empresa: string | null; mensaje: string; atendido: boolean; creado: string }

const fecha = (s: string) => new Date(s).toLocaleString("es-MX", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const btn = "rounded-lg border border-borde px-3 py-1.5 font-mono text-xs text-suave transition hover:border-ac hover:text-tx disabled:opacity-40";
const esTelefono = (c: string) => /^[+\d\s()-]{8,}$/.test(c.trim());

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className={`rounded-full border px-3.5 py-1.5 text-sm transition ${on ? "border-ac bg-ac-fuerte text-white" : "border-borde text-suave hover:text-tx"}`}>{children}</button>;
}

function Estrellas({ n }: { n: number }) {
  return <span className="font-mono text-sm tracking-wider text-ac">{"★".repeat(n)}<span className="text-borde">{"★".repeat(5 - n)}</span></span>;
}

/* ---------- Entrar ---------- */
function Entrar() {
  const [correo, setCorreo] = useState("");
  const [aviso, setAviso] = useState("");
  const google = () => sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${location.origin}/admin` } });
  const enlace = async () => {
    const { error } = await sb.auth.signInWithOtp({ email: correo.trim(), options: { emailRedirectTo: `${location.origin}/admin`, shouldCreateUser: false } });
    setAviso(error ? "No se pudo enviar. Revisa el correo (debe ser el de tu cuenta de Brío)." : "Te mandé un enlace a tu correo. Ábrelo en este navegador.");
  };
  return (
    <div className="grid min-h-screen place-items-center px-5">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm rounded-[26px] border border-borde bg-tarjeta p-8">
        <p className="font-mono text-sm font-semibold">ZeroFuann<span className="text-ac">.</span> <span className="text-tenue">/ panel</span></p>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em]">Entrar</h1>
        <p className="mt-2 text-sm text-suave">Usa la misma cuenta que en Brío. Solo los administradores pueden ver el panel.</p>
        <button onClick={google} className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-borde bg-bg py-3.5 font-medium transition hover:border-ac">
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" /><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" /><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" /></svg>
          Continuar con Google
        </button>
        <div className="my-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-tenue"><span className="h-px flex-1 bg-borde" />o con tu correo<span className="h-px flex-1 bg-borde" /></div>
        <input className="w-full rounded-xl border border-borde bg-bg px-4 py-3 outline-none focus:border-ac" type="email" placeholder="tucorreo@gmail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        <button onClick={enlace} disabled={!correo.includes("@")} className="mt-3 w-full rounded-xl bg-ac-fuerte py-3.5 font-mono text-sm font-semibold text-white disabled:opacity-40">Enviarme un enlace</button>
        {aviso && <p className="mt-3 text-sm text-suave">{aviso}</p>}
        <a href="/" className="mt-6 block text-center font-mono text-xs text-tenue hover:text-ac">← Volver al portafolio</a>
      </motion.div>
    </div>
  );
}

/* ---------- Panel ---------- */
function Panel({ session }: { session: Session }) {
  const [tab, setTab] = useState<"resenas" | "mensajes">("mensajes");
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [filtroR, setFiltroR] = useState<"pendientes" | "aprobadas" | "todas">("pendientes");
  const [filtroM, setFiltroM] = useState<"sin" | "atendidos" | "todos">("sin");
  const [origen, setOrigen] = useState<"todos" | "portafolio" | "servicios">("todos");
  const [ocupado, setOcupado] = useState<number | null>(null);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    const [r, m] = await Promise.all([
      sb.from("portafolio_comentarios").select("*").order("creado", { ascending: false }),
      sb.from("portafolio_mensajes").select("*").order("creado", { ascending: false }),
    ]);
    if (r.error || m.error) setError("No se pudieron cargar los datos.");
    setResenas((r.data as Resena[]) ?? []);
    setMensajes((m.data as Mensaje[]) ?? []);
  }, []);
  useEffect(() => { cargar(); }, [cargar]);

  const cambiar = async (tabla: "portafolio_comentarios" | "portafolio_mensajes", id: number, datos: Record<string, boolean> | null) => {
    if (datos === null && !confirm("¿Borrar definitivamente?")) return;
    setOcupado(id);
    const q = datos === null ? sb.from(tabla).delete().eq("id", id) : sb.from(tabla).update(datos).eq("id", id);
    const { error: e } = await q;
    if (e) setError("No se pudo guardar el cambio."); else await cargar();
    setOcupado(null);
  };

  const pendientes = resenas.filter((r) => !r.aprobado).length;
  const aprobadas = resenas.filter((r) => r.aprobado);
  const promedio = aprobadas.filter((r) => r.estrellas).reduce((a, r, _, arr) => a + (r.estrellas ?? 0) / arr.length, 0);
  const sinAtender = mensajes.filter((m) => !m.atendido).length;

  const listaR = useMemo(() => resenas.filter((r) => filtroR === "todas" || (filtroR === "pendientes" ? !r.aprobado : r.aprobado)), [resenas, filtroR]);
  const listaM = useMemo(() => mensajes.filter((m) => (filtroM === "todos" || (filtroM === "sin" ? !m.atendido : m.atendido)) && (origen === "todos" || m.origen === origen)), [mensajes, filtroM, origen]);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 pt-8 md:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-sm font-semibold">ZeroFuann<span className="text-ac">.</span> <span className="text-tenue">/ panel</span></p>
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-xs text-tenue sm:inline">{session.user.email}</span>
          <a href="/" className={btn}>Ver sitio ↗</a>
          <button onClick={() => sb.auth.signOut()} className={btn}>Salir</button>
          <BotonTema />
        </div>
      </header>

      <h1 className="mt-10 font-display text-4xl font-bold tracking-[-0.03em]">Hola, Jose Juan<span className="font-serif font-normal italic text-ac">.</span></h1>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Mensajes sin atender", sinAtender, sinAtender > 0],
          ["Reseñas por aprobar", pendientes, pendientes > 0],
          ["Reseñas publicadas", aprobadas.length, false],
          ["Promedio", aprobadas.length ? promedio.toFixed(1) + " ★" : "—", false],
        ].map(([l, v, alerta]) => (
          <div key={l as string} className={`rounded-2xl border p-4 ${alerta ? "border-ac bg-chip" : "border-borde bg-tarjeta"}`}>
            <p className="font-serif text-4xl">{v as string}</p>
            <p className="mt-1 text-xs text-suave">{l as string}</p>
          </div>
        ))}
      </div>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-10 flex gap-6 border-b border-borde">
        {([["mensajes", `Mensajes (${mensajes.length})`], ["resenas", `Reseñas (${resenas.length})`]] as const).map(([id, l]) => (
          <button key={id} onClick={() => setTab(id)} className={`relative pb-3 font-display font-bold ${tab === id ? "text-tx" : "text-tenue hover:text-suave"}`}>
            {l}{tab === id && <motion.span layoutId="tab-admin" className="absolute inset-x-0 -bottom-px h-0.5 bg-ac" />}
          </button>
        ))}
      </div>

      {tab === "mensajes" ? (
        <>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip on={filtroM === "sin"} onClick={() => setFiltroM("sin")}>Sin atender</Chip>
            <Chip on={filtroM === "atendidos"} onClick={() => setFiltroM("atendidos")}>Atendidos</Chip>
            <Chip on={filtroM === "todos"} onClick={() => setFiltroM("todos")}>Todos</Chip>
            <span className="mx-2 w-px bg-borde" />
            <Chip on={origen === "todos"} onClick={() => setOrigen("todos")}>Todo origen</Chip>
            <Chip on={origen === "portafolio"} onClick={() => setOrigen("portafolio")}>Portafolio</Chip>
            <Chip on={origen === "servicios"} onClick={() => setOrigen("servicios")}>Servicios</Chip>
          </div>
          <div className="mt-6 space-y-4">
            <AnimatePresence initial={false}>
              {listaM.map((m) => (
                <motion.article layout key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                  className={`rounded-[22px] border p-6 ${m.atendido ? "border-borde bg-tarjeta/50" : "border-borde bg-tarjeta"}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    {!m.atendido && <span className="h-2 w-2 rounded-full bg-ac" />}
                    <span className="rounded-full bg-chip px-2.5 py-0.5 font-mono text-[11px] text-ac">{m.origen === "servicios" ? "Cotización" : "Portafolio"}</span>
                    {m.tipo && <span className="rounded-full border border-borde px-2.5 py-0.5 font-mono text-[11px] text-suave">{m.tipo}</span>}
                    <span className="ml-auto font-mono text-xs text-tenue">{fecha(m.creado)}</span>
                  </div>
                  <p className="mt-3 font-display text-xl font-bold">{m.nombre}{m.empresa && <span className="font-serif font-normal italic text-suave"> · {m.empresa}</span>}</p>
                  <p className="font-mono text-sm text-suave">{m.contacto}</p>
                  <p className="mt-4 whitespace-pre-wrap leading-relaxed">{m.mensaje}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {esTelefono(m.contacto)
                      ? <a className={`${btn} inline-flex items-center gap-1.5`} href={`https://wa.me/${m.contacto.replace(/\D/g, "").replace(/^(?!52)(\d{10})$/, "52$1")}`} target="_blank" rel="noreferrer"><IcoWhatsApp size={14} /> Responder por WhatsApp</a>
                      : <a className={`${btn} inline-flex items-center gap-1.5`} href={`mailto:${m.contacto}?subject=${encodeURIComponent("Re: tu mensaje en mi portafolio")}`}><IcoCorreo size={14} /> Responder por correo</a>}
                    <button disabled={ocupado === m.id} className={btn} onClick={() => cambiar("portafolio_mensajes", m.id, { atendido: !m.atendido })}>{m.atendido ? "Marcar sin atender" : "✓ Marcar atendido"}</button>
                    <button disabled={ocupado === m.id} className={`${btn} hover:!border-red-400 hover:!text-red-400`} onClick={() => cambiar("portafolio_mensajes", m.id, null)}>Borrar</button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
            {!listaM.length && <p className="rounded-[22px] border border-dashed border-borde p-10 text-center text-suave">No hay mensajes aquí.</p>}
          </div>
        </>
      ) : (
        <>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip on={filtroR === "pendientes"} onClick={() => setFiltroR("pendientes")}>Por aprobar</Chip>
            <Chip on={filtroR === "aprobadas"} onClick={() => setFiltroR("aprobadas")}>Publicadas</Chip>
            <Chip on={filtroR === "todas"} onClick={() => setFiltroR("todas")}>Todas</Chip>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <AnimatePresence initial={false}>
              {listaR.map((r) => (
                <motion.article layout key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex flex-col rounded-[22px] border p-6 ${r.aprobado ? "border-borde bg-tarjeta" : "border-ac/60 bg-tarjeta"}`}>
                  <div className="flex items-center justify-between">
                    {r.estrellas ? <Estrellas n={r.estrellas} /> : <span />}
                    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] ${r.aprobado ? "bg-chip text-ac" : "border border-ac/50 text-ac"}`}>{r.aprobado ? "Publicada" : "Por aprobar"}</span>
                  </div>
                  <p className="mt-3 flex-1 font-serif text-lg italic leading-snug">“{r.mensaje}”</p>
                  <p className="mt-3 text-sm font-medium">{r.nombre}<span className="font-mono text-xs text-tenue">{r.rol ? ` · ${r.rol}` : ""} · {fecha(r.creado)}</span></p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button disabled={ocupado === r.id} className={r.aprobado ? btn : "rounded-lg bg-ac-fuerte px-3 py-1.5 font-mono text-xs font-semibold text-white"} onClick={() => cambiar("portafolio_comentarios", r.id, { aprobado: !r.aprobado })}>{r.aprobado ? "Ocultar" : "✓ Aprobar"}</button>
                    <button disabled={ocupado === r.id} className={`${btn} hover:!border-red-400 hover:!text-red-400`} onClick={() => cambiar("portafolio_comentarios", r.id, null)}>Borrar</button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
            {!listaR.length && <p className="rounded-[22px] border border-dashed border-borde p-10 text-center text-suave md:col-span-2">No hay reseñas aquí.</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [admin, setAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    document.title = "Panel · ZeroFuann";
    const meta = document.createElement("meta"); meta.name = "robots"; meta.content = "noindex, nofollow"; document.head.appendChild(meta);
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!session) { setAdmin(null); return; }
    sb.rpc("es_admin").then(({ data, error }) => setAdmin(!error && data === true));
  }, [session]);

  if (session === undefined || (session && admin === null)) return <div className="grid min-h-screen place-items-center font-mono text-sm text-tenue">Cargando…</div>;
  if (!session) return <Entrar />;
  if (!admin) return (
    <div className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <p className="font-display text-2xl font-bold">Sin acceso</p>
        <p className="mt-2 text-suave">La cuenta {session.user.email} no es administradora.</p>
        <button onClick={() => sb.auth.signOut()} className={`${btn} mt-5`}>Salir</button>
      </div>
    </div>
  );
  return <Panel session={session} />;
}
