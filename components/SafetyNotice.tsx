export function SafetyNotice({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="note"
      aria-label="Advertencia de seguridad"
      className="my-6 rounded-[8px] border-l-4 border-[#8a1f1f] bg-[#FBEAEA] p-5 text-[#5A1414]"
    >
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a1f1f]">
        Tu seguridad es lo primero
      </p>
      <div className="mt-2 text-sm leading-6 [&_strong]:font-bold">{children}</div>
    </div>
  );
}
