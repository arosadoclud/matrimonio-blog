import Link from "next/link";
import { slugify } from "@/lib/site";

type CategoryBadgeProps = {
  category: string;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Link
      href={`/categorias/${slugify(category)}`}
      className="inline-flex rounded-full border border-[#D4AF37]/40 bg-[#FFF7E8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#5A0F18]"
    >
      {category}
    </Link>
  );
}
