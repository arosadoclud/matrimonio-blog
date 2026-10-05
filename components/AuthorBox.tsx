import Image from "next/image";
import Link from "next/link";
import { authorConfig } from "@/lib/site";

export function authorInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function AuthorBox() {
  return (
    <aside
      id="autor"
      aria-label={`Sobre el autor: ${authorConfig.name}`}
      className="rounded-[8px] border border-[#D4AF37]/35 bg-[#FFF7E8] p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {authorConfig.photo ? (
          <Image
            src={authorConfig.photo}
            alt={authorConfig.name}
            width={80}
            height={80}
            className="h-20 w-20 shrink-0 rounded-full border-2 border-[#D4AF37] object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#5A0F18] font-[var(--font-display)] text-3xl font-bold text-[#FFF7E8]"
          >
            {authorInitials(authorConfig.name)}
          </div>
        )}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8a6a18]">
            Escrito por
          </p>
          <h2 className="mt-1 font-[var(--font-display)] text-3xl font-bold text-[#5A0F18]">
            {authorConfig.name}
          </h2>
          <p className="text-sm font-semibold text-[#1F1F1F]/60">{authorConfig.role}</p>
          <p className="mt-3 text-sm leading-7 text-[#1F1F1F]/72">
            {authorConfig.name.split(" ")[0]} escribe y edita los artículos de Restaura Tu
            Matrimonio, un blog cristiano que acompaña a matrimonios en crisis con oración,
            reflexión bíblica y pasos prácticos. Las citas bíblicas se contrastan con el texto
            Reina-Valera 1960 antes de publicarse.
          </p>
          {authorConfig.bio ? (
            <p className="mt-3 text-sm leading-7 text-[#1F1F1F]/72">{authorConfig.bio}</p>
          ) : null}
          <p className="mt-3 text-sm font-semibold">
            <Link href="/sobre-nosotros#autor" className="text-[#5A0F18] underline underline-offset-2">
              Sobre el autor
            </Link>
            <span className="px-2 text-[#1F1F1F]/40">•</span>
            <Link href="/politica-editorial" className="text-[#5A0F18] underline underline-offset-2">
              Cómo trabajamos
            </Link>
          </p>
        </div>
      </div>
      <p className="mt-5 border-t border-[#D4AF37]/30 pt-4 text-xs leading-6 text-[#1F1F1F]/62">
        Descargo: este contenido es espiritual y educativo. No reemplaza consejería profesional,
        terapia, asesoría legal, acompañamiento pastoral directo ni ayuda especializada en
        situaciones de abuso, violencia o peligro.
      </p>
    </aside>
  );
}
