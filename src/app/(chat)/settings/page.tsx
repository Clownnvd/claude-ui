"use client";

import { useState } from "react";

type Tab = "Profile" | "Appearance" | "Account" | "Privacy" | "Billing" | "Connectors";

const tabs: Tab[] = ["Profile", "Appearance", "Account", "Privacy", "Billing", "Connectors"];

/* ─── Profile Tab ─── */
function ProfileTab() {
  const [fullName, setFullName] = useState("Sarah Tyler");
  const [displayName, setDisplayName] = useState("Sarah");
  const [workFunction, setWorkFunction] = useState("Design");
  const [preferences, setPreferences] = useState("Keep explanations brief and to the point");

  return (
    <div className="space-y-6">
      <div className="border border-[#E0E0E0] rounded-xl p-6 space-y-5">
        {/* Full name + What should we call you — side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1.5" htmlFor="fullName">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1.5" htmlFor="displayName">
              What should we call you?
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Work function */}
        <div>
          <label className="block text-sm text-gray-700 mb-1.5" htmlFor="workFunction">
            What best describes your work?
          </label>
          <select
            id="workFunction"
            value={workFunction}
            onChange={(e) => setWorkFunction(e.target.value)}
            className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 cursor-pointer"
          >
            {["Design", "Product", "Engineering", "Marketing", "Sales", "Operations", "Other"].map((fn) => (
              <option key={fn} value={fn}>{fn}</option>
            ))}
          </select>
        </div>

        {/* Personal preferences */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <label className="text-sm text-gray-700" htmlFor="preferences">
              What personal preferences should Claude consider in responses?
            </label>
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">BETA</span>
          </div>
          <p className="text-xs text-[#6B6B6B] mb-2">
            Your preferences will apply to all conversations, within Anthropic&apos;s guidelines.{" "}
            <button className="text-[#3B82A0] hover:underline cursor-pointer">Learn about preferences</button>
          </p>
          <textarea
            id="preferences"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            rows={3}
            className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 leading-relaxed"
          />
        </div>
      </div>

      {/* Feature preview */}
      <div className="border-t border-[#E0E0E0] pt-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Feature preview</h3>
        <p className="text-xs text-[#6B6B6B] mb-3">Preview and provide feedback on upcoming enhancements.</p>
        <div className="flex items-center justify-between py-3 border border-[#E0E0E0] rounded-lg px-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Extended thinking</p>
            <p className="text-xs text-[#6B6B6B] mt-0.5">Claude reasons through complex problems step-by-step</p>
          </div>
          <ToggleSwitch />
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch() {
  const [on, setOn] = useState(false);
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={`relative w-10 h-6 rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0 ${
        on ? "bg-gray-900" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          on ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/* ─── Appearance Tab ─── */
function AppearanceTab() {
  const [colorMode, setColorMode] = useState<"Light" | "Match system" | "Dark">("Light");
  const [chatFont, setChatFont] = useState<"Default" | "Match system" | "Dyslexic friendly">("Default");

  const colorModes = [
    {
      label: "Light" as const,
      preview: (
        <div className="w-full aspect-video rounded-lg bg-[#F9F6F0] border border-[#E0E0E0] flex flex-col p-2 mb-2">
          <div className="h-2 w-16 bg-gray-200 rounded mb-1.5" />
          <div className="h-1.5 w-12 bg-gray-200 rounded mb-2" />
          <div className="flex-1 bg-white rounded border border-[#E0E0E0]" />
        </div>
      ),
    },
    {
      label: "Match system" as const,
      preview: (
        <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-[#F9F6F0] to-[#1A1A1A] border border-[#E0E0E0] flex flex-col p-2 mb-2 overflow-hidden">
          <div className="h-2 w-16 bg-gray-300 rounded mb-1.5" />
          <div className="h-1.5 w-12 bg-gray-300 rounded mb-2" />
          <div className="flex-1 bg-white/30 rounded" />
        </div>
      ),
    },
    {
      label: "Dark" as const,
      preview: (
        <div className="w-full aspect-video rounded-lg bg-[#1A1A1A] border border-[#3A3A3A] flex flex-col p-2 mb-2">
          <div className="h-2 w-16 bg-gray-600 rounded mb-1.5" />
          <div className="h-1.5 w-12 bg-gray-600 rounded mb-2" />
          <div className="flex-1 bg-[#242424] rounded border border-[#3A3A3A]" />
        </div>
      ),
    },
  ];

  const fontOptions = [
    { label: "Default" as const, sample: "Aa", style: {} },
    { label: "Match system" as const, sample: "Aa", style: { fontFamily: "system-ui" } },
    {
      label: "Dyslexic friendly" as const,
      sample: "Aa",
      style: { fontFamily: "OpenDyslexic, Comic Sans MS, sans-serif" },
    },
  ];

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Appearance</h2>
        <p className="text-sm text-[#6B6B6B]">Customize how Claude looks and feels.</p>
      </div>

      {/* Color mode */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Color mode</h3>
        <div className="grid grid-cols-3 gap-3">
          {colorModes.map(({ label, preview }) => (
            <label
              key={label}
              className={`border-2 rounded-xl p-3 cursor-pointer transition-colors duration-200 ${
                colorMode === label
                  ? "border-gray-900"
                  : "border-[#E0E0E0] hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="colorMode"
                value={label}
                checked={colorMode === label}
                onChange={() => setColorMode(label)}
                className="sr-only"
              />
              {preview}
              <p className="text-xs font-medium text-center text-gray-700">{label}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Chat font */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Chat font</h3>
        <div className="grid grid-cols-3 gap-3">
          {fontOptions.map(({ label, sample, style }) => (
            <label
              key={label}
              className={`border-2 rounded-xl p-4 cursor-pointer text-center transition-colors duration-200 ${
                chatFont === label
                  ? "border-gray-900"
                  : "border-[#E0E0E0] hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="chatFont"
                value={label}
                checked={chatFont === label}
                onChange={() => setChatFont(label)}
                className="sr-only"
              />
              <p className="text-3xl font-medium text-gray-900 mb-2" style={style}>{sample}</p>
              <p className="text-xs text-gray-700">{label}</p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Account Tab ─── */
function AccountTab() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Account</h2>
        <p className="text-sm text-[#6B6B6B]">Manage your account settings.</p>
      </div>

      <div className="border border-[#E0E0E0] rounded-xl divide-y divide-[#E0E0E0]">
        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-sm text-[#6B6B6B]">sarah@example.com</p>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Plan</p>
            <p className="text-sm text-[#6B6B6B]">Free</p>
          </div>
          <a href="/upgrade" className="text-sm text-gray-900 font-medium underline hover:no-underline cursor-pointer">
            Upgrade
          </a>
        </div>
        <div className="p-4">
          <p className="text-xs text-[#6B6B6B] mb-1">Organization ID</p>
          <p className="text-sm font-mono text-gray-700">org_01JXXX...</p>
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full flex items-center justify-between px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
          <span>Log out of all devices</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full flex items-center justify-between px-4 py-3 border border-red-200 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
        >
          <span>Delete your account</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Delete your account?</h3>
            <p className="text-sm text-[#6B6B6B] mb-4">
              This action is permanent and cannot be undone. All your conversations, settings, and data will be deleted.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Type <strong>delete my account</strong> to confirm:
            </p>
            <input
              type="text"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400"
              placeholder="delete my account"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteConfirm(false); setDeleteText(""); }}
                className="flex-1 border border-[#E0E0E0] text-sm text-gray-700 rounded-lg py-2 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={deleteText !== "delete my account"}
                className="flex-1 bg-red-600 text-white text-sm rounded-lg py-2 hover:bg-red-700 transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Privacy Tab ─── */
function PrivacyTab() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Privacy</h2>
        <p className="text-sm text-[#6B6B6B]">Control how your data is used.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-[#E0E0E0] rounded-xl">
          <div>
            <p className="text-sm font-medium text-gray-900">Improve Claude for everyone</p>
            <p className="text-xs text-[#6B6B6B] mt-0.5">Allow Anthropic to use your conversations to improve Claude</p>
          </div>
          <ToggleSwitch />
        </div>
        <div className="flex items-center justify-between p-4 border border-[#E0E0E0] rounded-xl">
          <div>
            <p className="text-sm font-medium text-gray-900">Conversation history</p>
            <p className="text-xs text-[#6B6B6B] mt-0.5">Save and display your conversations in the sidebar</p>
          </div>
          <ToggleSwitch />
        </div>
      </div>

      <div className="border-t border-[#E0E0E0] pt-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Export your data</h3>
        <p className="text-sm text-[#6B6B6B] mb-3">
          Download a copy of all your conversations and account data.
        </p>
        <button className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
          Export data
        </button>
      </div>
    </div>
  );
}

/* ─── Billing Tab ─── */
function BillingTab() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For personal use and exploration",
      cta: "Current plan",
      current: true,
      features: ["Access to Claude", "Limited messages per day", "Basic capabilities"],
    },
    {
      name: "Pro",
      price: "$17/mo",
      description: "For power users who need more",
      cta: "Upgrade to Pro",
      current: false,
      features: ["5x more usage", "Priority access", "Projects & artifacts", "Advanced models"],
    },
    {
      name: "Max",
      price: "$100+/mo",
      description: "For professionals with high demands",
      cta: "Upgrade to Max",
      current: false,
      features: ["Highest usage limits", "Extended context", "API access", "Custom styles"],
    },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Billing & Plans</h2>
        <p className="text-sm text-[#6B6B6B]">Manage your subscription and billing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-2xl p-5 ${
              plan.current ? "border-gray-900 bg-white" : "border-[#E0E0E0] bg-white"
            }`}
          >
            <h3 className="font-semibold text-gray-900">{plan.name}</h3>
            <p className="text-xs text-[#6B6B6B] mt-0.5 mb-3">{plan.description}</p>
            <p className="text-2xl font-bold text-gray-900 mb-4">{plan.price}</p>
            <button
              className={`w-full rounded-lg py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                plan.current
                  ? "bg-gray-100 text-gray-400 cursor-default"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              disabled={plan.current}
            >
              {plan.cta}
            </button>
            <ul className="mt-4 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-[#6B6B6B]">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Connectors Tab ─── */
function ConnectorsTab() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Connectors</h2>
        <p className="text-sm text-[#6B6B6B]">Connect external services to Claude.</p>
      </div>
      <div className="border border-[#E0E0E0] rounded-xl p-8 text-center">
        <p className="text-[#6B6B6B] text-sm">Connectors are available on Pro and Max plans.</p>
        <button className="mt-4 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
          Upgrade to unlock
        </button>
      </div>
    </div>
  );
}

/* ─── Main settings page ─── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  const tabContent: Record<Tab, React.ReactNode> = {
    Profile: <ProfileTab />,
    Appearance: <AppearanceTab />,
    Account: <AccountTab />,
    Privacy: <PrivacyTab />,
    Billing: <BillingTab />,
    Connectors: <ConnectorsTab />,
  };

  return (
    <div className="flex h-full">
      {/* Settings sidebar */}
      <aside className="w-48 flex-shrink-0 border-r border-[#E0E0E0] py-6 px-4">
        <h1 className="text-2xl text-gray-900 mb-6 px-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Settings</h1>
        <nav className="space-y-0.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-black/8 text-gray-900 font-medium"
                  : "text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {tabContent[activeTab]}
      </main>
    </div>
  );
}
