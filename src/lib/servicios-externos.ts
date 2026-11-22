/**
 * Conexiones externas, sin librerías:
 * - Libro de visitas: tabla `portafolio_comentarios` en Supabase (proyecto de Brío). La llave anon es pública;
 *   la seguridad está en las políticas RLS (solo se leen los aprobados y solo se insertan sin aprobar).
 * - Formularios de contacto: FormSubmit, que reenvía al correo profesional.
 */
import { PERFIL } from "../data/contenido";

const URL_SB = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const LLAVE = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const cab = () => ({ apikey: LLAVE ?? "", Authorization: `Bearer ${LLAVE ?? ""}`, "Content-Type": "application/json" });

export interface Comentario { id: number; nombre: string; rol: string | null; mensaje: string; estrellas: number | null; creado: string }

export async function leerComentarios(): Promise<Comentario[]> {
  if (!URL_SB || !LLAVE) return [];
  const r = await fetch(`${URL_SB}/rest/v1/portafolio_comentarios?select=id,nombre,rol,mensaje,estrellas,creado&order=creado.desc&limit=30`, { headers: cab() });
  if (!r.ok) throw new Error("No se pudieron leer");
  return r.json();
}

export async function enviarComentario(c: { nombre: string; rol?: string; mensaje: string; estrellas?: number }) {
  if (!URL_SB || !LLAVE) throw new Error("Sin configuración");
  const r = await fetch(`${URL_SB}/rest/v1/portafolio_comentarios`, {
    method: "POST", headers: { ...cab(), Prefer: "return=minimal" },
    body: JSON.stringify({ nombre: c.nombre.trim().slice(0, 60), rol: c.rol?.trim().slice(0, 60) || null, mensaje: c.mensaje.trim().slice(0, 500), estrellas: c.estrellas || null }),
  });
  if (!r.ok) throw new Error("No se pudo enviar");
}

/** Envía un formulario al correo profesional. La primera vez FormSubmit manda un correo para activar el formulario. */
export async function enviarCorreo(datos: Record<string, string>, asunto: string) {
  const r = await fetch(`https://formsubmit.co/ajax/${PERFIL.correo}`, {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
    // _honey: campo trampa que FormSubmit revisa en su servidor (los bots que mandan directo lo llenan y se descartan)
    body: JSON.stringify({ ...datos, _subject: asunto, _template: "table", _captcha: "false", _honey: "" }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.success === "false") throw new Error("No se pudo enviar");
}

/** Guarda el mensaje en Supabase (tabla portafolio_mensajes, solo inserción). */
export async function guardarMensaje(m: { origen: "portafolio" | "servicios"; tipo?: string; nombre: string; contacto: string; empresa?: string; mensaje: string }) {
  if (!URL_SB || !LLAVE) throw new Error("Sin configuración");
  const r = await fetch(`${URL_SB}/rest/v1/portafolio_mensajes`, {
    method: "POST", headers: { ...cab(), Prefer: "return=minimal" },
    body: JSON.stringify({ origen: m.origen, tipo: m.tipo?.slice(0, 40) || null, nombre: m.nombre.trim().slice(0, 80), contacto: m.contacto.trim().slice(0, 120), empresa: m.empresa?.trim().slice(0, 80) || null, mensaje: m.mensaje.trim().slice(0, 2000) }),
  });
  if (!r.ok) throw new Error("No se pudo guardar");
}

/** Envía por los dos caminos (base de datos y correo); basta con que uno funcione. */
export async function enviarMensaje(m: Parameters<typeof guardarMensaje>[0], asunto: string) {
  const [a, b] = await Promise.allSettled([
    guardarMensaje(m),
    enviarCorreo({ origen: m.origen, tipo: m.tipo ?? "", nombre: m.nombre, contacto: m.contacto, empresa: m.empresa ?? "", mensaje: m.mensaje }, asunto),
  ]);
  if (a.status === "rejected" && b.status === "rejected") throw new Error("No se pudo enviar");
}

export const enlaceWhatsApp = (texto: string) => `https://wa.me/${PERFIL.whatsapp}?text=${encodeURIComponent(texto)}`;
