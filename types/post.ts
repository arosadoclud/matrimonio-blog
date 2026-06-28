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
  image: string;
  slug: string;
  keywords: string[];
};

export type Post = PostMeta & {
  content: string;
  readingTime: string;
};
