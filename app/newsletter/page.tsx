import type { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/seo";
import { NewsletterBox } from "@/components/NewsletterBox";

export const metadata: Metadata = {
  title: "Newsletter cristiana para restauración matrimonial",
  description:
    "Suscríbete para recibir la guía 7 días de oración por la restauración de tu matrimonio y nuevos recursos cristianos.",
  alternates: {
    canonical: buildCanonicalUrl("/newsletter"),
  },
};

export default function NewsletterPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#86604f]">Newsletter</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-semibold leading-tight text-[#263a31]">
        Recibe recursos de oración, perdón y restauración matrimonial
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[#263a31]/72">
        Únete para recibir contenido devocional, nuevos artículos y la guía “7 días de oración por
        la restauración de tu matrimonio”.
      </p>
      <div className="mt-10">
        <NewsletterBox />
      </div>
    </section>
  );
}
