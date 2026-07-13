import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppContactButton } from "@/components/WhatsAppContactButton";
import { LeadConfirmedTracker } from "@/components/LeadConfirmedTracker";

export const metadata: Metadata = {
  title: "Tu guía está en camino",
  description: "Confirmación de solicitud de la guía de oración por el matrimonio.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#fffaf1] px-5 py-16">
      <LeadConfirmedTracker contentName="guia_7_dias_oracion_matrimonio" />
      <WhatsAppContactButton placement="thank_you" />
      <section className="w-full max-w-2xl rounded-xl border border-[#D4AF37]/35 bg-white p-8 text-center shadow-[0_24px_70px_rgba(70,31,25,0.14)] sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e8f6ea] text-3xl text-[#26713a]">✓</div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.15em] text-[#936f1d]">Solicitud recibida</p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl font-bold text-[#5A0F18] sm:text-5xl">Tu guía está en camino</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#514541]">
          Revisa tu correo en los próximos minutos. Si no encuentras la guía en tu bandeja de
          entrada, revisa también las carpetas de Promociones, Correo no deseado o SPAM.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#6b5b55]">
          Cuando la encuentres, marca el correo como seguro para recibir correctamente los próximos
          recursos de Restaura tu Matrimonio.
        </p>
        <div className="mt-8 rounded-lg bg-[#fff4d8] px-5 py-4 text-sm leading-6 text-[#51402f]">
          Mientras llega, respira y haz una oración sencilla: “Señor, dame sabiduría para dar el próximo paso con verdad, amor y prudencia”.
        </div>
        <Link href="/blog" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#5A0F18] px-6 py-3 font-bold text-white transition hover:bg-[#741923]">
          Leer recursos para mi matrimonio
        </Link>
      </section>
    </div>
  );
}
