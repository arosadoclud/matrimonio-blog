"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type FormStatus = "idle" | "loading" | "success" | "error";

const STATUS_MESSAGES = {
  success: "¡Listo! Revisa tu correo y la carpeta de spam. Te acabamos de enviar la guía.",
  error: "No pudimos enviar la guía en este momento. Inténtalo nuevamente en unos minutos.",
};

export function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const leadMagnet = formData.get("lead_magnet") as string;
    const website = formData.get("website") as string;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          lead_magnet: leadMagnet,
          website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Newsletter error:", data.error);
        trackEvent("form_error", { form_name: "newsletter", reason: "api_error" });
        setStatus("error");
        return;
      }

      trackEvent("Lead", { content_name: "lead_magnet_7_dias" });
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Newsletter fetch error:", error);
      trackEvent("form_error", { form_name: "newsletter", reason: "network_error" });
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="tu@email.com"
        autoComplete="email"
        className="rounded-full border border-[#5A0F18]/15 px-5 py-3 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
      />
      <input
        type="hidden"
        name="lead_magnet"
        value="7 dias de oracion por la restauracion de tu matrimonio"
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button
        className="rounded-full bg-[#5A0F18] px-6 py-3 font-semibold text-white transition hover:bg-[#3f0b11] disabled:cursor-not-allowed disabled:opacity-50"
        data-event="newsletter_signup_click"
        data-label="lead_magnet_7_dias"
        disabled={status === "loading"}
        type="submit"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Enviando...
          </span>
        ) : (
          "Recibir guía"
        )}
      </button>
      <p className="text-xs leading-5 text-[#1F1F1F]/60 sm:col-span-2">
        Al solicitar la guía, aceptas recibir recursos y contenidos de Restaura tu Matrimonio.
        Puedes cancelar tu suscripción en cualquier momento.
      </p>
      {status === "success" && (
        <div
          className="flex items-center gap-2 text-sm font-semibold text-green-700 sm:col-span-2"
          role="alert"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {STATUS_MESSAGES.success}
        </div>
      )}
      {status === "error" && (
        <div
          className="flex items-center gap-2 text-sm font-semibold text-red-700 sm:col-span-2"
          role="alert"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {STATUS_MESSAGES.error}
        </div>
      )}
    </form>
  );
}
