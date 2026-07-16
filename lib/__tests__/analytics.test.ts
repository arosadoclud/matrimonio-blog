import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { buildCtaPayload, trackEvent, trackHotmartCtaClick } from "../analytics";

describe("trackEvent", () => {
  let fbq: ReturnType<typeof vi.fn>;
  let gtag: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fbq = vi.fn();
    gtag = vi.fn();
    window.fbq = fbq;
    window.gtag = gtag;
  });

  afterEach(() => {
    delete (window as { fbq?: unknown }).fbq;
    delete (window as { gtag?: unknown }).gtag;
  });

  it("sends standard Meta events via fbq('track', ...)", () => {
    trackEvent("Lead", { content_name: "lead_magnet_7_dias" });
    expect(fbq).toHaveBeenCalledWith("track", "Lead", { content_name: "lead_magnet_7_dias" });
  });

  it("sends non-standard Meta events via fbq('trackCustom', ...)", () => {
    trackEvent("CtaClick", { content_name: "funnel_cta_middle" });
    expect(fbq).toHaveBeenCalledWith("trackCustom", "CtaClick", { content_name: "funnel_cta_middle" });
  });

  it("maps canonical event names to GA4 event names", () => {
    trackEvent("Lead", { content_name: "lead_magnet_7_dias" });
    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", { content_name: "lead_magnet_7_dias" });
  });

  it("passes through unmapped event names to GA4 as-is", () => {
    trackEvent("ScrollDepth", { percent: 50 });
    expect(gtag).toHaveBeenCalledWith("event", "scroll_depth", { percent: 50 });
  });

  it("does not throw when fbq/gtag are unavailable", () => {
    delete (window as { fbq?: unknown }).fbq;
    delete (window as { gtag?: unknown }).gtag;
    expect(() => trackEvent("Lead")).not.toThrow();
  });
});

describe("trackHotmartCtaClick", () => {
  let fbq: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fbq = vi.fn();
    window.fbq = fbq;
  });

  afterEach(() => {
    delete (window as { fbq?: unknown }).fbq;
  });

  it("fires CtaClick and InitiateCheckout together", () => {
    trackHotmartCtaClick("article_bottom_cta");

    expect(fbq).toHaveBeenCalledWith("trackCustom", "CtaClick", { content_name: "article_bottom_cta" });
    expect(fbq).toHaveBeenCalledWith("track", "InitiateCheckout", {
      content_name: "Curso Restaura Tu Matrimonio",
      value: 149,
      currency: "USD",
    });
  });

  it("stays backward compatible when no context is passed (no stray fields)", () => {
    trackHotmartCtaClick("recursos_page_cta");

    expect(fbq).toHaveBeenCalledWith("trackCustom", "CtaClick", { content_name: "recursos_page_cta" });
  });

  it("enriches both events with whatever optional context fields are provided", () => {
    trackHotmartCtaClick("article_bottom_cta", {
      article_slug: "mi-esposa-dice-que-ya-no-me-ama",
      article_category: "Crisis matrimonial",
      cta_location: "article_bottom",
      content_cluster: "separacion_y_distancia_emocional",
      destination_url: "https://restauratumatrimonio.org/?utm_content=article_bottom",
      cta_text: "Quiero recuperar mi matrimonio →",
    });

    expect(fbq).toHaveBeenCalledWith("trackCustom", "CtaClick", {
      content_name: "article_bottom_cta",
      article_slug: "mi-esposa-dice-que-ya-no-me-ama",
      article_category: "Crisis matrimonial",
      cta_location: "article_bottom",
      content_cluster: "separacion_y_distancia_emocional",
      destination_url: "https://restauratumatrimonio.org/?utm_content=article_bottom",
      cta_text: "Quiero recuperar mi matrimonio →",
    });
    expect(fbq).toHaveBeenCalledWith("track", "InitiateCheckout", {
      content_name: "Curso Restaura Tu Matrimonio",
      value: 149,
      currency: "USD",
      article_slug: "mi-esposa-dice-que-ya-no-me-ama",
      article_category: "Crisis matrimonial",
      cta_location: "article_bottom",
      content_cluster: "separacion_y_distancia_emocional",
      destination_url: "https://restauratumatrimonio.org/?utm_content=article_bottom",
      cta_text: "Quiero recuperar mi matrimonio →",
    });
  });

  it("omits context fields that were not provided instead of sending undefined", () => {
    trackHotmartCtaClick("recursos_page_cta", { article_slug: "algun-slug" });

    expect(fbq).toHaveBeenCalledWith("trackCustom", "CtaClick", {
      content_name: "recursos_page_cta",
      article_slug: "algun-slug",
    });
  });
});

describe("buildCtaPayload", () => {
  it("merges only the context fields that are defined", () => {
    expect(
      buildCtaPayload({ content_name: "x" }, { article_slug: "slug-1", cta_location: undefined })
    ).toEqual({ content_name: "x", article_slug: "slug-1" });
  });

  it("returns the base payload unchanged when no context is given", () => {
    expect(buildCtaPayload({ content_name: "x" })).toEqual({ content_name: "x" });
  });
});
