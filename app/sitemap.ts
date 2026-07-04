import type { MetadataRoute } from "next";
import { getAllPosts, getIndexablePosts } from "@/lib/posts";
import { categories, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts();
  const indexablePosts = getIndexablePosts();
  const now = new Date();

  // Páginas estáticas principales con prioridades
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/categorias`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/recursos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/sobre-nosotros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/newsletter`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/guia-oracion`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Páginas de categorías
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/categorias/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  // Páginas de blog posts - con prioridad diferenciada según indexabilidad
  const blogPostPages: MetadataRoute.Sitemap = allPosts.map((post) => {
    const isIndexable = indexablePosts.some((p) => p.slug === post.slug);
    return {
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      // Posts indexables tienen mayor prioridad (SEO)
      priority: isIndexable ? 0.8 : 0.5,
    };
  });

  // Páginas legales (baja prioridad, rara vez cambian)
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terminos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/afiliados`,
      lastModified: now,
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