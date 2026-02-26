"use client";

import { useState } from "react";

/* ── Icons ── */
function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ── Mock data ── */
const categories = ["All", "Learn something", "Life hacks", "Play a game", "Be creative", "Touch grass"];

const mockArtifacts = [
  { id: 1, title: "Writing Editor", category: "Be creative", color: "#EDE9E1" },
  { id: 2, title: "Flashcards", category: "Learn something", color: "#E8F4F8" },
  { id: 3, title: "Py Lingo", category: "Learn something", color: "#F0F4E8" },
  { id: 4, title: "Word Game", category: "Play a game", color: "#F4E8F4" },
  { id: 5, title: "Habit Tracker", category: "Life hacks", color: "#F4F0E8" },
  { id: 6, title: "Meditation Timer", category: "Touch grass", color: "#E8F4F0" },
  { id: 7, title: "Recipe Builder", category: "Life hacks", color: "#F4EBE8" },
  { id: 8, title: "Budget Planner", category: "Life hacks", color: "#EBF4E8" },
  { id: 9, title: "Study Notes", category: "Learn something", color: "#E8EBF4" },
  { id: 10, title: "Color Mixer", category: "Be creative", color: "#F4E8EB" },
  { id: 11, title: "Trivia Quiz", category: "Play a game", color: "#F4F4E8" },
  { id: 12, title: "Journal", category: "Touch grass", color: "#EBE8F4" },
];

/* ── Artifact Card ── */
function ArtifactCard({
  artifact,
  onClick,
}: {
  artifact: (typeof mockArtifacts)[0];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="border border-[#E0E0E0] rounded-xl overflow-hidden hover:border-gray-400 cursor-pointer transition-colors duration-200 bg-white"
    >
      <div
        className="aspect-video border-b border-[#E0E0E0] flex items-center justify-center"
        style={{ backgroundColor: artifact.color }}
      >
        <span className="text-xs text-[#6B6B6B] font-medium">{artifact.title}</span>
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-gray-900">{artifact.title}</p>
        <p className="text-xs text-[#6B6B6B] mt-1">{artifact.category}</p>
      </div>
    </div>
  );
}

/* ── Split View ── */
function SplitView({
  artifact,
  onClose,
}: {
  artifact: (typeof mockArtifacts)[0];
  onClose: () => void;
}) {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full">
      {/* Left — Chat panel */}
      <div className="w-1/2 flex flex-col border-r border-[#E0E0E0]">
        {/* Chat topbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E0E0E0]">
          <span className="text-sm font-medium text-gray-900 truncate">{artifact.title}</span>
          <button
            onClick={onClose}
            aria-label="Close split view"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-[#6B6B6B] hover:text-gray-900"
          >
            <XIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#C96A4A] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white" aria-hidden="true">
                <path d="M12 2L9.5 8.5H3L8.5 12.5L6 19L12 15L18 19L15.5 12.5L21 8.5H14.5L12 2Z" />
              </svg>
            </div>
            <div className="bg-white rounded-xl px-4 py-3 text-sm text-gray-800 border border-[#E0E0E0] max-w-[80%]">
              Here&apos;s your <strong>{artifact.title}</strong> artifact. Feel free to ask me to make any changes!
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-[#E0E0E0] p-4">
          <div className="flex items-center gap-2 border border-[#E0E0E0] rounded-xl bg-white px-3 py-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask Claude to modify this artifact..."
              className="flex-1 text-sm bg-transparent focus:outline-none text-gray-900 placeholder:text-[#6B6B6B]"
            />
            <button
              aria-label="Send"
              className="w-7 h-7 rounded-full bg-[#C96A4A] flex items-center justify-center cursor-pointer hover:bg-[#B85A3A] transition-colors duration-200 flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5 text-white" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right — Artifact panel */}
      <div className="w-1/2 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-4 py-3 border-b border-[#E0E0E0]">
          <button
            onClick={() => setActiveView("preview")}
            className={`px-3 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer border-b-2 ${
              activeView === "preview"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-[#6B6B6B] hover:text-gray-900"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveView("code")}
            className={`px-3 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer border-b-2 ${
              activeView === "code"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-[#6B6B6B] hover:text-gray-900"
            }`}
          >
            Code
          </button>

          {/* Right-side actions */}
          <div className="ml-auto flex items-center gap-1">
            <button aria-label="Refresh" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-[#6B6B6B] hover:text-gray-900">
              <RefreshIcon />
            </button>
            <button aria-label="Download" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-[#6B6B6B] hover:text-gray-900">
              <DownloadIcon />
            </button>
            <button aria-label="Share" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-[#6B6B6B] hover:text-gray-900">
              <ShareIcon />
            </button>
            <button className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
              Publish
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white overflow-auto">
          {activeView === "preview" ? (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: artifact.color }}>
              <div className="text-center text-[#6B6B6B]">
                <p className="text-lg font-medium text-gray-900">{artifact.title}</p>
                <p className="text-sm mt-1">Artifact preview</p>
              </div>
            </div>
          ) : (
            <div className="p-4 font-mono text-xs text-[#6B6B6B] leading-relaxed">
              <p className="text-green-600">{"// Artifact code preview"}</p>
              <p>{"export default function Artifact() {"}</p>
              <p className="pl-4">{"return <div>Hello from " + artifact.title + "</div>;"}</p>
              <p>{"}"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function ArtifactsPage() {
  const [activeTab, setActiveTab] = useState<"inspiration" | "my">("inspiration");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArtifact, setSelectedArtifact] = useState<(typeof mockArtifacts)[0] | null>(null);

  const filtered =
    activeCategory === "All"
      ? mockArtifacts
      : mockArtifacts.filter((a) => a.category === activeCategory);

  if (selectedArtifact) {
    return (
      <SplitView
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0] flex-shrink-0">
        <h1 className="text-xl font-semibold text-gray-900">Artifacts</h1>
        <button className="flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
          <PlusIcon className="w-4 h-4" />
          New artifact
        </button>
      </header>

      {/* Tab toggle — underline style */}
      <div className="flex border-b border-[#E0E0E0] px-6 flex-shrink-0">
        {(["inspiration", "my"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 cursor-pointer ${
              activeTab === tab
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-[#6B6B6B] hover:text-gray-900"
            }`}
          >
            {tab === "inspiration" ? "Inspiration" : "My artifacts"}
          </button>
        ))}
      </div>

      {/* Category filter pills */}
      <div className="flex gap-2 px-6 py-3 overflow-x-auto flex-shrink-0 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors duration-200 cursor-pointer flex-shrink-0 ${
              activeCategory === cat
                ? "bg-gray-900 text-white"
                : "bg-white border border-[#E0E0E0] text-[#6B6B6B] hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {filtered.map((artifact) => (
              <ArtifactCard
                key={artifact.id}
                artifact={artifact}
                onClick={() => setSelectedArtifact(artifact)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <p className="text-[#6B6B6B] text-sm">No artifacts in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
