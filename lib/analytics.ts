/**
 * Tracking wrapper for Meta Pixel + GA4, ported from matrimonio-landing/analytics.js.
 * Never throws — a missing fbq/gtag simply means the event isn't sent.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown };
  }
}

// Events sent via fbq('track', ...); everything else goes through fbq('trackCustom', ...).
export const META_STANDARD_EVENTS: Record<string, true> = {
  PageView: true,
  ViewContent: true,
  InitiateCheckout: true,
  Lead: true,
  Purchase: true,
};

// Canonical event name -> GA4 event name. `null` means already covered by gtag('config', ...).
export const GA4_EVENT_MAP: Record<string, string | null> = {
  PageView: null,
  ViewContent: "view_item",
  CtaClick: "select_content",
  InitiateCheckout: "begin_checkout",
  Lead: "generate_lead",
  ScrollDepth: "scroll_depth",
};

export function trackEvent(eventName: string, params: Record<string, string | number | boolean> = {}) {
  try {
    if (typeof window.fbq === "function") {
      if (META_STANDARD_EVENTS[eventName]) {
        window.fbq("track", eventName, params);
      } else {
        window.fbq("trackCustom", eventName, params);
      }
    }
  } catch (error) {
    console.warn("[RTM Analytics] Meta Pixel error:", error);
  }

  try {
    if (typeof window.gtag === "function") {
      const ga4Name = eventName in GA4_EVENT_MAP ? GA4_EVENT_MAP[eventName] : eventName;
      if (ga4Name) {
        window.gtag("event", ga4Name, params);
      }
    }
  } catch (error) {
    console.warn("[RTM Analytics] GA4 error:", error);
  }
}

/**
 * Optional contextual fields any CTA-tracking call site can supply. All are
 * optional so existing calls keep working unchanged; only the fields that
 * are actually known at the call site get sent (see buildCtaPayload).
 */
export type CtaContext = {
  article_slug?: string;
  article_category?: string;
  cta_location?: string;
  content_cluster?: string;
  destination_url?: string;
  cta_text?: string;
};

/**
 * Merges a CTA event's base payload with whatever optional context fields
 * were actually provided, skipping the rest instead of sending them as
 * `undefined`. Centralized here so CtaClick/InitiateCheckout (and any future
 * CTA event) build their payload the same way instead of repeating this
 * merge logic at each call site or duplicating it between GA4 and Meta.
 */
export function buildCtaPayload(
  base: Record<string, string | number | boolean>,
  context: CtaContext = {}
): Record<string, string | number | boolean> {
  const payload = { ...base };
  (Object.keys(context) as (keyof CtaContext)[]).forEach((key) => {
    const value = context[key];
    if (value !== undefined) {
      payload[key] = value;
    }
  });
  return payload;
}

/**
 * Shared handler for CTAs that lead to the external landing/Hotmart flow.
 * Fires CtaClick + InitiateCheckout together, matching the landing page
 * pattern. `context` is optional and additive -- omitting it keeps sending
 * exactly what this function always sent.
 */
export function trackHotmartCtaClick(ctaId: string, context: CtaContext = {}) {
  trackEvent("CtaClick", buildCtaPayload({ content_name: ctaId }, context));
  trackEvent(
    "InitiateCheckout",
    buildCtaPayload(
      { content_name: "Curso Restaura Tu Matrimonio", value: 149, currency: "USD" },
      context
    )
  );
}
