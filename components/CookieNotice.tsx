"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getStoredConsent,
  isConsentRequired,
  setStoredConsent,
  type ConsentValue,
} from "@/lib/consent";

const legacyStorageKey = "rtm-cookie-notice-accepted";

// TODO(legal): este texto es un aviso informativo, no una determinación legal
// de qué régimen de consentimiento aplica (GDPR opt-in, ePrivacy, aviso
// simple, etc.). Debe revisarlo un profesional legal antes de considerarse
// definitivo -- ver docs/manual-seo-setup.md.
export function CookieNotice() {
  const consentRequired = isConsentRequired();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (consentRequired) {
      setIsVisible(getStoredConsent() === null);
    } else {
      setIsVisible(window.localStorage.getItem(legacyStorageKey) !== "true");
    }
  }, [consentRequired]);

  if (!isVisible) {
    return consentRequired ? <ChangeConsentLink onReopen={() => setIsVisible(true)} /> : null;
  }

  function acknowledge() {
    window.localStorage.setItem(legacyStorageKey, "true");
    setIsVisible(false);
  }

  function decide(value: ConsentValue) {
    setStoredConsent(value);
    setIsVisible(false);
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-[8px] border border-[#D4AF37]/40 bg-white p-4 shadow-xl shadow-[#5A0F18]/15">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-[#1F1F1F]/72">
          Usamos cookies y herramientas de medición para mejorar el contenido y la experiencia.
          Puedes leer más en nuestra <Link href="/privacidad" className="font-bold text-[#5A0F18]">Política de Privacidad</Link>.
        </p>
        {consentRequired ? (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => decide("denied")}
              className="rounded-full border border-[#5A0F18]/30 px-5 py-2.5 text-sm font-semibold text-[#5A0F18]"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className="rounded-full bg-[#5A0F18] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Aceptar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={acknowledge}
            className="shrink-0 rounded-full bg-[#5A0F18] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Entendido
          </button>
        )}
      </div>
    </div>
  );
}

// Small persistent affordance so a visitor who already accepted/rejected can
// change their mind later, as required when consent gating is active.
function ChangeConsentLink({ onReopen }: { onReopen: () => void }) {
  return (
    <button
      type="button"
      onClick={onReopen}
      className="fixed bottom-4 left-4 z-50 rounded-full border border-[#5A0F18]/20 bg-white px-4 py-2 text-xs font-semibold text-[#5A0F18] shadow-md"
    >
      Preferencias de cookies
    </button>
  );
}
