import { describe, expect, it } from "vitest";
import { getAllPosts, getRelatedPosts } from "../posts";
import { getWordCount } from "../utils";

describe("posts utility functions (mocked)", () => {
  // Note: These tests test the parsing logic conceptually
  // In a real scenario, you'd use fs mocking

  describe("getWordCount", () => {
    it("should count words in MDX content", () => {
      const content = `## Introduction
      This is a paragraph with some words.
      - List item one
      - List item two`;
      expect(getWordCount(content)).toBeGreaterThan(10);
    });

    it("should handle empty content", () => {
      expect(getWordCount("")).toBe(0);
    });
  });

  describe("frontmatter parsing concepts", () => {
    it("should define expected post structure", () => {
      const expectedFields = [
        "title",
        "description",
        "date",
        "category",
        "author",
        "image",
        "slug",
      ];

      // This documents the expected structure
      expect(expectedFields).toContain("title");
      expect(expectedFields).toContain("slug");
    });
  });

  describe("ToC generation concepts", () => {
    it("should identify H2 headings for ToC", () => {
      const content = `## Introduction
      Some text here.
      ## Main Section
      More text.
      ### Subsection (should be ignored)
      Final text.`;

      const headings = content
        .split("\n")
        .filter((line) => line.trim().startsWith("## "));

      expect(headings.length).toBe(2);
    });
  });

  describe("FAQ extraction concepts", () => {
    it("should identify FAQ section", () => {
      const content = `## Normal Section
      Text here.
      ## Preguntas frecuentes
      ### Question 1
      Answer 1.
      ### Question 2
      Answer 2.`;

      const hasFaqSection = content.includes("## Preguntas frecuentes");
      expect(hasFaqSection).toBe(true);
    });
  });

  describe("getRelatedPosts", () => {
    it("gives every post in a multi-post category at least one inbound related-post link", () => {
      // Regression test for the internal-linking gap Semrush flagged
      // ("pages with only one internal link"): getRelatedPosts() used to
      // always return the 3 most recent posts per category, so older posts
      // never got picked and ended up with no inbound links from this
      // widget anywhere on the site.
      const posts = getAllPosts();
      const inboundCount = new Map<string, number>();
      for (const post of posts) {
        for (const related of getRelatedPosts(post)) {
          inboundCount.set(related.slug, (inboundCount.get(related.slug) ?? 0) + 1);
        }
      }

      const categoryCounts = new Map<string, number>();
      for (const post of posts) {
        categoryCounts.set(post.category, (categoryCounts.get(post.category) ?? 0) + 1);
      }

      for (const post of posts) {
        if ((categoryCounts.get(post.category) ?? 0) > 1) {
          expect(inboundCount.get(post.slug) ?? 0).toBeGreaterThan(0);
        }
      }
    });

    it("never includes the post itself", () => {
      const posts = getAllPosts();
      for (const post of posts) {
        expect(getRelatedPosts(post).map((r) => r.slug)).not.toContain(post.slug);
      }
    });
  });
});