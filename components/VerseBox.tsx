type VerseBoxProps = {
  verse?: string;
  reference?: string;
};

export function VerseBox({
  verse = "Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces.",
  reference = "Jeremías 33:3"
}: VerseBoxProps) {
  return (
    <aside className="rounded-[8px] border border-[#D4AF37]/45 bg-[#FFF7E8] p-6">
      <p className="font-[var(--font-display)] text-2xl font-bold leading-snug text-[#5A0F18]">“{verse}”</p>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#8a6a18]">{reference}</p>
    </aside>
  );
}
