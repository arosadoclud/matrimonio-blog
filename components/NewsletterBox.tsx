import { NewsletterForm } from "@/components/NewsletterForm";

export function NewsletterBox() {
  return (
    <section className="rounded-[8px] border border-[#86604f]/35 bg-white p-6 shadow-sm">
      <p className="font-[var(--font-display)] text-3xl font-bold text-[#713f50]">
        7 días de oración por la restauración de tu matrimonio
      </p>
      <p className="mt-2 text-sm leading-6 text-[#263a31]/70">
        Una secuencia devocional con oración, reflexión bíblica y acciones pequeñas durante una
        semana. Puedes descargarla directamente, sin dejar tu correo.
      </p>
      <a href="/guias/7-dias-de-oracion-restauracion-matrimonial.pdf" download className="mt-5 inline-flex rounded-full bg-[#293d34] px-6 py-3 text-sm font-semibold text-white">Descargar guía PDF gratis</a>
      <p className="mt-6 text-sm font-semibold text-[#713f50]">Si prefieres recibirla por correo y aceptar futuros recursos, usa este formulario:</p>
      <NewsletterForm />
    </section>
  );
}
