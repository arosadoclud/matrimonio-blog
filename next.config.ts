import type { NextConfig } from "next";
import { siteConfig } from "./lib/site";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.googletagmanager.com https://connect.facebook.net https://www.facebook.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://images.unsplash.com https://*.unsplash.com https://images.pexels.com https://images.rawpixel.com https://pub-c35e24e567e64e278b36c6857a95ec25.r2.dev https://www.facebook.com https://www.google-analytics.com blob:",
      "connect-src 'self' https://*.googlesyndication.com https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://www.facebook.com https://connect.facebook.net",
      "frame-src 'self' https://pagead2.googlesyndication.com https://www.facebook.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/newsletter": ["./public/guias/7-dias-de-oracion-restauracion-matrimonial.pdf"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-c35e24e567e64e278b36c6857a95ec25.r2.dev",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.rawpixel.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Dominio canónico: siteConfig.domain (sin "www"). Cualquier tráfico que llegue por
  // "www.<domain>" se redirige 308 (permanente) a la versión sin www, conservando ruta y
  // query params. No hay redirect activo hoy porque el dominio final aún no está en DNS
  // (ver README) — esta regla queda lista para cuando se apunte el dominio real a Vercel.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: `www.${siteConfig.domain}`,
          },
        ],
        destination: `${siteConfig.url}/:path*`,
        permanent: true,
      },
      // Content consolidation (2026-08-22): 3 near-duplicate "señales" posts
      // merged into one comprehensive article, and 3 near-duplicate
      // "versículos" posts merged into one -- see docs/keyword-map.md. Old
      // slugs 301 to the surviving, expanded URL so existing links/rankings
      // aren't lost.
      {
        source: "/blog/senales-de-esperanza-en-un-matrimonio-que-dios-esta-restaurando",
        destination: "/blog/senales-de-que-dios-esta-trabajando-en-tu-matrimonio",
        permanent: true,
      },
      {
        source: "/blog/senales-de-que-un-matrimonio-puede-ser-restaurado",
        destination: "/blog/senales-de-que-dios-esta-trabajando-en-tu-matrimonio",
        permanent: true,
      },
      {
        source: "/blog/versiculos-para-orar-por-la-restauracion-matrimonial",
        destination: "/blog/versiculos-biblicos-para-matrimonios-en-crisis",
        permanent: true,
      },
      {
        source: "/blog/versiculos-para-salvar-mi-matrimonio",
        destination: "/blog/versiculos-biblicos-para-matrimonios-en-crisis",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
