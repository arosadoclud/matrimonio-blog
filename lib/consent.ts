"use client";

import { useEffect, useState } from "react";

/**
 * Centralized, opt-in consent gate for analytics tools (GA4, Meta Pixel,
 * Microsoft Clarity). Controlled entirely by NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT:
 *
 * - Unset or not "true" (default): hasAnalyticsConsent() always returns true,
 *   so every tool loads exactly as it did before this module existed. No
 *   behavior change unless this env var is explicitly turned on.
 * - "true": tools only load after the visitor accepts via the cookie banner
 *   (components/CookieNotice.tsx), and stop loading again if they reject.
 *
 * This module does NOT decide which legal framework applies (GDPR opt-in,
 * a simple notice, etc.) -- that is a business/legal decision for the site
 * owner, documented in docs/manual-seo-setup.md. It only provides the
 * technical on/off switch.
 */

const STORAGE_KEY = "rtm-analytics-consent";
const CONSENT_EVENT = "rtm:analytics-consent-changed";

export type ConsentValue = "granted" | "denied";

export function isConsentRequired(): boolean {
  return process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT === "true";
}

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Private browsing / storage disabled: treat as "no decision yet".
    return null;
  }
}

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Ignore storage errors -- the CustomEvent below still updates any
    // component mounted in this session even if the choice can't persist.
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function hasAnalyticsConsent(): boolean {
  if (!isConsentRequired()) {
    return true;
  }

  return getStoredConsent() === "granted";
}

/**
 * React hook version of hasAnalyticsConsent() that re-evaluates whenever
 * setStoredConsent() is called anywhere in the app (accept, reject, or
 * changing a previous choice), so <Script> tags gated by it mount/unmount
 * reactively without a full page reload.
 */
export function useAnalyticsConsent(): boolean {
  const [allowed, setAllowed] = useState(() => hasAnalyticsConsent());

  useEffect(() => {
    setAllowed(hasAnalyticsConsent());

    function onChange() {
      setAllowed(hasAnalyticsConsent());
    }

    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return allowed;
}
