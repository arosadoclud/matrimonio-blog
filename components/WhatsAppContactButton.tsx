"use client";

import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

export function WhatsAppContactButton({ placement }: { placement: "campaign" | "thank_you" }) {
  function trackContact() {
    trackEvent("WhatsAppContact", {
      content_name: "orientacion_matrimonial",
      content_category: "lead_support",
      placement,
    });
  }

  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackContact}
      data-event="whatsapp_contact_click"
      data-label={placement}
      aria-label="Hablar con Restaura tu Matrimonio por WhatsApp"
      className="fixed bottom-24 right-4 z-30 inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/25 bg-[#1f8f4e] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(12,72,37,0.28)] transition hover:bg-[#187841] focus:outline-none focus:ring-4 focus:ring-[#25d366]/30 sm:bottom-6 sm:right-6"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-3.8-.8L3 21l1.7-5a8.6 8.6 0 1 1 16.3-4.5Z" />
        <path d="M8.7 8.2c.2 3.2 2 5 5.1 5.9" />
      </svg>
      <span className="hidden sm:inline">¿Necesitas orientación?</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}
