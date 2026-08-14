import Image from "next/image";

const kidsBooks = [
  {
    title: "Aventuras de la Biblia para colorear",
    description: "20 historias bíblicas para colorear, aprender y conversar en familia. Para niños de 4 a 9 años.",
    image: "/images/productos/pequenos-exploradores.jpg",
    href: "https://pequenos-exploradores-landing.vercel.app/",
  },
  {
    title: "Jonás y el gran pez para colorear",
    description: "30 páginas para colorear la historia de Jonás, con diploma y actividades. Para niños de 4 a 8 años.",
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
            className="group flex gap-3 rounded-[8px] border border-[#5A0F18]/8 p-2 transition hover:border-[#D4AF37]/50 hover:bg-[#FFF7E8]"
          >
            <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[4px]">
              <Image src={book.image} alt={`Portada de ${book.title}`} fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold leading-5 text-[#5A0F18] group-hover:underline">{book.title}</p>
              <p className="mt-1 text-xs leading-5 text-[#1F1F1F]/65">{book.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
