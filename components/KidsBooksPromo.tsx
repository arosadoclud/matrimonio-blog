import Image from "next/image";

const kidsBooks = [
  {
    title: "Aventuras de la Biblia para colorear",
    ageRange: "4 a 9 años",
    description: "20 historias bíblicas para colorear, aprender y conversar en familia.",
    image: "/images/productos/pequenos-exploradores.jpg",
    href: "https://pequenos-exploradores-landing.vercel.app/",
  },
  {
    title: "Jonás y el gran pez para colorear",
    ageRange: "4 a 8 años",
    description: "30 páginas para colorear la historia de Jonás, con diploma y actividades.",
    image: "/images/productos/jonas-y-el-gran-pez.jpg",
    href: "https://landing-pages-jonas.vercel.app/#beneficios",
    // Edición en papel, disponible además de la versión digital de arriba.
    amazonHref: "https://www.amazon.com/dp/B0HG9R465H",
  },
];

export function KidsBooksPromo() {
  return (
    <section className="rounded-[8px] border border-[#713f50]/10 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#86604f]">
        Para los más pequeños de la casa
      </p>
      <p className="mt-2 text-xs leading-5 text-[#263a31]/65">
        También creamos libros bíblicos para colorear, pensados para acompañar la fe de tus hijos.
      </p>
      <div className="mt-4 grid gap-4">
        {kidsBooks.map((book) => (
          <div
            key={book.href}
            className="group overflow-hidden rounded-[8px] border border-[#713f50]/10 bg-[#FFFDF8] shadow-sm transition hover:-translate-y-0.5 hover:border-[#86604f]/50 hover:shadow-md"
          >
            <a href={book.href} target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f7f1e9]">
                <Image
                  src={book.image}
                  alt={`Portada de ${book.title}`}
                  fill
                  sizes="(min-width: 1024px) 240px, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-3.5 pb-0">
                <span className="inline-flex items-center rounded-full border border-[#86604f]/40 bg-[#f7f1e9] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#86604f]">
                  {book.ageRange}
                </span>
                <p className="mt-2 font-[var(--font-display)] text-base font-bold leading-tight text-[#713f50] group-hover:underline">
                  {book.title}
                </p>
                <p className="mt-1.5 text-xs leading-5 text-[#263a31]/65">{book.description}</p>
              </div>
            </a>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3.5 pt-2.5">
              <a
                href={book.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#713f50] hover:underline"
              >
                Ver más
                <span aria-hidden="true">→</span>
              </a>
              {book.amazonHref ? (
                <a
                  href={book.amazonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#86604f] hover:underline"
                >
                  Comprar en papel (Amazon)
                  <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
