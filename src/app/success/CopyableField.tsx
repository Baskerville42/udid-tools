"use client";

import { useEffect, useRef, useState } from "react";
import { writeClipboardSafe } from "@/utils/clipboard";

type Props = {
  label: string;
  value: string;
  onAfterCopyAction?: () => void;
  disabled?: boolean;
};

export default function CopyableField({ label, value, onAfterCopyAction, disabled }: Props) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    if (!value || disabled) return;
    const ok = await writeClipboardSafe(value);
    if (ok) {
      setCopied(true);
      onAfterCopyAction?.();
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } else {
      alert(`Failed to copy ${label}. Please copy manually.`);
    }
  };

  return (
    <div className="grid grid-cols-[140px_1fr_auto] items-center gap-2">
      <label className="font-semibold" htmlFor={`field-${label}`}>
        {label}
      </label>

      <code
        id={`field-${label}`}
        className="flex min-h-10 items-center rounded-md border border-gray-200 bg-gray-50 px-3 text-sm break-all text-gray-800"
      >
        {value || <span className="opacity-60">—</span>}
      </code>

      <button
        onClick={handleCopy}
        disabled={!value || disabled}
        aria-disabled={!value || disabled}
        className="h-10 rounded-md bg-blue-600 px-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
