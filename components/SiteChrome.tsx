"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const CAMPAIGN_ROUTES = [
  "/restaurar-matrimonio-guia-gratis",
  "/gracias-guia-matrimonio",
];

export function SiteChrome({ position }: { position: "header" | "footer" }) {
  const pathname = usePathname();
  const isCampaignPage = CAMPAIGN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isCampaignPage) return null;
  return position === "header" ? <Header /> : <Footer />;
}
