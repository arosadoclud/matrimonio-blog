import type { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad de Restaura Tu Matrimonio: uso de datos, cookies, analítica, publicidad y contacto.",
  alternates: {
    canonical: buildCanonicalUrl("/privacidad"),
  },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Legal</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Política de Privacidad
      </h1>
      <div className="prose-article mt-8">
        <p>
          En {siteConfig.name} respetamos tu privacidad. Esta política explica qué información
          podemos recopilar y cómo la usamos para mejorar la experiencia del sitio.
        </p>
        <h2>Información que podemos recopilar</h2>
        <p>
          Podemos recibir datos que envías voluntariamente mediante formularios, suscripciones o
          mensajes de contacto, como nombre, correo electrónico y contenido del mensaje.
        </p>
        <h2>Cookies, analítica y publicidad</h2>
        <p>
          Este sitio puede usar cookies, herramientas de analítica y plataformas publicitarias como
          Google AdSense para medir visitas, mejorar contenidos y mostrar anuncios relevantes.
        </p>
        <h2>Enlaces de afiliado</h2>
        <p>
          Algunas páginas pueden contener enlaces de afiliado. Si compras desde esos enlaces,
          podríamos recibir una comisión sin costo adicional para ti.
        </p>
        <h2>Contacto</h2>
        <p>
          Para consultas sobre privacidad puedes escribirnos desde la página de contacto de este
          sitio.
        </p>
      </div>
    </section>
  );
}
