import { BlogCard } from "@/components/BlogCard";
import type { PostMeta } from "@/types/post";

export function RelatedArticles({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <h2 className="font-[var(--font-display)] text-3xl font-bold text-[#5A0F18]">
        Artículos relacionados
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
