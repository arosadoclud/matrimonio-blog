import type { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de Afiliados",
  description:
    "Aviso de afiliados de Restaura Tu Matrimonio: transparencia sobre recomendaciones, Hotmart y posibles comisiones.",
  alternates: {
    canonical: buildCanonicalUrl("/afiliados"),
  },
};

export default function AffiliatesPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Transparencia</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Política de Afiliados
      </h1>
      <div className="prose-article mt-8">
        <p>
          Restaura Tu Matrimonio puede recomendar recursos, cursos, libros digitales o programas de
          terceros mediante enlaces de afiliado.
        </p>
        <h2>Qué significa esto</h2>
        <p>
          Si decides comprar desde uno de nuestros enlaces, podríamos recibir una comisión sin costo
          adicional para ti. Esta comisión ayuda a sostener el sitio y la creación de contenido.
        </p>
        <h2>Criterio editorial</h2>
        <p>
          Buscamos recomendar recursos coherentes con una visión cristiana de restauración,
          responsabilidad, esperanza y cuidado familiar.
        </p>
        <h2>Tu decisión</h2>
        <p>
          Te animamos a revisar cada recurso con discernimiento, oración y, cuando corresponda, con
          consejo pastoral o profesional.
        </p>
      </div>
    </section>
  );
}
