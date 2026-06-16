import type { Metadata } from "next";
import SuccessClient from "@/app/success/SuccessClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Device Information Result",
  description: "Temporary UDID Tools result page.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
  },
};

export default function Page() {
  return <SuccessClient />;
}
