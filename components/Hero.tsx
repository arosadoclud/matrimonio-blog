import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f4eee8]">
      <div className="absolute -right-24 -top-48 h-[35rem] w-[35rem] rounded-full bg-[#e8cdbb]/50 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#8c4e40]">Un lugar para empezar de nuevo</p>
          <h1 className="max-w-4xl font-[var(--font-display)] text-6xl font-semibold leading-[0.96] tracking-[-0.025em] text-[#3e2528] sm:text-7xl lg:text-[5.6rem]">Cuando el matrimonio duele, necesitas <em className="font-normal text-[#a25b49]">claridad y compañía.</em></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#514944]">Guías cristianas con preguntas honestas, pasos concretos y espacio para buscar ayuda. La esperanza también se construye con acciones pequeñas y responsables.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/blog/primeros-pasos-para-restaurar-un-matrimonio-en-crisis" className="rounded-full bg-[#5a3135] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#422428]">Empezar por aquí <span aria-hidden="true">↗</span></Link>
            <Link href="/herramientas/primera-conversacion" className="rounded-full border border-[#aa897d] bg-white/75 px-7 py-3.5 text-sm font-semibold text-[#5a3135] transition hover:bg-white">Preparar una conversación</Link>
          </div>
        </div>
        <aside className="rounded-[2rem] border border-[#e3d4c9] bg-white/85 p-7 shadow-[0_24px_80px_-50px_rgba(62,37,40,.5)] sm:p-9">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#dce4d6] text-xl text-[#345a47]" aria-hidden="true">✦</span>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#8c4e40]">Una pausa para hoy</p>
          <h2 className="mt-3 font-[var(--font-display)] text-4xl font-semibold leading-tight text-[#3e2528]">No tienes que resolverlo todo en una sola conversación.</h2>
          <p className="mt-5 leading-7 text-[#514944]">Empieza por identificar qué pasó, qué necesitas y qué puedes pedir sin presionar. Nuestra hoja de trabajo te ayuda a ordenar esas ideas.</p>
          <Link href="/herramientas/primera-conversacion" className="mt-7 inline-flex border-b border-[#8c4e40] pb-1 text-sm font-bold text-[#5a3135]">Usar la hoja de trabajo <span className="ml-2" aria-hidden="true">→</span></Link>
        </aside>
      </div>
    </section>
  );
}
