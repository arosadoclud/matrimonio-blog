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
| cómo evitar el divorcio | Informacional / urgente | `/blog/errores-que-debes-evitar-al-intentar-restaurar-tu-matrimonio` | Satélite | MOFU | Guía gratuita | — | Bajo. Contenido hoy delgado (166 palabras) — ampliar antes de posicionar esta keyword en serio |
| señales de que mi matrimonio se puede salvar | Informacional | `/blog/senales-de-que-un-matrimonio-puede-ser-restaurado` | Satélite | TOFU | Guía gratuita | `senales-de-esperanza-...`, `senales-de-que-dios-esta-trabajando-...` | **Medio** — 3 artículos de "señales" compiten, ver content-audit |
| cómo reconstruir la confianza en el matrimonio | Informacional | `/blog/como-reconstruir-la-confianza-despues-de-una-crisis-matrimonial` | Satélite | MOFU | Guía gratuita | `dios-puede-restaurar-un-matrimonio-despues-de-una-infidelidad` | Bajo. Contenido hoy delgado (204 palabras) — ampliar |
| mi esposo ya no me ama | Informacional / crisis | Sin URL exacta — más cercano es `/blog/mi-esposa-dice-que-ya-no-me-ama` (ángulo esposa) | — | MOFU | Conocer próximos pasos | — | Oportunidad: crear el equivalente para "mi esposo ya no me ama" (hoy solo existe el ángulo "mi esposa dice que ya no me ama") |
| mi esposa ya no me ama | Informacional / crisis | `/blog/mi-esposa-dice-que-ya-no-me-ama` | Satélite | MOFU | Conocer próximos pasos | — | Bajo |
| mi esposo quiere separarse | Informacional / crisis | `/blog/que-hacer-si-mi-pareja-quiere-separarse`, `/blog/mi-esposo-ya-no-quiere-seguir-que-hago` | Satélite | MOFU | Conocer próximos pasos | — | Bajo-Medio: dos posts cercanos, cada uno con matiz distinto (separación vs. "ya no quiere seguir luchando") |
| mi esposa quiere separarse | Informacional / crisis | `/blog/que-hacer-si-mi-pareja-quiere-separarse` | Satélite | MOFU | Conocer próximos pasos | — | Bajo |
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
| terapia de pareja cristiana | Informacional / comercial ligera | Sin URL específica — cubierta parcialmente por `/recursos` | — | BOFU | Conocer el programa | — | Oportunidad: artículo dedicado a "terapia de pareja cristiana vs. mentoría vs. consejería pastoral" (ver política editorial, Fase 9) |
| mentoría matrimonial cristiana | Comercial | `/recursos`, `quien-es-andres-arango-pastor-y-psicologo-de-matrimonios` | Landing + autoridad | BOFU | Conocer el programa | — | Bajo |
| programa para restaurar el matrimonio | Comercial | `/recursos` (enlaza a `restauratumatrimonio.org` vía `siteConfig.hotmartUrl`) | Landing de recursos | BOFU | Conocer el programa de restauración matrimonial | `testimonios-reales-de-matrimonios-restaurados` | Bajo |
| cómo reconstruir la confianza en el matrimonio | Informacional | `/blog/como-reconstruir-la-confianza-despues-de-una-crisis-matrimonial` | Satélite | MOFU | Guía gratuita | — | Bajo |
| Dios está trabajando en tu matrimonio | Informacional / esperanza | `/blog/senales-de-que-dios-esta-trabajando-en-tu-matrimonio` | Satélite | TOFU | Guía gratuita | `senales-de-esperanza-en-un-matrimonio-que-dios-esta-restaurando` | **Medio** — ver content-audit |

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

1. "mi esposo ya no me ama" — falta el ángulo simétrico a `mi-esposa-dice-que-ya-no-me-ama`.
2. "terapia de pareja cristiana" — diferenciarlo explícitamente de mentoría/consejería/programa pagado (encaja con la política editorial de la Fase 9).
3. "cómo evitar el divorcio" — el post más cercano (`errores-que-debes-evitar-al-intentar-restaurar-tu-matrimonio`) es delgado (166 palabras); ampliarlo antes de intentar posicionar esta keyword de alto volumen.
