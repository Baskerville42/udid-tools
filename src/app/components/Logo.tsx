"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm shadow-blue-500/20 transition-shadow group-hover:shadow-md group-hover:shadow-blue-500/30">
        <Image
          width={40}
          height={40}
          src="/logo-header.svg"
          alt="UDID Tools Logo"
          className="h-9 w-9"
          priority
        />
      </div>
      <span className="text-xl font-semibold tracking-tight text-slate-900">UDID Tools</span>
    </Link>
  );
}
