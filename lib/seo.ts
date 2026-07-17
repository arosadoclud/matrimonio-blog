import { siteConfig } from "./site";

export function ensureMetaDescription(description: string, maxLength = 160): string {
  const normalized = description.trim().replace(/\s+/g, " ");

  if (!normalized) {
    return `Contenido cristiano para restaurar tu matrimonio con esperanza, oración y orientación bíblica.`;
  }

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

// Google trunca el <title> en el SERP alrededor de ~60 caracteres. Muchos
// títulos de artículo en español ya son largos y descriptivos por sí
// solos; agregarles siempre " | Restaura Tu Matrimonio" los empuja fuera
// de ese límite. Solo se agrega el sufijo de marca cuando el resultado
// completo sigue siendo razonable; si no, se deja el título del artículo
// solo (la marca igual aparece en la URL y el favicon del SERP).
export function buildPageTitle(pageTitle: string, maxLength = 70): string {
  const withSuffix = `${pageTitle} | ${siteConfig.name}`;
  return withSuffix.length <= maxLength ? withSuffix : pageTitle;
}

export function buildCanonicalUrl(pathname: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, siteConfig.url).toString();
}
