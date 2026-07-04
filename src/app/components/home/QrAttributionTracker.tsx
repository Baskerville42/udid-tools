"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { DESKTOP_QR_EVENT_NAME } from "@/app/components/home/desktopQr";

export default function QrAttributionTracker() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get("utm_source") !== "desktop_qr" || searchParams.get("utm_medium") !== "qr") {
      return;
    }

    track(DESKTOP_QR_EVENT_NAME, {
      campaign: searchParams.get("utm_campaign") ?? "desktop_to_mobile",
    });
  }, []);

  return null;
}
