import Image from "next/image";

type KidsBook = {
  title: string;
  description: string;
  price: string;
  image: string;
  href: string;
  // Optional second purchase option (e.g. Amazon paperback), shown as a
  // smaller secondary link next to the main digital CTA. Add the real URL
  // here once confirmed -- never guess a product link.
  secondaryHref?: string;
  secondaryLabel?: string;
};

const kidsBooks: KidsBook[] = [
  {
    title: "Aventuras de la Biblia para colorear",
    description: "20 historias bíblicas para colorear, aprender y conversar en familia. Para niños de 4 a 9 años.",
    price: "Desde $9.99 · PDF descargable",
    image: "/images/productos/pequenos-exploradores.jpg",
    href: "https://pequenos-exploradores-landing.vercel.app/",
    secondaryHref: "https://www.amazon.com/dp/B0HDRP38F5",
    secondaryLabel: "También en tapa blanda (Amazon)",
  },
  {
    title: "Jonás y el gran pez para colorear",
    description: "30 páginas para colorear la historia de Jonás, con diploma y actividades. Para niños de 4 a 8 años.",
    price: "Desde $13.99 · PDF descargable",
    image: "/images/productos/jonas-y-el-gran-pez.jpg",
    href: "https://landing-pages-jonas.vercel.app/#beneficios",
  },
];

export function KidsBooksPromo() {
  return (
    <section className="rounded-[8px] border border-[#D4AF37]/35 bg-white p-5 shadow-sm">
      <span className="inline-flex items-center rounded-full bg-[#FFF7E8] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#8a6a18]">
        Promocional · Recursos para niños
      </span>
      <p className="mt-3 text-sm font-bold leading-5 text-[#5A0F18]">Para los más pequeños de la casa</p>
      <p className="mt-1 text-xs leading-5 text-[#1F1F1F]/65">
        También creamos libros bíblicos para colorear, pensados para acompañar la fe de tus hijos.
      </p>
      <div className="mt-4 grid gap-4">
        {kidsBooks.map((book) => (
          <div key={book.href} className="rounded-[8px] border border-[#5A0F18]/10 p-3">
            <div className="flex gap-3">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[4px] shadow-sm">
                <Image src={book.image} alt={`Portada de ${book.title}`} fill sizes="80px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold leading-5 text-[#5A0F18]">{book.title}</p>
                <p className="mt-1 text-xs leading-5 text-[#1F1F1F]/65">{book.description}</p>
                <p className="mt-1 text-xs font-bold text-[#8a6a18]">{book.price}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={book.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-[#5A0F18] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#3f0b11]"
              >
                Ver el libro →
              </a>
              {book.secondaryHref ? (
                <a
                  href={book.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#5A0F18] underline underline-offset-2 hover:text-[#3f0b11]"
                >
                  {book.secondaryLabel ?? "Ver en Amazon"}
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
