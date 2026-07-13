import Image from "next/image";
import { AdSlot } from "@/components/AdSlot";
import { AuthorBox } from "@/components/AuthorBox";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FunnelCTA } from "@/components/FunnelCTA";
import { CategoryBadge } from "@/components/CategoryBadge";
import { MdxContent } from "@/components/MdxContent";
import { RelatedArticles } from "@/components/RelatedArticles";
import { VerseBox } from "@/components/VerseBox";
import { ViewContentTracker } from "@/components/ViewContentTracker";
import { getTableOfContents } from "@/lib/posts";
import { slugify } from "@/lib/site";
import type { Post } from "@/types/post";

type ArticleLayoutProps = {
  post: Post;
  relatedPosts: Post[];
};

export function ArticleLayout({ post, relatedPosts }: ArticleLayoutProps) {
  const toc = getTableOfContents(post.content);

  return (
    <article>
      <ViewContentTracker contentName={post.title} contentCategory={post.category} />
      <section className="bg-[#FFF7E8]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.category, href: `/categorias/${slugify(post.category)}` },
              { label: post.title }
            ]}
          />
          <div className="mt-6">
            <CategoryBadge category={post.category} />
          </div>
          <h1 className="mt-5 font-[var(--font-display)] text-5xl font-bold leading-tight text-[#5A0F18] sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#1F1F1F]/72">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-[#1F1F1F]/55">
            <span>{new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(new Date(post.date))}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>{post.author}</span>
            {post.reviewedBy ? (
              <>
                <span>•</span>
                <span>Revisado por {post.reviewedBy}</span>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/8] overflow-hidden rounded-[8px]">
          <Image
            src={post.image}
            alt={`Portada del artículo ${post.title}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {toc.length > 0 ? (
          <details className="mt-8 rounded-[8px] border border-[#5A0F18]/10 bg-white p-5 shadow-sm lg:hidden">
            <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.14em] text-[#8a6a18]">
              En este artículo
            </summary>
            <nav className="mt-4 grid max-h-80 gap-2 overflow-y-auto pr-1 text-sm leading-6 text-[#1F1F1F]/70">
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="hover:text-[#5A0F18]">
                  {item.text}
                </a>
              ))}
            </nav>
          </details>
        ) : null}
        <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <div className="max-h-none overflow-visible rounded-[8px] border border-[#5A0F18]/10 bg-white p-5 shadow-sm lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8a6a18]">
                En este artículo
              </p>
              <nav className="mt-4 grid gap-2 pr-1 text-sm leading-6 text-[#1F1F1F]/70">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="hover:text-[#5A0F18]">
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
          <div>
            <div className="mt-2">
              <FunnelCTA variant="top" />
            </div>
            <VerseBox />
            <AdSlot className="mt-8" label="Anuncio recomendado" />
            <div className="prose-article mt-8">
              <MdxContent source={post.content} />
            </div>
            <AdSlot className="mt-10" label="Anuncio de mitad de artículo" />
            <div className="mt-10">
              <FunnelCTA variant="middle" topic={post.category} slug={post.slug} />
            </div>
            <div className="mt-10">
              <AuthorBox />
            </div>
            <div className="mt-10">
              <FunnelCTA variant="bottom" />
            </div>
            <AdSlot className="mt-10" label="Anuncio final" />
          </div>
        </div>
        <RelatedArticles posts={relatedPosts} />
      </div>
    </article>
  );
}
