type Faq = {
  question: string;
  answer: string;
};

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="mt-12" id="preguntas-frecuentes" aria-label="Preguntas frecuentes">
      <h2 className="font-[var(--font-display)] text-3xl font-bold leading-tight text-[#5A0F18] sm:text-4xl">
        Preguntas frecuentes
      </h2>
      <div className="mt-6 grid gap-3">
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            className="group rounded-[8px] border border-[#5A0F18]/12 bg-[#FFFDF8] open:border-[#D4AF37]/45 open:shadow-sm"
            {...(index === 0 ? { open: true } : {})}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[#3c1117] marker:content-none">
              <span className="text-base leading-6 sm:text-lg">{faq.question}</span>
              <svg
                className="h-5 w-5 shrink-0 text-[#8a6a18] transition-transform duration-200 group-open:rotate-180"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <div className="border-t border-[#5A0F18]/8 px-5 pb-5 pt-4 text-[0.98rem] leading-7 text-[#1F1F1F]/78">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
