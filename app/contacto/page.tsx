import type { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Restaura Tu Matrimonio para consultas, colaboraciones o mensajes sobre recursos cristianos de restauración matrimonial.",
  alternates: {
    canonical: buildCanonicalUrl("/contacto"),
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Contacto</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Escríbenos
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-[#1F1F1F]/70">
        Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  );
}