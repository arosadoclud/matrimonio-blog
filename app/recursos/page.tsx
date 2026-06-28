import type { Metadata } from "next";
import { NewsletterBox } from "@/components/NewsletterBox";
import { ResourceCard } from "@/components/ResourceCard";

export const metadata: Metadata = {
  title: "Recursos recomendados para restaurar tu matrimonio",
  description:
    "Conoce recursos cristianos recomendados para matrimonios que buscan oración, reconciliación, perdón y restauración familiar."
};

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <ResourceCard />
      <div className="mt-8">
        <NewsletterBox />
      </div>
    </section>
  );
}
