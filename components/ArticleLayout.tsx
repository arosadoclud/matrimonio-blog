import Image from "next/image";
import Link from "next/link";
import { AuthorBox, authorInitials } from "@/components/AuthorBox";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryBadge } from "@/components/CategoryBadge";
import { FaqSection } from "@/components/FaqSection";
import { MdxContent } from "@/components/MdxContent";
import { ReadingProgress } from "@/components/ReadingProgress";
import { RelatedArticles } from "@/components/RelatedArticles";
import { VerseBox } from "@/components/VerseBox";
import { ViewContentTracker } from "@/components/ViewContentTracker";
import { getFaqs, getTableOfContents, stripFaqSection } from "@/lib/posts";
import { authorConfig, slugify } from "@/lib/site";
import type { Post } from "@/types/post";

type ArticleLayoutProps = {
  post: Post;
  relatedPosts: Post[];
};

export function ArticleLayout({ post, relatedPosts }: ArticleLayoutProps) {
  const toc = getTableOfContents(post.content);
  const faqs = getFaqs(post.content);
  const bodyWithoutFaqs = stripFaqSection(post.content);
  const dateFormat = new Intl.DateTimeFormat("es", { dateStyle: "long", timeZone: "UTC" });
  const showUpdated = Boolean(post.updated) && post.updated !== post.date;

  return (
    <article id="articulo">
      <ReadingProgress />
      <ViewContentTracker contentName={post.title} contentCategory={post.category} />
      <section className="border-b border-[#e4d9cb] bg-[#f7f1e9]">
        <div className="mx-auto max-w-4xl px-4 py-11 sm:px-6 lg:px-8 lg:py-14">
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
          <h1 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-[1.08] text-[#263a31] sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#263a31]/72">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-[#59655e]">
            <Link
              href={authorConfig.url}
              className="inline-flex items-center gap-2 text-[#713f50] hover:underline"
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#86604f] bg-[#713f50] text-xs font-bold text-[#f7f1e9]"
              >
                {authorInitials(post.author)}
              </span>
              <span>Por {post.author}</span>
            </Link>
            <span aria-hidden="true">•</span>
            <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime}</span>
            {showUpdated && post.updated ? (
              <>
                <span aria-hidden="true">•</span>
                <time
                  dateTime={post.updated}
                  className="rounded-full bg-[#86604f]/20 px-3 py-0.5 text-[#6b5210]"
                >
                  Actualizado el {dateFormat.format(new Date(post.updated))}
                </time>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-[#e4d9cb]">
          <Image
            src={post.image}
            alt={`Portada del artículo ${post.title}`}
            fill
            priority
            quality={70}
            sizes="100vw"
            className="object-cover"
            style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
          />
        </div>
        {toc.length > 0 ? (
          <details className="mt-8 rounded-[8px] border border-[#713f50]/10 bg-white p-5 shadow-sm lg:hidden">
            <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.14em] text-[#86604f]">
              En este artículo
            </summary>
            <nav className="mt-4 grid max-h-80 gap-2 overflow-y-auto pr-1 text-sm leading-6 text-[#263a31]/70">
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="hover:text-[#713f50]">
                  {item.text}
                </a>
              ))}
            </nav>
          </details>
        ) : null}
        <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <div className="max-h-none overflow-visible rounded-[8px] border border-[#713f50]/10 bg-white p-5 shadow-sm lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#86604f]">
                En este artículo
              </p>
              <nav className="mt-4 grid gap-2 pr-1 text-sm leading-6 text-[#263a31]/70">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="hover:text-[#713f50]">
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
          <div>
            <VerseBox category={post.category} />
            <div className="prose-article mt-8">
              <MdxContent source={bodyWithoutFaqs} />
            </div>
            <FaqSection faqs={faqs} />
            <aside className="mt-12 rounded-[1.5rem] bg-[#e8ede7] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3e5a49]">Llévalo a la práctica</p>
              {post.category === "Comunicación en pareja" ? (
                <>
                  <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[#263a31]">Prepara una conversación con calma</h2>
                  <p className="mt-3 leading-7 text-[#4c594f]">Si puedes hablar con seguridad, escribe qué necesitas decir, una petición concreta y cuándo conviene hacer una pausa. La hoja de trabajo es gratuita y se queda en tu navegador.</p>
                  <Link href="/herramientas/primera-conversacion" className="mt-5 inline-flex text-sm font-bold text-[#263a31] underline underline-offset-4">Abrir hoja de trabajo</Link>
                </>
              ) : (
                <>
                  <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[#263a31]">Elige un siguiente paso adecuado</h2>
                  <p className="mt-3 leading-7 text-[#4c594f]">Compara una herramienta gratuita, apoyo profesional y recursos externos. Si hay amenazas o control, prioriza tu seguridad y busca orientación especializada individual.</p>
                  <Link href="/recursos" className="mt-5 inline-flex text-sm font-bold text-[#263a31] underline underline-offset-4">Ver opciones de ayuda</Link>
                </>
              )}
            </aside>
            <div className="mt-10">
              <AuthorBox />
            </div>
          </div>
        </div>
        <RelatedArticles posts={relatedPosts} />
      </div>
    </article>
  );
}
