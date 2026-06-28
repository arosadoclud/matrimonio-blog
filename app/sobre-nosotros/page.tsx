import type { Metadata } from "next";
import { CTABox } from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Restaura Tu Matrimonio nace como un espacio cristiano de esperanza para matrimonios que atraviesan crisis, distancia emocional o heridas profundas."
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Sobre nosotros</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold leading-tight text-[#5A0F18]">
        Un espacio cristiano de esperanza para matrimonios en crisis
      </h1>
      <div className="mt-8 grid gap-6 text-lg leading-8 text-[#1F1F1F]/75">
        <p>
          Restaura Tu Matrimonio nace como un espacio cristiano de esperanza para matrimonios que
          atraviesan crisis, distancia emocional o heridas profundas.
        </p>
        <p>
          Nuestro propósito es compartir recursos bíblicos, oraciones, enseñanzas y herramientas
          prácticas que ayuden a las parejas a mirar su proceso con fe, humildad y responsabilidad.
        </p>
        <p>
          Creemos que Dios puede obrar restauración, pero también creemos en la importancia de
          buscar ayuda sabia, acompañamiento pastoral y apoyo profesional cuando la situación lo
          requiere.
        </p>
      </div>
      <div className="mt-10">
        <CTABox />
      </div>
    </section>
  );
}
