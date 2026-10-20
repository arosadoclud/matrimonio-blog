import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/types/post";
import { CategoryBadge } from "@/components/CategoryBadge";

export function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <article className="grid overflow-hidden rounded-[8px] border border-[#713f50]/10 bg-white shadow-lg lg:grid-cols-[1fr_1fr]">
      <div className="relative min-h-[280px]">
        <Image
          src={post.image}
          alt={`Portada del artículo ${post.title}`}
          fill
          priority
          quality={70}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
        />
      </div>
      <div className="p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex w-fit items-center rounded-full bg-[#f7f1e9] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#86604f]">
            Destacado · Más leído
          </span>
          <CategoryBadge category={post.category} />
        </div>
        <h2 className="mt-5 font-[var(--font-display)] text-4xl font-bold leading-tight text-[#713f50]">
          {post.title}
        </h2>
        <p className="mt-4 leading-7 text-[#263a31]/70">{post.description}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-7 inline-flex rounded-full bg-[#713f50] px-6 py-3 text-sm font-semibold text-white"
        >
          Leer artículo
        </Link>
      </div>
    </article>
  );
}
