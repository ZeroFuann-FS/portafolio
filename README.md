<div align="center">

# ZeroFuann<sub>.</sub>

**Escucho el problema. Construyo la solución. La llevo a producción.**

Portafolio de **Jose Juan Juarez Martinez**, desarrollador full stack enfocado en productos con IA.

[**Ver el portafolio**](https://zerofuann.vercel.app) · [Servicios para clientes](https://zerofuann.vercel.app/servicios) · [LinkedIn](https://www.linkedin.com/in/josejuanjuarezmartinez)

![React](https://img.shields.io/badge/React-19-8b5cf6?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-8b5cf6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-8b5cf6?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-RLS-8b5cf6?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-en_línea-8b5cf6?logo=vercel&logoColor=white)

<img src="docs/img/demo-inicio.gif" width="820" alt="Inicio del portafolio: un usuario reporta un problema y se publica la solución el mismo día" />

</div>

El inicio cuenta un caso real: una usuaria de [Brío](https://github.com/ZeroFuann-FS/brio) reporta que no puede registrar empanadas de queso, lo reviso, hago el commit y queda publicado el mismo día. Esa es la forma en que me gusta trabajar, cerca de quien usa el software.

## Qué tiene

- **Portafolio** (`/`) en español e inglés, con modo claro y oscuro: proyectos como casos de estudio (problema → solución), stack con niveles honestos, línea de tiempo, experiencia y certificaciones verificables.
- **Página para clientes** (`/servicios`): servicios, trabajos reales, proceso, preguntas frecuentes y cotización por WhatsApp o formulario.
- **Libro de visitas con estrellas:** cualquiera deja una reseña; solo se publican las que apruebo.
- **Panel privado** (`/admin`): aprobar reseñas y atender mensajes y cotizaciones, con inicio de sesión de Supabase.
- **Animaciones:** texto que aparece por palabras, secciones que se revelan al bajar, botones magnéticos, tarjetas con efecto 3D y desplazamiento suave. Respetan "reducir movimiento".

## Capturas

| Modo oscuro | Modo claro |
|---|---|
| <img src="docs/img/inicio-oscuro.webp" alt="Inicio en modo oscuro" /> | <img src="docs/img/inicio-claro.webp" alt="Inicio en modo claro" /> |

| Sobre mí | Mi camino |
|---|---|
| <img src="docs/img/sobre-mi.webp" alt="Sección Sobre mí" /> | <img src="docs/img/linea-tiempo.webp" alt="Línea de tiempo" /> |

| Proyectos | Stack |
|---|---|
| <img src="docs/img/proyectos.webp" alt="Proyectos como casos de estudio" /> | <img src="docs/img/stack.webp" alt="Stack por categorías y niveles" /> |

| Servicios | Contacto |
|---|---|
| <img src="docs/img/servicios.webp" alt="Página de servicios" /> | <img src="docs/img/contacto.webp" alt="Contacto con formulario" /> |

<p align="center">
  <img src="docs/img/celular-inicio.webp" width="24%" alt="Inicio en celular" />
  <img src="docs/img/celular-stack.webp" width="24%" alt="Stack en celular" />
  <img src="docs/img/celular-servicios.webp" width="24%" alt="Servicios en celular, modo claro" />
</p>

## Tecnología

**React 19 · TypeScript · Vite · Tailwind CSS 4 · Motion · Lenis · Supabase (Postgres + RLS, Auth) · Vercel**

```mermaid
flowchart LR
  V[Visitante] --> S[Sitio React<br/>Vercel]
  S -->|lee reseñas aprobadas| DB[(Supabase Postgres<br/>RLS)]
  S -->|reseñas y mensajes<br/>solo inserción| DB
  S -->|copia al correo| FS[FormSubmit]
  A[Panel /admin] -->|login + es_admin| DB
```

## Decisiones técnicas

- **Seguridad en la base de datos:** los visitantes solo pueden insertar (las reseñas llegan sin aprobar) y leer lo aprobado; aprobar, leer mensajes o borrar exige ser administrador, verificado en Postgres con RLS.
- **Ningún mensaje se pierde:** cada formulario se guarda en Supabase y además se envía por correo; basta con que uno de los dos funcione.
- **Datos personales fuera del repo:** el número de WhatsApp y las llaves viven en variables de entorno de Vercel; las fotos se publican recortadas y sin metadatos.
- **Contenido separado del código:** todos los textos (ES/EN), proyectos y stack están en [`src/data/contenido.ts`](src/data/contenido.ts).
- **Carga ligera:** el panel privado se descarga solo si alguien entra a `/admin`.

## Correr en local

```bash
npm install
cp .env.example .env.local   # llaves de Supabase y número de WhatsApp
npm run dev
```

## Licencia

© 2026 Jose Juan Juarez Martinez (ZeroFuann). Todos los derechos reservados: el código se publica solo para consulta. Ver [LICENSE](LICENSE).
