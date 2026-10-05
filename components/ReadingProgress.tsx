"use client";

import { useEffect, useState } from "react";

// Barra fina de progreso de lectura, fija arriba. Mide el avance a través del
// elemento con id="articulo" (el <article> de ArticleLayout).
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const article = document.getElementById("articulo");
      if (!article) {
        return;
      }
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0);
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div
        className="h-full origin-left bg-gradient-to-r from-[#D4AF37] to-[#5A0F18]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
