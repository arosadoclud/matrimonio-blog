"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/categorias", label: "Categorías" },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
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

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 text-sm font-semibold text-[#1F1F1F]/80 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="transition hover:text-[#5A0F18]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/recursos"
              className="hidden rounded-full bg-[#5A0F18] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3f0b11] sm:inline-flex"
            >
              Recurso recomendado
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="sr-only">{isOpen ? "Cerrar" : "Abrir"} menú</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6 text-[#5A0F18]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-[#5A0F18]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <nav
        id="mobile-menu"
        className={`fixed bottom-0 right-0 top-0 z-50 w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Navegación móvil"
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-[var(--font-display)] text-xl font-bold text-[#5A0F18]">
              Menú
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menú"
              className="rounded-full p-2 text-[#5A0F18] transition hover:bg-[#5A0F18]/10"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-base font-medium transition ${
                  pathname === item.href
                    ? "bg-[#5A0F18] text-white"
                    : "text-[#1F1F1F] hover:bg-[#FFF7E8]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto">
            <Link
              href="/recursos"
              className="block w-full rounded-full bg-[#5A0F18] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#3f0b11]"
            >
              Recurso recomendado
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}