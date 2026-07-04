"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type ViewContentTrackerProps = {
  contentName: string;
  contentCategory?: string;
};

export function ViewContentTracker({ contentName, contentCategory }: ViewContentTrackerProps) {
  useEffect(() => {
    trackEvent("ViewContent", {
      content_name: contentName,
      ...(contentCategory ? { content_category: contentCategory } : {}),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentName, contentCategory]);

  return null;
}
