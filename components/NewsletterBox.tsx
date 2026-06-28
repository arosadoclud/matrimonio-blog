export function NewsletterBox() {
  return (
    <section className="rounded-[8px] border border-[#D4AF37]/35 bg-white p-6 shadow-sm">
      <p className="font-[var(--font-display)] text-3xl font-bold text-[#5A0F18]">
        Recibe la guía gratuita de oración
      </p>
      <p className="mt-2 text-sm leading-6 text-[#1F1F1F]/70">
        Espacio preparado para el lead magnet futuro: “Guía gratuita de oración por tu matrimonio”.
      </p>
      <form className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="newsletter-email">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="tu@email.com"
          className="rounded-full border border-[#5A0F18]/15 px-5 py-3 outline-none focus:border-[#D4AF37]"
        />
        <button className="rounded-full bg-[#5A0F18] px-6 py-3 font-semibold text-white" type="button">
          Unirme
        </button>
      </form>
    </section>
  );
}
