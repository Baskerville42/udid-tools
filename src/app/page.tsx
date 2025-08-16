import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="font-sans">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-8 text-center">
        <div className="flex justify-center">
          <Image
            className="dark:invert"
            src="/logo-full.svg"
            alt="UDID Tools logo"
            width={220}
            height={46}
            priority
          />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Extract your iPhone &amp; iPad UDID Online
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          UDID Tools is the fastest and safest way to get your device UDID directly in your browser.
          No apps required.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-base font-medium transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            href="/api/register.signed.mobileconfig"
            aria-label="Download configuration profile to extract UDID"
          >
            Download Profile
          </a>

          <Link
            href="/#how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-full px-6 text-base font-medium underline-offset-4 hover:underline"
          >
            How it works
          </Link>
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Works on iPhone &amp; iPad. You may be asked to allow profile download.
        </p>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-heading" className="mx-auto max-w-4xl px-6 py-8">
        <h2 id="benefits-heading" className="mb-3 text-2xl font-semibold">
          Why use UDID Tools?
        </h2>
        <ul className="mx-auto max-w-2xl list-inside list-disc space-y-1 text-left">
          <li>
            <span className="font-medium">Secure:</span> No data stored.
          </li>
          <li>
            <span className="font-medium">Simple:</span> Just a few clicks.
          </li>
          <li>
            <span className="font-medium">Fast:</span> Get UDID in seconds.
          </li>
        </ul>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        aria-labelledby="how-heading"
        className="mx-auto max-w-4xl px-6 py-8"
      >
        <h2 id="how-heading" className="mb-3 text-2xl font-semibold">
          How it works
        </h2>
        <ol className="mx-auto max-w-2xl list-inside list-decimal space-y-2 text-left">
          <li>
            Tap <strong>Download Profile</strong> and confirm the download in Safari.
          </li>
          <li>
            Open <strong>Settings &gt; Profile Downloaded</strong> and install the profile.
          </li>
          <li>
            After installation, iOS sends device attributes and you&apos;re redirected back to the
            success page with your <strong>UDID</strong>.
          </li>
        </ol>
        <p className="mt-3 text-sm text-gray-500">
          If you don’t see a redirect, return to this page in Safari and the flow will resume
          automatically.
        </p>
      </section>

      {/* FAQ (matches JSON-LD in layout) */}
      <section id="faq" aria-labelledby="faq-heading" className="mx-auto max-w-4xl px-6 py-8">
        <h2 id="faq-heading" className="mb-3 text-2xl font-semibold">
          Frequently asked questions
        </h2>

        <div className="space-y-6 text-left">
          <div>
            <h3 className="font-semibold">What is a UDID?</h3>
            <p className="text-gray-700">
              UDID stands for Unique Device Identifier. It&apos;s a unique ID assigned to every
              Apple device.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Is it safe to use UDID Tools?</h3>
            <p className="text-gray-700">
              Yes. UDID Tools does not store your UDID or any personal information. Everything
              happens in your browser.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Do I need to install an app?</h3>
            <p className="text-gray-700">
              No apps required. You download a small configuration profile, and we show your UDID on
              the success page.
            </p>
          </div>
        </div>
      </section>

      {/* Trust note / CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="rounded-2xl border border-black/10 p-5 sm:p-6 dark:border-white/15">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Privacy:</span> we don’t persist your UDID or device info
            on our servers.
          </p>
          <div className="mt-4">
            <a
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-base font-medium transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
              href="/api/register.signed.mobileconfig"
            >
              Download Profile
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
