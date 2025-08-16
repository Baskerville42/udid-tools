import { Suspense } from "react";
import type { Metadata } from "next";
import { SuccessClient } from "./SuccessClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Success – Your device information",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <SuccessClient />
    </Suspense>
  );
}
