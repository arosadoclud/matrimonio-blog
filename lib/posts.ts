import fs from "node:fs";
import path from "node:path";
import type { Post, PostMeta } from "@/types/post";
import { slugify, getWordCount, estimateReadingTime } from "./utils";

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * Parse frontmatter from MDX content
 * Frontmatter format:
 * ---
 * title: "Post Title"
 * description: "Post description"
 * ...
 * ---
 */
function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
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

/**
 * Parse a single post file with error handling
 */
function parsePost(fileName: string): Post | null {
  const fullPath = path.join(postsDirectory, fileName);

  try {
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = parseFrontmatter(raw);

    // Validate required fields
    const requiredFields = ["title", "description", "date", "category", "image"];
    for (const field of requiredFields) {
      if (!data[field]) {
        console.warn(`Warning: Missing required field "${field}" in ${fileName}`);
      }
    }

    const title = String(data.title || "Untitled");
    const slug = data.slug ? String(data.slug) : slugify(title);
    const wordCount = getWordCount(content);

    const meta: PostMeta = {
      title,
      description: String(data.description || ""),
      date: String(data.date || new Date().toISOString()),
      category: String(data.category || "General"),
      author: String(data.author ?? "Restaura Tu Matrimonio"),
      reviewedBy: data.reviewedBy ? String(data.reviewedBy) : undefined,
      image: String(data.image || "/placeholder.jpg"),
      slug,
      keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
      contentType: data.contentType === "pillar" ? "pillar" : "satellite",
    };

    return {
      ...meta,
      content,
      readingTime: estimateReadingTime(wordCount),
      wordCount,
    };
  } catch (error) {
    console.error(`Error parsing post "${fileName}":`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Get all posts with error handling for corrupted files
 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Posts directory not found: ${postsDirectory}`);
    return [];
  }

  try {
    const files = fs.readdirSync(postsDirectory).filter((fileName) => fileName.endsWith(".mdx"));

    const posts = files
      .map((fileName) => parsePost(fileName))
      .filter((post): post is Post => post !== null);

    // Sort by date descending (newest first)
    return posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
  } catch (error) {
    console.error("Error reading posts directory:", error instanceof Error ? error.message : error);
    return [];
  }
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

export function getPillarPosts(): Post[] {
  return getAllPosts().filter((post) => post.contentType === "pillar");
}

export function getIndexablePosts(): Post[] {
  return getAllPosts().filter((post) => post.wordCount >= 300);
}

export function getTableOfContents(content: string) {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace(/^##\s+/, "").trim();
      return {
        text,
        id: slugify(text),
      };
    });
}

/**
 * Extract FAQs from content
 * Looks for a "## Preguntas frecuentes" section
 */
export function getFaqs(content: string) {
  const faqStart = content.search(/^## Preguntas frecuentes\s*$/m);

  if (faqStart === -1) {
    return [];
  }

  const faqContent = content.slice(faqStart).replace(/^## Preguntas frecuentes\s*/m, "");
  const nextSection = faqContent.search(/\n## (?!Preguntas frecuentes)/);
  const section = nextSection === -1 ? faqContent : faqContent.slice(0, nextSection);
  const matches = Array.from(section.matchAll(/^###\s+(.+)\n+([\s\S]*?)(?=\n###\s+|\s*$)/gm));

  return matches
    .map((match) => ({
      question: match[1].trim(),
      answer: match[2]
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\s+/g, " ")
        .trim(),
    }))
    .filter((item) => item.question && item.answer);
}

/**
 * Get a summary of all posts for debugging/development
 */
export function getPostsSummary(): { title: string; slug: string; wordCount: number; hasFaqs: boolean }[] {
  return getAllPosts().map((post) => ({
    title: post.title,
    slug: post.slug,
    wordCount: post.wordCount,
    hasFaqs: getFaqs(post.content).length > 0,
  }));
}