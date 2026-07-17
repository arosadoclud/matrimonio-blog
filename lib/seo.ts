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
// de ese límite. Se intenta primero el sufijo de marca completo; si no
// cabe, un sufijo corto ("RTM", ya usado internamente como abreviación,
// ver lib/analytics.ts) para que el <title> siga siendo distinto del
// <h1> de la página (evita el warning "duplicate H1 and title tags");
// solo si ni eso cabe, se deja el título del artículo solo.
export function buildPageTitle(pageTitle: string, maxLength = 73): string {
  const withFullSuffix = `${pageTitle} | ${siteConfig.name}`;
  if (withFullSuffix.length <= maxLength) {
    return withFullSuffix;
  }

  const withShortSuffix = `${pageTitle} | RTM`;
  if (withShortSuffix.length <= maxLength) {
    return withShortSuffix;
  }

  return pageTitle;
}

export function buildCanonicalUrl(pathname: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, siteConfig.url).toString();
}
