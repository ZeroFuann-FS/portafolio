// Tema antes de pintar (evita el parpadeo). Va en archivo aparte para que la política de seguridad no permita scripts en línea.
try {
  var t = localStorage.getItem("zf:tema");
  if (!t) t = matchMedia("(prefers-color-scheme: light)").matches ? "claro" : "oscuro";
  document.documentElement.dataset.tema = t;
} catch (e) { document.documentElement.dataset.tema = "oscuro"; }
