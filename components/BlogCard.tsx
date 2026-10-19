import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/types/post";
import { CategoryBadge } from "@/components/CategoryBadge";
import { formatDate } from "@/lib/utils";

type BlogCardProps = {
  post: PostMeta;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[#e9ddd4] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10]">
          <Image
            src={post.image}
            alt={`Portada del artículo ${post.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
            style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
          />
        </div>
      </Link>
      <div className="p-5">
        <CategoryBadge category={post.category} />
        <Link href={`/blog/${post.slug}`}>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold leading-tight text-[#3e2528]">
            {post.title}
          </h2>
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#1F1F1F]/70">{post.description}</p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#5c5c5c]">
          {formatDate(post.date)}
        </p>
        <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-bold text-[#7c403d] underline underline-offset-4">Leer guía</Link>
      </div>
    </article>
  );
}
