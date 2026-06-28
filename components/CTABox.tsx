import Link from "next/link";

type CTABoxProps = {
  title?: string;
  description?: string;
};

export function CTABox({
  title = "Conoce el recurso recomendado para restaurar tu matrimonio",
  description = "Una guía práctica y cristiana para acompañarte con oración, reflexión y pasos concretos en este proceso."
}: CTABoxProps) {
  return (
    <section className="rounded-[8px] bg-[#5A0F18] p-6 text-white sm:p-8">
      <p className="font-[var(--font-display)] text-3xl font-bold leading-tight">{title}</p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">{description}</p>
      <Link
        href="/recursos"
        data-event="cta_click"
        data-label="recurso_recomendado"
        className="mt-6 inline-flex rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#1F1F1F] transition hover:bg-[#e1bd45]"
      >
        Ver recurso recomendado
      </Link>
    </section>
  );
}
