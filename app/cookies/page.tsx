import type { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Información sobre el uso de cookies, medición, analítica y publicidad en Restaura Tu Matrimonio.",
  alternates: {
    canonical: buildCanonicalUrl("/cookies"),
  },
};

export default function CookiesPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Legal</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Política de Cookies
      </h1>
      <div className="prose-article mt-8">
        <p>
          Este sitio puede usar cookies propias y de terceros para recordar preferencias, medir el
          rendimiento del contenido y habilitar publicidad cuando corresponda.
        </p>
        <h2>Cookies de analítica</h2>
        <p>
          Nos ayudan a entender qué artículos son más útiles, cómo navegan los usuarios y qué temas
          necesitan más profundidad.
        </p>
        <h2>Cookies publicitarias</h2>
        <p>
          Si activamos Google AdSense u otra plataforma, podrían usarse cookies para mostrar anuncios
          y medir su rendimiento.
        </p>
        <h2>Control de cookies</h2>
        <p>
          Puedes borrar o bloquear cookies desde la configuración de tu navegador. Algunas funciones
          podrían cambiar si desactivas determinadas cookies.
        </p>
      </div>
    </section>
  );
}
