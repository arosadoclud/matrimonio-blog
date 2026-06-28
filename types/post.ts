export type Category = {
  name: string;
  slug: string;
  description: string;
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
