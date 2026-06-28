import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checklist interno pre-AdSense",
  description:
    "Checklist interno para revisar contenido, políticas, navegación, medición e indexación antes de solicitar Google AdSense.",
  robots: {
    index: false,
    follow: false
  }
};

const checklist = [
  "Dominio propio conectado y funcionando con HTTPS.",
  "Google Search Console verificado con restauratumatrimonio.org.",
  "Sitemap enviado: https://restauratumatrimonio.org/sitemap.xml.",
  "GA4 activo mediante NEXT_PUBLIC_GA_ID en Vercel.",
  "Política de Privacidad, Términos, Cookies y Afiliados visibles en el footer.",
  "Página Sobre Nosotros con propósito claro y tono humano.",
  "Página Contacto visible y funcional.",
  "Al menos 30 artículos originales publicados y sin contenido duplicado.",
  "Artículos pilares enlazados desde la home.",
  "FAQs, breadcrumbs y schema activos en artículos.",
  "Sin páginas vacías, placeholders críticos o enlaces afiliados excesivos.",
  "Diseño responsive revisado en móvil.",
  "Velocidad y build limpios en Vercel."
];

export default function PreAdsensePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Interno</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Checklist interno pre-AdSense
      </h1>
      <p className="mt-4 leading-7 text-[#1F1F1F]/70">
        Usa esta lista antes de solicitar AdSense. La meta es demostrar confianza, contenido
        original suficiente, navegación clara y una experiencia limpia para el lector.
      </p>
      <div className="mt-8 grid gap-3">
        {checklist.map((item) => (
          <label
            key={item}
            className="flex gap-3 rounded-[8px] border border-[#D4AF37]/30 bg-white p-4 text-sm leading-6 text-[#1F1F1F]/75"
          >
            <input type="checkbox" className="mt-1 h-4 w-4 accent-[#5A0F18]" />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
