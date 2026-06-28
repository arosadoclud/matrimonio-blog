import fs from "node:fs";
import path from "node:path";
import type { Post, PostMeta } from "@/types/post";
import { slugify } from "@/lib/site";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    throw new Error("Post MDX files must include frontmatter.");
  }

  const [, frontmatter, content] = match;
  const data: Record<string, string | string[]> = {};
  const lines = frontmatter.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!pair) {
      continue;
    }

    const [, key, rawValue] = pair;

    if (rawValue === "") {
      const items: string[] = [];
      while (lines[index + 1]?.trim().startsWith("- ")) {
        index += 1;
        items.push(lines[index].trim().replace(/^-\s*/, "").replace(/^"|"$/g, ""));
      }
      data[key] = items;
      continue;
    }

    data[key] = rawValue.replace(/^"|"$/g, "");
  }

  return { data, content };
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min de lectura`;
}

function parsePost(fileName: string): Post {
  const fullPath = path.join(postsDirectory, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseFrontmatter(raw);
  const title = String(data.title);
  const slug = data.slug ? String(data.slug) : slugify(title);

  const meta: PostMeta = {
    title,
    description: String(data.description),
    date: String(data.date),
    category: String(data.category),
    author: String(data.author ?? "Restaura Tu Matrimonio"),
    image: String(data.image),
    slug,
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : []
  };

  return {
    ...meta,
    content,
    readingTime: estimateReadingTime(content)
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(parsePost)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => slugify(post.category) === category);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug && candidate.category === post.category)
    .slice(0, limit);
}

export function getTableOfContents(content: string) {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace(/^##\s+/, "").trim();
      return {
        text,
        id: slugify(text)
      };
    });
}
