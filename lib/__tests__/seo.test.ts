import { describe, expect, it } from "vitest";
import { buildCanonicalUrl, buildPageTitle, ensureMetaDescription } from "../seo";

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

  it("appends the brand suffix when the combined title stays under the SERP limit", () => {
    expect(buildPageTitle("Oración para restaurar mi matrimonio")).toBe(
      "Oración para restaurar mi matrimonio | Restaura Tu Matrimonio"
    );
  });

  it("drops the brand suffix when it would push the title past the SERP limit", () => {
    const longTitle = "Cómo salvar tu matrimonio en 7 días: una guía práctica y bíblica";
    expect(buildPageTitle(longTitle)).toBe(longTitle);
  });
});
