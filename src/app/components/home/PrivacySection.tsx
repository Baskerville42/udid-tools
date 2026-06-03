import React from "react";
import { Shield, Clock, UserX, Server } from "lucide-react";
import MotionWrapper from "@/app/components/MotionWrapper";

const privacyFeatures = [
  {
    icon: Clock,
    title: "Temporary Storage Only",
    description: "Device data is automatically deleted after retrieval. We keep nothing.",
  },
  {
    icon: UserX,
    title: "No Apple ID Required",
    description: "Works entirely through MDM profile. No account or login needed.",
  },
  {
    icon: Server,
    title: "No Server Logs",
    description: "We don't log or track your device information on our servers.",
  },
  {
    icon: Shield,
    title: "Profile Auto-Removes",
    description: "The MDM profile deletes itself after sending device info.",
  },
];

export default function PrivacySection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <MotionWrapper
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-sm font-semibold tracking-wider text-blue-600 uppercase">
              Privacy & Security
            </p>
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
              Your data stays yours
            </h2>
            <p className="mb-8 leading-relaxed text-slate-600">
              We built UDID Tools with privacy as a core principle. No tracking, no data retention,
              no hidden agendas. Just a simple tool that does what it says.
            </p>

            <div className="inline-flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">Trusted by 50,000+ developers</p>
                <p className="text-xs text-green-700">Zero security incidents since launch</p>
              </div>
            </div>
          </MotionWrapper>

          <div className="grid gap-4 sm:grid-cols-2">
            {privacyFeatures.map((feature, index) => (
              <MotionWrapper
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-slate-100 bg-slate-50 p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white">
                  <feature.icon className="h-4 w-4 text-slate-600" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{feature.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
