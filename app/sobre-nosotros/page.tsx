import type { Metadata } from "next";
import Link from "next/link";
import { buildCanonicalUrl } from "@/lib/seo";
import { CTABox } from "@/components/CTABox";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Restaura Tu Matrimonio nace como un espacio cristiano de esperanza para matrimonios que atraviesan crisis, distancia emocional o heridas profundas.",
  alternates: {
    canonical: buildCanonicalUrl("/sobre-nosotros"),
  },
};

export default function AboutPage() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre nosotros",
    url: buildCanonicalUrl("/sobre-nosotros"),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={aboutPageSchema} />
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Sobre nosotros</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold leading-tight text-[#5A0F18]">
        Un espacio cristiano de esperanza para matrimonios en crisis
      </h1>
      <div className="mt-8 grid gap-6 text-lg leading-8 text-[#1F1F1F]/75">
        <p>
          Restaura Tu Matrimonio nace como un espacio cristiano de esperanza para matrimonios que
          atraviesan crisis, distancia emocional o heridas profundas.
        </p>
        <p>
          Nuestro propósito es compartir recursos bíblicos, oraciones, enseñanzas y herramientas
          prácticas que ayuden a las parejas a mirar su proceso con fe, humildad y responsabilidad.
        </p>
        <p>
          Creemos que Dios puede obrar restauración, pero también creemos en la importancia de
          buscar ayuda sabia, acompañamiento pastoral y apoyo profesional cuando la situación lo
          requiere.
        </p>
      </div>

      <h2 className="mt-12 font-[var(--font-display)] text-3xl font-bold text-[#5A0F18]">
        Detrás del programa que recomendamos
      </h2>
      <div className="mt-4 grid gap-6 text-lg leading-8 text-[#1F1F1F]/75">
        <p>
          Este blog es un recurso independiente de contenido gratuito. Cuando recomendamos un
          acompañamiento más estructurado, apuntamos al programa de{" "}
          <Link href="/blog/quien-es-andres-arango-pastor-y-psicologo-de-matrimonios" className="underline decoration-[#D4AF37]/60 underline-offset-2">
            Andrés Arango
          </Link>
          , pastor y psicólogo clínico con más de 20 años acompañando a parejas en crisis. No
          somos la misma organización — puedes leer quién es y en qué se basa su método antes de
          decidir si es para ti.
        </p>
      </div>

      <h2 className="mt-12 font-[var(--font-display)] text-3xl font-bold text-[#5A0F18]">
        Cómo trabajamos el contenido
      </h2>
      <div className="mt-4 grid gap-6 text-lg leading-8 text-[#1F1F1F]/75">
        <p>
          Cada cita o referencia bíblica se contrasta con el pasaje original antes de publicarse, y
          ningún artículo sale al aire sin pasar por revisión editorial. Puedes leer el detalle
          completo de cómo investigamos, revisamos y actualizamos el contenido en nuestra{" "}
          <Link href="/politica-editorial" className="underline decoration-[#D4AF37]/60 underline-offset-2">
            política editorial
          </Link>
          .
        </p>
      </div>

      <div className="mt-10">
        <CTABox />
      </div>
    </section>
  );
}
