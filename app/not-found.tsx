import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Error 404</p>
      <h1 className="mt-3 font-[var(--font-display)] text-4xl font-bold text-[#5A0F18]">
        La página que buscas no está disponible
      </h1>
      <p className="mt-4 text-lg leading-8 text-[#1F1F1F]/70">
        Revisa la URL o vuelve al inicio para seguir navegando por artículos de restauración matrimonial.
      </p>
      <Link href="/" className="mt-8 inline-flex w-fit rounded-full bg-[#5A0F18] px-6 py-3 text-sm font-semibold text-white">
        Volver al inicio
      </Link>
    </section>
  );
}
