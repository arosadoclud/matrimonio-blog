import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { CTABox } from "@/components/CTABox";
import { FeaturedPost } from "@/components/FeaturedPost";
import { Hero } from "@/components/Hero";
import { NewsletterBox } from "@/components/NewsletterBox";
import { getAllPosts, getPillarPosts } from "@/lib/posts";
import { categories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Restauración matrimonial cristiana, oración y reconciliación",
  description:
    "Dios puede restaurar tu matrimonio. Encuentra artículos cristianos sobre oración, perdón, reconciliación, crisis de pareja y restauración familiar."
};

export default function HomePage() {
  const posts = getAllPosts();
  const pillarPosts = getPillarPosts();
  const [featuredPost, ...recentPosts] = posts;

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Empieza aquí</p>
            <h2 className="mt-2 font-[var(--font-display)] text-4xl font-bold text-[#5A0F18]">
              Una ruta clara si tu matrimonio está en crisis
            </h2>
            <p className="mt-4 leading-7 text-[#1F1F1F]/70">
              Si llegaste con dolor, empieza por estas tres guías. Están pensadas para ordenar el
              corazón, orar con dirección y entender el perdón bíblico sin negar la realidad.
            </p>
            <Link
              href="/newsletter"
              className="mt-6 inline-flex rounded-full bg-[#5A0F18] px-6 py-3 text-sm font-semibold text-white"
              data-event="cta_click"
              data-label="home_empieza_aqui_newsletter"
            >
              Recibir guía gratuita
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {pillarPosts.slice(0, 3).map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-[8px] border border-[#D4AF37]/35 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a18]">
                  Pilar {index + 1}
                </span>
                <h3 className="mt-3 font-[var(--font-display)] text-2xl font-bold leading-tight text-[#5A0F18]">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#1F1F1F]/64">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Categorías</p>
            <h2 className="mt-2 font-[var(--font-display)] text-4xl font-bold text-[#5A0F18]">
              Encuentra guía para tu proceso
            </h2>
          </div>
          <Link href="/blog" className="hidden text-sm font-bold text-[#5A0F18] sm:inline">
            Ver artículos
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className="rounded-[8px] border border-[#D4AF37]/35 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="font-[var(--font-display)] text-2xl font-bold text-[#5A0F18]">{category.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#1F1F1F]/64">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-[#FFF7E8] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {featuredPost ? <FeaturedPost post={featuredPost} /> : null}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <CTABox />
        <NewsletterBox />
      </section>
      <section className="border-t border-[#5A0F18]/10 bg-white px-4 py-12 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Confianza</p>
        <h2 className="mt-2 font-[var(--font-display)] text-4xl font-bold text-[#5A0F18]">
          Contenido basado en principios bíblicos
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#1F1F1F]/68">
          Cada artículo busca acompañarte con esperanza, responsabilidad y una mirada cristiana
          centrada en la reconciliación, el perdón y la restauración familiar.
        </p>
      </section>
    </>
  );
}
