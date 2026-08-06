# Mapa de palabra clave → URL

Basado en la lista de referencia de la Fase 25 y en las `keywords[]` reales del frontmatter de cada post (`content/posts/*.mdx`). Cuando una keyword de referencia no tiene todavía una URL específica que la cubra bien, se marca "Sin URL asignada — oportunidad" en vez de forzar una asignación artificial.

| Keyword | Intención | URL asignada | Tipo de contenido | Etapa del embudo | CTA | Contenidos secundarios | Riesgo de canibalización |
|---|---|---|---|---|---|---|---|
| cómo restaurar mi matrimonio | Informacional amplia | `/blog/como-restaurar-mi-matrimonio-con-la-ayuda-de-dios` | Pilar | TOFU | Guía gratuita | Todos los satélites de "Restauración matrimonial" | Bajo (es el pilar único de esta keyword) |
| restaurar matrimonio | Informacional amplia | `/blog/como-restaurar-mi-matrimonio-con-la-ayuda-de-dios` | Pilar | TOFU | Guía gratuita | `pequenas-acciones-...`, `primeros-pasos-...` | Bajo |
| restauración matrimonial | Informacional amplia | `/blog/como-restaurar-mi-matrimonio-con-la-ayuda-de-dios` | Pilar | TOFU | Guía gratuita | `senales-de-que-un-matrimonio-puede-ser-restaurado` | Medio — ver `docs/content-audit.md` (clúster "señales") |
| restauración matrimonial cristiana | Informacional | `/` (home) y `/blog/como-restaurar-mi-matrimonio-con-la-ayuda-de-dios` | Home + Pilar | TOFU | Guía gratuita | — | Bajo |
| cómo salvar mi matrimonio | Transaccional / plan de acción | `/blog/como-salvar-tu-matrimonio-en-7-dias` | Pilar | MOFU | Descargar guía PDF | `dios-restaura-tu-matrimonio-guia-pdf-gratis` | Medio — mismo lead magnet, ver content-audit |
| cómo recuperar mi matrimonio | Informacional | Sin URL asignada — oportunidad (se solapa hoy con `como-restaurar-mi-matrimonio-con-la-ayuda-de-dios`, no requiere URL nueva) | — | TOFU | Guía gratuita | — | — |
| matrimonio en crisis | Informacional | `/categorias/crisis-matrimonial` | Categoría | TOFU | Conocer próximos pasos | `mi-esposa-dice-que-ya-no-me-ama`, `mi-esposo-ya-no-quiere-seguir-que-hago`, `que-hacer-si-mi-pareja-quiere-separarse`, `que-hacer-cuando-mi-esposo-o-esposa-ya-no-quiere-luchar` | Bajo |
| cómo evitar el divorcio | Informacional / urgente | `/blog/errores-que-debes-evitar-al-intentar-restaurar-tu-matrimonio` | Satélite | MOFU | Guía gratuita | — | Bajo. Ampliado a 700 palabras (2026-07-20), incluye la keyword en título/descripción/cuerpo/FAQ |
| señales de que mi matrimonio se puede salvar | Informacional | `/blog/senales-de-que-un-matrimonio-puede-ser-restaurado` | Satélite | TOFU | Guía gratuita | `senales-de-esperanza-...`, `senales-de-que-dios-esta-trabajando-...` | **Medio** — 3 artículos de "señales" compiten, ver content-audit |
| cómo reconstruir la confianza en el matrimonio | Informacional | `/blog/como-reconstruir-la-confianza-despues-de-una-crisis-matrimonial` | Satélite | MOFU | Guía gratuita | `dios-puede-restaurar-un-matrimonio-despues-de-una-infidelidad` | Bajo. Contenido hoy delgado (204 palabras) — ampliar |
| mi esposo ya no me ama | Informacional / crisis | `/blog/mi-esposo-ya-no-me-ama` | Satélite | MOFU | Conocer próximos pasos | `/blog/mi-esposa-dice-que-ya-no-me-ama` | Bajo — publicado 2026-07-20, ángulo distinto (esposo) del ya existente (esposa) |
| mi esposa ya no me ama | Informacional / crisis | `/blog/mi-esposa-dice-que-ya-no-me-ama` | Satélite | MOFU | Conocer próximos pasos | — | Bajo |
| mi esposo quiere separarse | Informacional / crisis | `/blog/que-hacer-si-mi-pareja-quiere-separarse`, `/blog/mi-esposo-ya-no-quiere-seguir-que-hago` | Satélite | MOFU | Conocer próximos pasos | — | Bajo-Medio: dos posts cercanos, cada uno con matiz distinto (separación vs. "ya no quiere seguir luchando") |
| mi esposa quiere separarse | Informacional / crisis | `/blog/que-hacer-si-mi-pareja-quiere-separarse` | Satélite | MOFU | Conocer próximos pasos | — | Bajo |
| mi pareja quiere el divorcio qué hago | Informacional / crisis | `/blog/que-hacer-si-mi-pareja-quiere-separarse` | Satélite | MOFU | Conocer próximos pasos | — | Bajo — misma URL que "separarse", con sección e intención propia dentro del artículo (ver nota abajo) |
| mi pareja no quiere hablar conmigo | Informacional | `/blog/mi-pareja-no-quiere-hablar-conmigo` | Satélite | MOFU | Guía gratuita | `como-recuperar-la-comunicacion-con-mi-pareja` | Bajo |
| cómo recuperar a mi esposa | Informacional | `/blog/como-recuperar-a-mi-esposa-despues-de-haberla-herido` | Satélite | MOFU | Guía gratuita | — | Bajo |
| cómo recuperar a mi esposo | Informacional | `/blog/como-recuperar-a-mi-esposo-despues-de-una-infidelidad` | Satélite | MOFU | Guía gratuita | — | Bajo |
| cómo perdonar una infidelidad | Informacional | `/blog/como-perdonar-una-infidelidad-con-la-ayuda-de-dios` | Satélite | MOFU | Guía gratuita | `que-dice-la-biblia-sobre-el-perdon-en-el-matrimonio` | Bajo |
| cómo salvar un matrimonio después de una infidelidad | Informacional | `/blog/dios-puede-restaurar-un-matrimonio-despues-de-una-infidelidad` | Satélite | MOFU | Guía gratuita | `como-recuperar-a-mi-esposo-despues-de-una-infidelidad` | Bajo |
| cómo sanar heridas emocionales en el matrimonio | Informacional | `/blog/como-sanar-heridas-emocionales-en-el-matrimonio` | Satélite | TOFU | Guía gratuita | `5-senales-de-que-tu-matrimonio-necesita-sanidad-emocional` | Bajo |
| oración para restaurar mi matrimonio | Informacional / devocional | `/blog/oracion-para-restaurar-mi-matrimonio` | Pilar | TOFU | Guía/devocional gratuito | Todos los satélites de "Oración por el matrimonio" | Bajo |
| oración por un matrimonio en crisis | Informacional / devocional | `/blog/oracion-para-restaurar-mi-matrimonio` | Pilar | TOFU | Guía/devocional gratuito | `oracion-por-mi-esposa-en-tiempos-de-crisis`, `oracion-por-mi-esposo-para-que-dios-toque-su-corazon` | Bajo |
| versículos para matrimonios en crisis | Informacional | `/blog/versiculos-biblicos-para-matrimonios-en-crisis` | Satélite | TOFU | Descargar guía | `versiculos-para-orar-por-la-restauracion-matrimonial`, `versiculos-para-salvar-mi-matrimonio` | **Medio** — ver content-audit |
| versículos para salvar mi matrimonio | Informacional | `/blog/versiculos-para-salvar-mi-matrimonio` | Satélite | TOFU | Descargar guía | — | **Medio** — ver content-audit |
| qué dice la biblia sobre restaurar el matrimonio | Informacional | `/blog/que-dice-la-biblia-sobre-restaurar-un-matrimonio` | Satélite | TOFU | Guía gratuita | `que-dice-la-biblia-sobre-el-perdon-en-el-matrimonio` | Bajo |
| Dios puede restaurar mi matrimonio | Informacional / esperanza | `/blog/dios-puede-restaurar-lo-que-parece-perdido` | Satélite | TOFU | Descargar guía | `senales-de-que-dios-esta-trabajando-en-tu-matrimonio` | Bajo |
| consejería matrimonial cristiana | Informacional / comercial ligera | `/recursos` | Landing de recursos | BOFU | Conocer el programa | `quien-es-andres-arango-pastor-y-psicologo-de-matrimonios` | Bajo |
| terapia de pareja cristiana | Informacional / comercial ligera | `/blog/terapia-de-pareja-cristiana` | Satélite | BOFU | Conocer el programa | `/recursos`, `quien-es-andres-arango-pastor-y-psicologo-de-matrimonios` | Bajo — publicado 2026-07-21, diferencia explícitamente orientación espiritual / mentoría / terapia profesional / emergencia, según la política editorial |
| mentoría matrimonial cristiana | Comercial | `/recursos`, `quien-es-andres-arango-pastor-y-psicologo-de-matrimonios` | Landing + autoridad | BOFU | Conocer el programa | — | Bajo |
| programa para restaurar el matrimonio | Comercial | `/recursos` (enlaza a `restauratumatrimonio.org` vía `siteConfig.hotmartUrl`) | Landing de recursos | BOFU | Conocer el programa de restauración matrimonial | `testimonios-reales-de-matrimonios-restaurados` | Bajo |
| cómo reconstruir la confianza en el matrimonio | Informacional | `/blog/como-reconstruir-la-confianza-despues-de-una-crisis-matrimonial` | Satélite | MOFU | Guía gratuita | — | Bajo |
| Dios está trabajando en tu matrimonio | Informacional / esperanza | `/blog/senales-de-que-dios-esta-trabajando-en-tu-matrimonio` | Satélite | TOFU | Guía gratuita | `senales-de-esperanza-en-un-matrimonio-que-dios-esta-restaurando` | **Medio** — ver content-audit |
| consejos para esposas cristianas | Informacional / crisis | `/blog/consejos-para-esposas-cristianas-en-crisis-matrimonial` | Satélite | MOFU | Conocer próximos pasos | — | Bajo — publicado 2026-08 |
| consejos para esposos cristianos | Informacional / crisis | `/blog/consejos-para-esposos-cristianos-en-crisis-matrimonial` | Satélite | MOFU | Conocer próximos pasos | `/blog/primeros-pasos-para-restaurar-un-matrimonio-en-crisis`, `/blog/como-hablar-con-mi-esposo-sin-pelear` | Bajo — publicado 2026-08-06, ángulo distinto (esposo) del ya existente (esposa) |
| cómo hablar con mi esposo sin pelear | Informacional | `/blog/como-hablar-con-mi-esposo-sin-pelear` | Satélite | MOFU | Guía gratuita | — | Bajo |

## Cómo se asignaron las CTAs por etapa de embudo

Siguiendo la Fase 16 de la tarea original y lo que ya implementa `components/FunnelCTA.tsx` (posiciones `top`/`middle`/`bottom` en cada artículo):

- **TOFU (informacional puro):** CTA = "Descargar la guía gratuita" → `/guia-oracion` o `/restaurar-matrimonio-guia-gratis` (variante de campaña).
- **MOFU (crisis específica / búsqueda de pasos concretos):** CTA = "Conocer los próximos pasos" → `/recursos`.
- **BOFU (ya conoce el problema, busca el programa):** CTA = "Conocer el programa de restauración matrimonial" → `siteConfig.hotmartUrl` (`restauratumatrimonio.org`), con tracking `trackHotmartCtaClick` (ver `docs/analytics-tracking.md`).
- **Contenido de oración:** CTA = "Descargar la guía o devocional gratuito".
- **Contenido sobre violencia/riesgo:** ningún CTA comercial como primera llamada a la acción — ver sección 6 de `docs/seo-audit.md`.

## Mapeo diferenciado de intención — clústeres de riesgo (ronda posterior)

Para evitar que cada URL de estos dos grupos intente posicionar por la misma keyword principal, se asigna una keyword e intención distinta a cada una (ver propuesta completa, con secciones a añadir y CTA, en `docs/content-audit.md`):

| URL | Keyword principal asignada | Intención diferenciada | Pilar informal del grupo |
|---|---|---|---|
| `/blog/versiculos-biblicos-para-matrimonios-en-crisis` | versículos para matrimonios en crisis | Consuelo emocional inmediato ("qué leer cuando duele ahora") | Sí — es el más completo del trío |
| `/blog/versiculos-para-orar-por-la-restauracion-matrimonial` | versículos para orar por la restauración matrimonial | Oración estructurada versículo por versículo | No |
| `/blog/versiculos-para-salvar-mi-matrimonio` | versículos para salvar mi matrimonio | Acción y decisión de no rendirse | No |
| `/blog/senales-de-que-dios-esta-trabajando-en-tu-matrimonio` | señales de Dios matrimonio | Convicción y cambio **interno y personal** | Sí — es el más completo del trío |
| `/blog/senales-de-esperanza-en-un-matrimonio-que-dios-esta-restaurando` | señales de restauración matrimonial | Señales **visibles en la relación**, no solo internas | No |
| `/blog/senales-de-que-un-matrimonio-puede-ser-restaurado` | señales matrimonio puede restaurarse | Evaluación general de si "hay camino" para el matrimonio | No |

Ninguna de estas URLs cambió de slug ni se marcó `noindex` manualmente en esta ronda (dos de ellas ya eran `noindex,follow` automático por tener &lt;300 palabras, ver `docs/seo-audit.md`).

## Oportunidades de contenido nuevo detectadas (sin URL asignada)

Las tres oportunidades documentadas en la ronda anterior ya se resolvieron (ver tabla principal arriba): "mi esposo ya no me ama" (2026-07-20), "terapia de pareja cristiana" (2026-07-21) y la ampliación de "cómo evitar el divorcio" (2026-07-20).

Huecos nuevos detectados en la auditoría del 2026-08-04 (AdSense/SEO/CRO):

1. ~~"consejos para esposas cristianas en crisis" y "consejos para esposos cristianos en crisis"~~ — resuelto: `consejos-para-esposas-cristianas-en-crisis-matrimonial.mdx` y `consejos-para-esposos-cristianos-en-crisis-matrimonial.mdx` publicados (agosto 2026).
2. ~~"cómo hablar con mi esposo sin pelear"~~ — resuelto: `como-hablar-con-mi-esposo-sin-pelear.mdx` publicado.
3. ~~"mi pareja quiere el divorcio qué hago"~~ — resuelto (2026-08-06): `que-hacer-si-mi-pareja-quiere-separarse.mdx` ahora incluye la keyword en `keywords[]`, una sección dedicada que distingue separación de divorcio, y una entrada de FAQ. De paso se corrigió un bug real: el artículo tenía secciones ("Preguntas que conviene hacer con calma", "Cuándo una separación temporal requiere estructura", "Cómo sostener tu vida espiritual") colocadas *después* de `## Preguntas frecuentes`, que `stripFaqSection()` (`lib/posts.ts`) corta silenciosamente — nunca se renderizaban en la página real. Se reordenó el artículo dejando `## Preguntas frecuentes` como última sección, que es el patrón correcto que ya siguen el resto de artículos del sitio.
4. "devocional diario para parejas" — pendiente, sin cobertura.

**Nota técnica para contenido futuro:** cualquier `## Preguntas frecuentes` debe ir siempre como la última sección del artículo. `stripFaqSection()` en `lib/posts.ts` descarta todo lo que viene después de ese encabezado al renderizar el cuerpo del artículo (solo lo re-inserta como el bloque de acordeón FAQ vía `getFaqs()`), así que cualquier sección colocada después queda invisible en producción aunque exista en el `.mdx`.

## Análisis de keywords relacionadas al término de marca "Restaura tu Matrimonio" (2026-07-17)

Revisión de un export de "Related Keywords" / "Long-Tail Keywords" de una herramienta externa de investigación de palabras clave, buscado por el propietario alrededor del término de marca. Varios resultados de la herramienta eran falsos positivos (confusión "restaurar" / "restaurante", irrelevantes): "restaurantes para bodas en Santo Domingo", "restaurantes románticos Santo Domingo" (dos variantes), "cómo escribir carta formal" — se descartan, no requieren acción.

**Ya cubiertas por contenido existente (verificado, sin acción adicional):**

| Keyword buscada | URL que ya la cubre |
|---|---|
| cómo saber si Dios quiere restaurar mi matrimonio | `/blog/como-saber-si-dios-quiere-restaurar-mi-matrimonio` (coincidencia exacta) |
| cómo salvar el matrimonio en 7 días | `/blog/como-salvar-tu-matrimonio-en-7-dias` (coincidencia exacta) |
| oración para restaurar mi matrimonio | `/blog/oracion-para-restaurar-mi-matrimonio` (coincidencia exacta) |
| Dios restaura tu matrimonio pdf | `/blog/dios-restaura-tu-matrimonio-guia-pdf-gratis` (coincidencia exacta) |
| restaurando la confianza en tu matrimonio | `/blog/como-reconstruir-la-confianza-despues-de-una-crisis-matrimonial` |
| restaurar matrimonio después de adulterio | `/blog/dios-puede-restaurar-un-matrimonio-despues-de-una-infidelidad`, `/blog/como-recuperar-a-mi-esposo-despues-de-una-infidelidad` |

**Ajustadas en esta ronda (frase de la variante de búsqueda trabajada de forma natural en el copy, sin cambiar título/slug/keyword principal asignada):**

| Keyword buscada | URL ajustada | Cambio |
|---|---|---|
| cómo restaurar mi matrimonio de la mano de Dios | `/blog/como-restaurar-mi-matrimonio-con-la-ayuda-de-dios` | Primer párrafo ahora dice "de la mano de Dios" en vez de solo "con la ayuda de Dios". |
| 7 pasos iniciales para restaurar tu matrimonio | `/blog/primeros-pasos-para-restaurar-un-matrimonio-en-crisis` | Intro menciona "primeros pasos iniciales para restaurar tu matrimonio". No se afirma un conteo de "7 pasos" porque el post real tiene 4 secciones — evitar prometer una estructura que el contenido no tiene. |
| cómo Dios quiere y va a restaurar tu matrimonio | `/blog/senales-de-que-dios-esta-trabajando-en-tu-matrimonio` | Intro incorpora la frase de forma natural. |

**Oportunidad real detectada, pendiente de decisión editorial (no técnica) — sin acción tomada:**

- "matrimonios restaurados católicos" — el sitio hoy tiene un enfoque cristiano genérico/evangélico, sin contenido dirigido específicamente a audiencia católica. Podría ser una oportunidad de tráfico, pero implica una decisión de tono/enfoque doctrinal que corresponde al propietario, no al equipo técnico.

**Descartadas (bajo volumen probable / no son de nuestra marca):**

- "Restaura tu Matrimonio" — es el propio nombre de marca del sitio, no una keyword de terceros a conquistar.
- "11 a prueba fuego dios restaura matrimonios" — frase inusual, probablemente el título de un libro o serie de otro autor.
- "restaurar tu matrimonio Robert D. Jones" — autor/libro específico de un tercero, no contenido propio del sitio.
