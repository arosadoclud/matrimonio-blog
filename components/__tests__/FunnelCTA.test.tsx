import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FunnelCTA } from "../FunnelCTA";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
  trackHotmartCtaClick: vi.fn(),
}));

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

  it("variant=middle renders the topic in the copy and tracks CtaClick on click", async () => {
    const { trackEvent } = await import("@/lib/analytics");
    render(<FunnelCTA variant="middle" topic="Crisis matrimonial" />);

    expect(screen.getByText(/crisis matrimonial/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: /ver recurso recomendado/i }));

    expect(trackEvent).toHaveBeenCalledWith("CtaClick", { content_name: "funnel_cta_middle" });
  });

  it("variant=bottom links out and fires CtaClick + InitiateCheckout on click", async () => {
    const { trackHotmartCtaClick } = await import("@/lib/analytics");
    render(<FunnelCTA variant="bottom" />);

    const link = screen.getByRole("link", { name: /quiero recuperar mi matrimonio/i });
    expect(link).toHaveAttribute("data-cta-id", "article_bottom_cta");

    fireEvent.click(link);

    expect(trackHotmartCtaClick).toHaveBeenCalledWith("article_bottom_cta");
  });
});
