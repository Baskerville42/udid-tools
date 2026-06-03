import React from "react";
import { ArrowRight, Shield, Zap } from "lucide-react";
import Link from "next/link";
import MotionWrapper from "@/app/components/MotionWrapper";
import { sampleDeviceSuccessUrl } from "@/app/success/sampleDeviceData";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.03),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5">
              <Shield className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Secure & Privacy-First</span>
            </div>
          </MotionWrapper>

          <MotionWrapper
            type="h1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
          >
            Get UDID & device info
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              via MDM in seconds
            </span>
          </MotionWrapper>

          <MotionWrapper
            type="p"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600"
          >
            The fastest way to retrieve UDID, serial number, and device details for iOS and iPadOS.
            No cables, no Xcode, no hassle.
          </MotionWrapper>

          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/api/register.signed.mobileconfig"
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-medium text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/15"
              aria-label="Download configuration profile to extract UDID"
            >
              Get UDID
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-medium text-slate-700 transition-colors hover:text-slate-900"
            >
              <Zap className="h-4 w-4" />
              See how it works
            </Link>
            <Link
              href={sampleDeviceSuccessUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3.5 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900"
            >
              View sample result
            </Link>
          </MotionWrapper>

          <MotionWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-8 text-sm text-slate-500"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>No Apple ID required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Works on Safari</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>iOS 12+</span>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
