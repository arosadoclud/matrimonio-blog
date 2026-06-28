"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

    if (!endpoint) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Newsletter request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
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
        className="rounded-full border border-[#5A0F18]/15 px-5 py-3 outline-none focus:border-[#D4AF37]"
      />
      <input type="hidden" name="lead_magnet" value="7 dias de oracion por la restauracion de tu matrimonio" />
      <button
        className="rounded-full bg-[#5A0F18] px-6 py-3 font-semibold text-white disabled:opacity-70"
        data-event="newsletter_signup_click"
        data-label="lead_magnet_7_dias"
        disabled={status === "loading"}
        type="submit"
      >
        {status === "loading" ? "Enviando..." : "Recibir guía"}
      </button>
      {status === "success" ? (
        <p className="text-sm font-semibold text-[#5A0F18] sm:col-span-2">
          Listo. Te enviaremos la guía cuando el proveedor de email esté conectado.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm font-semibold text-[#5A0F18] sm:col-span-2">
          No pudimos registrar el email. Intenta de nuevo en unos minutos.
        </p>
      ) : null}
    </form>
  );
}
