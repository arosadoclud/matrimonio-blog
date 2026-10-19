import type { Metadata } from "next";
import Link from "next/link";
import { ConversationPlanner } from "@/components/ConversationPlanner";
import { buildCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Prepara una conversación difícil en pareja | Hoja de trabajo",
  description: "Hoja de trabajo gratuita para ordenar un tema, expresar lo que sientes, hacer una petición concreta y planear una pausa durante una conversación difícil.",
  alternates: { canonical: buildCanonicalUrl("/herramientas/primera-conversacion") },
};

export default function FirstConversationPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link href="/" className="text-sm font-semibold text-[#7c403d] underline underline-offset-4">← Volver al inicio</Link>
      <div className="mt-10 max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#986055]">Herramienta gratuita · 10 minutos</p>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-[1.04] text-[#3e2528] sm:text-6xl">Prepara una conversación difícil sin intentar resolverlo todo hoy.</h1>
        <p className="mt-6 text-lg leading-8 text-[#514944]">Esta hoja te ayuda a elegir un solo tema, hablar desde tu experiencia y formular una petición clara. Escríbela para ordenar tus ideas; no tienes que leerla palabra por palabra a tu pareja.</p>
      </div>
      <div className="mt-10 rounded-2xl border border-[#e5d0c3] bg-[#fbf1e9] p-5 text-sm leading-7 text-[#5d3d38] sm:p-6"><strong>Antes de empezar:</strong> si hay amenazas, violencia, coerción o miedo por tu seguridad, no uses esta hoja para negociar a solas. Busca apoyo de una persona de confianza y servicios locales de emergencia o ayuda especializada. Una conversación de pareja requiere condiciones de seguridad.</div>
      <div className="mt-12"><ConversationPlanner /></div>
      <section className="mt-16 max-w-4xl border-t border-[#e9ddd4] pt-10">
        <h2 className="font-[var(--font-display)] text-4xl font-semibold text-[#3e2528]">Cómo usar tu borrador</h2>
        <ol className="mt-5 list-decimal space-y-3 pl-6 leading-7 text-[#514944]"><li>Lee tus palabras en voz alta. Cambia cualquier frase que suene a acusación o ultimátum.</li><li>Pregunta si la otra persona tiene tiempo y disposición para hablar. Acepta otro momento concreto si hoy no es posible.</li><li>Durante la conversación, escucha y resume lo que entendiste antes de responder.</li><li>Si alguno alza la voz o se siente sobrepasado, hagan una pausa y acuerden cuándo retomarla.</li><li>Terminen con un acuerdo pequeño y revisable; la confianza se construye con constancia.</li></ol>
        <p className="mt-6 leading-7 text-[#514944]">Para profundizar, lee <Link href="/blog/como-recuperar-la-comunicacion-con-mi-pareja" className="font-semibold text-[#7c403d] underline underline-offset-4">cómo recuperar la comunicación con tu pareja</Link>. Esta herramienta es educativa y no sustituye terapia, consejería profesional ni orientación legal.</p>
      </section>
    </section>
  );
}
