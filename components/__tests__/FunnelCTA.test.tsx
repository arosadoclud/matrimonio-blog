import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FunnelCTA } from "../FunnelCTA";

vi.mock("@/lib/analytics", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/analytics")>();
  return {
    ...actual,
    trackEvent: vi.fn(),
    trackHotmartCtaClick: vi.fn(),
  };
});

global.fetch = vi.fn();

describe("FunnelCTA", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("variant=top renders the free guide newsletter form", () => {
    render(<FunnelCTA variant="top" />);

    expect(screen.getByText(/guía gratis/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("variant=middle renders the topic in the copy, links to /recursos with the post slug, and tracks CtaClick on click", async () => {
    const { trackEvent } = await import("@/lib/analytics");
    render(<FunnelCTA variant="middle" topic="Crisis matrimonial" slug="mi-pareja-no-quiere-hablar-conmigo" />);

    expect(screen.getByText(/crisis matrimonial/i)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /ver recurso recomendado/i });
    expect(link).toHaveAttribute("href", "/recursos?src=mi-pareja-no-quiere-hablar-conmigo");

    fireEvent.click(link);

    expect(trackEvent).toHaveBeenCalledWith("CtaClick", {
      content_name: "funnel_cta_middle",
      source_post: "mi-pareja-no-quiere-hablar-conmigo",
      article_slug: "mi-pareja-no-quiere-hablar-conmigo",
      article_category: "Crisis matrimonial",
      cta_location: "article_middle",
      content_cluster: "separacion_y_distancia_emocional",
      destination_url: "/recursos?src=mi-pareja-no-quiere-hablar-conmigo",
      cta_text: "Ver recurso recomendado",
    });
  });

  it("variant=bottom links out and fires CtaClick + InitiateCheckout on click, without article context when not provided", async () => {
    const { trackHotmartCtaClick } = await import("@/lib/analytics");
    render(<FunnelCTA variant="bottom" />);

    const link = screen.getByRole("link", { name: /quiero recuperar mi matrimonio/i });
    expect(link).toHaveAttribute("data-cta-id", "article_bottom_cta");

    fireEvent.click(link);

    expect(trackHotmartCtaClick).toHaveBeenCalledWith("article_bottom_cta", {
      article_slug: undefined,
      article_category: undefined,
      cta_location: "article_bottom",
      content_cluster: undefined,
      destination_url: expect.stringContaining("restauratumatrimonio.org"),
      cta_text: "Quiero recuperar mi matrimonio →",
    });
  });

  it("variant=bottom passes article_slug/article_category/content_cluster when known", async () => {
    const { trackHotmartCtaClick } = await import("@/lib/analytics");
    render(<FunnelCTA variant="bottom" slug="mi-esposa-dice-que-ya-no-me-ama" category="Crisis matrimonial" />);

    fireEvent.click(screen.getByRole("link", { name: /quiero recuperar mi matrimonio/i }));

    expect(trackHotmartCtaClick).toHaveBeenCalledWith("article_bottom_cta", {
      article_slug: "mi-esposa-dice-que-ya-no-me-ama",
      article_category: "Crisis matrimonial",
      cta_location: "article_bottom",
      content_cluster: "separacion_y_distancia_emocional",
      destination_url: expect.stringContaining("restauratumatrimonio.org"),
      cta_text: "Quiero recuperar mi matrimonio →",
    });
  });
});
