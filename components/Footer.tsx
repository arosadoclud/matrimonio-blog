import Link from "next/link";
import { categories, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[#5A0F18] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-[var(--font-display)] text-3xl font-bold">{siteConfig.name}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/78">
            Recursos cristianos para matrimonios que desean sanar, perdonar y volver a construir
            con fe, sabiduría y esperanza.
          </p>
        </div>
        <div>
          <p className="font-semibold text-[#D4AF37]">Explorar</p>
          <div className="mt-2 flex flex-col text-sm text-white/80">
            <Link className="inline-block py-1.5" href="/blog">Blog</Link>
            <Link className="inline-block py-1.5" href="/recursos">Recursos</Link>
            <Link className="inline-block py-1.5" href="/sobre-nosotros">Sobre nosotros</Link>
            <Link className="inline-block py-1.5" href="/contacto">Contacto</Link>
            <Link className="inline-block py-1.5" href="/privacidad">Política de Privacidad</Link>
            <Link className="inline-block py-1.5" href="/terminos">Términos</Link>
            <Link className="inline-block py-1.5" href="/afiliados">Afiliados</Link>
            <Link className="inline-block py-1.5" href="/cookies">Cookies</Link>
            <Link className="inline-block py-1.5" href="/politica-editorial">Política Editorial</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-[#D4AF37]">Categorías</p>
          <div className="mt-2 flex flex-col text-sm text-white/80">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.slug}
                className="inline-block py-1.5"
                href={`/categorias/${category.slug}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {siteConfig.domain}. Contenido informativo basado en
        principios bíblicos.
      </div>
    </footer>
  );
}
