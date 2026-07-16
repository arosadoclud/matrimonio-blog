# Analítica y atribución

## Estado real verificado en el código

- **GA4:** carga condicional en `components/Analytics.tsx` si `NEXT_PUBLIC_GA_ID` está definido. Sin ese valor, el script simplemente no se inyecta (no rompe el sitio).
- **Meta Pixel:** carga condicional si `NEXT_PUBLIC_META_PIXEL_ID` está definido. Soporta un segundo pixel opcional (`NEXT_PUBLIC_META_PIXEL_ID_2`) para un Business Manager distinto (ver comentario en el propio componente).
- **Microsoft Clarity:** **no está implementado en el código.** No existe ningún script ni variable de entorno para Clarity. Si se quiere usar, hay que añadirlo (ver `docs/manual-seo-setup.md`).
- **Google Search Console:** verificación vía `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` en `app/layout.tsx` (`verification.google`).
- **Google AdSense:** `NEXT_PUBLIC_ADSENSE_CLIENT`, cargado en `app/layout.tsx` y usado por `components/AdSlot.tsx`.
- **Módulo centralizado de tracking:** `lib/analytics.ts` — toda la telemetría pasa por `trackEvent(eventName, params)` o `trackHotmartCtaClick(ctaId)`. No hay llamadas directas a `fbq`/`gtag` dispersas por el resto del proyecto (se verificó con `grep`).
- **Ningún ID real está commiteado.** Todos se leen de `process.env.NEXT_PUBLIC_*`.

## Eventos implementados hoy (verificado en código, no aspiracional)

| Evento | Dónde se dispara | Meta | GA4 | Parámetros enviados |
|---|---|---|---|---|
| `PageView` | Al inicializar el Pixel (`components/Analytics.tsx`) | `fbq('track', 'PageView')` | Cubierto por `gtag('config', ...)` | — |
| `ViewContent` | `ViewContentTracker` al montar en artículos y en `/recursos` | `fbq('track', ...)` | `view_item` | `contentName` |
| `ScrollDepth` | Checkpoints 25/50/75/90% de scroll (`Analytics.tsx`) | `fbq('trackCustom', ...)` | `scroll_depth` | `percent` |
| `CtaClick` | Cualquier `[data-event]`, `FunnelCTA` (middle/bottom), `ResourceCard` | `fbq('trackCustom', ...)` | `select_content` | `label` / `content_name` |
| `Lead` | Envío exitoso de `NewsletterForm` (tras `response.ok`) | `fbq('track', ...)` | `generate_lead` | — |
| `InitiateCheckout` | Junto con `CtaClick` al usar `trackHotmartCtaClick` (CTA hacia el landing/Hotmart) | `fbq('track', ...)` | `begin_checkout` | `content_name`, `value: 149`, `currency: "USD"` |

## Comparación contra los eventos pedidos en la Fase 18 de la tarea original

La tarea original pedía nombres de evento específicos (`lead_magnet_view`, `lead_magnet_submit`, `newsletter_submit`, `resource_page_view`, `affiliate_click`, `article_cta_click`, `whatsapp_click`, `program_page_view`, `outbound_click`, `form_error`, `form_success`). El código real usa una **convención distinta pero equivalente**, ya en producción y documentada en `README.md` (`ViewContent`, `CtaClick`, `Lead`, `InitiateCheckout`), heredada del wrapper de `matrimonio-landing`.

**No se renombraron los eventos existentes** en esta auditoría: cambiar nombres de evento rompería series históricas ya acumuladas en GA4/Meta y comparaciones con el landing de ventas, que usa la misma convención. En vez de eso, se documenta el mapeo:

| Evento pedido en la tarea | Evento real equivalente | Cobertura |
|---|---|---|
| `lead_magnet_view` | `ViewContent` en `/guia-oracion` y `/restaurar-matrimonio-guia-gratis` | ✅ Cubierto |
| `lead_magnet_submit` / `form_success` (newsletter) | `Lead` | ✅ Cubierto |
| `newsletter_submit` | `Lead` | ✅ Cubierto (mismo formulario) |
| `resource_page_view` | `ViewContent` en `/recursos` | ✅ Cubierto |
| `affiliate_click` | `CtaClick` (sin distinguir hoy si el destino es afiliado o el programa propio) | ⚠️ Parcial — ver hallazgo abajo |
| `article_cta_click` | `CtaClick` (con `label`/`content_name`, sin `article_slug` ni `article_category`) | ⚠️ Parcial — ver hallazgo abajo |
| `whatsapp_click` | `WhatsAppContact` (evento propio) en `WhatsAppContactButton.tsx` y `WhatsAppInviteCard.tsx` | ✅ Cubierto (nombre distinto pero equivalente) |
| `program_page_view` | `InitiateCheckout` (se dispara junto con el click, no al ver la página) | ⚠️ Parcial |
| `outbound_click` | No hay evento genérico de salida; solo `trackHotmartCtaClick` para el landing específico | ⚠️ Falta |
| `form_error` | No implementado como evento de analítica (sí hay manejo de error en UI) | ❌ Falta |
| `form_success` | Cubierto por `Lead` en newsletter; no confirmado en `/api/contacto` | ⚠️ Verificar |

### Hallazgos (no corregidos en esta pasada — requieren decisión de producto, no son bugs de SEO técnico)

No se modificó `lib/analytics.ts` ni los componentes de tracking en esta auditoría porque:
1. Cambiar la forma de los parámetros de eventos ya en producción (`CtaClick`, `Lead`, etc.) afecta reportes y audiencias ya construidas en GA4/Meta Ads.
2. No hay acceso a las cuentas reales de GA4/Meta/Clarity para validar el impacto antes de desplegar.

Se documenta como trabajo futuro recomendado (no urgente para indexación/rastreo, sí relevante para medir conversión con más detalle):
- Enriquecer `CtaClick` con `article_slug`, `article_category` y `cta_location` cuando el CTA vive dentro de un artículo (ya se tiene el `post` disponible en `ArticleLayout.tsx`).
- Añadir `form_error` en `NewsletterForm.tsx` y `ContactForm.tsx` junto al `Lead`/`form_success` existente.

## Consentimiento de cookies — hallazgo importante (Fase 18)

`components/CookieNotice.tsx` es un **aviso informativo**, no una puerta de consentimiento: GA4 y Meta Pixel se cargan en `components/Analytics.tsx` de forma incondicional (si los IDs están configurados) **antes** de que el usuario acepte o rechace el aviso. Esto no cumple literalmente "respeta el consentimiento de cookies antes de cargar herramientas que lo requieran" de la tarea original.

**No se modificó este comportamiento en esta auditoría** porque:
- Es un cambio de UX/legal con impacto directo en el volumen de datos de conversión que recibe el negocio (bloquear analítica hasta el consentimiento reduce la señal de atribución).
- Requiere decisión del propietario sobre el marco legal aplicable (GDPR-style opt-in vs. aviso simple), que depende de la audiencia real del sitio (país/países).

**Queda documentado como decisión pendiente de aprobación** — ver `docs/manual-seo-setup.md` y la lista de decisiones pendientes en `docs/seo-audit.md`.

## UTMs hacia `restauratumatrimonio.org`

`siteConfig.hotmartUrl` = `https://restauratumatrimonio.org/`. `components/FunnelCTA.tsx` ya construye la URL final con `buildHotmartUrl(content)`, que añade:

```
utm_source=blog
utm_medium=cta
utm_campaign=funnel_blog
utm_content={{ubicación_del_cta}}
```

Esto ya cumple, en sustancia, con la Fase 19 de la tarea original (soporte consistente de UTM hacia el landing, sin parámetros duplicados — `URLSearchParams.set` sobrescribe en vez de duplicar). No se modificó: la convención (`utm_medium=cta` en vez de `organic`, `utm_campaign=funnel_blog` en vez de `restauracion_matrimonial`) ya está en producción y coincide con lo que usa `matrimonio-landing` para atribuir el tráfico — cambiarla rompería la comparabilidad histórica de campañas sin coordinarlo con el landing.

## Variables de entorno de analítica (ya documentadas en `.env.example` y `README.md`)

| Variable | Uso | Estado |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID | Documentada, sin valor real en el repo |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel principal | Documentada |
| `NEXT_PUBLIC_META_PIXEL_ID_2` | Meta Pixel secundario (Business Manager distinto) | **No estaba en `.env.example` — ver corrección abajo** |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Verificación GSC | Documentada |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense | Documentada |

Se detectó que `NEXT_PUBLIC_META_PIXEL_ID_2` se usa en `components/Analytics.tsx` pero no estaba listada en `.env.example` — se añadió en esta auditoría (ver commit `docs(seo): audit and content strategy` / `feat(analytics)`). Ningún ID real fue añadido, solo el nombre de la variable con placeholder vacío.
