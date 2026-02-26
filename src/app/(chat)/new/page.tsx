"use client";

import { useState } from "react";
import { ChatInput } from "@/components/chat-input";

// Quick action pills with icons matching Claude.ai screenshots
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

function AnthropicMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.827 3.52h3.603l5.927 16.037h-3.947l-1.234-3.637h-5.427l-1.21 3.637H7.576l5.251-16.037zm2.422 9.394-1.862-5.795-1.863 5.795h3.725zM4.46 3.52h3.603l5.927 16.037H10.04l-1.234-3.637H3.38l-1.21 3.637H-1.28L4.46 3.52zm2.422 9.394L4.92 7.119 3.06 12.914h3.725z" />
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

function ChevronDownIcon({ className = "w-3 h-3" }) {
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

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-3">
      {/* Avatar — dark circle with initials */}
      <div className="w-7 h-7 rounded-full bg-gray-700 text-white text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
        ST
      </div>
      {/* Message bubble */}
      <div className="bg-white border border-[#E0E0E0] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-900 shadow-sm max-w-[75%]">
        {content}
      </div>
    </div>
  );
}

function AssistantMessage({ content, isStreaming }: { content: string; isStreaming?: boolean }) {
  if (isStreaming) {
    return (
      <div className="pl-10">
        {/* Spinning asterisk while loading */}
        <AnthropicMark className="w-6 h-6 text-[#C96A4A] animate-spin" />
      </div>
    );
  }

  return (
    <div className="pl-10">
      {/* Response text */}
      <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
        {content}
      </div>

      {/* Toolbar — always visible after response */}
      <div className="flex items-center gap-1 mt-3">
        <button
          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
          aria-label="Copy response"
        >
          <CopyIcon />
        </button>
        <button
          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-black/5 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
          aria-label="Good response"
        >
          <ThumbsUpIcon />
        </button>
        <button
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
  );
}

const MOCK_RESPONSE = `UX design (User Experience design) is the process of creating products that provide meaningful and relevant experiences to users. It involves researching user needs, designing intuitive interfaces, and ensuring products are useful, usable, and enjoyable.

UX designers focus on the entire user journey — from initial discovery through final interaction — considering factors like ease of use, accessibility, and user satisfaction. The goal is to solve user problems and create delightful design decisions backed by research and testing.`;

export default function NewChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatTitle, setChatTitle] = useState("Untitled");
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const userName = "Sarah";

  const handleSend = (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

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

  const isEmpty = messages.length === 0 && !isStreaming;

  return (
    <div className="flex flex-col h-full">
      {/* Top bar — only shows in conversation */}
      {!isEmpty && (
        <header className="flex items-center justify-between px-4 py-3 flex-shrink-0">
          {/* Chat title with dropdown */}
          <button
            onClick={() => { setRenameValue(""); setShowRenameModal(true); }}
            className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
          >
            {chatTitle}
            <ChevronDownIcon className="w-4 h-4 text-[#6B6B6B]" />
          </button>

          {/* Share */}
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-gray-900 transition-colors duration-200 cursor-pointer"
          >
            <ShareIcon />
            Share
          </button>
        </header>
      )}

      {/* Main content */}
      {isEmpty ? (
        /* Home screen */
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

            {/* Upgrade tools banner — below input */}
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
        /* Conversation view */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="max-w-2xl mx-auto px-4 space-y-6">
              {messages.map((msg) =>
                msg.role === "user" ? (
                  <UserMessage key={msg.id} content={msg.content} />
                ) : (
                  <AssistantMessage key={msg.id} content={msg.content} />
                )
              )}

              {/* Streaming indicator */}
              {isStreaming && (
                <AssistantMessage content="" isStreaming />
              )}
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
              <p className="text-xs text-center text-[#6B6B6B] mt-2">
                Claude can make mistakes. Please double-check responses.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rename modal */}
      {showRenameModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setShowRenameModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Rename chat</h3>
            <input
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              autoFocus
              className="w-full border-2 border-blue-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none mb-4"
              placeholder=""
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

      {/* Share modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-gray-900">Share chat</h3>
              <button onClick={() => setShowShareModal(false)} className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-4">Only messages up until now will be shared</p>
            <div className="flex items-center gap-2 px-3 py-2.5 border border-[#E0E0E0] rounded-lg mb-3 text-sm text-[#6B6B6B]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Private (only you have access)
            </div>
            <div className="flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2.5 text-xs text-gray-600 mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Don&apos;t share personal information or third-party content without permission, and see our Usage Policy.
            </div>
            <button className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              Create link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
