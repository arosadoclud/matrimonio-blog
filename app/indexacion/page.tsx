import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indexación y medición",
  description:
    "Guía interna para activar Google Search Console, enviar sitemap, configurar GA4 y medir conversiones del blog.",
  robots: {
    index: false,
    follow: false
  }
};

export default function IndexingPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Interno</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Indexación y medición
      </h1>
      <div className="prose-article mt-8">
        <h2>Google Search Console</h2>
        <p>
          Crea una propiedad de dominio para restauratumatrimonio.org. Copia el código de
          verificación HTML y guárdalo en Vercel como NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.
        </p>
        <h2>Enviar sitemap</h2>
        <p>
          Después de verificar el dominio, entra a Sitemaps en Search Console y envía:
          https://restauratumatrimonio.org/sitemap.xml.
        </p>
        <h2>GA4</h2>
        <p>
          Crea una propiedad GA4, copia el Measurement ID con formato G-XXXXXXXXXX y guárdalo en
          Vercel como NEXT_PUBLIC_GA_ID.
        </p>
        <h2>Eventos ya preparados</h2>
        <p>
          El sitio ya mide clics en CTA, suscripción al newsletter y profundidad de scroll al 25%,
          50%, 75% y 90% cuando GA4 está configurado.
        </p>
      </div>
    </section>
  );
}
