import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Analytics } from "../Analytics";
import { setStoredConsent } from "@/lib/consent";

const ORIGINAL_ENV = { ...process.env };

describe("Analytics", () => {
  // next/script tracks already-inserted script ids in a module-level cache
  // that survives unmount/remount within the same test file, so each script
  // id here is only asserted "present" once across the whole suite to avoid
  // a false negative from that cache, not from our own gating logic.
  function clearInjectedScripts() {
    ["ga4-init", "clarity-init", "meta-pixel-init"].forEach((id) => {
      document.getElementById(id)?.remove();
    });
  }

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    window.localStorage.clear();
    clearInjectedScripts();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    window.localStorage.clear();
    clearInjectedScripts();
  });

  it("does not render Clarity when NEXT_PUBLIC_CLARITY_PROJECT_ID is unset", () => {
    delete process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    render(<Analytics />);
    expect(document.getElementById("clarity-init")).not.toBeInTheDocument();
  });

  it("renders Clarity once a project id is configured (consent not required by default)", () => {
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID = "abc123";
    delete process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT;
    render(<Analytics />);
    expect(document.getElementById("clarity-init")).toBeInTheDocument();
  });

  it("does not render GA4/Clarity when consent is required and not yet granted", () => {
    process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT = "true";
    process.env.NEXT_PUBLIC_GA_ID = "G-TEST123";
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID = "abc123";

    render(<Analytics />);

    expect(document.getElementById("ga4-init")).not.toBeInTheDocument();
    expect(document.getElementById("clarity-init")).not.toBeInTheDocument();
  });

  it("renders GA4 once consent has been granted (same gate Clarity/Meta use)", () => {
    process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT = "true";
    process.env.NEXT_PUBLIC_GA_ID = "G-TEST123";
    setStoredConsent("granted");

    render(<Analytics />);

    expect(document.getElementById("ga4-init")).toBeInTheDocument();
  });
});
