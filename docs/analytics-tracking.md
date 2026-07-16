# Analítica y atribución

## Estado real verificado en el código

- **GA4:** carga condicional en `components/Analytics.tsx` si `NEXT_PUBLIC_GA_ID` está definido. Sin ese valor, el script simplemente no se inyecta (no rompe el sitio).
- **Meta Pixel:** carga condicional si `NEXT_PUBLIC_META_PIXEL_ID` está definido. Soporta un segundo pixel opcional (`NEXT_PUBLIC_META_PIXEL_ID_2`) para un Business Manager distinto (ver comentario en el propio componente).
- **Microsoft Clarity:** implementado en `components/Analytics.tsx`, gated por `NEXT_PUBLIC_CLARITY_PROJECT_ID` (no se inventó ningún ID) y por el mismo interruptor de consentimiento que GA4/Meta. Sin ese valor, Clarity simplemente no se carga.
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
| `CtaClick` | Cualquier `[data-event]`, `FunnelCTA` (middle/bottom), `ResourceCard` | `fbq('trackCustom', ...)` | `select_content` | `label` / `content_name`, y opcionalmente `article_slug`, `article_category`, `cta_location`, `content_cluster`, `destination_url`, `cta_text` (ver sección de enriquecimiento abajo) |
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
| `form_error` | `form_error` (`form_name`, `reason`) en `NewsletterForm.tsx` y `ContactForm.tsx` | ✅ Cubierto |
| `form_success` | `Lead` en newsletter; `form_success` (`form_name`) en `ContactForm.tsx` | ✅ Cubierto |

### Hallazgos (corregidos en rondas posteriores)

Se añadieron `form_error` (`NewsletterForm.tsx`, `ContactForm.tsx`) y `form_success` (`ContactForm.tsx`, que antes no medía nada) como eventos aditivos — no cambian la forma de los eventos existentes (`CtaClick`, `Lead`), así que no afectan reportes ni audiencias ya construidas.

**Actualización:** `CtaClick`/`trackHotmartCtaClick` ya se enriquecieron con contexto opcional. Ver sección siguiente.

## Enriquecimiento de `CtaClick` / `trackHotmartCtaClick` con contexto de artículo

`lib/analytics.ts` expone ahora `buildCtaPayload(base, context)`, que centraliza cómo se combinan los campos opcionales de contexto con el payload base de cada evento — evita duplicar esa lógica entre GA4 y Meta, y entre `CtaClick`/`InitiateCheckout`. `trackHotmartCtaClick(ctaId, context?)` acepta un segundo argumento opcional con el tipo `CtaContext`:

```ts
type CtaContext = {
  article_slug?: string;
  article_category?: string;
  cta_location?: string;
  content_cluster?: string;
  destination_url?: string;
  cta_text?: string;
};
```

**Compatibilidad:** `context` es opcional en todas las funciones; cualquier llamada existente sin ese segundo argumento sigue enviando exactamente los mismos campos que antes (los campos de contexto que no se proporcionan se omiten del payload, nunca se envían como `undefined`).

**Qué componente envía qué, y desde dónde:**

| Componente | CTA | `article_slug` | `article_category` | `cta_location` | `content_cluster` | `destination_url` | `cta_text` |
|---|---|---|---|---|---|---|---|
| `FunnelCTA` (variant `middle`) | "Ver recurso recomendado" | `props.slug` (slug del artículo) | `props.topic` (categoría del post) | `"article_middle"` | Mapeado desde la categoría vía `categoryClusters` (`lib/site.ts`) | `/recursos?src=<slug>` | `"Ver recurso recomendado"` |
| `FunnelCTA` (variant `bottom`) | "Quiero recuperar mi matrimonio →" | `props.slug` si `ArticleLayout` lo pasó (siempre lo hace) | `props.category` ídem | `"article_bottom"` | Igual, vía `categoryClusters` | URL de Hotmart con UTMs | `"Quiero recuperar mi matrimonio →"` |
| `ResourceCard` (en `/recursos`) | "Acceder al recurso" | `sourcePostSlug` (query `?src=`, si el visitante llegó desde un artículo) | `sourcePostCategory`, resuelto server-side en `app/recursos/page.tsx` vía `getPostBySlug` | `"recursos_page"` | Igual, vía `categoryClusters` | URL de Hotmart con UTMs | `"Acceder al recurso"` |

`categoryClusters` (nuevo, en `lib/site.ts`) mapea el nombre de categoría al clúster temático de `docs/seo-content-plan-90-days.md`/`docs/keyword-map.md`, solo para fines de analítica — no afecta rutas ni metadatos.

**No se renombró ningún evento de GA4/Meta** (`CtaClick`, `InitiateCheckout` siguen igual). Cubierto por tests nuevos en `lib/__tests__/analytics.test.ts` y `components/__tests__/FunnelCTA.test.tsx`.

## Consentimiento de cookies (Fase 18) — implementado como interruptor técnico

`lib/consent.ts` (nuevo) centraliza un sistema de consentimiento configurable vía `NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT`:

- **Por defecto (`false`/sin definir):** `hasAnalyticsConsent()` siempre devuelve `true` — GA4, Meta Pixel y Clarity cargan exactamente igual que antes de que este módulo existiera. **No cambia nada en producción a menos que se active explícitamente.**
- **Si se activa (`"true"`):** `components/Analytics.tsx` no renderiza ningún `<Script>` de GA4/Meta/Clarity hasta que `components/CookieNotice.tsx` registre una decisión de "Aceptar" (`setStoredConsent("granted")`). Si el visitante rechaza, ninguna herramienta carga. La preferencia se guarda en `localStorage` (clave `rtm-analytics-consent`) y se puede cambiar después mediante un botón persistente "Preferencias de cookies" que reabre el aviso.
- Ningún evento se pierde de forma ruidosa: `trackEvent`/`trackHotmartCtaClick` siguen funcionando exactamente igual (ya eran no-op seguros si `fbq`/`gtag` no existen) — simplemente no hay nada que llamar hasta que el script correspondiente se cargue.
- El texto del banner (`components/CookieNotice.tsx`) está marcado con un comentario `TODO(legal)` — **no se afirma ningún marco legal específico (GDPR, ePrivacy, etc.)**. Activar esta variable en producción, y decidir la redacción final del aviso, es una decisión del propietario según los países/reglas aplicables a su audiencia real — ver `docs/manual-seo-setup.md`.

Cubierto por `lib/__tests__/consent.test.ts`, `components/__tests__/Analytics.test.tsx` y `components/__tests__/CookieNotice.test.tsx`.

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
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity | Documentada, sin valor real (ver arriba) |
| `NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT` | Interruptor de consentimiento | Documentada, `false` por defecto |

Se detectó que `NEXT_PUBLIC_META_PIXEL_ID_2` se usa en `components/Analytics.tsx` pero no estaba listada en `.env.example` — se añadió en esta auditoría. Ningún ID real fue añadido, solo el nombre de la variable con placeholder vacío.

**Hallazgo adicional (ronda posterior):** `app/layout.tsx` tenía el ID de AdSense (`ca-pub-2971696184390995`) escrito directamente en un `<meta name="google-adsense-account">`, duplicando lo que ya existía como `NEXT_PUBLIC_ADSENSE_CLIENT` en el resto del mismo archivo y en `components/AdSlot.tsx`. Corregido: ese `<meta>` ahora lee `process.env.NEXT_PUBLIC_ADSENSE_CLIENT` y no se renderiza si la variable no está definida. Se verificó con `grep` que no queda ningún otro ID de analítica/AdSense escrito literalmente en el código.
