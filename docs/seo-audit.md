# Auditoría técnica SEO — Restaura Tu Matrimonio (blog)

Fecha: 2026-07-16
Rama: `claude/restaura-matrimonio-seo-audit-xiwkxr` (equivalente a `seo/organic-growth-foundation`)

## 1. Stack y arquitectura (verificado en el repo)

- **Framework:** Next.js 16.2.9 (App Router, Turbopack), React 19.
- **Contenido:** archivos `.mdx` en `content/posts/` con frontmatter parseado a mano en `lib/posts.ts` (sin CMS ni base de datos). 42 artículos al momento de esta auditoría.
- **Metadatos:** centralizados vía `lib/site.ts` (`siteConfig`, `categories`) y `lib/seo.ts` (`buildCanonicalUrl`, `ensureMetaDescription`). Cada `page.tsx` exporta su propio `metadata`/`generateMetadata`.
- **Sitemap/robots:** dinámicos vía `app/sitemap.ts` y `app/robots.ts` (convención nativa de Next.js, no archivos estáticos).
- **JSON-LD:** componente reutilizable `components/JsonLd.tsx`, usado en `app/layout.tsx` (Organization), `app/blog/[slug]/page.tsx` (BlogPosting + BreadcrumbList + FAQPage condicional) y `app/categorias/[slug]/page.tsx` (BreadcrumbList).
- **Analítica:** módulo centralizado `lib/analytics.ts` (`trackEvent`, `trackHotmartCtaClick`) que envía a Meta Pixel y GA4 sin lanzar excepción si no están configurados. Cargado desde `components/Analytics.tsx`.
- **Formularios:** `/api/newsletter` (Brevo) y `/api/contacto` (webhook configurable vía `CONTACT_ENDPOINT`).
- **Despliegue:** Vercel, vía `.github/workflows/deploy.yml` al mergear a `main`; CI (`.github/workflows/ci.yml`) corre lint + type-check + test + build en cada push/PR.
- **Dominio:** `restauratumatrimonio-blog.com` (sin `www`) aún **no comprado** según `README.md`; hoy el sitio corre en el dominio temporal de Vercel. `siteConfig.url` ya apunta al dominio definitivo para que sitemap/robots/OG/JSON-LD lo usen desde el día uno.

## 2. Decisión de dominio canónico (Fase 2)

La tarea original pedía usar `www.restauratumatrimonio-blog.com` como canónico. Al auditar el repositorio se encontró que:

- El 100% del código (`siteConfig`, tests, `.env.example`, README, fallback en `/api/newsletter`) usa consistentemente la versión **sin** `www`.
- El dominio real todavía no está comprado ni apuntado en DNS — no hay conflicto activo de indexación entre www/no-www hoy.

**Se preguntó al propietario del sitio y se decidió mantener `restauratumatrimonio-blog.com` (sin www) como dominio canónico**, en vez de forzar un cambio masivo hacia `www` sobre una base de código 100% consistente y un dominio que aún no existe en DNS.

Como medida preventiva se implementó en `next.config.ts` un `redirects()` que envía cualquier tráfico a `www.<dominio>` con 301 (código `permanent: true`, HTTP 308 real en Next.js) hacia la versión sin `www`, conservando ruta y query params. Esta regla no tiene efecto hoy (no hay DNS), pero queda lista para cuando se compre y apunte el dominio.

## 3. Problemas encontrados y corregidos en esta auditoría

| # | Severidad | Problema | Archivo(s) | Corrección aplicada |
|---|---|---|---|---|
| 1 | **Crítico** | `npm run lint` estaba roto: `next lint` fue eliminado en Next.js 16 y el proyecto nunca tuvo ESLint instalado (no había `eslint` en `devDependencies` ni config). El lint nunca corrió, ni en CI. | `package.json`, no existía `eslint.config.mjs` | Se instaló `eslint`, `@next/eslint-plugin-next`, `eslint-plugin-react-hooks`, `typescript-eslint`; se creó `eslint.config.mjs` (flat config nativo, sin el shim `FlatCompat` que rompía por un bug de circularidad conocido entre `eslint-config-next` legacy y `eslint-plugin-react-hooks@7`); se actualizó el script `lint` a `eslint .`. |
| 2 | **Alto** | 6 páginas indexables (`/cookies`, `/guia-oracion`, `/newsletter`, `/privacidad`, `/recursos`, `/terminos`) importaban `buildCanonicalUrl` pero **nunca lo usaban** — no tenían `alternates.canonical` en su `metadata`, a diferencia del resto del sitio. Google podía autoseleccionar una URL distinta como canónica. | `app/cookies/page.tsx`, `app/guia-oracion/page.tsx`, `app/newsletter/page.tsx`, `app/privacidad/page.tsx`, `app/recursos/page.tsx`, `app/terminos/page.tsx` | Se añadió `alternates: { canonical: buildCanonicalUrl("/ruta") }` a cada una, siguiendo el mismo patrón ya usado en `/sobre-nosotros`, `/contacto` y `/afiliados`. |
| 3 | **Alto** | `app/sitemap.ts` ponía `lastModified: new Date()` (fecha del build) en **todas** las páginas estáticas, categorías y páginas legales — exactamente lo que la Fase 4 prohíbe explícitamente ("no coloques la fecha actual como lastmod en todas las páginas durante cada build"). Solo los posts usaban su fecha real. | `app/sitemap.ts` | Se quitó `lastModified` de páginas sin fecha real de actualización (queda como campo opcional ausente); se mantiene `lastModified: new Date(post.date)` solo en artículos, que sí tienen una fecha real en el frontmatter. |
| 4 | **Alto** | El sitemap incluía **todos** los posts (`getAllPosts()`), incluidos los que `app/blog/[slug]/page.tsx` ya marca `noindex,follow` por tener menos de 300 palabras (`getIndexablePosts()`). Se listaban 42 URLs de posts cuando 12 de ellas son `noindex`. | `app/sitemap.ts` | El sitemap ahora usa únicamente `getIndexablePosts()` para las URLs de artículos. |
| 5 | **Medio** | La categoría "Preguntas frecuentes" (definida en `lib/site.ts`) tiene **0 artículos publicados** hoy, pero su página (`/categorias/preguntas-frecuentes`) se indexaba igual (sin `noindex`) y aparecía en el sitemap — contenido insuficiente, exactamente el caso descrito en la Fase 5. | `app/categorias/[slug]/page.tsx`, `app/sitemap.ts` | La metadata de categoría ahora añade `robots: { index: false, follow: true }` cuando `getPostsByCategory(slug)` está vacío; el sitemap excluye categorías sin posts. La ruta sigue siendo rastreable (no se bloqueó en `robots.txt`), solo se marcó no indexable. |
| 6 | Bajo | No existían pruebas automatizadas para `sitemap.ts` ni `robots.ts` (Fase 29 lo exige explícitamente). | — | Se agregaron `app/__tests__/sitemap.test.ts` (7 tests: URLs absolutas del dominio canónico, sin duplicados, excluye posts thin, incluye todos los posts indexables, excluye categorías vacías, no fabrica `lastModified`, usa la fecha real del post) y `app/__tests__/robots.test.ts` (3 tests). |
| 7 | Bajo | `lib/__tests__/posts.test.ts` importaba `vi`, `beforeEach`, `afterEach` de Vitest sin usarlos (lint error una vez arreglado el punto 1). | `lib/__tests__/posts.test.ts` | Se limpiaron los imports no usados. |

Ningún cambio de esta lista modifica slugs existentes, elimina contenido, ni cambia fechas de publicación/actualización reales de ningún artículo.

## 4. Cosas que YA estaban bien implementadas (verificado, no se tocó)

- Canonical, Open Graph, Twitter Card y `robots` por artículo en `app/blog/[slug]/page.tsx`, con `noindex,follow` automático para posts &lt;300 palabras.
- `BlogPosting` + `BreadcrumbList` + `FAQPage` (solo si el artículo tiene sección real de preguntas frecuentes) en JSON-LD de cada artículo.
- `Organization` JSON-LD en el layout raíz, sin datos inventados (`sameAs: []`, sin dirección, teléfono ni certificaciones falsas).
- `<html lang="es">`, `SkipLinks`, landmark `<main id="main-content">`.
- `robots.txt` dinámico: permite `/`, bloquea solo `/api/` y `/_next/`, apunta al sitemap absoluto.
- Página 404 personalizada (`app/not-found.tsx`) con enlaces a inicio/blog.
- Páginas de captación (`/pre-adsense`, `/gracias-guia-matrimonio`, `/restaurar-matrimonio-guia-gratis`) ya correctamente marcadas `noindex, nofollow` y fuera del sitemap.
- Tratamiento responsable de contenido sensible: al menos 12 artículos incluyen, en prosa, un párrafo explícito que prioriza la seguridad física sobre la restauración, recomienda ayuda profesional/pastoral/autoridades locales, y aclara que la fe no debe usarse para justificar permanecer en peligro (ver `docs/content-audit.md` y sección 6 de este documento).
- Aviso de afiliados (`/afiliados`) honesto, sin reseñas ni testimonios inventados.
- Rate limiting básico en `middleware.ts` para endpoints de formularios.
- Analítica centralizada en `lib/analytics.ts`, no lanza si faltan IDs, usa variables de entorno documentadas en `.env.example` y `README.md`.
- Suite de tests existente (62 tests antes de esta auditoría, 72 después) cubriendo `posts`, `seo`, `analytics`, `utils`, componentes de formularios y CTAs.

## 5. Inventario de URLs públicas

| Ruta | Tipo | Indexación recomendada | Canonical | En sitemap | Title/Description | H1 | JSON-LD | Notas |
|---|---|---|---|---|---|---|---|---|
| `/` | Home | Index | ✅ self | ✅ | ✅ únicos | ✅ (via Hero) | Organization (layout) | OK |
| `/blog` | Listado | Index | ✅ | ✅ | ✅ | ✅ | — | OK |
| `/blog/[slug]` × 42 | Artículo | Index si ≥300 palabras (30), noindex,follow si <300 (12) | ✅ self | Solo los 30 indexables | ✅ únicos por post | ✅ | BlogPosting + Breadcrumb + FAQ cond. | Ver `docs/content-audit.md` para detalle por artículo |
| `/categorias` | Listado | Index | ✅ | ✅ | ✅ | ✅ | — | OK |
| `/categorias/[slug]` × 8 | Categoría | Index si tiene posts (7), noindex,follow si vacía (1: "Preguntas frecuentes") | ✅ self | Solo las 7 con contenido | ✅ | ✅ | Breadcrumb | Corregido en esta auditoría |
| `/recursos` | Landing de recursos | Index | ✅ self (corregido) | ✅ | ✅ | — (revisar) | — | Canonical corregido |
| `/sobre-nosotros` | Institucional | Index | ✅ self | ✅ | ✅ | ✅ | — | OK |
| `/contacto` | Institucional / formulario | Index | ✅ self | ✅ | ✅ | ✅ | — | OK |
| `/newsletter` | Captación | Index | ✅ self (corregido) | ✅ | ✅ | — (revisar) | — | Canonical corregido |
| `/guia-oracion` | Lead magnet | Index | ✅ self (corregido) | ✅ | ✅ | ✅ | — | Canonical corregido |
| `/restaurar-matrimonio-guia-gratis` | Landing UTM del lead magnet | **Noindex,nofollow** (ya así) | ✅ self | ❌ (correcto) | ✅ | ✅ | — | Duplicado intencional de `/guia-oracion` para campañas; correctamente fuera de índice |
| `/gracias-guia-matrimonio` | Thank-you page | **Noindex,nofollow** (ya así) | — | ❌ (correcto) | ✅ | ✅ | — | OK |
| `/pre-adsense` | Checklist interno | **Noindex** (ya así) | ✅ self | ❌ (correcto) | ✅ | ✅ | — | Página interna, correcto que no se indexe |
| `/indexacion` | Notas internas de SEO/analítica | **Noindex,nofollow** (ya así) | ✅ self | ❌ (correcto) | ✅ | ✅ | — | Contenido interno; menciona el dominio `.org` (landing) en vez del `.com` (blog) — revisar redacción, no es un problema técnico porque ya está fuera de índice |
| `/privacidad` | Legal | Index | ✅ self (corregido) | ✅ | ✅ | ✅ | — | Canonical corregido; texto legal genérico, **debe revisarlo un abogado** antes de depender de él |
| `/terminos` | Legal | Index | ✅ self (corregido) | ✅ | ✅ | ✅ | — | Canonical corregido; ídem, revisión legal profesional pendiente |
| `/cookies` | Legal | Index | ✅ self (corregido) | ✅ | ✅ | ✅ | — | Canonical corregido |
| `/afiliados` | Divulgación de afiliados | Index | ✅ self | ✅ | ✅ | ✅ | — | OK, sin reseñas falsas |
| `/api/newsletter`, `/api/contacto` | Endpoints | No indexable (bloqueados en robots.txt vía `/api/`) | — | ❌ | — | — | — | Correcto |
| `/robots.txt`, `/sitemap.xml` | Técnicas | N/A | — | N/A | — | — | — | Generadas dinámicamente, verificadas en build |
| 404 (`app/not-found.tsx`) | Error | Noindex (Next.js devuelve 404 real) | — | ❌ | ✅ | ✅ | — | Devuelve status 404 real, no soft-404 |

No se encontraron: páginas de autor individuales (los posts firman con `author` como string, no hay rutas `/autor/[slug]`), búsqueda interna indexable (`SearchBar` es cliente, no genera URLs con parámetros rastreables por Google), ni paginación indexable adicional.

## 6. Contenido sensible (violencia / riesgo) — Fase 10

Se auditaron los 42 artículos por menciones a violencia, abuso, maltrato o peligro. **20 artículos** mencionan estos temas; de ellos, al menos 12 ya incluyen un párrafo explícito y responsable (ejemplos en `como-restaurar-mi-matrimonio-con-la-ayuda-de-dios.mdx`, `como-salvar-tu-matrimonio-en-7-dias.mdx`, `antes-de-rendirte-ora-por-tu-matrimonio-una-vez-mas.mdx`, `pequenas-acciones-que-pueden-comenzar-una-restauracion-matrimonial.mdx`, entre otros) que:

- Prioriza la seguridad física de la persona y de sus hijos sobre la restauración.
- Aclara que la fe no debe usarse para justificar permanecer en una situación de violencia.
- Recomienda buscar ayuda pastoral, profesional o de las autoridades del país correspondiente — sin inventar números de emergencia universales.
- No presenta la mentoría/programa como sustituto de ayuda profesional en esos casos.

Esto ya cumple, en sustancia, con lo pedido en la Fase 10.

**Actualización (ronda posterior):** se implementó `components/SafetyNotice.tsx`, un componente visual reutilizable (caja con borde e ícono textual distintivo, `role="note"`), y se insertó en los 12 artículos identificados arriba. `MdxContent.tsx` ahora reconoce un bloque de cita (`> texto` en el `.mdx`) y lo renderiza con `SafetyNotice` en vez de un párrafo normal. No se inventó ni reescribió ningún texto: se tomó el párrafo de advertencia que cada artículo ya tenía y se marcó como cita para que se muestre destacado. Cubierto por `components/__tests__/MdxContent.test.tsx`.

## 7. Decisiones que requieren aprobación manual

1. **Redacción de `/indexacion`**: ~~menciona `restauratumatrimonio.org`~~ **Corregido** en una ronda posterior — ahora referencia `restauratumatrimonio-blog.com` (este blog) al hablar de Search Console/sitemap.
2. **Categorías con solo 1-2 artículos** ("Comunicación en pareja": 2, "Testimonios": 2): no se marcaron `noindex` porque sí tienen contenido real y publicado, pero son candidatas a "ampliar" según el plan editorial de 90 días antes de invertir más en enlazado interno hacia ellas.
3. **Textos legales** (`/privacidad`, `/terminos`, `/cookies`, `/afiliados`): son razonables como base, pero **no sustituyen asesoría legal profesional** — se recomienda revisión por un abogado antes de depender de ellos en un contexto de captación de datos y venta de un programa pagado.
4. **Dominio canónico confirmado por el propietario en esta sesión:** `restauratumatrimonio-blog.com` sin `www` (ver sección 2). Si esto cambia en el futuro, solo hace falta actualizar `siteConfig.domain`/`url` en `lib/site.ts` — el resto del código ya lo consume desde ahí.
5. **Consentimiento de cookies no bloquea la carga de GA4/Meta Pixel** (ver `docs/analytics-tracking.md`) — sigue pendiente de decisión legal/UX del propietario.
6. **Enriquecer `CtaClick`/`trackHotmartCtaClick`** con `article_slug`/`article_category`/`cta_location` — pendiente, ver `docs/analytics-tracking.md`.
