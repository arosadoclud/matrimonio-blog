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

export function buildCanonicalUrl(pathname: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, siteConfig.url).toString();
}
