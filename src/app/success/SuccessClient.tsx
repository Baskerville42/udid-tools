"use client";

import * as Sentry from "@sentry/nextjs";
import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { inject, track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertCircle, Copy, Check, Smartphone, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import MotionWrapper from "@/app/components/MotionWrapper";
import DeviceInfoCard from "@/app/components/success/DeviceInfoCard";
import { Button } from "@/app/components/ui/button";
import {
  sampleDeviceData,
  SAMPLE_RESULT_QUERY_PARAM,
  SAMPLE_RESULT_SOURCE,
} from "@/app/success/sampleDeviceData";
import { writeClipboardSafe } from "@/utils/clipboard";

type FieldKey = "UDID" | "IMEI" | "MEID" | "PRODUCT" | "SERIAL" | "VERSION";

type DeviceData = typeof sampleDeviceData;

function SuccessContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [status] = useState("success"); // 'success', 'error', 'pending'

  const fields = useMemo(() => {
    const get = (k: FieldKey) => searchParams.get(k) ?? "";
    return [
      { label: "UDID", key: "UDID", value: get("UDID"), type: "udid" },
      { label: "IMEI", key: "IMEI", value: get("IMEI"), type: "imei" },
      { label: "MEID", key: "MEID", value: get("MEID"), type: "imei" },
      { label: "PRODUCT", key: "PRODUCT", value: get("PRODUCT"), type: "product" },
      { label: "SERIAL", key: "SERIAL", value: get("SERIAL"), type: "serial" },
      { label: "VERSION", key: "VERSION", value: get("VERSION"), type: "version" },
    ] as const;
  }, [searchParams]);

  const nonEmpty = fields.filter((field) => !!field.value);
  const hasDeviceInfo = nonEmpty.length > 0;
  const resultSource =
    searchParams.get(SAMPLE_RESULT_QUERY_PARAM) === SAMPLE_RESULT_SOURCE
      ? SAMPLE_RESULT_SOURCE
      : "profile";

  useEffect(() => {
    const outcome = hasDeviceInfo ? "success" : "missing_device_info";
    const attributes = {
      field_count: nonEmpty.length,
      outcome,
      result_source: resultSource,
      stage: "result_rendered",
    };

    Sentry.addBreadcrumb({
      category: "udid-flow",
      message: "Device result rendered",
      data: attributes,
    });
    Sentry.logger.info("device_result_rendered", attributes);
    Sentry.metrics.count("udid_tools.flow.completed", 1, {
      attributes: { outcome, result_source: resultSource },
    });
  }, [hasDeviceInfo, nonEmpty.length, resultSource]);

  useEffect(() => {
    if (resultSource !== SAMPLE_RESULT_SOURCE) {
      return;
    }

    inject({ disableAutoTrack: true });
    track("sample_result_viewed", {
      field_count: nonEmpty.length,
      outcome: hasDeviceInfo ? "success" : "missing_device_info",
    });
  }, [hasDeviceInfo, nonEmpty.length, resultSource]);

  const deviceData: DeviceData = {
    ...sampleDeviceData,
    udid: searchParams.get("UDID") || sampleDeviceData.udid,
    model: searchParams.get("PRODUCT") || sampleDeviceData.model,
    version: searchParams.get("VERSION") || sampleDeviceData.version,
    serial: searchParams.get("SERIAL") || sampleDeviceData.serial,
    product: searchParams.get("PRODUCT") || sampleDeviceData.product,
    imei: searchParams.get("IMEI") || sampleDeviceData.imei,
    meid: searchParams.get("MEID") || sampleDeviceData.meid,
  };

  const formatFields = (includeEmpty = false) =>
    (includeEmpty ? fields : nonEmpty)
      .map((field) => `${field.label}: ${field.value || "-"}`)
      .join("\n");

  const handleCopyAll = async (as: "txt" | "json" = "txt") => {
    const text =
      as === "json"
        ? JSON.stringify(
            Object.fromEntries(nonEmpty.map((field) => [field.key, field.value])),
            null,
            2
          )
        : formatFields();
    const ok = await writeClipboardSafe(text);
    Sentry.addBreadcrumb({
      category: "udid-flow.action",
      message: "Copy device info attempted",
      data: { format: as, outcome: ok ? "success" : "failure" },
    });
    if (ok) {
      setCopied(true);
      toast.success(`All device info${as === "json" ? " (JSON)" : ""} copied to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([formatFields(true)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "device-info.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    Sentry.addBreadcrumb({
      category: "udid-flow.action",
      message: "Device info downloaded",
      data: { format: "txt" },
    });
  };

  const canShare = typeof navigator !== "undefined" && "share" in navigator;

  const shareAll = async () => {
    try {
      await navigator.share?.({ title: "Device info", text: formatFields(true) });
      Sentry.addBreadcrumb({
        category: "udid-flow.action",
        message: "Native share completed",
      });
    } catch {
      Sentry.addBreadcrumb({
        category: "udid-flow.action",
        message: "Native share dismissed",
        level: "info",
      });
    }
  };

  return (
    <main className="flex-1 py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <MotionWrapper
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 flex items-center gap-3 rounded-xl p-4 ${
            !hasDeviceInfo || status === "error"
              ? "border border-red-200 bg-red-50"
              : status === "success"
                ? "border border-green-200 bg-green-50"
                : status === "error"
                  ? "border border-red-200 bg-red-50"
                  : "border border-amber-200 bg-amber-50"
          }`}
        >
          {hasDeviceInfo && status === "success" ? (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">Device information retrieved</p>
                <p className="text-sm text-green-700">
                  All data was successfully extracted from your device
                </p>
              </div>
            </>
          ) : !hasDeviceInfo || status === "error" ? (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-red-900">Unable to retrieve device info</p>
                <p className="text-sm text-red-700">Please try installing the profile again</p>
              </div>
            </>
          ) : null}
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                <Smartphone className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Your Device Information</h1>
                <p className="text-sm text-slate-500">{deviceData.model}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={shareAll}
              disabled={!canShare}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <div className="border-b border-slate-100 bg-slate-50 px-6 py-5">
            <p className="mb-3 text-xs font-medium tracking-wider text-slate-500 uppercase">
              Downloads
            </p>
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button variant="outline" onClick={() => handleCopyAll()} className="gap-2">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy All
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => handleCopyAll("json")} className="gap-2">
                <Copy className="h-4 w-4" />
                Copy JSON
              </Button>
              <Button variant="outline" onClick={downloadTxt} className="gap-2">
                Download .txt
              </Button>
            </div>
          </div>

          <div className="space-y-4 p-6">
            <DeviceInfoCard label="UDID" value={deviceData.udid} type="udid" isPrimary={true} />

            <div className="grid gap-4 sm:grid-cols-2">
              <DeviceInfoCard label="Device Model" value={deviceData.model} type="model" />
              <DeviceInfoCard label="iOS Version" value={deviceData.version} type="version" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DeviceInfoCard label="Serial Number" value={deviceData.serial} type="serial" />
              <DeviceInfoCard label="Product Type" value={deviceData.product} type="product" />
            </div>

            {deviceData.imei && <DeviceInfoCard label="IMEI" value={deviceData.imei} type="imei" />}

            {deviceData.meid && <DeviceInfoCard label="MEID" value={deviceData.meid} type="imei" />}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row">
            <p className="text-center text-xs text-slate-500 sm:text-left">
              This data was retrieved via MDM profile and is not stored on our servers.
            </p>
          </div>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-500">
            Need to register this device for development?{" "}
            <a
              href="https://developer.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Go to Apple Developer Portal →
            </a>
          </p>
        </MotionWrapper>
      </div>
    </main>
  );
}

export default function SuccessClient() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        <SuccessContent />
      </Suspense>

      <Footer />
    </div>
  );
}
