import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  getStoredConsent,
  hasAnalyticsConsent,
  isConsentRequired,
  setStoredConsent,
} from "../consent";

const ORIGINAL_ENV = { ...process.env };

describe("consent", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    window.localStorage.clear();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    window.localStorage.clear();
  });

  it("is not required by default", () => {
    delete process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT;
    expect(isConsentRequired()).toBe(false);
  });

  it("is required only when the env var is exactly \"true\"", () => {
    process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT = "true";
    expect(isConsentRequired()).toBe(true);

    process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT = "false";
    expect(isConsentRequired()).toBe(false);
  });

  it("grants analytics consent by default, regardless of storage", () => {
    delete process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT;
    expect(hasAnalyticsConsent()).toBe(true);
  });

  it("denies analytics consent when required and no decision was made", () => {
    process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT = "true";
    expect(getStoredConsent()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("grants analytics consent when required and the visitor accepted", () => {
    process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT = "true";
    setStoredConsent("granted");
    expect(getStoredConsent()).toBe("granted");
    expect(hasAnalyticsConsent()).toBe(true);
  });

  it("keeps denying analytics consent when required and the visitor rejected", () => {
    process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT = "true";
    setStoredConsent("denied");
    expect(getStoredConsent()).toBe("denied");
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("dispatches a change event other components can react to", () => {
    let received: string | undefined;
    window.addEventListener("rtm:analytics-consent-changed", ((event: CustomEvent) => {
      received = event.detail;
    }) as EventListener);

    setStoredConsent("granted");

    expect(received).toBe("granted");
  });
});
