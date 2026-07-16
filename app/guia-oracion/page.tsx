import type { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/seo";
import { NewsletterBox } from "@/components/NewsletterBox";

export const metadata: Metadata = {
  title: "7 días de oración por la restauración de tu matrimonio",
  description:
    "Lead magnet cristiano preparado para acompañarte con oración, reflexión bíblica y pasos prácticos durante siete días.",
  alternates: {
    canonical: buildCanonicalUrl("/guia-oracion"),
  },
};

export default function PrayerGuidePage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Guía gratuita</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold leading-tight text-[#5A0F18]">
        7 días de oración por la restauración de tu matrimonio
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[#1F1F1F]/72">
        Una secuencia devocional pensada para orar con calma, ordenar el corazón y dar pasos
        pequeños de obediencia, perdón y esperanza.
      </p>
      <div className="mt-10">
        <NewsletterBox />
      </div>
    </section>
  );
}
