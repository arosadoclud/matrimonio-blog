"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }
}

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const trackedDepths = new Set<number>();

    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest("[data-event]") : null;
      if (!target) {
        return;
      }

      trackEvent(String(target.getAttribute("data-event")), {
        label: target.getAttribute("data-label") ?? "sin_etiqueta"
      });
    }

    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        return;
      }

      const depth = Math.round((window.scrollY / scrollable) * 100);
      [25, 50, 75, 90].forEach((checkpoint) => {
        if (depth >= checkpoint && !trackedDepths.has(checkpoint)) {
          trackedDepths.add(checkpoint);
          trackEvent("scroll_depth", { percent: checkpoint });
        }
      });
    }

    window.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
