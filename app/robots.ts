import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Bloquear páginas de admin o internas si las hubiera
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    // Información de contacto para webmasters
    host: siteConfig.url,
  };
}