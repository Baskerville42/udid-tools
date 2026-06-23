"use client";

import React from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPageProps = {
  label: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

type TextWithLinksProps = {
  text: string;
};

function TextWithLinks({ text }: TextWithLinksProps) {
  const parts = text.split(
    /(https?:\/\/[^\s.]+(?:\.[^\s.]+)*|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi
  );

  return parts.map((part) => {
    if (/^https?:\/\//i.test(part)) {
      return (
        <a
          key={part}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline decoration-blue-200 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-400"
        >
          {part}
        </a>
      );
    }

    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part)) {
      return (
        <a
          key={part}
          href={`mailto:${part}`}
          className="font-medium text-blue-600 underline decoration-blue-200 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-400"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

export default function LegalPage({
  label,
  title,
  description,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <main className="bg-gradient-to-b from-slate-50/70 to-white py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/"
            className="mb-8 inline-flex text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
          >
            ← Back to Home
          </Link>

          <div className="mb-10 border-b border-slate-200 pb-8">
            <p className="mb-3 text-sm font-semibold tracking-wider text-blue-600 uppercase">
              {label}
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {title}
            </h1>
            <p className="mb-4 text-lg leading-relaxed text-slate-600">{description}</p>
            <p className="text-sm text-slate-500">Last updated: {lastUpdated}</p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <section className="mt-10" key={section.title}>
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="leading-7 text-slate-600">
                      <TextWithLinks text={paragraph} />
                    </p>
                  ))}
                </div>
                {section.items && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 marker:text-blue-500">
                    {section.items.map((item) => (
                      <li key={item} className="pl-1 leading-7">
                        <TextWithLinks text={item} />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
