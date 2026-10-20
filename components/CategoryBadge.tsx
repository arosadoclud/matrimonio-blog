import Link from "next/link";
import { slugify } from "@/lib/site";

type CategoryBadgeProps = {
  category: string;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Link
      href={`/categorias/${slugify(category)}`}
      className="inline-flex rounded-full border border-[#86604f]/40 bg-[#f7f1e9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#713f50]"
    >
      {category}
    </Link>
  );
}
