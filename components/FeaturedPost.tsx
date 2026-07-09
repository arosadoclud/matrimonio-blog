import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/types/post";
import { CategoryBadge } from "@/components/CategoryBadge";

export function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <article className="grid overflow-hidden rounded-[8px] border border-[#5A0F18]/10 bg-white shadow-lg lg:grid-cols-[1fr_1fr]">
      <div className="relative min-h-[280px]">
        <Image
          src={post.image}
          alt={`Portada del artículo ${post.title}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-7 sm:p-10">
        <CategoryBadge category={post.category} />
        <h2 className="mt-5 font-[var(--font-display)] text-4xl font-bold leading-tight text-[#5A0F18]">
          {post.title}
        </h2>
        <p className="mt-4 leading-7 text-[#1F1F1F]/70">{post.description}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-7 inline-flex rounded-full bg-[#5A0F18] px-6 py-3 text-sm font-semibold text-white"
        >
          Leer artículo
        </Link>
      </div>
    </article>
  );
}
