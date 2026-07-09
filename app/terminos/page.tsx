import type { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos de uso de Restaura Tu Matrimonio, contenido informativo, responsabilidades y enlaces externos."
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Legal</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Términos y Condiciones
      </h1>
      <div className="prose-article mt-8">
        <p>
          Al usar {siteConfig.name}, aceptas estos términos generales. El contenido se ofrece con
          fines informativos, devocionales y educativos.
        </p>
        <h2>Contenido informativo</h2>
        <p>
          Los artículos no sustituyen consejería profesional, terapia, asesoría legal, ayuda médica
          ni acompañamiento pastoral directo. En situaciones de abuso, violencia o riesgo, busca
          ayuda especializada de inmediato.
        </p>
        <h2>Uso del sitio</h2>
        <p>
          Puedes leer, compartir y enlazar nuestros contenidos respetando la autoría y evitando usos
          engañosos, ofensivos o contrarios al propósito del sitio.
        </p>
        <h2>Enlaces externos</h2>
        <p>
          Podemos enlazar recursos, productos o sitios externos. No controlamos sus políticas,
          precios, disponibilidad ni contenidos.
        </p>
      </div>
    </section>
  );
}
