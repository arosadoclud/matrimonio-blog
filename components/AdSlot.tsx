type AdSlotProps = {
  label?: string;
  className?: string;
};

export function AdSlot({ label = "Espacio publicitario", className = "" }: AdSlotProps) {
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) {
    return null;
  }

  return (
    <aside
      aria-label={label}
      className={`rounded-[8px] border border-[#5A0F18]/10 bg-white/70 p-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#1F1F1F]/45 ${className}`}
      data-ad-slot="true"
    >
      {label}
    </aside>
  );
}
