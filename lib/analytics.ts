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
 * Shared handler for CTAs that lead to the external landing/Hotmart flow.
 * Fires CtaClick + InitiateCheckout together, matching the landing page pattern.
 */
export function trackHotmartCtaClick(ctaId: string) {
  trackEvent("CtaClick", { content_name: ctaId });
  trackEvent("InitiateCheckout", {
    content_name: "Curso Restaura Tu Matrimonio",
    value: 149,
    currency: "USD",
  });
}
