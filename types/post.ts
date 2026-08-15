export type Category = {
  name: string;
  slug: string;
  description: string;
  // Introducción más amplia y original para la página de categoría, distinta
  // de `description` (que se usa para meta description y como fallback aquí
  // si una categoría no define su propia introducción).
  intro?: string;
};

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  reviewedBy?: string;
  image: string;
  slug: string;
  keywords: string[];
  contentType?: "pillar" | "satellite";
  // Manual override for ordering pillar posts in the homepage "Empieza
  // aquí" section. Lower numbers show first; posts without it fall back to
  // date-desc ordering, sorted after every ranked post. Without this, a
  // brand-new pillar post (like an index/FAQ page with no proven traffic
  // yet) would bump a highest-performing pillar out of the featured slot
  // just for being newest -- see docs/keyword-map.md.
  homeFeaturedOrder?: number;
  // Manual override for the single large "Destacado" card on the homepage
  // (components/FeaturedPost.tsx). Without this, that slot defaults to the
  // newest eligible satellite post by date -- which would make every new
  // article bump whatever was actually performing well. Set this on the
  // post that real Search Console data shows as the top-clicked satellite
  // (see docs/keyword-map.md) and it stays pinned until updated by hand.
  homeFlagshipFeatured?: boolean;
};

export type Post = PostMeta & {
  content: string;
  readingTime: string;
  wordCount: number;
};
