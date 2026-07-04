"use client";

import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const REASONS = [
  "Consulta general",
  "Recurso recomendado",
  "Colaboración",
  "Testimonio",
];

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setErrors([]);

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          reason: formData.get("reason"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[8px] border border-green-200 bg-green-50 p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="mt-4 font-[var(--font-display)] text-2xl font-bold text-green-800">
          ¡Mensaje enviado!
        </h3>
        <p className="mt-2 text-green-700">
          Gracias por contactarnos. Te responderemos lo antes posible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-green-700 underline hover:text-green-800"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[8px] border border-[#5A0F18]/10 bg-white p-6 shadow-sm">
      {errors.length > 0 && (
        <div className="rounded-[8px] border border-red-200 bg-red-50 p-4" role="alert">
          <p className="text-sm font-semibold text-red-700">Por favor, corrige los siguientes errores:</p>
          <ul className="mt-2 list-inside list-disc text-sm text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#5A0F18]">
          Nombre
          <input
            className="rounded-[8px] border border-[#5A0F18]/15 px-4 py-3 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
            name="name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#5A0F18]">
          Email
          <input
            className="rounded-[8px] border border-[#5A0F18]/15 px-4 py-3 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
            name="email"
            type="email"
            required
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-[#5A0F18]">
        Motivo de contacto
        <select
          className="rounded-[8px] border border-[#5A0F18]/15 px-4 py-3 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
          name="reason"
          required
        >
          <option value="">Selecciona una opción</option>
          {REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#5A0F18]">
        Mensaje
        <textarea
          className="min-h-40 rounded-[8px] border border-[#5A0F18]/15 px-4 py-3 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          placeholder="¿En qué podemos ayudarte?"
        />
      </label>
      <button
        className="rounded-full bg-[#5A0F18] px-7 py-3.5 font-semibold text-white transition hover:bg-[#3f0b11] disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Enviando...
          </span>
        ) : (
          "Enviar mensaje"
        )}
      </button>
      {status === "error" && errors.length === 0 && (
        <p className="text-sm font-semibold text-red-600">
          No pudimos enviar tu mensaje. Por favor, intenta de nuevo.
        </p>
      )}
    </form>
  );
}