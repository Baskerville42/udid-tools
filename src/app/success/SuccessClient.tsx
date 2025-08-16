"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { writeClipboardSafe } from "@/utils/clipboard";
import CopyableField from "./CopyableField";

type FieldKey = "UDID" | "IMEI" | "MEID" | "PRODUCT" | "SERIAL" | "VERSION";

export function SuccessClient() {
  const searchParams = useSearchParams();

  const fields = useMemo(() => {
    const get = (k: FieldKey) => searchParams.get(k) ?? "";
    return [
      { label: "UDID", key: "UDID", value: get("UDID") },
      { label: "IMEI", key: "IMEI", value: get("IMEI") },
      { label: "MEID", key: "MEID", value: get("MEID") },
      { label: "PRODUCT", key: "PRODUCT", value: get("PRODUCT") },
      { label: "SERIAL", key: "SERIAL", value: get("SERIAL") },
      { label: "VERSION", key: "VERSION", value: get("VERSION") },
    ] as const;
  }, [searchParams]);

  const nonEmpty = fields.filter((f) => !!f.value);

  const copyAll = async (as: "txt" | "json" = "txt") => {
    const text =
      as === "json"
        ? JSON.stringify(Object.fromEntries(nonEmpty.map((f) => [f.key, f.value])), null, 2)
        : nonEmpty.map((f) => `${f.label}: ${f.value}`).join("\n");

    const ok = await writeClipboardSafe(text);
    alert(
      ok
        ? `All fields${as === "json" ? " (JSON)" : ""} copied to clipboard`
        : "Copy failed. Please copy manually."
    );
  };

  const downloadTxt = () => {
    const text = fields.map((f) => `${f.label}: ${f.value || "-"}`).join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "device-info.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const canShare = typeof navigator !== "undefined" && "share" in navigator;

  const shareAll = async () => {
    const text = fields.map((f) => `${f.label}: ${f.value || "-"}`).join("\n");
    try {
      await navigator.share?.({ title: "Device info", text });
    } catch {
      /* user canceled */
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 font-sans">
      <h1 className="text-2xl font-bold sm:text-3xl">Success! Here’s your device information.</h1>
      <p className="mt-2 text-gray-700">
        We have retrieved the unique identifiers and basic information of your device. Tap any{" "}
        <span className="font-medium">Copy</span> button or use actions below.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => copyAll("txt")}
          className="h-10 rounded-full border border-black/10 px-4 text-sm font-medium transition hover:bg-black/5"
        >
          Copy all (TXT)
        </button>
        <button
          onClick={() => copyAll("json")}
          className="h-10 rounded-full border border-black/10 px-4 text-sm font-medium transition hover:bg-black/5"
        >
          Copy all (JSON)
        </button>
        <button
          onClick={downloadTxt}
          className="h-10 rounded-full border border-black/10 px-4 text-sm font-medium transition hover:bg-black/5"
        >
          Download .txt
        </button>
        {canShare && (
          <button
            onClick={shareAll}
            className="h-10 rounded-full border border-black/10 px-4 text-sm font-medium transition hover:bg-black/5"
          >
            Share…
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-3">
        {fields.map(({ label, key, value }) => (
          <CopyableField key={key} label={label} value={value} />
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Missing a value? Ensure you installed the profile and opened this page in Safari on the same
        device.
      </p>
    </div>
  );
}
