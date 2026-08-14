import { NewsletterForm } from "@/components/NewsletterForm";

export function NewsletterBox() {
  return (
    <section className="rounded-[8px] border border-[#D4AF37]/35 bg-white p-6 shadow-sm">
      <p className="font-[var(--font-display)] text-3xl font-bold text-[#5A0F18]">
        7 días de oración por la restauración de tu matrimonio
      </p>
      <p className="mt-2 text-sm leading-6 text-[#1F1F1F]/70">
        Una secuencia devocional gratuita de oración, reflexión bíblica y pasos prácticos para
        acompañarte durante siete días.
      </p>
      <NewsletterForm />
    </section>
  );
}
