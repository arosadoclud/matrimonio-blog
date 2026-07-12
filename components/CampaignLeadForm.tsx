"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "error";

export function CampaignLeadForm({ placement = "hero" }: { placement?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          website: formData.get("website"),
          lead_magnet: "guia_7_dias_oracion_matrimonio",
          source: "facebook_ads_landing",
          placement,
          page_url: window.location.href,
          referrer: document.referrer,
          utm_source: searchParams.get("utm_source") ?? "",
          utm_medium: searchParams.get("utm_medium") ?? "",
          utm_campaign: searchParams.get("utm_campaign") ?? "",
          utm_content: searchParams.get("utm_content") ?? "",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "No pudimos registrar tu solicitud.");
      }

      trackEvent("Lead", {
        content_name: "guia_7_dias_oracion_matrimonio",
        content_category: "facebook_ads_landing",
        placement,
      });
      const query = new URLSearchParams();
      ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach((key) => {
        const value = searchParams.get(key);
        if (value) query.set(key, value);
      });
      router.push(`/gracias-guia-matrimonio${query.size ? `?${query}` : ""}`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No pudimos registrar tu solicitud.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" aria-label="Solicitar guía gratis">
      <div>
        <label htmlFor={`campaign-name-${placement}`} className="mb-1.5 block text-sm font-semibold text-[#301b19]">
          Tu nombre
        </label>
        <input
          id={`campaign-name-${placement}`}
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          placeholder="¿Cómo te llamas?"
          className="w-full rounded-lg border border-[#5A0F18]/20 bg-white px-4 py-3.5 text-base outline-none transition focus:border-[#A87B24] focus:ring-4 focus:ring-[#D4AF37]/15"
        />
      </div>
      <div>
        <label htmlFor={`campaign-email-${placement}`} className="mb-1.5 block text-sm font-semibold text-[#301b19]">
          Tu correo electrónico
        </label>
        <input
          id={`campaign-email-${placement}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          className="w-full rounded-lg border border-[#5A0F18]/20 bg-white px-4 py-3.5 text-base outline-none transition focus:border-[#A87B24] focus:ring-4 focus:ring-[#D4AF37]/15"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 min-h-14 rounded-lg bg-[#5A0F18] px-6 py-4 text-base font-bold text-white shadow-[0_12px_28px_rgba(90,15,24,0.22)] transition hover:bg-[#741923] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/35 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? "Preparando tu guía..." : "Recibir la guía gratis"}
      </button>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <p className="text-center text-xs leading-5 text-[#5d504c]">
        Te enviaremos la guía y recursos relacionados. Puedes darte de baja cuando quieras.
      </p>
      {status === "error" ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {message} Revisa tu conexión e inténtalo nuevamente.
        </p>
      ) : null}
    </form>
  );
}
