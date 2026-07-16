import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CookieNotice } from "../CookieNotice";
import { getStoredConsent } from "@/lib/consent";

const ORIGINAL_ENV = { ...process.env };

describe("CookieNotice", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    window.localStorage.clear();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    window.localStorage.clear();
  });

  describe("when consent gating is off (default, preserves prior behavior)", () => {
    beforeEach(() => {
      delete process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT;
    });

    it("shows a simple acknowledgement banner with no accept/reject choice", () => {
      render(<CookieNotice />);
      expect(screen.getByRole("button", { name: "Entendido" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Aceptar" })).not.toBeInTheDocument();
    });

    it("hides the banner after acknowledging and does not show it again", () => {
      const { unmount } = render(<CookieNotice />);
      fireEvent.click(screen.getByRole("button", { name: "Entendido" }));
      expect(screen.queryByRole("button", { name: "Entendido" })).not.toBeInTheDocument();

      unmount();
      render(<CookieNotice />);
      expect(screen.queryByRole("button", { name: "Entendido" })).not.toBeInTheDocument();
    });
  });

  describe("when consent gating is on", () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_REQUIRE_ANALYTICS_CONSENT = "true";
    });

    it("shows Aceptar/Rechazar and stores the choice", () => {
      render(<CookieNotice />);

      expect(screen.getByRole("button", { name: "Aceptar" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Rechazar" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Aceptar" }));

      expect(getStoredConsent()).toBe("granted");
      expect(screen.queryByRole("button", { name: "Aceptar" })).not.toBeInTheDocument();
    });

    it("stores a rejection distinctly from acceptance", () => {
      render(<CookieNotice />);
      fireEvent.click(screen.getByRole("button", { name: "Rechazar" }));
      expect(getStoredConsent()).toBe("denied");
    });

    it("offers a way to reopen and change a previous choice", () => {
      render(<CookieNotice />);
      fireEvent.click(screen.getByRole("button", { name: "Aceptar" }));

      const reopen = screen.getByRole("button", { name: "Preferencias de cookies" });
      expect(reopen).toBeInTheDocument();

      fireEvent.click(reopen);
      expect(screen.getByRole("button", { name: "Rechazar" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Rechazar" }));
      expect(getStoredConsent()).toBe("denied");
    });
  });
});
