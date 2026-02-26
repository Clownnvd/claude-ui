"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

const allChats = [
  { id: "1", title: "UX design", time: "3 seconds ago" },
  { id: "2", title: "Improve my habits", time: "45 minutes ago" },
  { id: "3", title: "Creative Project Kickoff", time: "1 day ago" },
  { id: "4", title: "Assessment Questions for College", time: "2 days ago" },
  { id: "5", title: "Business Management Guide", time: "1 week ago" },
  { id: "6", title: "Python data analysis script", time: "1 week ago" },
  { id: "7", title: "Email template for outreach", time: "2 weeks ago" },
  { id: "8", title: "OKR planning for Q2", time: "2 weeks ago" },
  { id: "9", title: "TypeScript migration guide", time: "3 weeks ago" },
];

export default function RecentsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filtered = allChats.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectMode = () => {
    setIsSelecting(true);
  };

  const handleDeleteSelected = () => {
    setShowDeleteConfirm(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-start justify-between mb-4 max-w-2xl mx-auto w-full">
          <h1
            className="text-2xl text-gray-900"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your chat history
          </h1>
          {/* + New chat button */}
          <button
            onClick={() => router.push("/new")}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer flex-shrink-0 ml-4"
          >
            <PlusIcon />
            New chat
          </button>
        </div>

        {/* Search bar — full width */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]">
            <SearchIcon />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your chats..."
            className="w-full pl-9 pr-4 py-2.5 border border-[#E0E0E0] rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors duration-200"
            aria-label="Search chats"
          />
        </div>
      </header>

      {/* Count + Select link */}
      <div className="px-6 pb-2 max-w-2xl mx-auto w-full">
        {query ? (
          <p className="text-sm text-[#6B6B6B]">
            {filtered.length === 0
              ? `No results for "${query}"`
              : `There ${filtered.length === 1 ? "is" : "are"} ${filtered.length} chat${filtered.length === 1 ? "" : "s"} matching "${query}"`}
            {filtered.length > 0 && (
              <>
                {" "}
                <button
                  onClick={handleSelectMode}
                  className="text-[#3B82A0] hover:underline cursor-pointer"
                >
                  Select
                </button>
              </>
            )}
          </p>
        ) : (
          <p className="text-sm text-[#6B6B6B]">
            You have {allChats.length} previous chats with Claude{" "}
            <button
              onClick={handleSelectMode}
              className="text-[#3B82A0] hover:underline cursor-pointer"
            >
              Select
            </button>
          </p>
        )}
      </div>

      {/* Selection toolbar — shown whenever in select mode */}
      {isSelecting && (
        <div className="px-6 py-2 max-w-2xl mx-auto w-full flex items-center gap-3">
          {/* Count */}
          <div className="flex items-center gap-1.5 text-sm text-[#6B6B6B]">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{selected.size} selected chat{selected.size !== 1 ? "s" : ""}</span>
          </div>
          {/* Spacer */}
          <div className="flex-1" />
          {/* Select all */}
          <button
            onClick={() =>
              selected.size === filtered.length
                ? setSelected(new Set())
                : setSelected(new Set(filtered.map((c) => c.id)))
            }
            className="text-sm text-[#3B82A0] hover:underline cursor-pointer"
          >
            {selected.size === filtered.length ? "Deselect all" : "Select all"}
          </button>
          {/* Cancel */}
          <button
            onClick={() => { setIsSelecting(false); setSelected(new Set()); }}
            className="text-sm text-[#6B6B6B] hover:text-gray-900 cursor-pointer"
          >
            Cancel
          </button>
          {/* Delete Selected button */}
          <button
            onClick={handleDeleteSelected}
            disabled={selected.size === 0}
            className="text-sm font-medium bg-[#7B1A1A] text-white px-4 py-1.5 rounded-lg hover:bg-[#6A1515] transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-6 py-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center max-w-2xl mx-auto">
            <p className="text-[#6B6B6B] text-sm">No results found</p>
            <p className="text-[#6B6B6B] text-xs mt-1">Try different keywords</p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-1">
            {filtered.map((chat) => (
              <div
                key={chat.id}
                className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#E0E0E0] bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                onClick={() => !isSelecting && router.push("/new")}
              >
                {/* Checkbox — visible in select mode always, or on hover */}
                <div
                  className={`flex-shrink-0 ${isSelecting ? "flex" : "hidden group-hover:flex"}`}
                  onClick={(e) => { e.stopPropagation(); if (!isSelecting) setIsSelecting(true); toggleSelect(chat.id); }}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors duration-150 ${
                    selected.has(chat.id) ? "bg-gray-900 border-gray-900" : "border-gray-300 bg-white"
                  }`}>
                    {selected.has(chat.id) && (
                      <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth={2} className="w-3 h-3">
                        <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Chat info — title + timestamp only (NO preview text) */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{chat.title}</p>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">Last message {chat.time}</p>
                </div>

                {/* Trash icon — visible on hover */}
                <button
                  className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-gray-200 transition-all duration-150 cursor-pointer flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: delete chat
                  }}
                  aria-label="Delete chat"
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Delete {selected.size} chat{selected.size !== 1 ? "s" : ""}?
            </h3>
            <p className="text-sm text-[#6B6B6B] mb-6">
              Are you sure you want to permanently delete {selected.size === 1 ? "this chat" : `these ${selected.size} chats`}? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setIsSelecting(false);
                  setSelected(new Set());
                }}
                className="px-4 py-2 text-sm font-medium bg-[#7B1A1A] text-white rounded-lg hover:bg-[#6A1515] transition-colors duration-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
