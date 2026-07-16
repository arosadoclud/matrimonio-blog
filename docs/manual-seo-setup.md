# Configuraciones externas pendientes (no automatizables desde el repositorio)

Nada de esto se puede hacer desde GitHub. Se documentan los pasos exactos para que el propietario del sitio los ejecute. No se confirma que ninguna de estas herramientas ya esté configurada — no hay forma de comprobarlo desde el código.

## 0. Requisito previo: comprar y apuntar el dominio

Según `README.md`, `restauratumatrimonio-blog.com` **aún no está comprado**. Antes de cualquier paso de Search Console/GA4 con el dominio real:

1. Comprar el dominio `restauratumatrimonio-blog.com`.
2. En Vercel → proyecto del blog → Settings → Domains: añadir `restauratumatrimonio-blog.com` y `www.restauratumatrimonio-blog.com`.
3. Configurar los registros DNS que indique Vercel (normalmente un registro `A`/`ALIAS` en el apex y un `CNAME` en `www`).
4. Confirmar que `www.restauratumatrimonio-blog.com` redirige 301 a `restauratumatrimonio-blog.com` (el redirect ya está implementado en `next.config.ts` — solo falta que el dominio exista en DNS para que se active).
5. Una vez el dominio esté activo, verificar que `https://restauratumatrimonio-blog.com/sitemap.xml` y `/robots.txt` responden 200 antes de continuar con Search Console.

## 1. Google Search Console

1. Ir a [search.google.com/search-console](https://search.google.com/search-console).
2. Crear una propiedad de **dominio** (no solo "prefijo de URL") para `restauratumatrimonio-blog.com` — cubre automáticamente http/https y www/no-www.
3. Verificar por DNS (recomendado, cubre todo el dominio) añadiendo el registro TXT que Search Console indique en el proveedor de DNS.
4. Alternativa: verificación HTML — copiar el código de verificación y guardarlo como `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` en Vercel (ya está soportado en `app/layout.tsx`, campo `verification.google`).
5. Una vez verificada, ir a **Sitemaps** → enviar `https://restauratumatrimonio-blog.com/sitemap.xml`.
6. Revisar **Cobertura/Páginas indexadas**: confirmar que las categorías `noindex` (hoy solo "Preguntas frecuentes") y las páginas internas (`/pre-adsense`, `/indexacion`, `/gracias-guia-matrimonio`, `/restaurar-matrimonio-guia-gratis`) aparecen como "Excluida por etiqueta noindex", no como error.
7. **Inspección de URLs:** probar manualmente `/`, `/blog`, un artículo pilar y una categoría para confirmar que Google puede rastrearlas e indexarlas sin bloqueos.
8. **Core Web Vitals (informe de experiencia):** revisar semanalmente una vez haya suficiente tráfico para tener datos de campo (CrUX). Antes de eso, usar PageSpeed Insights / Lighthouse local.
9. **Acciones manuales / Problemas de seguridad:** revisar que estén en "Sin problemas detectados".
10. **Enlaces:** revisar la sección "Links" para ver qué dominios externos enlazan al blog (útil también para detectar spam).
11. **Consultas y páginas (Rendimiento):** revisar semanalmente qué queries traen clics/impresiones — es el insumo principal para decidir qué artículos "Ampliar" primero (ver `docs/content-audit.md`) y para confirmar o descartar los riesgos de canibalización marcados como "Medio".

## 2. Google Analytics 4

1. Crear una propiedad GA4 nueva (o confirmar si ya existe una compartida con `matrimonio-landing` — **importante**: el `README.md` advierte que si el blog y el landing usan IDs de GA4/Meta distintos, se rompe la atribución del embudo `utm_source=blog`. Confirmar con el propietario cuál es la intención antes de crear una propiedad nueva).
2. Copiar el **Measurement ID** (formato `G-XXXXXXXXXX`).
3. En Vercel → proyecto del blog → Settings → Environment Variables: añadir `NEXT_PUBLIC_GA_ID` con ese valor, en Production (y Preview/Development si se quiere probar antes).
4. Marcar como conversión (GA4 → Admin → Eventos → marcar como conversión) al menos: `generate_lead` (newsletter), `begin_checkout` (click hacia el programa).
5. Probar en **GA4 DebugView** (Admin → DebugView) o con la extensión "Google Analytics Debugger" que los eventos de la tabla en `docs/analytics-tracking.md` llegan correctamente.
6. Crear audiencias básicas: "Vio un artículo pilar", "Hizo click en CTA hacia el programa", "Completó el newsletter".
7. **Verificar tráfico interno:** en Admin → Definiciones de datos → Filtros de datos, excluir la IP del equipo/desarrollo para no contaminar las métricas.

## 3. Meta Pixel (Facebook/Instagram Ads)

1. Confirmar en Meta Events Manager si ya existe un Pixel para `matrimonio-landing` — reutilizarlo evita fragmentar la atribución (ver mismo comentario que GA4 arriba).
2. Copiar el Pixel ID y añadirlo como `NEXT_PUBLIC_META_PIXEL_ID` en Vercel.
3. Si el equipo que gestiona la campaña de ads pertenece a otro Business Manager sin acceso compartido, usar el segundo pixel: `NEXT_PUBLIC_META_PIXEL_ID_2` (ya soportado en `components/Analytics.tsx`, agregado a `.env.example` en esta auditoría).
4. Verificar con **Meta Pixel Helper** (extensión de Chrome) o **Events Manager → Test Events** que `PageView`, `ViewContent`, `Lead` e `InitiateCheckout` llegan correctamente.

## 4. Microsoft Clarity

**No implementado en el código todavía.** Pasos para activarlo:

1. Crear un proyecto en [clarity.microsoft.com](https://clarity.microsoft.com) para el dominio del blog.
2. Obtener el Project ID.
3. Pedir la implementación como una tarea de desarrollo aparte (añadir el script de Clarity de forma condicional a una variable de entorno nueva, siguiendo el mismo patrón que GA4/Meta en `components/Analytics.tsx` — no se implementó en esta auditoría por no tener el ID real ni confirmación de que se quiere usar).
4. Configurar el **enmascarado de texto/inputs sensibles** en la configuración del proyecto de Clarity antes de grabar sesiones reales, dado que el sitio recibe formularios de contacto con datos personales.
5. Verificar que las grabaciones excluyen los campos de email/nombre de los formularios (`ContactForm.tsx`, `NewsletterForm.tsx`) usando las reglas de enmascaramiento de Clarity.
6. Alinear la carga del script de Clarity con la decisión de consentimiento de cookies pendiente (ver `docs/analytics-tracking.md`, sección "Consentimiento de cookies").

## 5. Semrush — Position Tracking

1. Crear un proyecto para `restauratumatrimonio-blog.com` (una vez el dominio esté en DNS) o para el dominio temporal de Vercel mientras tanto.
2. Configuración inicial:
   - Search engine: Google.
   - País: México.
   - Device: Mobile.
   - Business name for local map pack: dejar vacío.
3. Cargar las keywords listadas en `docs/keyword-map.md` (son las mismas de la Fase 25 de la tarea original, ya organizadas por intención/URL).
4. Crear etiquetas: Restauración, Crisis, Infidelidad, Oración, Comercial — asignar cada keyword según el clúster de `docs/keyword-map.md` (Restauración matrimonial → "Restauración"; Separación y distancia emocional → "Crisis"; Infidelidad, Perdón y Confianza → "Infidelidad"; Oración y Principios Bíblicos → "Oración"; Recursos y Acompañamiento → "Comercial").
5. Campañas adicionales a crear más adelante (cuando haya suficiente volumen de datos en México): Colombia, República Dominicana, España, Estados Unidos en español, y Desktop.

## 6. Semrush — Site Audit

1. Configurar el crawler apuntando a `restauratumatrimonio-blog.com` (o el dominio temporal mientras tanto).
2. Subir manualmente `https://<dominio>/sitemap.xml` como fuente de URLs a auditar (además del crawl normal).
3. Revisar **errores críticos** primero: 4xx/5xx, contenido duplicado, títulos/descriptions faltantes.
4. Revisar **advertencias**: imágenes sin `alt`, títulos duplicados, tiempo de carga.
5. Programar una **auditoría semanal automática** (Site Audit → Settings → Schedule).
6. Comparar auditorías semana a semana para detectar regresiones introducidas por nuevos PRs de contenido (Kingdom Studio publica vía PR, ver `README.md`).

## 7. Corrección de redacción pendiente en `/indexacion` (interno, no indexado)

`app/indexacion/page.tsx` menciona `restauratumatrimonio.org` (el dominio del landing de ventas) al explicar cómo enviar el sitemap y verificar el dominio en Search Console, cuando debería referirse a `restauratumatrimonio-blog.com` (este blog). No se corrigió el contenido de esa página en esta auditoría porque es contenido editorial interno (la página ya es `noindex,nofollow`, así que no afecta el SEO externo) y se prefirió no reescribir texto sin que el propietario confirme qué versión final quiere mantener ahí.

## 8. Checklist operativo heredado de `README.md` (sigue vigente)

Antes de mandar tráfico real al blog, confirmar que `NEXT_PUBLIC_GA_ID` y `NEXT_PUBLIC_META_PIXEL_ID` configurados en el proyecto de Vercel del blog son **los mismos IDs** que usa `matrimonio-landing` en producción (o, si se decide usar propiedades separadas, que ambos equipos lo saben y ajustan sus reportes). Si difieren sin que sea intencional, Meta/GA4 tratarán el tráfico del blog y del landing como audiencias separadas y se rompe la atribución del embudo (`utm_source=blog` no se podrá cruzar con las conversiones reales en el landing).
