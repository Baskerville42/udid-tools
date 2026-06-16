"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";

export default function VercelAnalytics() {
  const pathname = usePathname();

  if (pathname === "/success") {
    return null;
  }

  return <Analytics />;
}
