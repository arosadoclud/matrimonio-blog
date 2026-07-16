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
};

export type Post = PostMeta & {
  content: string;
  readingTime: string;
  wordCount: number;
};
