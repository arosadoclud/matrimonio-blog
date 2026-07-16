import type { MetadataRoute } from "next";
import { getIndexablePosts, getPostsByCategory } from "@/lib/posts";
import { categories, siteConfig } from "@/lib/site";

// No usamos `lastModified` en páginas sin fecha real de actualización: colocar la fecha
// del build en todas las URLs es información falsa para los crawlers (ver docs/seo-audit.md).
export default function sitemap(): MetadataRoute.Sitemap {
  const indexablePosts = getIndexablePosts();

  // Páginas estáticas principales con prioridades
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/categorias`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/recursos`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/sobre-nosotros`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contacto`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/newsletter`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/guia-oracion`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Páginas de categorías: excluye categorías sin artículos publicados (contenido
  // insuficiente => noindex, ver app/categorias/[slug]/page.tsx).
  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((category) => getPostsByCategory(category.slug).length > 0)
    .map((category) => ({
      url: `${siteConfig.url}/categorias/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

  // Páginas de blog posts: solo posts indexables (>= 300 palabras). Los posts delgados
  // llevan noindex,follow (ver app/blog/[slug]/page.tsx) y no deben estar en el sitemap.
  const blogPostPages: MetadataRoute.Sitemap = indexablePosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: post.contentType === "pillar" ? 0.9 : 0.8,
  }));

  // Páginas legales (baja prioridad, rara vez cambian)
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/privacidad`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terminos`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/cookies`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/afiliados`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  return [
    ...staticPages,
    ...categoryPages,
    ...blogPostPages,
    ...legalPages,
  ];
}