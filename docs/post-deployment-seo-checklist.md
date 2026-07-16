# Checklist post-despliegue

Ejecutar después de mergear esta rama a `main` y de que Vercel despliegue a producción (`.github/workflows/deploy.yml`).

## Verificación de dominios y redirecciones (ejecutar tú — este sandbox no tiene acceso de red al dominio real)

Se intentó verificar esto directamente desde el entorno que generó esta auditoría (`curl -v https://restauratumatrimonio-blog.com/`) y la política de red del sandbox lo bloquea (403 del proxy de egress, mismo tipo de restricción documentada en la sección de Lighthouse arriba). **No se inventó ningún resultado.** Ejecuta estos comandos exactos tú mismo (en tu máquina, o cualquier entorno con acceso normal a internet) y completa la tabla:

```bash
# 1. Dominio sin www (canónico) — debe responder 200 directo, sin redirect
curl -sI https://restauratumatrimonio-blog.com/

# 2. Dominio con www — debe responder 301/308 hacia la versión sin www
curl -sI https://www.restauratumatrimonio-blog.com/

# 3. www con una ruta de artículo — la ruta debe conservarse en el redirect
curl -sI https://www.restauratumatrimonio-blog.com/blog/como-restaurar-mi-matrimonio-con-la-ayuda-de-dios

# 4. www con una ruta de categoría
curl -sI https://www.restauratumatrimonio-blog.com/categorias/restauracion-matrimonial

# 5. www con query params — deben conservarse en el Location del redirect
curl -sI "https://www.restauratumatrimonio-blog.com/recursos?src=como-restaurar-mi-matrimonio-con-la-ayuda-de-dios"

# 6. Confirmar que NO hay cadena de redirects (máximo 1 salto) ni bucle
curl -sIL --max-redirs 3 https://www.restauratumatrimonio-blog.com/ | grep -c "^HTTP"
```

**Qué confirmar en cada respuesta:**
- [ ] (1) `HTTP/2 200` directo, sin `Location` header — el apex sirve el sitio, no redirige (así quedó configurado en Vercel tras el incidente de bucle).
- [ ] (2)-(5) código `301` o `308` (permanente, no `302`/`307` temporal), con header `Location: https://restauratumatrimonio-blog.com/<misma-ruta-y-query>` — ruta y query conservados exactamente.
- [ ] (6) el conteo de líneas `HTTP` debe ser **2** (un 30x + el 200 final) — más de 2 indicaría una cadena de redirects; si `curl` falla con "too many redirects" hay un bucle.
- [ ] Ver el HTML de la respuesta 200 (`curl -s https://restauratumatrimonio-blog.com/ | grep canonical`): el `<link rel="canonical">` debe apuntar a `https://restauratumatrimonio-blog.com/...` (sin `www`).
- [ ] Repetir el `grep` anterior sobre `/sitemap.xml`: todas las URLs deben ser `https://restauratumatrimonio-blog.com/...`.
- [ ] Ver el `<meta property="og:url">` de una página: debe ser la versión sin `www`.
- [ ] Ver el JSON-LD (`<script type="application/ld+json">`) de un artículo: los campos `url`/`mainEntityOfPage` deben ser sin `www`.
- [ ] Revisar 2-3 artículos: sus enlaces internos (`[texto](/blog/...)`) son rutas relativas, así que siempre heredan el dominio actual — no hay riesgo de que apunten a `www` por accidente, pero confirmar visualmente que el navegador no muestra ningún enlace absoluto a `www.restauratumatrimonio-blog.com` en el HTML renderizado.

**Nota importante:** el dominio canónico de este proyecto es **sin `www`** (confirmado explícitamente por el propietario dos veces en esta auditoría — ver `docs/seo-audit.md` sección 2). Todo el código (`lib/site.ts:siteConfig.url`, `app/sitemap.ts`, `app/layout.tsx` OG, JSON-LD en `app/blog/[slug]/page.tsx` y `app/categorias/[slug]/page.tsx`) ya deriva consistentemente de `siteConfig.url`, que es la versión sin `www` — se verificó con `grep -rn "www\."` que no hay ninguna referencia hardcodeada a la versión con `www` del propio dominio en el código (los únicos resultados son dominios de terceros legítimos: `clarity.ms`, `googletagmanager.com`, `facebook.com`, `google-analytics.com`).

## Verificación técnica inmediata (0-24h)

- [ ] `https://<dominio-de-producción>/` carga sin errores de consola.
- [ ] `https://<dominio-de-producción>/robots.txt` responde 200 y contiene `Sitemap: https://<dominio>/sitemap.xml` con el dominio correcto.
- [ ] `https://<dominio-de-producción>/sitemap.xml` responde 200 y solo contiene URLs indexables (sin `/pre-adsense`, `/indexacion`, `/gracias-guia-matrimonio`, `/restaurar-matrimonio-guia-gratis`, ni la categoría "Preguntas frecuentes" mientras siga vacía).
- [ ] Cada URL del sitemap responde 200 (no 404, no redirect) — se puede automatizar con `curl -o /dev/null -s -w "%{http_code} %{url}\n"` en un loop sobre las URLs del sitemap.
- [ ] Si ya se apuntó `www.<dominio>` en DNS: confirmar que redirige 301/308 a la versión sin `www`, conservando ruta y query params (`next.config.ts` → `redirects()`).
- [ ] Un artículo, una categoría y la home muestran `<link rel="canonical">` apuntando a la URL absoluta correcta (ver código fuente o DevTools → Elements).
- [ ] JSON-LD de un artículo (`BlogPosting` + `BreadcrumbList`) valida sin errores en el [Rich Results Test de Google](https://search.google.com/test/rich-results) — pegar la URL real, no HTML local.
- [ ] Formulario de newsletter (`/guia-oracion` o `/newsletter`) completa un envío de prueba real y llega el correo (requiere `BREVO_API_KEY`/`BREVO_SENDER_EMAIL` configurados en Vercel).
- [ ] Formulario de contacto (`/contacto`) completa un envío de prueba real (requiere `CONTACT_ENDPOINT` configurado).
- [ ] GA4 DebugView o Meta Events Manager (Test Events) muestran `PageView` al cargar cualquier página, si los IDs ya están configurados.

## Lighthouse y Core Web Vitals

### Lo que sí se pudo ejecutar realmente, y lo que falta

Este sandbox de desarrollo **no tiene acceso de red al dominio real** (`restauratumatrimonio-blog.com` está bloqueado por la política de egress del entorno — confirmado con `curl -v`, error 403 del proxy). Por eso, en vez de inventar números contra la URL real, se corrió **Lighthouse CLI real** (`npx lighthouse`, Chromium preinstalado) contra un **build de producción del mismo código corriendo en local** (`npm run build && npm run start`, `http://localhost:3000`). Los resultados de abajo son reales — ningún número fue inventado — pero corresponden al build local, no al CDN/edge real de Vercel; en particular LCP/FCP/TBT en producción real deberían ser iguales o mejores (Vercel sirve con CDN y compresión de borde que este `localhost` no tiene). **Sigue pendiente correr esto mismo contra el dominio real** una vez alguien con acceso de red lo haga (pasos exactos abajo).

Reportes JSON completos de Lighthouse (antes y después de los fixes) disponibles en la sesión que generó esta auditoría; no se incluyen en el repo por tamaño, pero cualquier número de la tabla se puede reproducir con:

```bash
npm run build && npm run start &
npx lighthouse http://localhost:3000/<ruta> --output=json --output-path=informe.json \
  --chrome-flags="--headless=new --no-sandbox" --only-categories=performance,accessibility,best-practices,seo
# agregar --preset=desktop para la variante de escritorio
```

INP no aparece: es una métrica de campo (requiere interacción real de usuarios), Lighthouse en laboratorio no la reporta.

### Problemas reales encontrados y corregidos en este build

| # | Problema | Dónde | Corrección |
|---|---|---|---|
| 1 | Fecha del `BlogCard` con contraste 2.81:1 (mínimo requerido 4.5:1) — `text-[#1F1F1F]/45` sobre blanco | `components/BlogCard.tsx` | Color fijo `#5c5c5c` con margen de contraste seguro |
| 2 | Texto legal del formulario de newsletter con contraste 4.35:1 (insuficiente) — `text-[#1F1F1F]/60` | `components/NewsletterForm.tsx` | Color fijo `#5c5c5c` |
| 3 | Breadcrumbs (usados en artículo y categoría) con contraste 3.68:1/3.72:1 — `text-[#1F1F1F]/55` sobre fondo crema | `components/Breadcrumbs.tsx` | Color fijo `#5c5c5c` |
| 4 | Textos de aviso en `ResourceCard` con contraste 3.23:1 — `text-[#1F1F1F]/50` | `components/ResourceCard.tsx` | Color fijo `#5c5c5c` |
| 5 | Metadatos del artículo (fecha/tiempo de lectura/autor) con contraste 3.68:1 — `text-[#1F1F1F]/55` sobre fondo crema | `components/ArticleLayout.tsx` | Color fijo `#5c5c5c` |
| 6 | Enlaces del footer con área táctil de 17px de alto (mínimo requerido 24×24px) y espaciado insuficiente entre ellos | `components/Footer.tsx` | Cada enlace ahora tiene `py-1.5` (≈25px de alto tocable) |

Hallazgo verificado pero **no es un bug del código**: un único error de consola (403) al pedir imágenes de `images.unsplash.com` a través del optimizador de `next/image` — es la política de red de este sandbox bloqueando el dominio externo (mismo tipo de bloqueo que impide llegar al dominio real). En producción (Vercel, con acceso normal a internet) esto no debería ocurrir; verificar igualmente en el despliegue real que las imágenes de Unsplash cargan sin 403.

No se encontraron: recursos bloqueantes de renderizado, JavaScript sin minificar, CSS sin minificar, imágenes sin formato moderno (`next/image` ya sirve AVIF/WebP automáticamente), layout shifts (CLS = 0 en las 12 pruebas), ni scripts de terceros pesados (GA4/Meta/Clarity cargan con `strategy="afterInteractive"`, y no están configurados en este entorno de prueba así que no se ejecutan). El único "unused-javascript" detectado (~28 KiB en un chunk interno de Next/React) es overhead normal del framework bajo el throttling de CPU 4x que aplica Lighthouse en modo móvil, no algo atribuible a código propio.

### Páginas probadas

`/` (home), `/blog`, `/blog/como-restaurar-mi-matrimonio-con-la-ayuda-de-dios` (artículo pilar extenso), `/categorias/restauracion-matrimonial`, `/guia-oracion` (landing de guía gratuita), `/recursos`.

### Tabla de resultados — build local, después de las correcciones (real, no inventado)

| Página | Dispositivo | Performance | Accessibility | Best Practices | SEO | LCP | CLS | FCP | TBT | Speed Index |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | 95 | 100 | 96 | 100 | 2.8 s | 0 | 0.8 s | 130 ms | 0.8 s |
| `/` | Desktop | 100 | 100 | 96 | 100 | 0.6 s | 0 | 0.2 s | 0 ms | 0.2 s |
| `/blog` | Mobile | 90 | 100 | 96 | 100 | 3.2 s | 0 | 1.2 s | 200 ms | 1.2 s |
| `/blog` | Desktop | 100 | 100 | 96 | 100 | 0.7 s | 0 | 0.3 s | 0 ms | 0.3 s |
| `/blog/como-restaurar-mi-matrimonio-con-la-ayuda-de-dios` | Mobile | 94 | 100 | 96 | 100 | 2.4 s | 0 | 0.9 s | 220 ms | 0.9 s |
| `/blog/como-restaurar-mi-matrimonio-con-la-ayuda-de-dios` | Desktop | 100 | 100 | 96 | 100 | 0.6 s | 0 | 0.3 s | 0 ms | 0.3 s |
| `/categorias/restauracion-matrimonial` | Mobile | 93 | 100 | 96 | 100 | 2.8 s | 0 | 0.8 s | 170 ms | 0.8 s |
| `/categorias/restauracion-matrimonial` | Desktop | 100 | 100 | 96 | 100 | 0.6 s | 0 | 0.2 s | 0 ms | 0.2 s |
| `/guia-oracion` | Mobile | 97 | 100 | 100 | 100 | 2.3 s | 0 | 0.8 s | 140 ms | 0.8 s |
| `/guia-oracion` | Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0.2 s | 0 ms | 0.2 s |
| `/recursos` | Mobile | 95 | 100 | 96 | 100 | 2.7 s | 0 | 0.8 s | 140 ms | 0.8 s |
| `/recursos` | Desktop | 100 | 100 | 96 | 100 | 0.6 s | 0 | 0.2 s | 0 ms | 0.2 s |

**Antes de las correcciones**, Accessibility era 96 en 5 de las 6 páginas (solo por los problemas de contraste/tap-target de la tabla de arriba); Performance mobile estaba en el mismo rango (87-98) — la ganancia de Performance en `/guia-oracion` (87→97) es real pero puede deberse en parte a variabilidad entre corridas del entorno de prueba, no solo a las correcciones (ninguna de las 6 correcciones de esta ronda toca directamente performance, solo accesibilidad).

### Pendiente real — ejecutar contra el dominio de producción

- [ ] Repetir estas 12 pruebas contra `https://restauratumatrimonio-blog.com` real (Lighthouse en Chrome DevTools, o `npx lighthouse` desde una máquina con acceso a internet).
- [ ] PageSpeed Insights: [pagespeed.web.dev](https://pagespeed.web.dev/), pegar cada URL real — da datos de campo (CrUX) una vez haya tráfico real, no solo laboratorio.
- [ ] Search Console → Core Web Vitals: una vez haya datos de campo suficientes, revisar LCP/INP/CLS agregados por grupo de URLs.
- [ ] Confirmar que las imágenes de Unsplash cargan sin 403 en producción real (el único error de consola visto aquí es específico de este sandbox).

## Search Console (primeros días)

- [ ] Propiedad de dominio verificada (ver `docs/manual-seo-setup.md`, sección 1).
- [ ] Sitemap enviado y con estado "Correcto" (sin errores de parseo).
- [ ] Inspeccionar manualmente 3-5 URLs clave (home, un pilar, una categoría) y solicitar indexación si Google aún no las rastreó.
- [ ] Confirmar que no aparecen "Acciones manuales" ni "Problemas de seguridad".

## Revisión visual/móvil (antes de anunciar el lanzamiento)

- [ ] Revisar en un móvil real (o DevTools en modo responsive) que el `CookieNotice`, el header y los CTAs de `FunnelCTA` no rompen el layout ni tapan contenido.
- [ ] Confirmar que los botones de WhatsApp (`WhatsAppContactButton`, `WhatsAppInviteCard`) abren el chat correcto con el número esperado.
- [ ] Confirmar que la imagen LCP de la home carga rápido y sin layout shift visible.
- [ ] Revisar la consola del navegador en 3-4 páginas distintas (home, artículo, categoría, `/recursos`) buscando errores de JS o warnings de hidratación.

## Primeras 2 semanas

- [ ] Revisión semanal de Search Console (Cobertura + Rendimiento) según el ritmo definido en `docs/seo-content-plan-90-days.md`.
- [ ] Confirmar en GA4 que `generate_lead` y `begin_checkout` están marcados como conversión.
- [ ] Confirmar que el tráfico interno del equipo está excluido de GA4 (Admin → Filtros de datos).
- [ ] Programar el Site Audit semanal de Semrush (ver `docs/manual-seo-setup.md`, sección 6).
- [ ] Revisar que ningún artículo nuevo publicado vía PR (flujo de Kingdom Studio, ver `README.md`) rompe la regla de "un solo pilar por clúster" sin revisión editorial — comparar contra `docs/content-audit.md`.

## Riesgos a vigilar antes/después de desplegar

- El redirect `www` → sin-`www` vive en `next.config.ts` y solo aplica cuando el `Host` es exactamente `www.<domain>` — en sí mismo no causa bucles.
- **Incidente real (2026-07-16, ya resuelto):** al conectar el dominio real en Vercel, el propio Vercel tenía configurado `restauratumatrimonio-blog.com` (apex) con "Redirect to Another Domain" → `www.restauratumatrimonio-blog.com`, mientras `next.config.ts` redirige `www` → apex. Dos reglas en direcciones opuestas = `ERR_TOO_MANY_REDIRECTS` en el sitio real. **Corrección:** en Vercel → Settings → Domains, ambos dominios (`restauratumatrimonio-blog.com` y `www.restauratumatrimonio-blog.com`) deben estar en **"Connect to an environment" → Production**, sin ningún "Redirect to Another Domain" activo en Vercel — el redirect `www → apex` lo hace únicamente el código de la app. Si en el futuro alguien vuelve a tocar la configuración de dominios en Vercel, verificar que ninguno de los dos quede en modo "Redirect to Another Domain" apuntando al otro.
- El cambio en `app/sitemap.ts` reduce el número de URLs de artículos publicadas en el sitemap (de 42 a las indexables reales, hoy 30) porque excluye posts &lt;300 palabras que ya eran `noindex` en su `<meta robots>` — esto es una corrección de un bug (esas URLs nunca debieron estar en el sitemap), no una pérdida de contenido: los artículos siguen publicados y accesibles, solo dejan de pedirle a Google que los indexe hasta que se amplíen (ver plan en `docs/seo-content-plan-90-days.md`).
- La categoría "Preguntas frecuentes" queda `noindex,follow` y fuera del sitemap hasta que tenga contenido real (ver Semana 10 del plan editorial).
- El consentimiento de cookies sigue sin bloquear la carga de GA4/Meta Pixel (ver `docs/analytics-tracking.md`) — es una decisión pendiente de aprobación, no un bug introducido en esta auditoría.
