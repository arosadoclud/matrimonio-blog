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
    <article className="overflow-hidden rounded-2xl border border-[#e4d9cb] bg-[#fffcf7] shadow-[0_10px_30px_rgba(38,58,49,0.05)] transition hover:-translate-y-1 hover:border-[#c8b3a4] hover:shadow-[0_18px_40px_rgba(38,58,49,0.11)]">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative aspect-[16/10]">
          <Image
            src={post.image}
            alt={`Portada del artículo ${post.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
          />
        </div>
      </Link>
      <div className="p-5">
        <CategoryBadge category={post.category} />
        <Link href={`/blog/${post.slug}`}>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold leading-tight text-[#263a31]">
            {post.title}
          </h2>
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#263a31]/70">{post.description}</p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#59655e]">
          {formatDate(post.date)}
        </p>
        <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-bold text-[#713f50] underline underline-offset-4">Leer guía</Link>
      </div>
    </article>
  );
}
