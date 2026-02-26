"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ─────────────── Shared Icons ─────────────── */
function AnthropicStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2L9.5 8.5H3L8.5 12.5L6 19L12 15L18 19L15.5 12.5L21 8.5H14.5L12 2Z" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

/* Topic pill icons */
const topicIcons: Record<string, React.ReactNode> = {
  "Coding & developing": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  "Learning & studying": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  "Writing & content creation": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  "Business & strategy": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  "Design & creativity": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  "Life stuff": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "Claude's choice": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

/* Suggestion card icons */
function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 flex-shrink-0 text-[#6B6B6B]" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
function CoffeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 flex-shrink-0 text-[#6B6B6B]" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function AnimationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 flex-shrink-0 text-[#6B6B6B]" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  );
}

/* ─────────────── Plan icons (for pricing screen) ─────────────── */
function FreePlanIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12 text-gray-400 mb-3" aria-hidden="true">
      <circle cx="24" cy="28" r="10" />
      <path d="M24 18V8" />
      <path d="M18 12c0-3.314 2.686-6 6-6s6 2.686 6 6" />
      <path d="M20 28c0-2.209 1.791-4 4-4s4 1.791 4 4" />
    </svg>
  );
}
function ProPlanIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12 text-gray-500 mb-3" aria-hidden="true">
      <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" />
      <circle cx="24" cy="20" r="3" />
    </svg>
  );
}
function MaxPlanIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12 text-gray-500 mb-3" aria-hidden="true">
      <path d="M24 4L27 14L37 11L31 20L40 26L30 26L30 37L24 30L18 37L18 26L8 26L17 20L11 11L21 14L24 4Z" />
      <circle cx="24" cy="22" r="4" />
    </svg>
  );
}

const plans = [
  {
    name: "Free",
    tagline: "Try Claude",
    price: "$0",
    priceNote: "",
    cta: "Stay on Free plan",
    popular: false,
    current: true,
    icon: <FreePlanIcon />,
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
    tagline: "For everyday productivity",
    price: "$17",
    priceNote: "/ month billed annually",
    cta: "Get Pro plan",
    popular: false,
    current: false,
    icon: <ProPlanIcon />,
    features: [
      "More usage*",
      "Access Claude Code directly in your terminal",
      "Access to unlimited Projects to organize chats and documents",
      "Access to Research",
      "Connect Google Workspace: email, calendar, and docs",
      "Connect any context or tool through Integrations with remote MCP",
      "Extended thinking for complex work",
      "Ability to use more Claude models",
    ],
  },
  {
    name: "Max",
    tagline: "5-20x more usage than Pro",
    price: "From $100",
    priceNote: "/ month billed monthly",
    cta: "Get Max plan",
    popular: false,
    current: false,
    taglineColor: true,
    icon: <MaxPlanIcon />,
    features: [
      "Choose 5x or 20x more usage than Pro*",
      "Higher output limits for all tasks",
      "Early access to advanced Claude features",
      "Priority access at high traffic times",
    ],
  },
];

const topicOptions = [
  "Coding & developing",
  "Learning & studying",
  "Writing & content creation",
  "Business & strategy",
  "Design & creativity",
  "Life stuff",
  "Claude's choice",
];

/* ─────────────── Screen 1: Terms ─────────────── */
function TermsScreen({ onNext }: { onNext: () => void }) {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedMarketing, setAgreedMarketing] = useState(false);

  return (
    <div className="w-full max-w-lg">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <AnthropicStar className="w-8 h-8 text-[#C96A4A]" />
      </div>

      <h1
        className="text-4xl font-normal text-gray-900 text-center mb-2"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        Data, safety, and you
      </h1>
      <p className="text-center text-[#6B6B6B] text-sm mb-8">
        How Anthropic ensures a safe AI experience
      </p>

      {/* Bullet points */}
      <div className="space-y-4 mb-8">
        {[
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-[#6B6B6B] flex-shrink-0 mt-0.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            ),
            text: "You control your data and can delete chats or your account anytime.",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-[#6B6B6B] flex-shrink-0 mt-0.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            text: "We don't sell your data to third parties or data brokers.",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-[#6B6B6B] flex-shrink-0 mt-0.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            ),
            text: "We may conduct aggregated, anonymized analysis of data to understand how our users use Claude.",
          },
        ].map(({ icon, text }, i) => (
          <div key={i} className="flex gap-3">
            {icon}
            <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* Checkboxes */}
      <div className="space-y-3 mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedTerms}
            onChange={(e) => setAgreedTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-gray-900 cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            I agree to Anthropic&apos;s{" "}
            <a href="#" className="text-[#C96A4A] hover:underline">Consumer Terms</a>
            {" "}and{" "}
            <a href="#" className="text-[#C96A4A] hover:underline">Acceptable Use Policy</a>
            {" "}and confirm that I am at least 18 years of age.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedMarketing}
            onChange={(e) => setAgreedMarketing(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-gray-900 cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            Subscribe to occasional product update and promotional emails. You can opt out at any time.
          </span>
        </label>
      </div>

      {/* Continue button */}
      <button
        onClick={onNext}
        disabled={!agreedTerms}
        className="w-full bg-black text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>

      {/* Email verified */}
      <div className="text-center mt-6 space-y-1">
        <p className="text-sm text-[#6B6B6B]">Email verified as tylersarah508@gmail.com</p>
        <button className="text-sm text-[#6B6B6B] underline hover:text-gray-900 cursor-pointer">
          Use a different email
        </button>
      </div>
    </div>
  );
}

/* ─────────────── Screen 2: Pricing ─────────────── */
function PricingScreen({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState("Free");

  return (
    <div className="w-full max-w-3xl">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <AnthropicStar className="w-8 h-8 text-[#C96A4A]" />
      </div>

      <h1
        className="text-3xl font-normal text-gray-900 text-center mb-10"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        Plans that grow with you
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            onClick={() => setSelected(plan.name)}
            className={`border rounded-xl p-5 cursor-pointer transition-all duration-200 bg-white ${
              selected === plan.name
                ? "border-gray-900 border-2"
                : "border-[#E0E0E0] hover:border-gray-300"
            }`}
          >
            {plan.icon}
            <h3 className="font-semibold text-gray-900 text-base">{plan.name}</h3>
            <p className={`text-sm mt-0.5 mb-3 ${(plan as typeof plan & { taglineColor?: boolean }).taglineColor ? "text-[#C96A4A] font-medium" : "text-[#6B6B6B]"}`}>
              {plan.tagline}
            </p>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
              {plan.priceNote && (
                <span className="text-xs text-[#6B6B6B]">{plan.priceNote}</span>
              )}
            </div>
            <button
              className="w-full bg-black text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer mb-4"
              onClick={(e) => { e.stopPropagation(); setSelected(plan.name); onNext(); }}
            >
              {plan.cta}
            </button>
            {plan.name !== "Free" && (
              <p className="text-xs font-medium text-gray-700 mb-2">
                Everything in {plan.name === "Pro" ? "Free" : "Pro"}, plus:
              </p>
            )}
            <ul className="space-y-1.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-[#6B6B6B]">
                  <CheckIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-[#6B6B6B]">
        Prices shown do not include applicable tax.{" "}
        <a href="#" className="underline hover:text-gray-900">*Usage limits apply.</a>
      </p>
    </div>
  );
}

/* ─────────────── Screen 3: Enter name ─────────────── */
function NameScreen({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) onNext(name.trim());
  };

  return (
    <div className="w-full max-w-xl">
      {/* Just the star, no text */}
      <AnthropicStar className="w-7 h-7 text-[#C96A4A] mb-6" />

      <p className="text-gray-900 text-base mb-4">
        Before we get started, what should I call you?
      </p>

      {/* Wide input with inline send button */}
      <div className="flex border border-[#E0E0E0] rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#C96A4A]/30 focus-within:border-[#C96A4A] transition-all duration-200">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Enter your name"
          autoFocus
          className="flex-1 px-4 py-3 text-sm bg-transparent focus:outline-none text-gray-900 placeholder:text-[#AAAAAA]"
        />
        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          aria-label="Submit name"
          className={`w-11 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
            name.trim()
              ? "bg-[#C96A4A] hover:bg-[#B05A3C] cursor-pointer"
              : "bg-gray-200 cursor-not-allowed"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 text-white" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────── Screen 4: Topic picker ─────────────── */
function TopicsScreen({ firstName, onNext }: { firstName: string; onNext: (topics: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (topic: string) => {
    setSelected((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : prev.length < 3
        ? [...prev, topic]
        : prev
    );
  };

  return (
    <div className="w-full max-w-xl">
      <AnthropicStar className="w-7 h-7 text-[#C96A4A] mb-6" />

      <p className="text-gray-900 text-base mb-6">
        What are you into, {firstName}? Pick three topics to explore.
      </p>

      {/* Rectangular pills with icons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {topicOptions.map((topic) => (
          <button
            key={topic}
            onClick={() => toggle(topic)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border transition-colors duration-200 cursor-pointer ${
              selected.includes(topic)
                ? "border-gray-900 bg-gray-50 text-gray-900 font-medium"
                : "border-[#E0E0E0] text-gray-700 hover:border-gray-400"
            }`}
          >
            {topicIcons[topic]}
            {topic}
          </button>
        ))}
      </div>

      <button
        onClick={() => onNext(selected)}
        disabled={selected.length < 3}
        className="bg-gray-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-900 transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Let&apos;s go
      </button>
    </div>
  );
}

/* ─────────────── Screen 5: AI suggestions ─────────────── */
const suggestions = [
  { label: "Develop editorial calendars", icon: <SparkleIcon /> },
  { label: "Improve my habits", icon: <CoffeeIcon /> },
  { label: "Generate animation concepts", icon: <AnimationIcon /> },
];

function SuggestionsScreen() {
  const router = useRouter();

  return (
    <div className="w-full max-w-xl">
      <AnthropicStar className="w-7 h-7 text-[#C96A4A] mb-6" />

      <p className="text-gray-900 text-base mb-1">
        All set! Here are a few ideas just for you.
      </p>
      <p className="text-gray-900 text-base mb-6">Where should we start?</p>

      {/* Vertical full-width cards */}
      <div className="space-y-2 mb-6">
        {suggestions.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => router.push("/new")}
            className="w-full flex items-center gap-4 px-5 py-4 border border-[#E0E0E0] rounded-xl hover:border-gray-400 bg-white transition-colors duration-200 cursor-pointer text-left"
          >
            {icon}
            <span className="text-sm text-gray-900">{label}</span>
          </button>
        ))}
      </div>

      {/* "I have my own topic" right-aligned */}
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/new")}
          className="text-sm text-[#6B6B6B] hover:text-gray-900 transition-colors duration-200 cursor-pointer"
        >
          I have my own topic
        </button>
      </div>
    </div>
  );
}

/* ─────────────── Main page ─────────────── */
export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [firstName, setFirstName] = useState("there");

  return (
    <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center px-6 py-12">
      {step === 1 && (
        <TermsScreen onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <PricingScreen onNext={() => setStep(3)} />
      )}
      {step === 3 && (
        <NameScreen
          onNext={(name) => {
            setFirstName(name.split(" ")[0]);
            setStep(4);
          }}
        />
      )}
      {step === 4 && (
        <TopicsScreen
          firstName={firstName}
          onNext={() => setStep(5)}
        />
      )}
      {step === 5 && <SuggestionsScreen />}
    </div>
  );
}
