"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const VercelAnalyticsScripts = dynamic(() => import("@/app/components/VercelAnalyticsScripts"), {
  ssr: false,
});

export default function VercelAnalytics() {
  const pathname = usePathname();

  if (pathname === "/success") {
    return null;
  }

  return <VercelAnalyticsScripts />;
}
