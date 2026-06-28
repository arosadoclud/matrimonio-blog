"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const storageKey = "rtm-cookie-notice-accepted";

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(storageKey) !== "true");
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-[8px] border border-[#D4AF37]/40 bg-white p-4 shadow-xl shadow-[#5A0F18]/15">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-[#1F1F1F]/72">
          Usamos cookies y herramientas de medición para mejorar el contenido y la experiencia.
          Puedes leer más en nuestra <Link href="/privacidad" className="font-bold text-[#5A0F18]">Política de Privacidad</Link>.
        </p>
        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem(storageKey, "true");
            setIsVisible(false);
          }}
          className="rounded-full bg-[#5A0F18] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
