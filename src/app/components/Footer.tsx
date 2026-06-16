"use client";

import React from "react";
import Link from "next/link";
import { siGithub } from "simple-icons";
import Logo from "@/app/components/Logo";

type BrandIconProps = {
  className?: string;
  path: string;
};

function BrandIcon({ className, path }: BrandIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />

          <p className="text-sm text-slate-500">
            Open-source • No account required • Built for developers
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Baskerville42/udid-tools"
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 transition-colors hover:bg-slate-200"
              aria-label="GitHub"
            >
              <BrandIcon className="h-4 w-4 text-slate-600" path={siGithub.path} />
            </a>
            <a
              href="https://www.linkedin.com/in/alexandertartmin"
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 transition-colors hover:bg-slate-200"
              aria-label="LinkedIn"
            >
              <span className="text-sm font-bold text-slate-600" aria-hidden="true">
                in
              </span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} UDID Tools. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/guides"
              className="text-xs text-slate-400 transition-colors hover:text-slate-600"
            >
              Guides
            </Link>
            <Link
              href="/privacy-policy"
              className="text-xs text-slate-400 transition-colors hover:text-slate-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-400 transition-colors hover:text-slate-600"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
