import Link from "next/link";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/categorias", label: "Categorías" },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#5A0F18]/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-[var(--font-display)] text-2xl font-bold text-[#5A0F18]">
            Restaura Tu Matrimonio
          </span>
          <span className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8a6a18]">
            Esperanza cristiana
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-[#1F1F1F]/80 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#5A0F18]">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/recursos"
          className="hidden rounded-full bg-[#5A0F18] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3f0b11] sm:inline-flex"
        >
          Recurso recomendado
        </Link>
      </div>
    </header>
  );
}
