"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  // Second Pixel lives under a different Meta Business Manager than the
  // first (the one with access to the ad account actually running
  // campaigns) -- initializing both means fbq('track', ...) sends every
  // event to both Pixels without needing Meta's cross-business asset
  // sharing, which is blocked for new businesses for several weeks.
  const metaPixelId2 = process.env.NEXT_PUBLIC_META_PIXEL_ID_2;

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
          trackEvent("ScrollDepth", { percent: checkpoint });
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

  return (
    <>
      {gaId ? (
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
      ) : null}
      {metaPixelId ? (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              window.fbq('init', '${metaPixelId}');
              ${metaPixelId2 ? `window.fbq('init', '${metaPixelId2}');` : ""}
              window.fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
          {metaPixelId2 ? (
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${metaPixelId2}&ev=PageView&noscript=1`}
              />
            </noscript>
          ) : null}
        </>
      ) : null}
    </>
  );
}
