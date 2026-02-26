"use client";

import { useState } from "react";

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Try Claude",
    descriptionColor: "",
    cta: "Stay on Free plan",
    current: true,
    popular: false,
    prefix: "",
    features: [
      "Chat on web, iOS, and Android",
      "Generate code and visualize data",
      "Write, edit, and create content",
      "Analyze text and images",
      "Ability to search the web",
    ],
  },
  {
    name: "Pro",
    price: "$17",
    period: "/ month billed annually",
    description: "For everyday productivity",
    descriptionColor: "",
    cta: "Get Pro plan",
    current: false,
    popular: true,
    prefix: "Everything in Free, plus:",
    features: [
      "More usage*",
      "Access Claude Code directly in your terminal",
      "Access to unlimited Projects to organize chats and documents",
      "Access to Research",
      "Connect Google Workspace: email, calendar, and docs",
      "Connect any context or tool through integrations with remote MCP",
      "Extended thinking for complex work",
      "Ability to use more Claude models",
    ],
  },
  {
    name: "Max",
    price: "From $100",
    period: "/ month billed monthly",
    description: "5-20x more usage than Pro",
    descriptionColor: "text-[#3B82A0]",
    cta: "Get Max plan",
    current: false,
    popular: false,
    prefix: "Everything in Pro, plus:",
    features: [
      "Choose 5x or 20x more usage than Pro*",
      "Higher output limits for all tasks",
      "Early access to advanced Claude features",
      "Priority access at high traffic times",
    ],
  },
];

export default function UpgradePage() {
  const [tab, setTab] = useState<"individual" | "team">("individual");
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <div className="flex-1 overflow-y-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1
          className="text-3xl text-center text-gray-900 mb-2"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Plans that grow with you
        </h1>
        <p className="text-center text-[#6B6B6B] text-sm mb-8">
          Choose the plan that works best for you.
        </p>

        {/* Individual / Team toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-1 bg-gray-100 rounded-full p-1">
            {(["individual", "team"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 cursor-pointer capitalize ${
                  tab === t
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-[#6B6B6B] hover:text-gray-900"
                }`}
              >
                {t === "team" ? "Team & Enterprise" : "Individual"}
              </button>
            ))}
          </div>
        </div>

        {/* Monthly / Annual billing toggle */}
        <div className="flex justify-center items-center gap-4 mb-10 text-sm">
          <button
            onClick={() => setBilling("monthly")}
            className={`cursor-pointer transition-colors duration-200 ${
              billing === "monthly" ? "text-gray-900 font-medium" : "text-[#6B6B6B] hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`cursor-pointer transition-colors duration-200 flex items-center gap-1.5 ${
              billing === "annual" ? "text-gray-900 font-medium" : "text-[#6B6B6B] hover:text-gray-900"
            }`}
          >
            Annual{" "}
            <span className="text-[#C96A4A] text-xs font-medium">Save 20%</span>
          </button>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border-2 rounded-2xl p-6 relative bg-white ${
                plan.popular ? "border-gray-900" : "border-[#E0E0E0]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                  Most popular
                </span>
              )}

              <h3 className="font-semibold text-gray-900 text-base">{plan.name}</h3>
              <p className={`text-xs mt-0.5 mb-4 ${plan.descriptionColor || "text-[#6B6B6B]"}`}>{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-xs text-[#6B6B6B]">{plan.period}</span>}
              </div>

              <button
                disabled={plan.current}
                className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors duration-200 ${
                  plan.current
                    ? "border border-[#E0E0E0] text-gray-500 cursor-default bg-white"
                    : "bg-black text-white hover:bg-gray-800 cursor-pointer"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="mt-5 space-y-2.5">
                {plan.prefix && (
                  <li className="text-xs font-medium text-gray-500 mb-1">{plan.prefix}</li>
                )}
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                    <CheckIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-[#6B6B6B] mt-10">
          Prices shown do not include applicable tax.{" "}
          <button className="underline hover:text-gray-900 cursor-pointer">
            *Usage limits apply.
          </button>
        </p>
      </div>
    </div>
  );
}
