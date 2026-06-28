import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { categories, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog", "/sobre-nosotros", "/recursos", "/contacto"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date()
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteConfig.url}/categorias/${category.slug}`,
    lastModified: new Date()
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date)
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
