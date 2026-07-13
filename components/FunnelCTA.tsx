"use client";

import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { siteConfig } from "@/lib/site";
import { trackEvent, trackHotmartCtaClick } from "@/lib/analytics";

type FunnelCTAProps =
  | { variant: "top" }
  | { variant: "middle"; topic: string; slug: string }
  | { variant: "bottom" };

function buildHotmartUrl(content: string) {
  const url = new URL(siteConfig.hotmartUrl);
  url.searchParams.set("utm_source", "blog");
  url.searchParams.set("utm_medium", "cta");
  url.searchParams.set("utm_campaign", "funnel_blog");
  url.searchParams.set("utm_content", content);
  return url.toString();
}

export function FunnelCTA(props: FunnelCTAProps) {
  if (props.variant === "top") {
    return (
      <section className="mb-10 rounded-[8px] border border-[#D4AF37]/35 bg-[#FFF7E8] p-6 sm:p-7">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8a6a18]">Guía gratis</p>
        <p className="mt-2 font-[var(--font-display)] text-2xl font-bold leading-tight text-[#5A0F18]">
          Recibe gratis: 7 días de oración por la restauración de tu matrimonio
        </p>
        <p className="mt-2 text-sm leading-6 text-[#1F1F1F]/70">
          Una guía devocional para acompañarte esta semana con oración, reflexión bíblica y pasos
          prácticos.
        </p>
        <NewsletterForm />
      </section>
    );
  }

  if (props.variant === "middle") {
    return (
      <section className="mb-10 rounded-[8px] border border-[#5A0F18]/10 bg-white p-6 shadow-sm sm:p-7">
        <p className="font-[var(--font-display)] text-2xl font-bold leading-tight text-[#5A0F18]">
          Si tu matrimonio atraviesa {props.topic.toLowerCase()}, este recurso puede ayudarte hoy
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#1F1F1F]/70">
          Conoce el recurso recomendado con oración, reflexión y acciones concretas para avanzar en
          este proceso.
        </p>
        <Link
          href={`/recursos?src=${encodeURIComponent(props.slug)}`}
          data-cta-id="funnel_cta_middle"
          onClick={() => trackEvent("CtaClick", { content_name: "funnel_cta_middle", source_post: props.slug })}
          className="mt-5 inline-flex rounded-full bg-[#5A0F18] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#3f0b11]"
        >
          Ver recurso recomendado
        </Link>
      </section>
    );
  }

  const hotmartUrl = buildHotmartUrl("article_bottom");

  return (
    <section className="mb-10 rounded-[8px] bg-[#5A0F18] p-6 text-white sm:p-8">
      <p className="font-[var(--font-display)] text-3xl font-bold leading-tight">
        No dejes tu matrimonio para después. Empieza a restaurarlo hoy.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">
        Accede al programa cristiano paso a paso que ha acompañado a matrimonios en crisis a sanar,
        perdonar y volver a construir.
      </p>
      <a
        href={hotmartUrl}
        data-cta-id="article_bottom_cta"
        onClick={() => trackHotmartCtaClick("article_bottom_cta")}
        className="mt-6 inline-flex rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#1F1F1F] transition hover:bg-[#e1bd45]"
      >
        Quiero recuperar mi matrimonio →
      </a>
      <p className="mt-3 text-xs text-white/60">
        Te llevamos a restauratumatrimonio.org, el sitio oficial del programa.
      </p>
    </section>
  );
}
