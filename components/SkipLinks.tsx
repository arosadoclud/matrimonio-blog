import Link from "next/link";

export function SkipLinks() {
  return (
    <div className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#5A0F18] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2">
      <Link href="#main-content" className="focus:rounded-md">
        Saltar al contenido principal
      </Link>
    </div>
  );
}