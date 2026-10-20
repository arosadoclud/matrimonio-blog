const reflections: Record<string, { thought: string; reference: string }> = {
  "Comunicación en pareja": {
    thought: "Escucha primero; habla y responde con calma.",
    reference: "Santiago 1:19",
  },
  "Perdón y reconciliación": {
    thought: "La bondad y el perdón requieren una decisión consciente.",
    reference: "Efesios 4:32",
  },
  "Oración por el matrimonio": {
    thought: "Presenta tus preocupaciones a Dios en oración.",
    reference: "Filipenses 4:6",
  },
  "Crisis matrimonial": {
    thought: "Dios está cerca de quienes tienen el corazón quebrantado.",
    reference: "Salmo 34:18",
  },
  "Restauración matrimonial": {
    thought: "Vístanse de paciencia, bondad y humildad en el trato mutuo.",
    reference: "Colosenses 3:12–13",
  },
  "Consejos bíblicos": {
    thought: "Busca consejo prudente antes de tomar decisiones importantes.",
    reference: "Proverbios 15:22",
  },
  Testimonios: {
    thought: "Recordar lo vivido puede abrir espacio para una nueva esperanza.",
    reference: "Salmo 40:3",
  },
};

export function VerseBox({ category }: { category: string }) {
  const reflection = reflections[category];
  if (!reflection) return null;

  return (
    <aside className="mb-9 rounded-[1.25rem] border border-[#e6cfb8] bg-[#fbf3e6] px-6 py-6 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86604f]">Para meditar</p>
      <p className="mt-3 font-[var(--font-display)] text-3xl font-semibold leading-tight text-[#713f50]">
        {reflection.thought}
      </p>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#86604f]">
        Lectura sugerida · {reflection.reference}
      </p>
    </aside>
  );
}
