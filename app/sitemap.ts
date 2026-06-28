import type { MetadataRoute } from "next";
import { getIndexablePosts } from "@/lib/posts";
import { categories, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/categorias",
    "/sobre-nosotros",
    "/recursos",
    "/guia-oracion",
    "/newsletter",
    "/contacto",
    "/privacidad",
    "/terminos",
    "/afiliados",
    "/cookies"
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date()
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteConfig.url}/categorias/${category.slug}`,
    lastModified: new Date()
  }));

  const postRoutes = getIndexablePosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date)
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
