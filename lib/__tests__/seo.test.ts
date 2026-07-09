import { describe, expect, it } from "vitest";
import { buildCanonicalUrl, ensureMetaDescription } from "../seo";

describe("seo helpers", () => {
  it("keeps descriptions under the recommended length", () => {
    const longDescription =
      "Este es un texto largo para comprobar que la descripción se recorta de forma segura para títulos meta y snippets de Google sin perder sentido.";

    expect(ensureMetaDescription(longDescription).length).toBeLessThanOrEqual(160);
  });

  it("builds absolute canonical URLs from relative paths", () => {
    expect(buildCanonicalUrl("/blog/como-orar-cuando-mi-matrimonio-esta-destruido")).toBe(
      "https://restauratumatrimonio-blog.com/blog/como-orar-cuando-mi-matrimonio-esta-destruido"
    );
  });
});
