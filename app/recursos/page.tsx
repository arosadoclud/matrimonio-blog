import type { Metadata } from "next";
import { NewsletterBox } from "@/components/NewsletterBox";
import { ResourceCard } from "@/components/ResourceCard";
import { ViewContentTracker } from "@/components/ViewContentTracker";

export const metadata: Metadata = {
  title: "Recursos recomendados para restaurar tu matrimonio",
  description:
    "Conoce recursos cristianos recomendados para matrimonios que buscan oración, reconciliación, perdón y restauración familiar."
};

const testimonials = [
  {
    quote:
      "Cuando sentíamos que ya no había nada que hacer, este acompañamiento nos dio pasos concretos y esperanza real.",
    name: "Marcos y Daniela",
  },
  {
    quote:
      "La oración guiada y los ejercicios de reconciliación nos ayudaron a volver a conversar sin herirnos.",
    name: "Testimonio de una lectora",
  },
  {
    quote:
      "No fue magia, fue trabajo constante con dirección clara. Hoy estamos reconstruyendo con propósito.",
    name: "Testimonio de un lector",
  },
];

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <ViewContentTracker contentName="Recursos" />

      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">
          Cuando ya no sabes qué más hacer
        </p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl font-bold leading-tight text-[#5A0F18] sm:text-5xl">
          La distancia, el silencio o la crisis no tienen que ser el final de tu matrimonio
        </h1>
        <p className="mt-4 leading-7 text-[#1F1F1F]/72">
          Con oración, dirección clara y pasos prácticos, muchos matrimonios en el mismo lugar que
          el tuyo hoy han encontrado un camino de vuelta a la confianza, el perdón y la conexión.
        </p>
      </div>

      <div className="mt-10">
        <ResourceCard />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial) => (
          <blockquote
            key={testimonial.name}
            className="rounded-[8px] border border-[#5A0F18]/10 bg-white p-6 text-sm leading-6 text-[#1F1F1F]/75 shadow-sm"
          >
            <p>“{testimonial.quote}”</p>
            <footer className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#8a6a18]">
              {testimonial.name}
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="mt-8">
        <NewsletterBox />
      </div>
    </section>
  );
}
