# Checklist post-despliegue

Ejecutar después de mergear esta rama a `main` y de que Vercel despliegue a producción (`.github/workflows/deploy.yml`).

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

## Lighthouse y Core Web Vitals (ejecutar tras el primer despliegue real)

No se ejecutó Lighthouse en esta auditoría porque este entorno no tiene navegador ni un despliegue real contra el cual medir — cualquier número aquí sería inventado. Estos son los pasos exactos a correr manualmente después de desplegar:

### Cómo correr cada prueba

1. **Lighthouse móvil:** Chrome DevTools → pestaña "Lighthouse" → dispositivo "Mobile" → categorías Performance, Accessibility, Best Practices, SEO → "Analyze page load". Repetir para cada URL de la lista de abajo.
2. **Lighthouse escritorio:** mismo proceso, dispositivo "Desktop".
3. **PageSpeed Insights:** [pagespeed.web.dev](https://pagespeed.web.dev/), pegar la URL real de producción — da datos de campo (CrUX) además del análisis de laboratorio, útil una vez haya tráfico real.
4. **Search Console → Core Web Vitals:** una vez haya suficientes datos de campo, revisar el informe de "Experiencia" para ver LCP/INP/CLS agregados por grupo de URLs (no por URL individual).

### Páginas a probar

- [ ] Portada (`/`)
- [ ] Una página de artículo representativa (recomendado: un pilar, ej. `/blog/como-restaurar-mi-matrimonio-con-la-ayuda-de-dios`)
- [ ] Una página de categoría (ej. `/categorias/restauracion-matrimonial`)
- [ ] La landing de la guía gratuita (`/guia-oracion` o `/restaurar-matrimonio-guia-gratis`)

### Métricas a registrar en cada prueba

LCP, INP, CLS, FCP, TBT, y los 4 scores de Lighthouse (Performance, Accessibility, Best Practices, SEO).

### Tabla de resultados (completar después del despliegue — vacía a propósito)

| Página | Dispositivo | LCP | INP | CLS | FCP | TBT | Performance | Accessibility | Best Practices | SEO | Fecha de la prueba |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | | | | | | | | | | |
| `/` | Desktop | | | | | | | | | | |
| Artículo pilar | Mobile | | | | | | | | | | |
| Artículo pilar | Desktop | | | | | | | | | | |
| Categoría | Mobile | | | | | | | | | | |
| Categoría | Desktop | | | | | | | | | | |
| Landing de guía gratuita | Mobile | | | | | | | | | | |
| Landing de guía gratuita | Desktop | | | | | | | | | | |

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
