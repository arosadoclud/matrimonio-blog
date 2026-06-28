import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/types/post";
import { CategoryBadge } from "@/components/CategoryBadge";

type BlogCardProps = {
  post: PostMeta;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-[8px] border border-[#5A0F18]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10]">
          <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        </div>
      </Link>
      <div className="p-5">
        <CategoryBadge category={post.category} />
        <Link href={`/blog/${post.slug}`}>
          <h2 className="mt-4 font-[var(--font-display)] text-2xl font-bold leading-tight text-[#5A0F18]">
            {post.title}
          </h2>
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#1F1F1F]/70">{post.description}</p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#1F1F1F]/45">
          {new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(new Date(post.date))}
        </p>
      </div>
    </article>
  );
}
