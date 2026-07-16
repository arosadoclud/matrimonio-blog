import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceCard } from "../ResourceCard";

vi.mock("@/lib/analytics", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/analytics")>();
  return {
    ...actual,
    trackHotmartCtaClick: vi.fn(),
  };
});

describe("ResourceCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("tracks with article context when the visitor came from a known article", async () => {
    const { trackHotmartCtaClick } = await import("@/lib/analytics");
    render(
      <ResourceCard
        sourcePostSlug="mi-esposa-dice-que-ya-no-me-ama"
        sourcePostCategory="Crisis matrimonial"
      />
    );

    fireEvent.click(screen.getByRole("link", { name: "Acceder al recurso" }));

    expect(trackHotmartCtaClick).toHaveBeenCalledWith(
      "recursos_page_cta",
      expect.objectContaining({
        article_slug: "mi-esposa-dice-que-ya-no-me-ama",
        article_category: "Crisis matrimonial",
        cta_location: "recursos_page",
        content_cluster: "separacion_y_distancia_emocional",
        cta_text: "Acceder al recurso",
      })
    );
  });

  it("falls back to the page's own cluster when there is no source article (?src= missing)", async () => {
    const { trackHotmartCtaClick } = await import("@/lib/analytics");
    render(<ResourceCard />);

    fireEvent.click(screen.getByRole("link", { name: "Acceder al recurso" }));

    expect(trackHotmartCtaClick).toHaveBeenCalledWith(
      "recursos_page_cta",
      expect.objectContaining({
        article_slug: undefined,
        article_category: undefined,
        cta_location: "recursos_page",
        content_cluster: "recursos_y_acompanamiento",
      })
    );
  });

  it("carries the source slug as a UTM term in the destination URL", async () => {
    render(<ResourceCard sourcePostSlug="mi-esposa-dice-que-ya-no-me-ama" />);

    const link = screen.getByRole("link", { name: "Acceder al recurso" });
    const href = link.getAttribute("href") ?? "";
    expect(href).toContain("utm_term=mi-esposa-dice-que-ya-no-me-ama");
  });
});
