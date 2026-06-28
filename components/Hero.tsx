import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-[#FFF7E8]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#8a6a18]">
            Restauración matrimonial cristiana
          </p>
          <h1 className="font-[var(--font-display)] text-5xl font-bold leading-[0.98] text-[#5A0F18] sm:text-6xl lg:text-7xl">
            Dios puede restaurar tu matrimonio
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1F1F1F]/78">
            Recursos cristianos, oración y enseñanzas para matrimonios que desean sanar,
            perdonar y volver a construir.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/blog"
              className="rounded-full bg-[#5A0F18] px-7 py-3.5 text-center font-semibold text-white shadow-sm transition hover:bg-[#3f0b11]"
            >
              Leer artículos
            </Link>
            <Link
              href="/recursos"
              className="rounded-full border border-[#D4AF37] bg-white px-7 py-3.5 text-center font-semibold text-[#5A0F18] transition hover:bg-[#fffaf0]"
            >
              Ver recurso recomendado
            </Link>
          </div>
        </div>
        <div className="rounded-[8px] border border-[#D4AF37]/35 bg-white p-6 shadow-xl shadow-[#5A0F18]/10">
          <p className="font-[var(--font-display)] text-3xl font-bold text-[#5A0F18]">
            “El amor todo lo sufre, todo lo cree, todo lo espera, todo lo soporta.”
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#8a6a18]">
            1 Corintios 13:7
          </p>
          <div className="mt-8 grid gap-3 text-sm text-[#1F1F1F]/72">
            <div className="rounded-[8px] bg-[#FFF7E8] p-4">Oración por el matrimonio</div>
            <div className="rounded-[8px] bg-[#FFF7E8] p-4">Perdón y reconciliación</div>
            <div className="rounded-[8px] bg-[#FFF7E8] p-4">Consejos bíblicos para la crisis</div>
          </div>
        </div>
      </div>
    </section>
  );
}
