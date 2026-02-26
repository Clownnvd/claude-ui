"use client";

import { useState } from "react";
import { ChatInput } from "@/components/chat-input";

/* ── Quick action pills ── */
const quickActions = [
  {
    label: "Create",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    label: "Strategize",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    label: "Write",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    label: "Learn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    label: "Code",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

/* ── Icons ── */
function AnthropicMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2L9.5 8.5H3L8.5 12.5L6 19L12 15L18 19L15.5 12.5L21 8.5H14.5L12 2Z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
    </svg>
  );
}

function ThumbsDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ── Types ── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/* ── UserMessage ── */
function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-gray-700 text-white text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
        ST
      </div>
      <div className="bg-white border border-[#E0E0E0] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-900 shadow-sm max-w-[75%]">
        {content}
      </div>
    </div>
  );
}

/* ── AssistantMessage ── */
function AssistantMessage({
  content,
  isStreaming,
  onFeedback,
}: {
  content: string;
  isStreaming?: boolean;
  onFeedback?: (type: "positive" | "negative") => void;
}) {
  if (isStreaming) {
    return (
      <div>
        <AnthropicMark className="w-5 h-5 text-[#C96A4A] animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Response text */}
      <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
        {content}
      </div>

      {/* Toolbar: star on left, action buttons on right */}
      <div className="flex items-center justify-between mt-3">
        <AnthropicMark className="w-4 h-4 text-[#C96A4A]" />
        <div className="flex items-center gap-1">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            aria-label="Copy response"
          >
            <CopyIcon />
          </button>
          <button
            onClick={() => onFeedback?.("positive")}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            aria-label="Good response"
          >
            <ThumbsUpIcon />
          </button>
          <button
            onClick={() => onFeedback?.("negative")}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            aria-label="Bad response"
          >
            <ThumbsDownIcon />
          </button>
          <button
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900 transition-colors duration-200 cursor-pointer text-sm"
            aria-label="Retry response"
          >
            <span>Retry</span>
            <ChevronDownIcon />
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-right text-[#6B6B6B] mt-1">
        Claude can make mistakes. Please double-check responses.
      </p>
    </div>
  );
}

const MOCK_RESPONSE = `UX design (User Experience design) is the process of creating products that provide meaningful and relevant experiences to users. It involves researching user needs, designing intuitive interfaces, and ensuring products are useful, usable, and enjoyable.

UX designers focus on the entire user journey — from initial discovery through final interaction — considering factors like ease of use, accessibility, and user satisfaction. The goal is to solve user problems and create delightful design decisions backed by research and testing.`;

/* ── Main Page ── */
export default function NewChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatTitle, setChatTitle] = useState("Untitled");
  const userName = "Sarah";

  /* Dropdown */
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);

  /* Rename modal */
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  /* Delete confirm */
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /* Share modal */
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCreated, setShareCreated] = useState(false);

  /* Feedback modal */
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"positive" | "negative" | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  const handleSend = (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: MOCK_RESPONSE,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsStreaming(false);
      setChatTitle("Understanding UX Design Fundamentals");
    }, 1500);
  };

  const handleFeedback = (type: "positive" | "negative") => {
    setFeedbackType(type);
    setFeedbackText("");
    setShowFeedbackModal(true);
  };

  const openRenameModal = () => {
    setRenameValue(chatTitle);
    setShowTitleDropdown(false);
    setShowRenameModal(true);
  };

  const openShareModal = () => {
    setShareCreated(false);
    setShowShareModal(true);
  };

  const isEmpty = messages.length === 0 && !isStreaming;

  return (
    <div className="flex flex-col h-full">
      {/* Top bar — only in conversation */}
      {!isEmpty && (
        <header className="flex items-center justify-between px-4 py-3 flex-shrink-0">
          {/* Chat title + dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTitleDropdown((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
            >
              {chatTitle}
              <ChevronDownIcon className="w-4 h-4 text-[#6B6B6B]" />
            </button>

            {showTitleDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowTitleDropdown(false)}
                />
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#E0E0E0] rounded-xl shadow-lg z-50 min-w-[130px] overflow-hidden py-1">
                  <button
                    onClick={() => setShowTitleDropdown(false)}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer transition-colors duration-150"
                  >
                    <StarIcon />
                    Star
                  </button>
                  <button
                    onClick={openRenameModal}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer transition-colors duration-150"
                  >
                    <PencilIcon />
                    Rename
                  </button>
                  <button
                    onClick={() => { setShowTitleDropdown(false); setShowDeleteConfirm(true); }}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer transition-colors duration-150"
                  >
                    <TrashIcon />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Share button */}
          <button
            onClick={openShareModal}
            className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-gray-900 transition-colors duration-200 cursor-pointer"
          >
            <ShareIcon />
            Share
          </button>
        </header>
      )}

      {/* Main content */}
      {isEmpty ? (
        /* ── Home screen ── */
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
          {/* Free plan badge */}
          <div className="mb-6 flex items-center gap-1.5 bg-white border border-[#E0E0E0] rounded-full px-3 py-1 text-sm">
            <span className="text-[#6B6B6B]">Free plan</span>
            <span className="text-[#6B6B6B]">·</span>
            <button className="text-[#3B82A0] font-medium hover:underline cursor-pointer">Upgrade</button>
          </div>

          {/* Greeting */}
          <h1
            className="text-3xl text-gray-900 mb-8 flex items-center gap-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            <AnthropicMark className="w-7 h-7 text-[#C96A4A]" />
            How was your day, {userName}?
          </h1>

          {/* Chat input */}
          <div className="w-full max-w-2xl">
            <ChatInput onSend={handleSend} isStreaming={isStreaming} />

            {/* Upgrade tools banner */}
            <div className="mt-1 flex items-center justify-between px-1 py-1.5 text-xs text-[#6B6B6B]">
              <span>Upgrade to connect your tools to Claude</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Quick action pills */}
            <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
              {quickActions.map(({ label, icon }) => (
                <button
                  key={label}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#E0E0E0] bg-white text-sm text-[#6B6B6B] hover:border-gray-400 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── Conversation view ── */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="max-w-2xl mx-auto px-4 space-y-6">
              {messages.map((msg) =>
                msg.role === "user" ? (
                  <UserMessage key={msg.id} content={msg.content} />
                ) : (
                  <AssistantMessage
                    key={msg.id}
                    content={msg.content}
                    onFeedback={handleFeedback}
                  />
                )
              )}

              {/* Streaming indicator */}
              {isStreaming && <AssistantMessage content="" isStreaming />}
            </div>
          </div>

          {/* Input at bottom */}
          <div className="px-4 py-4">
            <div className="max-w-2xl mx-auto">
              <ChatInput
                onSend={handleSend}
                onStop={() => setIsStreaming(false)}
                placeholder="Reply to Claude..."
                isStreaming={isStreaming}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Rename modal ── */}
      {showRenameModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={() => setShowRenameModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-gray-900 mb-4">Rename chat</h3>
            <input
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              autoFocus
              onFocus={(e) => e.target.select()}
              className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 mb-4"
              onKeyDown={(e) => {
                if (e.key === "Enter" && renameValue.trim()) {
                  setChatTitle(renameValue.trim());
                  setShowRenameModal(false);
                }
              }}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowRenameModal(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (renameValue.trim()) setChatTitle(renameValue.trim());
                  setShowRenameModal(false);
                }}
                className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm modal ── */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-gray-900 mb-2">Delete 1 chat?</h3>
            <p className="text-sm text-[#6B6B6B] mb-6">
              Are you sure you want to permanently delete this chat? This cannot be undone.
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
                  setMessages([]);
                  setShowDeleteConfirm(false);
                  setChatTitle("Untitled");
                }}
                className="px-4 py-2 text-sm font-medium bg-[#7B1A1A] text-white rounded-lg hover:bg-[#6A1515] transition-colors duration-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Share modal ── */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {!shareCreated ? (
              /* Before sharing */
              <>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-semibold text-gray-900">Share chat</h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    aria-label="Close"
                  >
                    <XIcon />
                  </button>
                </div>
                <p className="text-sm text-[#6B6B6B] mb-4">Only messages up until now will be shared</p>
                <div className="flex items-center gap-2 px-3 py-2.5 border border-[#E0E0E0] rounded-lg mb-3 text-sm text-[#6B6B6B]">
                  <LockIcon />
                  Private (only you have access)
                </div>
                <div className="flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2.5 text-xs text-gray-600 mb-4">
                  <InfoIcon />
                  <span>
                    Don&apos;t share personal information or third-party content without permission, and see our{" "}
                    <button className="underline hover:text-gray-900 cursor-pointer">Usage Policy</button>.
                  </span>
                </div>
                <button
                  onClick={() => setShareCreated(true)}
                  className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                >
                  Create link
                </button>
              </>
            ) : (
              /* After sharing */
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900">Chat shared</h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    aria-label="Close"
                  >
                    <XIcon />
                  </button>
                </div>
                {/* Access level */}
                <div className="flex items-center gap-2 px-3 py-2.5 border border-[#E0E0E0] rounded-lg mb-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors duration-150">
                  <GlobeIcon />
                  <span className="flex-1">Public (anyone on the web can view)</span>
                  <ChevronDownIcon className="w-4 h-4 text-[#6B6B6B]" />
                </div>
                {/* URL field */}
                <div className="flex items-center gap-2 px-3 py-2.5 border border-[#E0E0E0] rounded-lg mb-3 text-sm text-[#6B6B6B] bg-gray-50">
                  <span className="flex-1 truncate text-xs">https://claude.ai/share/4d20e101-4ca0-4996-8ef9...</span>
                  <ExternalLinkIcon />
                </div>
                {/* Info banner */}
                <div className="flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2.5 text-xs text-gray-600 mb-4">
                  <InfoIcon />
                  <span>
                    Don&apos;t share personal information or third-party content without permission, and see our{" "}
                    <button className="underline hover:text-gray-900 cursor-pointer">Usage Policy</button>.
                  </span>
                </div>
                {/* Copied button */}
                <button
                  className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                >
                  <CheckCircleIcon />
                  Copied
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Feedback modal ── */}
      {showFeedbackModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={() => setShowFeedbackModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Feedback</h3>
            <p className="text-sm text-[#6B6B6B] mb-4">Please provide details: (optional)</p>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              autoFocus
              placeholder={
                feedbackType === "positive"
                  ? "What was satisfying about this response?"
                  : "What was wrong with this response?"
              }
              className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C96A4A]/30 focus:border-[#C96A4A] resize-none h-28 mb-3"
            />
            <p className="text-xs text-[#6B6B6B] mb-5 leading-relaxed">
              Submitting this report will send the entire current conversation to Anthropic for future improvements to our models.{" "}
              <button className="text-[#C96A4A] hover:underline cursor-pointer">Learn More</button>
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
