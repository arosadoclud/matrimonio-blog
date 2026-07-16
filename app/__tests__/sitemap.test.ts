import { describe, expect, it } from "vitest";
import sitemap from "../sitemap";
import { getAllPosts, getIndexablePosts, getPostsByCategory } from "@/lib/posts";
import { categories, siteConfig } from "@/lib/site";

describe("sitemap", () => {
  const entries = sitemap();

  it("only uses absolute URLs on the canonical domain", () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(siteConfig.url)).toBe(true);
    }
  });

  it("does not contain duplicate URLs", () => {
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("excludes non-indexable (thin) posts", () => {
    const indexableSlugs = new Set(getIndexablePosts().map((post) => post.slug));
    const thinSlugs = getAllPosts()
      .filter((post) => !indexableSlugs.has(post.slug))
      .map((post) => post.slug);

    for (const slug of thinSlugs) {
      expect(entries.some((entry) => entry.url === `${siteConfig.url}/blog/${slug}`)).toBe(false);
    }
  });

  it("includes every indexable post exactly once", () => {
    for (const post of getIndexablePosts()) {
      const matches = entries.filter((entry) => entry.url === `${siteConfig.url}/blog/${post.slug}`);
      expect(matches).toHaveLength(1);
    }
  });

  it("excludes categories without published posts", () => {
    for (const category of categories) {
      const hasPosts = getPostsByCategory(category.slug).length > 0;
      const isInSitemap = entries.some(
        (entry) => entry.url === `${siteConfig.url}/categorias/${category.slug}`
      );
      expect(isInSitemap).toBe(hasPosts);
    }
  });

  it("does not fabricate lastModified on static pages", () => {
    const home = entries.find((entry) => entry.url === siteConfig.url);
    expect(home?.lastModified).toBeUndefined();
  });

  it("uses the post's real date as lastModified for blog posts", () => {
    const post = getIndexablePosts()[0];
    const entry = entries.find((e) => e.url === `${siteConfig.url}/blog/${post.slug}`);
    expect(entry?.lastModified).toEqual(new Date(post.date));
  });
});
