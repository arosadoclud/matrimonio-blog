import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WhatsAppContactButton } from "../WhatsAppContactButton";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

describe("WhatsAppContactButton", () => {
  beforeEach(() => vi.clearAllMocks());

  it("opens the configured WhatsApp conversation", () => {
    render(<WhatsAppContactButton placement="campaign" />);
    const link = screen.getByRole("link", {
      name: "Hablar con Restaura tu Matrimonio por WhatsApp",
    });

    expect(link).toHaveAttribute("href", expect.stringContaining("wa.me/18492763532"));
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("tracks the contact intent", async () => {
    const { trackEvent } = await import("@/lib/analytics");
    render(<WhatsAppContactButton placement="thank_you" />);

    fireEvent.click(
      screen.getByRole("link", { name: "Hablar con Restaura tu Matrimonio por WhatsApp" }),
    );

    expect(trackEvent).toHaveBeenCalledWith("WhatsAppContact", {
      content_name: "orientacion_matrimonial",
      content_category: "lead_support",
      placement: "thank_you",
    });
  });
});
