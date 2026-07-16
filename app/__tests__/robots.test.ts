import { describe, expect, it } from "vitest";
import robots from "../robots";
import { siteConfig } from "@/lib/site";

describe("robots", () => {
  const config = robots();

  it("allows crawling of public pages", () => {
    expect(config.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });

  it("points to the absolute sitemap URL on the canonical domain", () => {
    expect(config.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });

  it("does not block CSS/JS/image or content directories", () => {
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    for (const rule of rules) {
      const disallow = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow].filter(Boolean);
      for (const path of disallow) {
        expect(path).not.toBe("/");
        expect(path).not.toMatch(/\.(css|js|jpg|jpeg|png|webp|svg)$/);
      }
    }
  });
});
