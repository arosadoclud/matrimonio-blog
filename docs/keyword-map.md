# Mapa de palabra clave → URL

Basado en la lista de referencia de la Fase 25 y en las `keywords[]` reales del frontmatter de cada post (`content/posts/*.mdx`). Cuando una keyword de referencia no tiene todavía una URL específica que la cubra bien, se marca "Sin URL asignada — oportunidad" en vez de forzar una asignación artificial.

## Card "Destacado · Más leído" de la home (2026-08-15)

El card grande destacado de `app/page.tsx` (componente `FeaturedPost`) elegía automáticamente el artículo satélite más reciente por fecha, sin ningún dato real de tráfico detrás — así que cada artículo nuevo heredaba la etiqueta "más leído" el mismo día que se publicaba, sin haber sido leído todavía.

Se pidió conectar esto a Google Search Console. El sitio ya tiene la propiedad verificada (`restauratumatrimonio-blog.com`), pero el tráfico real es todavía mínimo (10-12 clics en 28 días a la fecha de este cambio) — no hay suficiente volumen para justificar el esfuerzo de mantener una integración en vivo con la Search Console API (cuenta de servicio de Google Cloud, credenciales en variables de entorno, caché/revalidación, manejo de errores si la API falla). En vez de eso, se ancló manualmente el card destacado al artículo satélite que las Estadísticas de Search Console mostraban como más clicado en ese momento (excluyendo el pilar "Cómo salvar tu matrimonio en 7 días", que ya se muestra arriba como Destacado #1): **`pequenas-acciones-que-pueden-comenzar-una-restauracion-matrimonial`**.

Mecanismo: campo `homeFlagshipFeatured: true` en el frontmatter (`types/post.ts`, `lib/posts.ts`, usado en `app/page.tsx`) — mismo patrón que `homeFeaturedOrder` ya usa para los 3 pilares. Mientras ese campo esté puesto, ningún artículo nuevo puede desplazar el card destacado solo por ser el más reciente.

**Pendiente / a revisar cuando haya más tráfico:** si el sitio crece lo suficiente como para que valga la pena, construir la integración real con la Search Console API (`googleapis`, cuenta de servicio con acceso de lectura a la propiedad) para automatizar esta elección en vez de fijarla a mano. Hasta entonces, si se quiere cambiar cuál artículo lleva el flagship, hay que revisar Search Console → Estadísticas → "Tu contenido" y mover el campo `homeFlagshipFeatured: true` al MDX correspondiente (quitándolo del anterior).

La misma lógica aplica a la grilla de 3 cards pequeños debajo del flagship (`recentPosts` en `app/page.tsx`). Se agregó `homeRecentOrder` (mismo patrón que `homeFeaturedOrder`/`homeFlagshipFeatured`) y se fijó `homeRecentOrder: 1` en `senales-de-que-dios-esta-trabajando-en-tu-matrimonio` — el siguiente satélite con clics reales en "Tu contenido" después del flagship.

**Nota (2026-08-16):** este pin ya se había hecho una vez el 2026-08-15, pero el propietario mergeó el PR justo antes de que el segundo commit (que agregaba `homeRecentOrder`) llegara al remoto — el merge tomó el estado del primer commit únicamente, así que el cambio nunca llegó a `main` aunque el PR se veía cerrado como mergeado. Se detectó porque un artículo recién publicado (el de fe católica) apareció en la grilla sin tener ningún dato real de tráfico. Se rehace aquí el mismo cambio, y además se corrige el desempate para los puestos sin anclar: antes caían en fecha-desc (el más nuevo primero), lo cual repetía el mismo problema que se intentaba resolver — un artículo recién publicado, sin tráfico probado, seguía ganando un puesto solo por ser nuevo. Ahora el desempate es fecha-asc (el más antiguo entre los no anclados entra primero), para que la novedad nunca sea por sí sola lo que gana un lugar destacado en la home.

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
| mi esposo me trata con indiferencia / mi esposa me ignora | Informacional / crisis | `/blog/que-hacer-cuando-tu-pareja-te-trata-con-indiferencia` | Satélite | MOFU | Conocer próximos pasos | `como-recuperar-la-comunicacion-con-mi-pareja` | Bajo — publicado 2026-08-10, dolor no cubierto antes explícitamente (distinto de "ya no me ama": aquí es distancia/silencio, no una frase dicha) |
| oración para restaurar mi matrimonio | Informacional / devocional | `/blog/oracion-para-restaurar-mi-matrimonio` | Pilar | TOFU | Guía/devocional gratuito | Todos los satélites de "Oración por el matrimonio" | Bajo |
| devocional diario para parejas | Informacional / devocional | `/blog/devocional-diario-para-parejas-cristianas` | Satélite | TOFU | Guía/devocional gratuito | `/blog/oracion-para-restaurar-mi-matrimonio` | Bajo — publicado 2026-08-06, intención distinta a la del pilar (costumbre diaria general, no oración específica de crisis) |
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
| siento que ya no amo a mi esposo / esposa | Informacional / crisis | `/blog/que-hacer-si-siento-que-ya-no-amo-a-mi-esposo-o-esposa` | Satélite | MOFU | Conocer próximos pasos | `dios-puede-sanar-lo-que-ustedes-ya-no-saben-como-arreglar` | Bajo — publicado 2026-08-10, ángulo invertido de "ya no me ama" (aquí la persona es quien perdió el sentimiento, no quien lo recibe) |
| cansada/o de luchar sola/o por mi matrimonio | Informacional / crisis | `/blog/que-hacer-cuando-sientes-que-eres-el-unico-que-lucha-por-tu-matrimonio` | Satélite | MOFU | Conocer próximos pasos | `antes-de-rendirte-ora-por-tu-matrimonio-una-vez-mas` | Bajo — publicado 2026-08-10, dolor de esfuerzo desigual sin cobertura previa |
| somos compañeros de cuarto no esposos | Informacional / crisis | `/blog/sentimos-que-somos-companeros-de-cuarto-no-esposos` | Satélite | MOFU | Conocer próximos pasos | `como-recuperar-la-comunicacion-con-mi-pareja`, `devocional-diario-para-parejas-cristianas` | Bajo-Medio — la frase ya se mencionaba de paso en `5-senales-de-que-tu-matrimonio-necesita-sanidad-emocional` (1 de 5 señales); este artículo la desarrolla como tema propio con intención MOFU |
| miedo a que mi matrimonio termine | Informacional / crisis | `/blog/tengo-miedo-de-que-mi-matrimonio-termine` | Satélite | MOFU | Conocer próximos pasos | `oracion-para-restaurar-mi-matrimonio` | Bajo — publicado 2026-08-10, ángulo de ansiedad anticipatoria sin evento de crisis real, distinto de artículos donde ya hay una frase o decisión de separación dicha |
| cómo saber si mi matrimonio ya no tiene arreglo | Informacional / decisión | `/blog/senales-de-que-un-matrimonio-puede-ser-restaurado` | Satélite | TOFU | Guía gratuita | — | Bajo — integrado 2026-08-10 en el artículo existente (título/keywords/FAQ) en vez de crear una 4ª URL en el clúster de "señales", ya marcado Medio por content-audit |

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
4. ~~"devocional diario para parejas"~~ — resuelto (2026-08-06): nuevo artículo `devocional-diario-para-parejas-cristianas.mdx`, categoría "Oración por el matrimonio". Con esto se cierran los 4 huecos detectados en la auditoría del 2026-08-04.

Dolores nuevos cubiertos el 2026-08-10 (a petición del propietario, para seguir generando tráfico/conversión):

5. "mi esposo me trata con indiferencia" / "mi esposa me ignora" — resuelto: `que-hacer-cuando-tu-pareja-te-trata-con-indiferencia.mdx`.
6. "siento que ya no amo a mi esposo/esposa" — resuelto: `que-hacer-si-siento-que-ya-no-amo-a-mi-esposo-o-esposa.mdx`.
7. "cansada/o de luchar sola/o por mi matrimonio" — resuelto: `que-hacer-cuando-sientes-que-eres-el-unico-que-lucha-por-tu-matrimonio.mdx`.
8. "cómo saber si mi matrimonio ya no tiene arreglo" — resuelto sin URL nueva, integrado en `senales-de-que-un-matrimonio-puede-ser-restaurado.mdx` (ya casi cubría exactamente esta intención; crear una 4ª URL en el clúster de "señales" habría empeorado el riesgo de canibalización ya documentado como "Medio").
9. "somos compañeros de cuarto no esposos" — resuelto: `sentimos-que-somos-companeros-de-cuarto-no-esposos.mdx` (2026-08-09).
10. "miedo a que mi matrimonio termine" (ansiedad, sin evento de crisis real) — resuelto: `tengo-miedo-de-que-mi-matrimonio-termine.mdx` (2026-08-10).

**Nota recurrente:** en los artículos 6, 7, 9 y 10 se escribió inicialmente "## Ruta recomendada" *después* de "## Preguntas frecuentes" — el mismo error de estructura que causó el bug documentado abajo. Se detectó y corrigió en los 4 casos antes de publicar, verificando con el script de auditoría cada vez.

## Rechazo de AdSense por "contenido de bajo valor" — remediación (2026-08-12/13)

Google AdSense rechazó `restauratumatrimonio-blog.com` con el motivo "Contenido de bajo valor" poco después de publicar los 5 artículos de dolor de la ronda anterior (puntos 5, 6, 7, 9, 10 arriba) en un solo día. Ningún artículo individual estaba por debajo del mínimo de 300 palabras, pero los 5 compartían un esqueleto casi idéntico: mismo orden de secciones ("por qué pasa" → "qué no ayuda" → "qué sí puedes hacer" → "cuándo buscar ayuda" → "Ruta recomendada" → FAQ de 3 preguntas), frases repetidas casi textuales ("no es debilidad sentir esto", "busca ayuda pastoral o profesional"), y dos de ellos con la misma apertura literal ("No hay X. No hay Y. No hay Z."). Esto coincide con el patrón que Google llama internamente "scaled content abuse" — muchas páginas casi idénticas publicadas muy rápido, independientemente de que cada una esté bien escrita por separado.

Se reescribieron los 5 artículos (`que-hacer-cuando-tu-pareja-te-trata-con-indiferencia.mdx`, `que-hacer-si-siento-que-ya-no-amo-a-mi-esposo-o-esposa.mdx`, `que-hacer-cuando-sientes-que-eres-el-unico-que-lucha-por-tu-matrimonio.mdx`, `sentimos-que-somos-companeros-de-cuarto-no-esposos.mdx`, `tengo-miedo-de-que-mi-matrimonio-termine.mdx`) para diferenciarlos de verdad:

- Encabezados de sección únicos en cada uno (ya no hay dos artículos que compartan el mismo nombre de sección).
- Número de secciones y de preguntas de FAQ variado (2-4 secciones, 2-3 preguntas) en vez del mismo conteo fijo siempre.
- Aperturas reescritas para eliminar el patrón repetido "No hay X. No hay Y."
- Sección "Ruta recomendada" eliminada como encabezado fijo — los enlaces internos ahora se integran de forma natural dentro del último párrafo de contenido, en vez de repetir la misma estructura de cierre en los 5.
- Se conservó todo el contenido pastoral/bíblico útil de cada uno; el cambio fue de forma y estructura, no de sustancia.

**Pausa de publicación:** no se publicó contenido nuevo mientras se investigaba y corregia esto. Antes de escribir más artículos de dolor, evaluar: (1) espaciar publicaciones en el tiempo en vez de publicar varios el mismo día, (2) variar deliberadamente la estructura de cada artículo nuevo respecto a los últimos publicados, (3) esperar a que Google vuelva a rastrear el sitio y solicitar una nueva revisión de AdSense antes de retomar el ritmo anterior.

## Bug de contenido oculto tras "## Preguntas frecuentes" (encontrado y corregido, 2026-08-10)

Al revisar el artículo del punto 3 se detectó que `stripFaqSection()` (`lib/posts.ts`) corta todo el contenido que viene *después* de `## Preguntas frecuentes` al renderizar el cuerpo del artículo — solo reinserta esa sección como el acordeón de FAQ vía `getFaqs()`. Cualquier `## sección` colocada después del FAQ queda invisible en la página real, aunque exista en el `.mdx` y cuente para el conteo de palabras (con lo cual algunos artículos podían aparecer "indexables" por word count sin que Google realmente viera ese texto en el HTML renderizado).

Se auditó **todo** `content/posts/*.mdx` con un script y se encontraron **16 artículos** afectados, no solo el de separación/divorcio. En la mayoría el contenido perdido era menor (un CTA o "Ruta recomendada" de un párrafo), pero varios perdían secciones sustanciales completas:

- `como-orar-cuando-mi-matrimonio-esta-destruido.mdx` — 7 secciones invisibles, incluida la oración principal del artículo. Además tenía **dos** encabezados `## Preguntas frecuentes` separados en el original — se fusionaron en uno solo.
- `mi-esposa-dice-que-ya-no-me-ama.mdx` — perdía "Un plan inicial de siete días".
- `como-recuperar-a-mi-esposa-despues-de-haberla-herido.mdx`, `como-recuperar-a-mi-esposo-despues-de-una-infidelidad.mdx`, `dios-puede-restaurar-un-matrimonio-despues-de-una-infidelidad.mdx`, `mi-esposo-ya-no-quiere-seguir-que-hago.mdx`, `mi-pareja-no-quiere-hablar-conmigo.mdx`, `versiculos-para-salvar-mi-matrimonio.mdx`, `senales-de-que-un-matrimonio-puede-ser-restaurado.mdx` — 3-4 secciones cada uno.
- El resto (`como-restaurar-mi-matrimonio-con-la-ayuda-de-dios.mdx`, `oracion-para-restaurar-mi-matrimonio.mdx`, `que-dice-la-biblia-sobre-el-perdon-en-el-matrimonio.mdx`) solo perdían un CTA de cierre.
- Los 3 artículos nuevos de esta misma ronda (`que-hacer-cuando-tu-pareja-te-trata-con-indiferencia.mdx`, `que-hacer-si-siento-que-ya-no-amo-a-mi-esposo-o-esposa.mdx`, `que-hacer-cuando-sientes-que-eres-el-unico-que-lucha-por-tu-matrimonio.mdx`) se escribieron con el mismo error y se corrigieron antes de publicarse.

Los 16 se reordenaron dejando `## Preguntas frecuentes` como última sección en todos los casos, sin perder ni alterar ningún párrafo — solo se movió el bloque de FAQ al final (y se fusionó el encabezado duplicado en `como-orar-cuando-mi-matrimonio-esta-destruido.mdx`). Verificado con un script que confirma que ningún post del sitio tiene ya contenido después del encabezado de FAQ, ni encabezados de FAQ duplicados.

**Nota técnica para contenido futuro:** cualquier `## Preguntas frecuentes` debe ir siempre como la última sección del artículo, y solo debe existir un único encabezado de ese tipo por artículo. `stripFaqSection()` en `lib/posts.ts` descarta todo lo que viene después de ese encabezado al renderizar el cuerpo del artículo (solo lo re-inserta como el bloque de acordeón FAQ vía `getFaqs()`), así que cualquier sección colocada después queda invisible en producción aunque exista en el `.mdx`.

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

## Categoría "Preguntas frecuentes" vacía — resuelta (2026-08-13)

La categoría "Preguntas frecuentes" (`lib/site.ts`, slug `preguntas-frecuentes`) existía en la lista de categorías del sitio desde hace tiempo, pero ningún artículo la usaba — la página `/categorias/preguntas-frecuentes` mostraba "Pronto publicaremos artículos en esta categoría." El propietario detectó esto navegando el sitio.

Se publicó un artículo pilar nuevo para llenarla: `preguntas-frecuentes-sobre-matrimonios-en-crisis.mdx` (categoría "Preguntas frecuentes", 2026-08-13, ~960 palabras). Reúne 11 preguntas comunes y dolorosas que ya aparecían dispersas en distintos artículos del sitio (miedo, sentir que ya no se ama, esfuerzo desigual, perdón, cuándo buscar ayuda profesional, considerar el divorcio, etc.), con respuestas breves y enlaces a los artículos que profundizan cada tema — no duplica el contenido de esos artículos, funciona como punto de entrada/índice temático.

| Keyword | Intención | URL asignada | Tipo de contenido | Etapa del embudo | CTA | Contenidos secundarios | Riesgo de canibalización |
|---|---|---|---|---|---|---|---|
| preguntas frecuentes matrimonio en crisis | Informacional amplia | `/blog/preguntas-frecuentes-sobre-matrimonios-en-crisis` | Pilar | TOFU | Guía gratuita | Enlaza a la mayoría de artículos de "Crisis matrimonial" y "Perdón y reconciliación" | Bajo — es un índice temático, no compite por las mismas keywords long-tail de cada artículo enlazado |

Con esto la categoría deja de estar vacía y ya no debería mostrar el mensaje "Pronto publicaremos artículos en esta categoría" (`app/categorias/[slug]/page.tsx` deja de aplicar `noindex` automáticamente porque `getPostsByCategory(slug).length > 0`).

## Cadencia de publicación y contenido para audiencia católica (2026-08-15)

A petición del propietario, se retoma la publicación de contenido nuevo con un ritmo explícito de **1 artículo cada 2-3 días** (nunca varios el mismo día), variando deliberadamente la estructura de cada uno respecto al anterior — la lección directa del rechazo de AdSense documentado arriba. Se configuró además una rutina automática que retoma este trabajo en ese ritmo (ver notas de sesión).

Se resolvió la oportunidad pendiente marcada como "decisión editorial, no técnica" en la sección de análisis de keywords (2026-07-17): **"matrimonios restaurados católicos"**. El propietario confirmó que sí quiere perseguir esta audiencia.

| Keyword | Intención | URL asignada | Tipo de contenido | Etapa del embudo | CTA | Contenidos secundarios | Riesgo de canibalización |
|---|---|---|---|---|---|---|---|
| matrimonios restaurados católicos | Informacional / identidad de audiencia | `/blog/como-la-fe-catolica-puede-ayudar-a-restaurar-tu-matrimonio` | Satélite | TOFU | Guía gratuita | `oracion-para-restaurar-mi-matrimonio`, `como-restaurar-mi-matrimonio-con-la-ayuda-de-dios`, `terapia-de-pareja-cristiana` | Bajo — es el primer y único artículo del sitio con enfoque doctrinal católico específico |

Contenido publicado (2026-08-15): `como-la-fe-catolica-puede-ayudar-a-restaurar-tu-matrimonio.mdx`, categoría "Restauración matrimonial". Cubre elementos específicamente católicos que el resto del sitio (de tono cristiano genérico/evangélico) no menciona:

- El matrimonio como sacramento según el Catecismo de la Iglesia Católica (CIC 1644, citado textualmente, verificado).
- Mateo 19:6 citado en la traducción de la Biblia de Jerusalén (no RVR1960, para sonar auténtico a la audiencia católica) — texto verificado por búsqueda antes de usarlo.
- Cristo como el único que restaura (Juan 15:5 y Filipenses 4:13, RVR1960, verificados) — no una devoción, programa o esfuerzo propio.
- La confesión y la Eucaristía como fuente de gracia.
- Retrouvaille, programa católico real de acompañamiento a matrimonios en crisis (existencia, origen en Quebec 1977 y alcance verificados) — con nota aclaratoria de que no sustituye ayuda profesional en casos de riesgo.
- FAQ propia sobre nulidad matrimonial vs. divorcio civil, con la aclaración de no ofrecer asesoría canónica — solo orientación general, remitiendo a párroco o canonista para casos concretos.

**Corrección (2026-08-15, mismo día):** la primera versión incluía una sección sobre Santa Mónica como patrona de los matrimonios difíciles. El propietario pidió explícitamente no incluir contenido sobre santos ni intercesión de santos en el sitio — su postura es que únicamente Jesucristo restaura. Se reemplazó esa sección por una centrada en Cristo como fuente de toda restauración, y se retiró "Santa Mónica matrimonio" de las keywords del artículo. **Nota editorial para contenido futuro con enfoque católico:** evitar contenido centrado en devoción a santos; mantener el enfoque cristocéntrico incluso al cubrir elementos específicamente católicos (sacramentos, Catecismo, programas de la Iglesia).

Imagen: Pexels 13983353 (manos en oración con rosario), verificada visualmente antes de usarla.

## Nuevo hueco cubierto: problemas de dinero en el matrimonio (2026-08-18)

Siguiendo la cadencia acordada (1 artículo cada 2-3 días, nunca varios el mismo día), se revisó primero si había PRs de contenido sin mergear (ninguno abierto) y si algún artículo marcado "delgado" en `docs/content-audit.md` seguía siéndolo. Los tres candidatos flagged como delgados (`senales-de-esperanza-en-un-matrimonio-que-dios-esta-restaurando`, `versiculos-para-orar-por-la-restauracion-matrimonial`, `como-reconstruir-la-confianza-despues-de-una-crisis-matrimonial`) ya habían sido ampliados en una ronda anterior (601-701 palabras cada uno) — `content-audit.md` no se había actualizado para reflejarlo. Ningún post del sitio está hoy por debajo de 300 palabras.

Se buscó entonces un ángulo de dolor real sin cobertura: **conflictos de dinero/finanzas en el matrimonio**. Revisando los 56 títulos publicados, ninguno trata el tema directamente (hay menciones de paso en otros artículos, pero ninguna URL dedicada) — es una causa de conflicto matrimonial extremadamente común que el sitio no cubría en absoluto.

| Keyword | Intención | URL asignada | Tipo de contenido | Etapa del embudo | CTA | Contenidos secundarios | Riesgo de canibalización |
|---|---|---|---|---|---|---|---|
| problemas de dinero en el matrimonio | Informacional / crisis | `/blog/como-manejar-los-problemas-de-dinero-en-tu-matrimonio` | Satélite | MOFU | Conocer próximos pasos | `pequenas-acciones-que-pueden-comenzar-una-restauracion-matrimonial`, `oracion-para-restaurar-mi-matrimonio` | Bajo — primer y único artículo del sitio sobre finanzas/dinero en el matrimonio |

## Giro a contenido BOFU para impulsar ventas del programa (2026-08-20)

El propietario pidió explícitamente más contenido estratégico orientado a generar ventas del programa de restauración matrimonial (`restauratumatrimonio.org`, enlace de afiliado vía `siteConfig.hotmartUrl`). Antes de escribir, se auditó el estado del embudo: de ~46 filas de keywords mapeadas en este documento, solo 4 son de intención BOFU real (`consejería matrimonial cristiana`, `terapia de pareja cristiana`, `mentoría matrimonial cristiana`, `programa para restaurar el matrimonio`) — el resto del sitio es contenido TOFU/MOFU de dolor emocional que nunca menciona el programa de pago explícitamente en el cuerpo (aunque todo artículo ya recibe el CTA final vía `FunnelCTA` variant="bottom" automáticamente, sin necesidad de enlace manual en el `.mdx`).

Se decidió con el propietario: priorizar contenido BOFU/de objeción sobre seguir con contenido TOFU de dolor, dado que casi no hay red de contenido apuntando a resolver las dudas de quien ya está considerando el programa. Se identificó la objeción de compra más común y sin cobertura dedicada: **"¿sirve esto si mi cónyuge no quiere participar?"** — la razón #1 por la que alguien no compra un programa de restauración matrimonial, mencionada de pasada en el FAQ de 6 artículos distintos pero sin una pieza propia que la resuelva a fondo y canalice hacia el programa.

| Keyword | Intención | URL asignada | Tipo de contenido | Etapa del embudo | CTA | Contenidos secundarios | Riesgo de canibalización |
|---|---|---|---|---|---|---|---|
| programa de restauración matrimonial si mi esposo no quiere / restaurar matrimonio yo sola | Comercial / objeción de compra | `/blog/sirve-un-programa-de-restauracion-si-mi-conyuge-no-quiere-participar` | Satélite | BOFU | CTA final automático del programa (`FunnelCTA` bottom) | `quien-es-andres-arango-pastor-y-psicologo-de-matrimonios`, `pequenas-acciones-que-pueden-comenzar-una-restauracion-matrimonial` | Bajo — primer artículo del sitio dedicado específicamente a esta objeción de compra |

Contenido publicado: `sirve-un-programa-de-restauracion-si-mi-conyuge-no-quiere-participar.mdx`, categoría "Restauración matrimonial", ~817 palabras. Responde la objeción de frente sin prometer que el cónyuge va a cambiar (ninguna promesa de resultado garantizado, siguiendo la política editorial), apoyado en 1 Corintios 7:14 y 1 Pedro 3:1 (verificados por búsqueda contra RVR1960), con una sección honesta de "lo que ningún programa serio promete" que incluye la nota de seguridad para casos de riesgo/abuso. Enlaza a `quien-es-andres-arango-...` para autoridad, sin duplicar el CTA de Hotmart manualmente en el cuerpo (ya lo recibe automáticamente vía `ArticleLayout`). Imagen: Pexels 5418306 (mujer orando sola en una iglesia), verificada visualmente — la primera imagen candidata (Pexels 1024311, un retrato profesional sin relación con el tema) se descartó tras la verificación visual, antes de usarla.

**Próximos candidatos BOFU si se sigue esta línea:** "cuánto cuesta y vale la pena un programa de restauración matrimonial" (objeción de precio, sin cobertura hoy) y una expansión de testimonios más allá de los 3 breves que ya tiene `/recursos`.

Contenido publicado: `como-manejar-los-problemas-de-dinero-en-tu-matrimonio.mdx`, categoría "Crisis matrimonial", ~937 palabras. Estructura deliberadamente distinta a los últimos 4 artículos publicados (reencuadre inicial → sección en formato de lista con 3 patrones → versículos → paso práctico → cuándo es más que un problema de presupuesto → cierre con enlaces internos integrados en el párrafo, sin encabezado "Ruta recomendada" → FAQ de 3 preguntas). Versículos verificados por búsqueda contra RVR1960 antes de usarlos: Mateo 6:24, 1 Timoteo 6:10, Hebreos 13:5, Proverbios 22:7. Imagen: Pexels 6964105 (pareja revisando cuentas/facturas juntos en la mesa), verificada visualmente — tono serio pero colaborativo, no de desesperación.

## Auditoría SEMrush (2026-08-17) — nueva fuente de verdad para priorización de keywords

El propietario corrió una auditoría de contenido/SEO en Claude web con el conector de SEMrush conectado (base de datos México, complementada con Colombia/España). Reemplaza el análisis de keywords informal usado hasta ahora como criterio principal de priorización — de aquí en adelante, priorizar keywords de esta auditoría (o de auditorías SEMrush futuras) sobre intuición editorial cuando haya conflicto.

**Hallazgo crítico:** el dominio solo tiene 4 keywords rastreadas por SEMrush en México, 1 en Colombia, 0 en España — pese a los ~58 artículos publicados. Authority Score 2/100, 35 backlinks de solo 18 dominios de referencia. Ninguna keyword en página 2 (posición 11-20); las 4 rastreadas están en posición 21-33. Esto confirma lo que ya sabíamos por Search Console (tráfico real todavía mínimo) y añade un dato nuevo: **backlinks/autoridad es tan urgente como contenido nuevo**, no un problema secundario. La auditoría completa (con la lista de ~12 dominios católicos/cristianos de Authority Score 35-62 que enlazan a competidores pero no al sitio, para outreach futuro) quedó solo en el chat con el propietario — no se transcribe aquí completa porque el trabajo de outreach de backlinks no es algo que este equipo técnico pueda ejecutar directamente.

**Optimización on-page (2026-08-20), sin crear contenido nuevo:** la única keyword rastreada cerca de página 2 es "como saber si dios quiere restaurar mi matrimonio" (posición 21, volumen 70, KD29 en la base de México), que ya apuntaba a `senales-de-que-dios-esta-trabajando-en-tu-matrimonio.mdx` — pero la frase exacta no aparecía en ningún lugar del artículo (ni título, ni intro, ni keywords, ni FAQ), solo una variante cercana. Se actualizó sin tocar slug ni título (para no arriesgar el ranking ya ganado):
- `description` reescrita para abrir con la frase exacta.
- Frase exacta agregada como primer ítem de `keywords[]`.
- Intro ajustada de "cómo Dios quiere y va a restaurar tu matrimonio" a "cómo saber si Dios quiere restaurar tu matrimonio" (match más cercano al término real).
- Nueva primera pregunta de FAQ con match exacto: "¿Cómo sé si Dios quiere restaurar mi matrimonio?" — mayor probabilidad de featured snippet / People Also Ask.

**Cola de contenido nuevo priorizada por la auditoría (orden sugerido, pendiente de ejecutar en la cadencia de 1 cada 2-3 días):**

| Orden | Keyword | Vol./mes (MX) | KD% | Por qué |
|---|---|---|---|---|
| 1 | oracion para el matrimonio | 1000 | 20 | Mayor volumen de todo el set, sin cobertura — pieza de oración pilar |
| 2 | oracion por mi matrimonio | 720 | 19 | Segundo mayor volumen, intención/ángulo muy cercano al #1 — evaluar si es artículo propio o subtítulo del #1 para no canibalizar |
| 3 | consejeria matrimonial cristiana | 90 | 9 | KD más bajo del set + CPC más alto (0,38) — mejor puente hacia el programa de pago |
| 4 | retiro para matrimonios en crisis | 110 | 5 | KD casi nulo, prácticamente sin competencia |
| 5 | como salvar mi matrimonio | 110 | 17 | Intención comercial (CPC 0,31), coincide con el nombre del programa afiliado |

Grupo B completo (variantes de "oración...matrimonio", volumen 40-1000, KD 11-25%) y notas de competidores (unidosenoracion.org, hozana.org, aciprensa.com, aleteia.org, avivanuestroscorazones.com) disponibles en el chat con el propietario si se necesita más detalle al escribir cada pieza.

**No hacer:** crear contenido para keywords puramente transaccionales tipo "comprar programa restaurar matrimonio" — la auditoría confirmó volumen 0 en las bases consultadas; toda la conversión en este nicho pasa por contenido informativo con CTA, no por keywords de compra directa.

## Auditoría de enlazado interno (2026-08-22)

Como complemento a la auditoría SEMrush (Authority Score 2/100), se revisó qué se podía mejorar del lado del sitio sin depender de backlinks externos ni de más contenido nuevo. El sitio ya enlaza automáticamente a **todos** los posts desde `/blog` (sin paginación, `BlogExplorer` renderiza el listado completo), desde cada página de categoría (`getPostsByCategory`, sin límite), y desde "Artículos relacionados" (hasta 3 por post, misma categoría) — así que ningún post está técnicamente "huérfano" para el rastreo de Google. Pero un script que cuenta enlaces **manuales dentro del cuerpo** de cada artículo (los que Google pesa más, por ser contextuales) encontró que **20 de los 59 posts no tenían ningún enlace entrante manual** desde otro artículo, solo aparecían en esos listados automáticos.

Se agregó un enlace contextual natural hacia cada uno de los 20, insertado en el cierre de un artículo temáticamente relacionado que ya existía (sin crear contenido nuevo, sin usar el encabezado fijo "Ruta recomendada" en los artículos que no lo tenían ya). Los 20 resueltos: `como-la-fe-catolica-puede-ayudar-a-restaurar-tu-matrimonio`, `preguntas-frecuentes-sobre-matrimonios-en-crisis`, `como-orar-cuando-mi-matrimonio-esta-destruido`, `oracion-por-mi-esposa-en-tiempos-de-crisis`, `oracion-por-mi-esposo-para-que-dios-toque-su-corazon`, `dios-restaura-tu-matrimonio-guia-pdf-gratis`, `como-manejar-los-problemas-de-dinero-en-tu-matrimonio`, `sirve-un-programa-de-restauracion-si-mi-conyuge-no-quiere-participar`, `testimonios-reales-de-matrimonios-restaurados`, `consejos-para-esposas-cristianas-en-crisis-matrimonial`, `consejos-para-esposos-cristianos-en-crisis-matrimonial`, `mi-esposa-dice-que-ya-no-me-ama`, `mi-esposo-ya-no-quiere-seguir-que-hago`, `que-dice-la-biblia-sobre-restaurar-un-matrimonio`, `que-hacer-cuando-tu-pareja-te-trata-con-indiferencia`, `sentimos-que-somos-companeros-de-cuarto-no-esposos`, `oracion-para-el-matrimonio`, `errores-que-debes-evitar-al-intentar-restaurar-tu-matrimonio`, `un-matrimonio-sano-no-es-perfecto-es-restaurable`, `tengo-miedo-de-que-mi-matrimonio-termine`.

Nota: el pilar `oracion-para-restaurar-mi-matrimonio` ya afirmaba en la tabla de este documento (fila "oración por un matrimonio en crisis") enlazar a `oracion-por-mi-esposa-en-tiempos-de-crisis` y `oracion-por-mi-esposo-para-que-dios-toque-su-corazon` como "contenidos secundarios" — pero el enlace real nunca se había agregado al `.mdx`. Quedó corregido en esta ronda; vale la pena, a futuro, tratar esta tabla como intención documentada y no como confirmación de que el enlace ya existe en el contenido.

**Bug encontrado de paso (no relacionado con enlazado):** `pequenas-acciones-que-pueden-comenzar-una-restauracion-matrimonial.mdx` tenía 4 preguntas de FAQ con el encabezado duplicado `### ###` (ej. `### ### ¿Cuánto tiempo tarda en restaurarse un matrimonio?`), lo que hacía que el "###" literal apareciera en el texto de la pregunta tanto en el acordeón de FAQ como en el schema `FAQPage` (`getFaqs()` en `lib/posts.ts` solo recorta el primer grupo de 2-4 `#`, no un segundo grupo pegado). Corregido a un solo `###` en las 4 preguntas.

**Script usado (no versionado, ejecutado ad-hoc):** recorre `content/posts/*.mdx`, extrae el cuerpo sin frontmatter de cada post, y cuenta cuántas veces aparece `(/blog/<slug>` de cada otro post dentro de ese cuerpo. Útil para repetir esta auditoría cada cierto tiempo a medida que se publique contenido nuevo.
