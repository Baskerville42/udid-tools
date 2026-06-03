import React from "react";
import { Download, CheckCircle, Eye } from "lucide-react";
import MotionWrapper from "@/app/components/MotionWrapper";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Install MDM Profile",
    description:
      "Tap the button to download a lightweight configuration profile. Safari will prompt you to review it.",
  },
  {
    number: "02",
    icon: CheckCircle,
    title: "Confirm Installation",
    description:
      "Go to Settings → Profile Downloaded and tap Install. The profile auto-removes after retrieval.",
  },
  {
    number: "03",
    icon: Eye,
    title: "View Device Info",
    description: "Your UDID and device details are instantly displayed. Copy them with one tap.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <MotionWrapper
            type="p"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-semibold tracking-wider text-blue-600 uppercase"
          >
            Simple Process
          </MotionWrapper>
          <MotionWrapper
            type="h2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-slate-900 md:text-4xl"
          >
            How it works
          </MotionWrapper>
          <MotionWrapper
            type="p"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600"
          >
            Three simple steps to get your device information
          </MotionWrapper>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <MotionWrapper
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative"
            >
              <div className="h-full rounded-2xl border border-slate-100 bg-slate-50 p-8 transition-all duration-300 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                    <step.icon className="h-5 w-5 text-slate-700" />
                  </div>
                  <span className="text-4xl font-bold text-slate-100 transition-colors group-hover:text-blue-100">
                    {step.number}
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 hidden h-0.5 w-8 bg-slate-200 md:block" />
              )}
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
