"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Smartphone } from "lucide-react";
import MotionWrapper from "@/app/components/MotionWrapper";
import { DESKTOP_QR_URL } from "@/app/components/home/desktopQr";

function isAppleMobileOrTablet() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  return (
    /iPad|iPhone|iPod/.test(userAgent) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export default function DesktopQrCode() {
  const [shouldShowQr, setShouldShowQr] = useState(false);

  useEffect(() => {
    setShouldShowQr(!isAppleMobileOrTablet());
  }, []);

  if (!shouldShowQr) {
    return null;
  }

  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="hidden xl:block"
    >
      <Link
        href={DESKTOP_QR_URL}
        className="block w-[220px] rounded-lg border border-slate-200 bg-white/85 p-4 text-left shadow-lg shadow-slate-900/5 backdrop-blur transition-colors hover:border-slate-300 hover:bg-white"
        aria-label="Open UDID Tools mobile link with desktop QR tracking parameters"
      >
        <div className="rounded-md border border-slate-100 bg-white p-2">
          <Image
            src="/desktop-qr.svg"
            alt=""
            width={196}
            height={196}
            className="h-full w-full"
            unoptimized
          />
        </div>
        <div className="mt-4 flex items-start gap-2 text-sm font-medium text-slate-900">
          <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
          <span>Scan to continue on iPhone or iPad</span>
        </div>
      </Link>
    </MotionWrapper>
  );
}
