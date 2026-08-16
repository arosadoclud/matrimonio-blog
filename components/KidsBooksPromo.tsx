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
  },
];

export function KidsBooksPromo() {
  return (
    <section className="rounded-[8px] border border-[#5A0F18]/10 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8a6a18]">
        Para los más pequeños de la casa
      </p>
      <p className="mt-2 text-xs leading-5 text-[#1F1F1F]/65">
        También creamos libros bíblicos para colorear, pensados para acompañar la fe de tus hijos.
      </p>
      <div className="mt-4 grid gap-4">
        {kidsBooks.map((book) => (
          <a
            key={book.href}
            href={book.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-[8px] border border-[#5A0F18]/10 bg-[#FFFDF8] shadow-sm transition hover:-translate-y-0.5 hover:border-[#D4AF37]/50 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF7E8]">
              <Image
                src={book.image}
                alt={`Portada de ${book.title}`}
                fill
                sizes="(min-width: 1024px) 240px, 100vw"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-3.5">
              <span className="inline-flex items-center rounded-full border border-[#D4AF37]/40 bg-[#FFF7E8] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8a6a18]">
                {book.ageRange}
              </span>
              <p className="mt-2 font-[var(--font-display)] text-base font-bold leading-tight text-[#5A0F18] group-hover:underline">
                {book.title}
              </p>
              <p className="mt-1.5 text-xs leading-5 text-[#1F1F1F]/65">{book.description}</p>
              <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-[#5A0F18]">
                Ver más
                <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
