import type { Metadata } from "next";
import Link from "next/link";
import { categories, siteConfig } from "@/lib/site";
import { ensureMetaDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Categorías de restauración matrimonial",
  description: ensureMetaDescription(
    "Explora temas cristianos sobre restauración matrimonial, oración, perdón, crisis de pareja, comunicación y consejos bíblicos."
  ),
  alternates: {
    canonical: `${siteConfig.url}/categorias`,
  },
};

export default function CategoriesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Categorías</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Temas para acompañar tu proceso
      </h1>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categorias/${category.slug}`}
            className="rounded-[8px] border border-[#D4AF37]/35 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="font-[var(--font-display)] text-2xl font-bold text-[#5A0F18]">{category.name}</h2>
            <p className="mt-3 text-sm leading-6 text-[#1F1F1F]/65">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
