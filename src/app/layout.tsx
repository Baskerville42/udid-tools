import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.udid.tools";
const SITE_NAME = "UDID Tools";
const TWITTER = "@alextartmin";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UDID Tools – Extract your iPhone & iPad UDID",
    template: "%s · UDID Tools",
  },
  description:
    "UDID Tools is a simple and secure service to extract your iPhone or iPad UDID directly in your browser.",
  keywords: [
    "UDID",
    "iPhone UDID",
    "iPad UDID",
    "get UDID online",
    "extract UDID",
    "Apple device identifier",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "UDID Tools – Extract your iPhone & iPad UDID",
    description:
      "Get your iPhone or iPad UDID in seconds with UDID Tools. Secure, fast, no apps required.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "UDID Tools Preview" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER,
    creator: TWITTER,
    title: "UDID Tools – Extract your iPhone & iPad UDID",
    description: "Extract your iPhone or iPad UDID in seconds with UDID Tools.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "utilities",
  applicationName: SITE_NAME,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "UDID Tools helps you securely extract your iPhone and iPad UDID online.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a UDID?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UDID stands for Unique Device Identifier. It's a unique ID assigned to every Apple device.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to use UDID Tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, UDID Tools does not store your UDID or any personal information. Everything happens in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to install an app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No apps required. You download a small configuration profile, and we show your UDID on the success page.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* JSON-LD: WebSite */}
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* JSON-LD: FAQPage */}
        <Script
          id="ld-faq"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </body>
    </html>
  );
}
