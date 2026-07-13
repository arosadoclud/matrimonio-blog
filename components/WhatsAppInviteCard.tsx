"use client";

import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

/**
 * Inline, non-floating WhatsApp invitation shown right after someone opts
 * in for the guide -- this is the single highest-intent moment in the whole
 * funnel, and the floating WhatsAppContactButton is easy to miss against a
 * page background. A dedicated card with a warmer, more personal message
 * converts opted-in leads into a direct conversation instead of leaving
 * them to wait passively for the 7-day email sequence.
 */
export function WhatsAppInviteCard() {
  function trackContact() {
    trackEvent("WhatsAppContact", {
      content_name: "orientacion_matrimonial",
      content_category: "lead_support",
      placement: "thank_you_inline",
    });
  }

  return (
    <div className="mt-8 rounded-lg border border-[#25d366]/35 bg-[#f3fbf6] px-6 py-6 text-left">
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f8f4e]">
        ¿Prefieres hablarlo con alguien ahora?
      </p>
      <p className="mt-2 text-base leading-7 text-[#2d2d2d]">
        Si quieres contarme tu situación específica antes de esperar los próximos días, escríbeme
        directo por WhatsApp. Te leo personalmente y te oriento según lo que estás viviendo.
      </p>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackContact}
        data-event="whatsapp_contact_click"
        data-label="thank_you_inline"
        className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#1f8f4e] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#187841]"
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
        Escribir por WhatsApp
      </a>
    </div>
  );
}
