import type { Metadata } from "next";
import Link from "next/link";
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
          Los artículos combinan lecturas bíblicas, ejemplos cotidianos y propuestas educativas.
          Algunos textos se preparan con apoyo de herramientas de IA. Esa ayuda no convierte el
          contenido en consejo clínico ni reemplaza la comprobación de fuentes y la corrección de
          errores antes y después de publicar.
        </p>

        <h2>Autoría y responsabilidad</h2>
        <p>
          Los artículos se publican bajo la autoría de Andy Rosado, quien responde por su
          contenido. Puedes ver quién escribe en la sección{" "}
          <Link href="/sobre-nosotros#autor">Sobre nosotros</Link>.
        </p>

        <h2>Cómo comprobamos las referencias bíblicas</h2>
        <p>
          Buscamos indicar el pasaje que inspira cada reflexión y distinguir una paráfrasis de una
          cita literal. Si encuentras una referencia imprecisa o fuera de contexto, avísanos para
          revisarla y corregirla.
        </p>

        <h2>Cómo se revisan los contenidos antes de publicarse</h2>
        <p>
          La firma del proyecto identifica al responsable de publicación, pero no implica revisión
          por un terapeuta o pastor individual. Solo atribuimos revisión especializada cuando
          podemos identificar al profesional y su función. Las comprobaciones técnicas del sitio
          ayudan a detectar fallas de código; no certifican la exactitud de cada consejo.
        </p>

        <h2>Cómo corregimos errores</h2>
        <p>
          Si detectamos —o nos reportan— un error de contenido, doctrina, cita bíblica o dato, lo
          revisamos en el artículo correspondiente. Puedes reportarlo desde la página de contacto.
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
          No publicamos citas de personas anónimas como prueba de resultados. Antes de incorporar
          una historia personal, debemos poder verificar su origen y contar con permiso para
          compartirla. Cuando enlazamos testimonios que publica un programa externo, indicamos su
          fuente y su contexto comercial; no afirmamos haber verificado esos casos de forma
          independiente. Una experiencia individual nunca garantiza el resultado de otra pareja.
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
