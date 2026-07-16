"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires the Lead conversion event on the thank-you page instead of right
 * before router.push() in the form. Firing it pre-navigation raced the
 * client-side route change against the analytics beacon and silently lost
 * the event most of the time -- Brevo showed 0 contacts even though the
 * form itself worked, because Meta Pixel/GA4 never actually received the
 * conversion. A full page load of this route guarantees the event fires.
 * Guarded by sessionStorage so a refresh of this page doesn't double-count.
 */
export function LeadConfirmedTracker({ contentName }: { contentName: string }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const guardKey = `lead_tracked_${contentName}`;
    if (sessionStorage.getItem(guardKey)) {
      return;
    }
    sessionStorage.setItem(guardKey, "1");

    trackEvent("Lead", {
      content_name: contentName,
      utm_source: searchParams.get("utm_source") ?? "",
      utm_medium: searchParams.get("utm_medium") ?? "",
      utm_campaign: searchParams.get("utm_campaign") ?? "",
      utm_content: searchParams.get("utm_content") ?? "",
    });
  }, [contentName]);

  return null;
}
