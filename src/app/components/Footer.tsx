"use client";

import React from "react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Logo from "@/app/components/Logo";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />

          <p className="text-sm text-slate-500">
            Built for developers • No data stored • Open source friendly
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Baskerville42/udid-tools"
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 transition-colors hover:bg-slate-200"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4 text-slate-600" />
            </a>
            <a
              href="https://www.linkedin.com/in/alexandertartmin"
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 transition-colors hover:bg-slate-200"
              aria-label="Twitter"
            >
              <LinkedinIcon className="h-4 w-4 text-slate-600" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} UDID Tools. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
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
