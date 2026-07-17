import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getPostsByCategory } from "@/lib/posts";
import { categories, siteConfig } from "@/lib/site";
import { buildCanonicalUrl, ensureMetaDescription } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return {};
  }

  const hasPosts = getPostsByCategory(slug).length > 0;

  return {
    // { absolute } opts out of the root layout's title.template
    // ("%s | Restaura Tu Matrimonio"), which would otherwise double-append
    // the brand suffix on top of the one built here.
    title: { absolute: `${category.name} | ${siteConfig.name}` },
    description: ensureMetaDescription(category.description),
    alternates: { canonical: buildCanonicalUrl(`/categorias/${category.slug}`) },
    // Categorías sin artículos publicados aún no deben indexarse (contenido insuficiente).
    robots: hasPosts ? undefined : { index: false, follow: true },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug);
  const categoryUrl = `${siteConfig.url}/categorias/${category.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteConfig.url
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categorías",
        item: `${siteConfig.url}/categorias`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: categoryUrl
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Categorías", href: "/categorias" },
            { label: category.name }
          ]}
        />
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Categoría</p>
        <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
          {category.name}
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-[#1F1F1F]/70">
          {category.intro ?? category.description}
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        {posts.length === 0 ? (
          <p className="mt-10 rounded-[8px] bg-[#FFF7E8] p-6 text-[#1F1F1F]/70">
            Pronto publicaremos artículos en esta categoría.
          </p>
        ) : null}
      </section>
    </>
  );
}
