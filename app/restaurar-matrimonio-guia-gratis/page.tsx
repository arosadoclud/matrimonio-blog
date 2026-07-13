import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { CampaignLeadForm } from "@/components/CampaignLeadForm";
import { ViewContentTracker } from "@/components/ViewContentTracker";
import { WhatsAppContactButton } from "@/components/WhatsAppContactButton";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guía gratis: 7 días de oración por tu matrimonio",
  description: "Solicita gratis una guía cristiana de siete días para orar por tu matrimonio y dar un primer paso con esperanza y sabiduría.",
  alternates: { canonical: `${siteConfig.url}/restaurar-matrimonio-guia-gratis` },
  robots: { index: false, follow: false },
};

const benefits = [
  "7 días de oración guiada.",
  "Reflexiones cristianas sencillas.",
  "Preguntas para conversar en pareja.",
  "Un primer paso de restauración sin presión.",
];

export default function CampaignLandingPage() {
  return (
    <div className="min-h-screen bg-[#fffaf1] text-[#241817]">
      <ViewContentTracker
        contentName="guia_7_dias_oracion_matrimonio"
        contentCategory="facebook_ads_landing"
      />
      <WhatsAppContactButton placement="campaign" />
      <header className="border-b border-[#5A0F18]/10 bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-4 sm:px-8">
          <Image src="/favicon.png" alt="" width={42} height={42} className="rounded-full" priority />
          <div>
            <p className="font-[var(--font-display)] text-xl font-bold text-[#5A0F18]">Restaura tu Matrimonio</p>
            <p className="text-xs text-[#6d5b57]">Esperanza y dirección cristiana para tu hogar</p>
          </div>
        </div>
      </header>

      <div>
        <section className="relative overflow-hidden border-b border-[#5A0F18]/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(212,175,55,0.18),transparent_35%),radial-gradient(circle_at_95%_80%,rgba(90,15,24,0.10),transparent_35%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-20">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#936f1d]">Guía cristiana gratuita</p>
              <h1 className="max-w-3xl font-[var(--font-display)] text-4xl font-bold leading-[1.06] text-[#5A0F18] sm:text-5xl lg:text-6xl">
                ¿Sientes que tu matrimonio se está apagando?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3f3431] sm:text-xl">
                Solicita gratis la guía de 7 días de oración por tu matrimonio y da hoy un primer paso para volver a poner a Dios en el centro de tu hogar.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 rounded-lg bg-white/75 px-4 py-3 shadow-sm ring-1 ring-[#5A0F18]/8">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e7f5e9] text-sm font-bold text-[#26713a]">✓</span>
                    <span className="text-sm font-semibold text-[#3b2e2b]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-xl border border-[#D4AF37]/35 bg-white p-6 shadow-[0_24px_70px_rgba(70,31,25,0.14)] sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#936f1d]">Empieza hoy</p>
              <h2 className="mt-2 font-[var(--font-display)] text-3xl font-bold leading-tight text-[#5A0F18]">Recibe la guía en tu correo</h2>
              <p className="mb-6 mt-3 text-sm leading-6 text-[#5d504c]">Completa tus datos y te enviaremos los próximos pasos.</p>
              <Suspense fallback={<div className="h-56 animate-pulse rounded-lg bg-[#f4ede2]" />}>
                <CampaignLeadForm placement="hero" />
              </Suspense>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#936f1d]">Un paso posible, sin promesas vacías</p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold text-[#5A0F18] sm:text-4xl">Siete días para orar, reflexionar y recuperar dirección</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#514541]">
            No necesitas tener todas las respuestas hoy. Esta guía te ayudará a detenerte, presentar tu matrimonio delante de Dios y reconocer un siguiente paso sabio y concreto.
          </p>
          <div className="mx-auto mt-9 max-w-3xl rounded-xl border border-[#D4AF37]/30 bg-[#fff4d8] p-6 text-left text-sm leading-7 text-[#51402f] sm:p-8">
            <strong className="block text-[#5A0F18]">Una aclaración importante</strong>
            Esta guía está pensada para matrimonios atravesando cansancio, rutina, estrés o distancia emocional ordinaria. No sustituye ayuda pastoral, profesional ni medidas de protección en casos de abuso, violencia, abandono o infidelidad.
          </div>
          <a href="#solicitar-guia" className="mt-9 inline-flex min-h-14 items-center justify-center rounded-lg bg-[#5A0F18] px-8 py-4 font-bold text-white shadow-lg transition hover:bg-[#741923]">
            Solicitar mi guía gratis
          </a>
        </section>

        <section id="solicitar-guia" className="bg-[#3b0d13] px-5 py-14 text-white sm:px-8 md:py-20">
          <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#efd174]">Tu primer día puede comenzar ahora</p>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold sm:text-4xl">Solicita tu guía gratuita</h2>
              <p className="mt-4 leading-7 text-white/78">Recíbela en tu correo y comienza con una oración sencilla, honesta y centrada en Dios.</p>
            </div>
            <div className="rounded-xl bg-white p-6 text-[#241817] shadow-2xl">
              <Suspense fallback={<div className="h-56 animate-pulse rounded-lg bg-[#f4ede2]" />}>
                <CampaignLeadForm placement="closing" />
              </Suspense>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-[#26080d] px-5 py-6 text-center text-xs leading-5 text-white/60">
        © {new Date().getFullYear()} Restaura tu Matrimonio · Tu información será tratada con respeto y
        privacidad. <a href="/privacidad" className="font-semibold text-white/80 underline underline-offset-4">Leer política de privacidad</a>
      </footer>
    </div>
  );
}
