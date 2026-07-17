import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Bloquear páginas de admin o internas si las hubiera. "/_next/" NO se
      // bloquea: incluye "/_next/image" (el endpoint que sirve las imágenes
      // optimizadas de next/image) y los bundles de JS/CSS que Googlebot
      // necesita para renderizar la página -- bloquearlo impide indexar
      // imágenes y puede degradar el rendering de Google (recomendación
      // oficial de Google: no bloquear CSS/JS/recursos de renderizado).
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    // Información de contacto para webmasters
    host: siteConfig.url,
  };
}