import type { Metadata } from "next";
import { BlogExplorer } from "@/components/BlogExplorer";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog de restauración matrimonial cristiana",
  description:
    "Artículos cristianos sobre restauración matrimonial, oración por el matrimonio, perdón, reconciliación, comunicación y crisis de pareja."
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Blog</p>
        <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
          Artículos para restaurar, sanar y volver a construir
        </h1>
        <p className="mt-4 leading-7 text-[#1F1F1F]/70">
          Explora recursos cristianos preparados para matrimonios que atraviesan crisis, distancia
          emocional o procesos de reconciliación.
        </p>
      </div>
      <div className="mt-10">
        <BlogExplorer posts={posts} categories={categories} />
      </div>
    </section>
  );
}
