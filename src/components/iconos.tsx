/* Logos de marcas para los enlaces de contacto (trazos de Simple Icons, CC0). */
type P = { className?: string; size?: number };

export const IcoGitHub = ({ className, size = 24 }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
);

export const IcoLinkedIn = ({ className, size = 24 }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export const IcoWhatsApp = ({ className, size = 24 }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .3-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.4.3.2.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" />
  </svg>
);

export const IcoCorreo = ({ className, size = 24 }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
);

export const IcoEnviar = ({ className, size = 18 }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
  </svg>
);

/* Íconos de interfaz: mismo trazo (1.8), mismas puntas redondas, alineados al texto. */
const Trazo = ({ className, size = 16, d }: P & { d: string }) => (
  <svg className={`inline-block shrink-0 ${className ?? ""}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);
export const IcoFlecha = (p: P) => <Trazo {...p} d="M5 12h14M13 6l6 6-6 6" />;
export const IcoExterno = (p: P) => <Trazo {...p} d="M7 17 17 7M8 7h9v9" />;
export const IcoDescargar = (p: P) => <Trazo {...p} d="M12 4v12M6 10l6 6 6-6M5 20h14" />;
export const IcoArriba = (p: P) => <Trazo {...p} d="M12 20V6M6 12l6-6 6 6" />;
export const IcoPalomita = (p: P) => <Trazo {...p} d="m5 12.5 4.5 4.5L19 7.5" />;
export const IcoRepetir = (p: P) => <Trazo {...p} d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4.5h-4.5" />;
export const IcoMas = (p: P) => <Trazo {...p} d="M12 5v14M5 12h14" />;
export const IcoCopiar = (p: P) => <Trazo {...p} d="M9 9h10v10H9zM5 15V5h10" />;
