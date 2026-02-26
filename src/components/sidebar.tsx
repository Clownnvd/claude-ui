"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  );
}

function ArtifactsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const recentChats = [
  { id: "1", title: "Creative Project Kickoff" },
  { id: "2", title: "Assessment Questions for College..." },
  { id: "3", title: "UX design" },
];

const starredChats = [
  { id: "s1", title: "Indian Meal" },
  { id: "s2", title: "Business Management Guide" },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const pathname = usePathname();

  if (!expanded) {
    return (
      <nav
        className="w-12 flex flex-col items-center py-3 gap-1 border-r border-[#E0E0E0] bg-[#F9F6F0] flex-shrink-0"
        aria-label="Main navigation"
      >
        {/* Toggle */}
        <button
          onClick={() => setExpanded(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-black/5 transition-colors duration-200 cursor-pointer"
          aria-label="Expand sidebar"
        >
          <MenuIcon />
        </button>

        {/* New chat */}
        <Link
          href="/new"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#C96A4A] text-white hover:bg-[#B05A3C] transition-colors duration-200 cursor-pointer mt-1"
          aria-label="New chat"
        >
          <PlusIcon />
        </Link>

        {/* Chats */}
        <Link
          href="/recents"
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer ${
            pathname === "/recents" ? "bg-black/8 text-gray-900" : "text-[#6B6B6B] hover:bg-black/5"
          }`}
          aria-label="Chats"
        >
          <ChatIcon />
        </Link>

        {/* Projects */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg text-[#6B6B6B]/40 cursor-pointer"
          aria-label="Projects (requires upgrade)"
          title="Projects — Upgrade to unlock"
        >
          <ProjectsIcon />
        </button>

        {/* Artifacts */}
        <Link
          href="/artifacts"
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer ${
            pathname === "/artifacts" ? "bg-black/8 text-gray-900" : "text-[#6B6B6B] hover:bg-black/5"
          }`}
          aria-label="Artifacts"
        >
          <ArtifactsIcon />
        </Link>

        {/* Bottom: Avatar */}
        <div className="mt-auto">
          <button
            onClick={() => setExpanded(true)}
            className="w-8 h-8 rounded-full bg-gray-700 text-white text-xs font-medium flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors duration-200"
            aria-label="Account menu"
          >
            ST
          </button>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className="w-64 flex flex-col py-3 border-r border-[#E0E0E0] bg-[#F9F6F0] flex-shrink-0 overflow-y-auto"
        aria-label="Main navigation"
      >
        {/* Top bar: menu + "Claude" */}
        <div className="flex items-center gap-3 px-3 mb-2">
          <button
            onClick={() => setExpanded(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-black/5 transition-colors duration-200 cursor-pointer flex-shrink-0"
            aria-label="Collapse sidebar"
          >
            <MenuIcon />
          </button>
          <Link href="/new" className="text-base font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200">
            Claude
          </Link>
        </div>

        {/* Nav items */}
        <div className="px-2 space-y-0.5 mb-2">
          {/* New chat */}
          <Link
            href="/new"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-900 hover:bg-black/5 transition-colors duration-200 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-[#C96A4A] flex items-center justify-center flex-shrink-0">
              <PlusIcon />
            </div>
            New chat
          </Link>

          {/* Chats */}
          <Link
            href="/recents"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 cursor-pointer ${
              pathname === "/recents"
                ? "bg-black/8 text-gray-900 font-medium"
                : "text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900"
            }`}
          >
            <ChatIcon />
            Chats
          </Link>

          {/* Projects — grayed out, upgrade required */}
          <button
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#6B6B6B]/50 cursor-pointer"
            disabled
          >
            <div className="flex items-center gap-3">
              <ProjectsIcon />
              Projects
            </div>
            <span className="text-xs bg-[#E8F4F8] text-[#3B82A0] px-2 py-0.5 rounded-full font-medium">
              Upgrade
            </span>
          </button>

          {/* Artifacts */}
          <Link
            href="/artifacts"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 cursor-pointer ${
              pathname === "/artifacts"
                ? "bg-black/8 text-gray-900 font-medium"
                : "text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900"
            }`}
          >
            <ArtifactsIcon />
            Artifacts
          </Link>
        </div>

        {/* Starred */}
        {starredChats.length > 0 && (
          <div className="px-3 mb-1">
            <p className="text-xs font-medium text-[#6B6B6B] mb-1 px-2 py-1">Starred</p>
            <div className="space-y-0.5">
              {starredChats.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-sm text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900 transition-colors duration-200 cursor-pointer truncate"
                >
                  {chat.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recents */}
        <div className="px-3 flex-1">
          <p className="text-xs font-medium text-[#6B6B6B] mb-1 px-2 py-1">Recents</p>
          <div className="space-y-0.5">
            {recentChats.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left px-2 py-1.5 rounded-lg text-sm text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900 transition-colors duration-200 cursor-pointer truncate"
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom: User */}
        <div className="mt-auto px-3 pt-3 border-t border-[#E0E0E0]">
          <button
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-black/5 transition-colors duration-200 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-gray-700 text-white text-xs font-medium flex items-center justify-center flex-shrink-0">
              ST
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-gray-900 truncate">Sarah Tyler</p>
              <p className="text-xs text-[#6B6B6B]">Free plan</p>
            </div>
            <ChevronDownIcon />
          </button>
        </div>
      </nav>

      {/* Account menu popup */}
      {showAccountMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowAccountMenu(false)}
            aria-hidden="true"
          />
          <div className="fixed bottom-16 left-3 w-60 bg-white border border-[#E0E0E0] rounded-xl shadow-lg py-1 z-50">
            <div className="px-4 py-2 text-xs text-[#6B6B6B] border-b border-[#E0E0E0] mb-1">
              tylersarah508@gmail.com
            </div>
            <div className="px-3 py-2 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-700 text-white text-xs font-medium flex items-center justify-center flex-shrink-0">
                ST
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Personal</p>
                <p className="text-xs text-[#6B6B6B]">Free plan</p>
              </div>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500 flex-shrink-0">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Group 1: Settings / Language / Get help */}
            <div className="border-t border-[#E0E0E0] my-1" />
            {[
              { label: "Settings", href: "/settings" },
              { label: "Language", hasArrow: true },
              { label: "Get help" },
            ].map(({ label, href, hasArrow }) => (
              <Link
                key={label}
                href={href ?? "#"}
                onClick={() => setShowAccountMenu(false)}
                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                {label}
                {hasArrow && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#6B6B6B]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
            ))}
            {/* Group 2: Upgrade plan / Learn more */}
            <div className="border-t border-[#E0E0E0] my-1" />
            {[
              { label: "Upgrade plan", href: "/upgrade" },
              { label: "Learn more", hasArrow: true },
            ].map(({ label, href, hasArrow }) => (
              <Link
                key={label}
                href={href ?? "#"}
                onClick={() => setShowAccountMenu(false)}
                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                {label}
                {hasArrow && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#6B6B6B]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
            ))}
            {/* Group 3: Log out */}
            <div className="border-t border-[#E0E0E0] my-1" />
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              onClick={() => setShowAccountMenu(false)}
            >
              Log out
            </button>
          </div>
        </>
      )}
    </>
  );
}
