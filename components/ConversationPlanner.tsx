"use client";

import { useState } from "react";

type Field = "topic" | "feeling" | "need" | "request" | "time";

const prompts: { key: Field; label: string; help: string; placeholder: string }[] = [
  { key: "topic", label: "Un solo tema", help: "Describe un hecho reciente, sin «siempre» ni «nunca». ¿Qué ocurrió?", placeholder: "Por ejemplo: ayer dejamos sin resolver cómo organizar los gastos." },
  { key: "feeling", label: "Lo que sientes", help: "Habla desde tu experiencia, sin atribuir intenciones a la otra persona.", placeholder: "Me sentí preocupado/a y solo/a..." },
  { key: "need", label: "Lo que necesitas", help: "Nombra una necesidad concreta: claridad, tiempo, respeto o apoyo.", placeholder: "Necesito que podamos revisar juntos el presupuesto..." },
  { key: "request", label: "Una petición posible", help: "Pide una acción observable que la otra persona pueda aceptar, rechazar o negociar.", placeholder: "¿Podemos dedicar 20 minutos el sábado a revisar las cuentas?" },
  { key: "time", label: "Momento y pausa", help: "Elige cuándo hablar y acuerda cómo detenerse si sube el tono.", placeholder: "El sábado después de comer. Si discutimos, pausamos 20 minutos." },
];

export function ConversationPlanner() {
  const [values, setValues] = useState<Record<Field, string>>({ topic: "", feeling: "", need: "", request: "", time: "" });
  const hasContent = Object.values(values).some((value) => value.trim());

  return (
    <div data-clarity-mask="true" className="planner-grid grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="planner-form space-y-4">
        {prompts.map((prompt, index) => (
          <div key={prompt.key} className="rounded-2xl border border-[#e9ddd4] bg-white p-5 sm:p-6">
            <label htmlFor={prompt.key} className="flex items-baseline gap-3 font-[var(--font-display)] text-2xl font-semibold text-[#3e2528]"><span className="text-[#b87967]">0{index + 1}</span>{prompt.label}</label>
            <p className="mt-1 text-sm leading-6 text-[#655b56]">{prompt.help}</p>
            <textarea id={prompt.key} value={values[prompt.key]} onChange={(event) => setValues((current) => ({ ...current, [prompt.key]: event.target.value }))} placeholder={prompt.placeholder} rows={3} maxLength={600} className="mt-4 w-full resize-y rounded-xl border border-[#dbc9bf] bg-[#fffcf9] p-4 text-sm leading-6 text-[#3e2528] outline-none placeholder:text-[#8d8079] focus:border-[#7c403d] focus:ring-2 focus:ring-[#7c403d]/15" />
          </div>
        ))}
      </div>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[1.5rem] bg-[#e8eee6] p-6 sm:p-8" aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#43664e]">Tu borrador privado</p>
          <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[#2d4638]">Una conversación, un tema</h2>
          {hasContent ? (
            <dl className="mt-6 space-y-4 text-sm leading-7 text-[#46564b]">
              {prompts.filter((prompt) => values[prompt.key].trim()).map((prompt) => (
                <div key={prompt.key} className="border-t border-[#b7cbb8] pt-3"><dt className="font-bold">{prompt.label}</dt><dd className="whitespace-pre-wrap break-words">{values[prompt.key]}</dd></div>
              ))}
            </dl>
          ) : <p className="mt-5 leading-7 text-[#46564b]">Completa los campos para ver aquí tus ideas ordenadas. Puedes dejar preguntas en blanco.</p>}
          <div className="mt-7 flex flex-wrap gap-3 print:hidden">
            <button type="button" onClick={() => window.print()} disabled={!hasContent} className="rounded-full bg-[#345a47] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Imprimir o guardar PDF</button>
            <button type="button" onClick={() => setValues({ topic: "", feeling: "", need: "", request: "", time: "" })} disabled={!hasContent} className="rounded-full border border-[#8baa91] px-5 py-2.5 text-sm font-semibold text-[#345a47] disabled:cursor-not-allowed disabled:opacity-50">Borrar borrador</button>
          </div>
          <p className="mt-5 text-xs leading-5 text-[#526b58]">Esta herramienta no envía tus respuestas mediante un formulario ni las guarda en el sitio. Si cierras la página, se perderán. Si compartes el dispositivo, evita imprimir o guardar un PDF que otra persona pueda encontrar.</p>
        </div>
      </div>
    </div>
  );
}
