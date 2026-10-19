import type { Metadata } from "next";
import Link from "next/link";
import { buildCanonicalUrl } from "@/lib/seo";
import { getPostBySlug } from "@/lib/posts";
import { NewsletterBox } from "@/components/NewsletterBox";
import { ResourceCard } from "@/components/ResourceCard";
import { ViewContentTracker } from "@/components/ViewContentTracker";

export const metadata: Metadata = {
  title: "Cómo elegir ayuda para tu matrimonio",
  description:
    "Una ruta práctica para elegir apoyo seguro: herramientas gratuitas, consejería profesional y recursos externos para una crisis matrimonial.",
  alternates: {
    canonical: buildCanonicalUrl("/recursos"),
  },
};

type PageProps = {
  searchParams: Promise<{ src?: string }>;
};

export default async function ResourcesPage({ searchParams }: PageProps) {
  const { src } = await searchParams;
  const sourcePost = src ? getPostBySlug(src) : undefined;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <ViewContentTracker contentName="Recursos" />

      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Opciones de ayuda</p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl font-bold leading-tight text-[#5A0F18] sm:text-5xl">
          Elige el tipo de ayuda que necesitas hoy
        </h1>
        <p className="mt-4 leading-7 text-[#1F1F1F]/72">
          No todas las crisis se resuelven de la misma manera. Esta guía te ayuda a distinguir un
          primer paso gratuito, acompañamiento profesional y un programa de pago, sin presionarte a decidir de inmediato.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-[#e9ddd4] bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Si hay tensión, pero puedes hablar con seguridad</p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[#3e2528]">Empieza con un paso pequeño</h2>
          <p className="mt-3 text-sm leading-7 text-[#514944]">Elige un solo tema, prepara una petición concreta y acuerda una pausa si la conversación se calienta. No necesitas comprar nada para hacerlo.</p>
          <Link href="/herramientas/primera-conversacion" className="mt-5 inline-flex text-sm font-bold text-[#7c403d] underline underline-offset-4">Usar la hoja gratuita</Link>
        </article>
        <article className="rounded-2xl border border-[#e9ddd4] bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Si el mismo conflicto se repite</p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[#3e2528]">Busca apoyo capacitado</h2>
          <p className="mt-3 text-sm leading-7 text-[#514944]">Una primera consulta individual puede ayudarte a ordenar opciones. Si ambos quieren trabajar juntos y hay seguridad, considera terapia de pareja con un profesional habilitado en tu localidad.</p>
          <Link href="#elegir-ayuda" className="mt-5 inline-flex text-sm font-bold text-[#7c403d] underline underline-offset-4">Qué preguntar antes de elegir</Link>
        </article>
        <article className="rounded-2xl border border-[#e6c9c1] bg-[#fbf1eb] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8c4e40]">Si hay miedo, amenazas o control</p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[#3e2528]">Prioriza tu seguridad</h2>
          <p className="mt-3 text-sm leading-7 text-[#514944]">No intentes negociar a solas ni uses una herramienta de conversación de pareja. Si hay peligro inmediato, contacta a los servicios de emergencia de tu localidad; si puedes, habla con una persona de confianza y un servicio especializado en violencia.</p>
          <a href="https://www.who.int/data/gho/indicator-metadata-registry/imr-details/first-line-support-in-policy" className="mt-5 inline-flex text-sm font-bold text-[#7c403d] underline underline-offset-4">Orientación de la OMS</a>
        </article>
      </div>

      <section id="elegir-ayuda" className="mt-14 rounded-[1.5rem] bg-[#e8eee6] p-7 sm:p-9">
        <h2 className="font-[var(--font-display)] text-4xl font-semibold text-[#2d4638]">Cinco preguntas antes de contratar ayuda</h2>
        <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-[#46564b]">
          <li>¿Quién ofrece la ayuda y qué formación o licencia puedes comprobar?</li>
          <li>¿Qué incluye exactamente: sesiones con una persona, videos, ejercicios o seguimiento?</li>
          <li>¿Cuánto cuesta en total y cuáles son las condiciones de cancelación o reembolso?</li>
          <li>¿Cómo protegen tu privacidad y qué límites tiene la confidencialidad?</li>
          <li>¿Qué harán si hay violencia, coerción o riesgo para alguien de la familia?</li>
        </ol>
        <p className="mt-5 text-sm leading-7 text-[#46564b]">Si existe abuso, la consejería conjunta puede aumentar el riesgo. Pide orientación individual especializada antes de considerar cualquier trabajo en pareja. <a href="https://www.thehotline.org/resources/should-i-go-to-couples-therapy-with-my-abusive-partner/" className="font-semibold underline underline-offset-4">Lee la explicación de The Hotline</a>.</p>
      </section>

      <div className="mt-14">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Opción externa de pago</p>
        <p className="mb-5 max-w-3xl leading-7 text-[#514944]">
          La página del programa reúne la presentación de la experiencia del instructor y cuatro
          testimonios en video. El enlace siguiente te lleva a esa fuente para que puedas revisar
          lo que ofrece y decidir con tu propio criterio.
        </p>
        <ResourceCard sourcePostSlug={src} sourcePostCategory={sourcePost?.category} />
      </div>

      <div className="mt-8">
        <NewsletterBox />
      </div>
    </section>
  );
}
