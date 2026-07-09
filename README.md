# Restaura Tu Matrimonio — Blog

Blog en Next.js (App Router) para el ministerio "Restaura Tu Matrimonio": contenido MDX,
categorías, sitemap/robots, guía de oración, newsletter, formulario de contacto y recursos.
El blog funciona como el motor orgánico del embudo de ventas hacia el curso del Pastor
Andres Arango, vendido vía Hotmart a través del landing en
[restauratumatrimonio.org](https://restauratumatrimonio.org).

**Arquitectura de dominios (a propósito, no es una migración):**
- `restauratumatrimonio.org` → landing de ventas (checkout Hotmart, repo `matrimonio-landing`).
- `restauratumatrimonio-blog.com` → dominio definitivo de este blog, aún no comprado.
  Mientras tanto, `siteConfig` en [lib/site.ts](lib/site.ts) apunta al dominio temporal de
  Vercel: [matrimonio-blog.vercel.app](https://matrimonio-blog.vercel.app). Cuando se compre
  el dominio final, solo hay que actualizar `domain`/`url` ahí — el resto del código
  (sitemap, robots, OG tags, JSON-LD) ya lo consume desde `siteConfig`.

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producción
npm run start        # sirve el build de producción
npm run test         # vitest en modo watch
npm run test:run     # vitest una sola pasada (usado en CI)
npm run test:coverage
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores. `.env.local` nunca se commitea.

| Variable | Dónde se usa | Notas |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_ID` | `components/Analytics.tsx` | Measurement ID de GA4. Si falta, GA4 simplemente no se carga. |
| `NEXT_PUBLIC_META_PIXEL_ID` | `components/Analytics.tsx` | Pixel ID de Meta. Si falta, el pixel no se carga (no hay gating por consentimiento hoy). |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `app/layout.tsx` | Verificación de Google Search Console. |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | `app/api/newsletter/route.ts` | Proveedor de email para el lead magnet. Sin este valor, el endpoint responde éxito en modo desarrollo y solo loguea en consola. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `app/layout.tsx`, `components/AdSlot.tsx` | Cliente de AdSense; sin este valor los `AdSlot` no se renderizan. |
| `CONTACT_ENDPOINT` | `app/api/contacto/route.ts` | Servicio (email/CRM) que recibe los mensajes del formulario de contacto. Mismo comportamiento de modo desarrollo si falta. |

## Tracking

El tracking dual (Meta Pixel + GA4) vive en [`lib/analytics.ts`](lib/analytics.ts), portado
del wrapper usado en el landing (`matrimonio-landing/analytics.js`). Expone
`trackEvent(eventName, params)` y `trackHotmartCtaClick(ctaId)`.

Eventos disparados hoy:

| Evento | Dónde se dispara | Meta | GA4 |
| --- | --- | --- | --- |
| `PageView` | Al cargar el Pixel (`components/Analytics.tsx`) | `fbq('track', 'PageView')` | cubierto por `gtag('config', ...)` |
| `ViewContent` | Al montar `ViewContentTracker` en artículos (`ArticleLayout.tsx`) y en `/recursos` | `fbq('track', ...)` | `view_item` |
| `ScrollDepth` | Checkpoints 25/50/75/90% de scroll (`components/Analytics.tsx`) | `fbq('trackCustom', ...)` | `scroll_depth` |
| `CtaClick` | Click en cualquier elemento `[data-event]`, en `FunnelCTA` (variantes middle/bottom) y en `ResourceCard` | `fbq('trackCustom', ...)` | `select_content` |
| `Lead` | Envío exitoso del formulario de newsletter (`NewsletterForm.tsx`, tras `response.ok`) | `fbq('track', ...)` | `generate_lead` |
| `InitiateCheckout` | Junto con `CtaClick` al hacer click en un CTA que lleva al landing/Hotmart (`trackHotmartCtaClick`) | `fbq('track', ...)` | `begin_checkout` |

Para verificar en desarrollo:
- Configura `NEXT_PUBLIC_META_PIXEL_ID` en `.env.local` y usa el **Meta Pixel Helper** o
  **Events Manager → Test Events**.
- Configura `NEXT_PUBLIC_GA_ID` y usa **GA4 DebugView** (o el panel de red del navegador
  filtrando por `google-analytics.com/g/collect`).

**Checklist operativo (manual, en el dashboard de Vercel — no automatizable desde el repo):**
antes de mandar tráfico real al blog, confirma que `NEXT_PUBLIC_GA_ID` y
`NEXT_PUBLIC_META_PIXEL_ID` configurados en el proyecto de Vercel del blog sean **los mismos
IDs** que usa `matrimonio-landing` en producción. Si difieren, Meta/GA4 tratarán el tráfico
del blog y del landing como audiencias separadas y se rompe la atribución del embudo
(`utm_source=blog` no se podrá cruzar con las conversiones reales en el landing).

## Embudo de contenido

- `components/FunnelCTA.tsx`: un CTA por posición en cada artículo —
  `top` (guía gratis, captura de email), `middle` (suave, según la categoría del post, hacia
  `/recursos`) y `bottom` (fuerte, directo al landing con UTM `funnel_blog`).
- `app/recursos/page.tsx`: página puente problema → promesa → recurso
  (`components/ResourceCard.tsx`) → CTA (con UTM y tracking) → testimonios de confianza →
  newsletter.
- El link final siempre apunta a `siteConfig.hotmartUrl` (`lib/site.ts`), que hoy es el
  landing en `restauratumatrimonio.org`. El landing es quien tiene los links reales de
  checkout de Hotmart (`go.hotmart.com`) con su propio tracking ya en producción.

## Flujo de publicación de contenido

1. Agrega un archivo `.mdx` en `content/posts/` con frontmatter: `title`, `description`,
   `date`, `category`, `image`, `keywords` (array), y opcionalmente `author`, `reviewedBy`,
   `slug`, `contentType` (`"pillar"` o `"satellite"`). Ver `lib/posts.ts` para el parseo y
   `types/post.ts` para los tipos.
2. `category` debe coincidir con el `name` de una entrada en `categories` (`lib/site.ts`).
3. Corre `npm run dev` y revisa el post en `/blog/<slug>`.
4. Antes de mergear a `main`: `npx tsc --noEmit`, `npm run test:run` y `npm run build` deben
   pasar limpio. El workflow de CI (`.github/workflows/ci.yml`) corre lint, type-check, tests
   y build en cada push/PR a `main`.
5. Al mergear a `main`, `.github/workflows/deploy.yml` despliega automáticamente a Vercel
   (producción) y comenta la URL de preview en los PRs.

## Cómo Kingdom Studio publica en este blog

[Kingdom Studio](../kingdom-studio-repo) (motor de generación de contenido con IA del mismo
ministerio) publica aquí a través de un `BlogPublisherAdapter` (`platform="mdx_blog"`) que
abre un **Pull Request** contra este repo — nunca escribe directo a `main`. Esto es necesario
porque Vercel es serverless (filesystem de solo lectura en producción): no existe un endpoint
que "reciba" el post y lo escriba en disco, así que el adaptador usa la API de GitHub
directamente para crear el archivo en una rama y abrir el PR, aprovechando el CI que ya existe.

**Contrato de frontmatter que el adaptador debe producir** (mismos campos del punto 1 de
arriba, sin excepciones):

```yaml
---
title: "..."
description: "..."       # ideal ≤ 160 caracteres
date: "2026-01-01"
category: "Crisis matrimonial"   # debe ser uno de los `name` en `categories` (lib/site.ts)
image: "https://..."
keywords: ["...", "..."]
author: "Restaura Tu Matrimonio"
contentType: "satellite"
---
```

- El PR trae el post en un archivo `content/posts/{slug}.mdx`, donde `slug` sigue exactamente
  las reglas de [`lib/utils.ts:slugify`](lib/utils.ts) (normalización NFD, minúsculas,
  no-alfanumérico → `-`).
- El CI (`lint` + `type-check` + `test` + `build`) corre automáticamente en ese PR — es la
  primera línea de defensa contra frontmatter inválido o MDX mal formado antes de que un
  humano revise y mergee.
- Mientras el PR no se mergee, el post **no está publicado** — Kingdom Studio refleja esto
  devolviendo `status=DRY_RUN` en el resultado del adaptador, no `PUBLISHED`.

<!-- auto-merge verification marker: safe, no functional change -->
