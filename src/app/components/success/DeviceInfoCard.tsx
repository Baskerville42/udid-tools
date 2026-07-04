"use client";

import React, { useState } from "react";
import { Copy, Check, Fingerprint, Smartphone, Layers, Hash, Cpu, Wifi } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import MotionWrapper from "@/app/components/MotionWrapper";

const iconMap = {
  udid: Fingerprint,
  model: Smartphone,
  version: Layers,
  serial: Hash,
  product: Cpu,
  imei: Wifi,
};

type DeviceInfoCardProps = {
  label: string;
  value: string;
  copyValue?: string;
  secondaryValue?: string;
  type: keyof typeof iconMap;
  isPrimary?: boolean;
  onCopy?: (details: {
    field_label: string;
    field_type: keyof typeof iconMap;
    outcome: string;
  }) => void;
};

export default function DeviceInfoCard({
  label,
  value,
  copyValue,
  secondaryValue,
  type,
  isPrimary = false,
  onCopy,
}: DeviceInfoCardProps) {
  const [copied, setCopied] = useState(false);
  const Icon = iconMap[type] || Hash;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue ?? value);
      onCopy?.({ field_label: label, field_type: type, outcome: "success" });
      setCopied(true);
      toast.success(`${label} copied to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onCopy?.({ field_label: label, field_type: type, outcome: "failure" });
      toast.error("Copy failed. Please copy manually.");
    }
  };

  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-xl border p-5 transition-all ${
        isPrimary
          ? "border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm shadow-blue-100/50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      {isPrimary && (
        <div className="absolute -top-2.5 left-4 rounded bg-blue-600 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase">
          Primary
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
              isPrimary ? "bg-blue-100" : "bg-slate-100"
            }`}
          >
            <Icon className={`h-5 w-5 ${isPrimary ? "text-blue-600" : "text-slate-500"}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-medium tracking-wider text-slate-500 uppercase">
              {label}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <p
                className={`font-mono text-sm break-all ${
                  isPrimary ? "font-semibold text-blue-900" : "text-slate-800"
                }`}
              >
                {value}
              </p>
              {secondaryValue ? (
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">
                  {secondaryValue}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className={`h-9 w-9 flex-shrink-0 rounded-lg ${
            copied
              ? "bg-green-100 text-green-600"
              : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          }`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </MotionWrapper>
  );
}
