import type { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política Editorial",
  description:
    "Cómo investigamos, revisamos y actualizamos el contenido de Restaura Tu Matrimonio, y qué diferencia hay entre orientación espiritual, mentoría, terapia y atención profesional.",
  alternates: {
    canonical: buildCanonicalUrl("/politica-editorial"),
  },
};

export default function EditorialPolicyPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Política Editorial",
    url: buildCanonicalUrl("/politica-editorial"),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={pageSchema} />
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Transparencia</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Política Editorial
      </h1>
      <div className="prose-article mt-8">
        <p>
          Esta página explica cómo se investiga, revisa, corrige y actualiza el contenido de
          Restaura Tu Matrimonio, y qué limitaciones tiene.
        </p>

        <h2>Cómo investigamos y escribimos los artículos</h2>
        <p>
          El contenido combina principios bíblicos, experiencia pastoral y de acompañamiento
          matrimonial, y recursos de orientación cristiana ya existentes en el ministerio. Parte del
          contenido se produce internamente y parte se genera con apoyo de herramientas de IA a
          través de un flujo editorial (ver más abajo), pero ningún artículo se publica sin pasar
          primero por una revisión.
        </p>

        <h2>Cómo comprobamos las referencias bíblicas</h2>
        <p>
          Cada cita o referencia bíblica se contrasta con el pasaje original antes de publicarse,
          para evitar sacarla de contexto o atribuirle un significado que el texto no tiene.
        </p>

        <h2>Cómo se revisan los contenidos antes de publicarse</h2>
        <p>
          Todo artículo nuevo se integra a este sitio mediante un Pull Request en el repositorio del
          blog. Antes de poder publicarse, ese Pull Request pasa por revisión humana y por
          validaciones automáticas (lint, verificación de tipos, pruebas automatizadas y build de
          producción). Mientras el Pull Request no se apruebe y fusione, el artículo no está
          publicado. Cuando un artículo fue revisado además por una persona con formación pastoral o
          profesional específica, esto se indica en el propio artículo como &quot;Revisado por&quot;.
        </p>

        <h2>Cómo corregimos errores</h2>
        <p>
          Si detectamos —o nos reportan— un error de contenido, doctrina, cita bíblica o dato, lo
          corregimos directamente en el artículo correspondiente mediante una nueva revisión del
          mismo proceso de Pull Request y CI descrito arriba.
        </p>

        <h2>Cómo actualizamos publicaciones</h2>
        <p>
          La fecha de actualización de un artículo solo cambia cuando su contenido fue realmente
          modificado de forma sustancial. No actualizamos fechas de forma automática ni artificial
          para simular que un artículo es más reciente de lo que es.
        </p>

        <h2>Cómo usamos fuentes externas</h2>
        <p>
          Cuando un artículo hace una afirmación que depende de una fuente externa (no bíblica ni de
          experiencia propia del ministerio), buscamos identificar esa fuente en el texto o mediante
          un enlace. No presentamos estadísticas ni afirmaciones de terceros como hechos verificados
          sin poder respaldarlas.
        </p>

        <h2>Cómo manejamos los testimonios</h2>
        <p>
          Los testimonios que compartimos corresponden a experiencias reales de personas que
          participaron del acompañamiento del ministerio, e incluyen enlace a la fuente original
          cuando está disponible en video. Ningún testimonio garantiza que otro matrimonio obtendrá
          el mismo resultado, y lo decimos explícitamente donde se presentan.
        </p>

        <h2>Cómo identificamos enlaces comerciales o de afiliado</h2>
        <p>
          Cuando un artículo o página incluye un enlace hacia un recurso, programa o producto de
          pago, buscamos que el contexto deje claro que es una recomendación con posible interés
          comercial. El detalle completo está en nuestra{" "}
          <a href="/afiliados">Política de Afiliados</a>.
        </p>

        <h2>Limitaciones de este contenido</h2>
        <p>
          El contenido de este sitio es informativo, devocional y educativo. No constituye consejo
          médico, psicológico, legal o financiero individualizado, y no reemplaza una evaluación
          profesional de tu situación particular.
        </p>

        <h2>Orientación espiritual, mentoría, terapia y atención profesional: no son lo mismo</h2>
        <ul>
          <li>
            <strong>Orientación espiritual</strong>: acompañamiento basado en principios bíblicos y
            oración, como el que ofrecen los artículos de este blog.
          </li>
          <li>
            <strong>Mentoría o programa de acompañamiento</strong>: un proceso más estructurado, con
            pasos y seguimiento, orientado a un objetivo concreto (como el programa al que este blog
            enlaza).
          </li>
          <li>
            <strong>Terapia o consejería profesional</strong>: intervención realizada por un
            profesional licenciado en salud mental o consejería, con formación clínica específica.
          </li>
          <li>
            <strong>Atención profesional de emergencia</strong>: en casos de violencia, abuso o
            riesgo inmediato, se requiere ayuda de autoridades o servicios de emergencia locales, no
            solo acompañamiento espiritual o mentoría (ver la advertencia de seguridad en los
            artículos donde corresponde).
          </li>
        </ul>
        <p>
          Ningún contenido de este sitio, ni el programa al que enlaza, sustituye la atención
          profesional cuando esta es necesaria.
        </p>
      </div>
    </section>
  );
}
