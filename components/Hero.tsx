import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#e4d9cb] bg-[#f7f1e9]">
      <div className="absolute -right-24 -top-48 h-[35rem] w-[35rem] rounded-full bg-[#e8d7cb]/60 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-11 sm:px-6 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#86604f]">Un lugar para empezar de nuevo</p>
          <h1 className="max-w-4xl font-[var(--font-display)] text-[3.15rem] font-semibold leading-[1.01] tracking-[-0.025em] text-[#263a31] sm:text-[4.4rem] lg:text-[4.25rem]">Cuando el matrimonio duele, necesitas <em className="font-normal text-[#713f50]">claridad y compañía.</em></h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#4c594f] sm:text-lg sm:leading-8">Guías cristianas con preguntas honestas, pasos concretos y espacio para buscar ayuda. La esperanza también se construye con acciones pequeñas y responsables.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/blog/primeros-pasos-para-restaurar-un-matrimonio-en-crisis" className="rounded-full bg-[#713f50] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#563041]">Empezar por aquí <span aria-hidden="true">↗</span></Link>
            <Link href="/herramientas/primera-conversacion" className="rounded-full border border-[#aa897d] bg-white/75 px-7 py-3.5 text-sm font-semibold text-[#713f50] transition hover:bg-white">Preparar una conversación</Link>
          </div>
        </div>
        <aside className="rounded-[1.5rem] border border-[#e4d9cb] bg-[#fffcf7]/90 p-7 shadow-[0_24px_80px_-50px_rgba(62,37,40,.35)] sm:p-9">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#dce4d6] text-xl text-[#293d34]" aria-hidden="true">✦</span>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#86604f]">Una pausa para hoy</p>
          <h2 className="mt-3 font-[var(--font-display)] text-4xl font-semibold leading-tight text-[#263a31]">No tienes que resolverlo todo en una sola conversación.</h2>
          <p className="mt-5 leading-7 text-[#4c594f]">Empieza por identificar qué pasó, qué necesitas y qué puedes pedir sin presionar. Nuestra hoja de trabajo te ayuda a ordenar esas ideas.</p>
          <Link href="/herramientas/primera-conversacion" className="mt-7 inline-flex border-b border-[#86604f] pb-1 text-sm font-bold text-[#713f50]">Usar la hoja de trabajo <span className="ml-2" aria-hidden="true">→</span></Link>
        </aside>
      </div>
    </section>
  );
}
