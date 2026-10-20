import Link from "next/link";

type CTABoxProps = {
  title?: string;
  description?: string;
};

export function CTABox({
  title = "Encuentra una ayuda apropiada para tu situación",
  description = "Compara herramientas gratuitas, orientación profesional y programas externos antes de decidir tu siguiente paso."
}: CTABoxProps) {
  return (
    <section className="rounded-[8px] bg-[#713f50] p-6 text-white sm:p-8">
      <p className="font-[var(--font-display)] text-3xl font-bold leading-tight">{title}</p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">{description}</p>
      <Link
        href="/recursos"
        data-event="cta_click"
        data-label="recurso_recomendado"
        className="mt-6 inline-flex rounded-full bg-[#f7f1e9] px-6 py-3 text-sm font-bold text-[#563041] transition hover:bg-white"
      >
        Ver opciones de ayuda
      </Link>
    </section>
  );
}
