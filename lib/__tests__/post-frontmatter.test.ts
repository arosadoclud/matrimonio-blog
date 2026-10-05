import { describe, expect, it } from "vitest";
import { getAllPosts } from "@/lib/posts";
import { authorConfig } from "@/lib/site";

const posts = getAllPosts();

describe("post frontmatter", () => {
  it("loads posts", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("gives every post a named author", () => {
    for (const post of posts) {
      expect(post.author.trim(), post.slug).not.toBe("");
    }
  });

  it("publishes under the configured author", () => {
    for (const post of posts) {
      expect(post.author, post.slug).toBe(authorConfig.name);
    }
  });

  it("only uses a valid `updated` date that is not earlier than `date`", () => {
    for (const post of posts.filter((p) => p.updated)) {
      expect(post.updated, post.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(post.updated as string)), post.slug).toBe(false);
      expect(Date.parse(post.updated as string), post.slug).toBeGreaterThanOrEqual(
        Date.parse(post.date)
      );
    }
  });

  it("only accepts simple object-position values for the cover crop", () => {
    for (const post of posts.filter((p) => p.imagePosition)) {
      expect(post.imagePosition, post.slug).toMatch(
        /^(center|top|bottom|left|right|\d{1,3}%)( (center|top|bottom|left|right|\d{1,3}%))?$/
      );
    }
  });

  it("keeps the FAQ heading as the last H2 so nothing after it is hidden", () => {
    for (const post of posts) {
      const headings = post.content.match(/^## .+$/gm) ?? [];
      const faqIndex = headings.findIndex((h) => h.trim() === "## Preguntas frecuentes");
      if (faqIndex !== -1) {
        expect(faqIndex, post.slug).toBe(headings.length - 1);
      }
    }
  });
});
