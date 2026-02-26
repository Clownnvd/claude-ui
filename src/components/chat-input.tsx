"use client";

import { useState, useRef, KeyboardEvent } from "react";

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

// The ⇄ sliders icon — exactly as seen in Claude.ai screenshots
function StyleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h9m-9 6h5" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

interface ChatInputProps {
  onSend?: (message: string) => void;
  onStop?: () => void;
  placeholder?: string;
  isStreaming?: boolean;
}

export function ChatInput({
  onSend,
  onStop,
  placeholder = "How can I help you today?",
  isStreaming = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!value.trim() || isStreaming) return;
    onSend?.(value);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  return (
    <div className="relative">
      {/* Attach dropdown menu */}
      {showAttachMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowAttachMenu(false)}
            aria-hidden="true"
          />
          <div className="absolute bottom-full left-0 mb-2 w-52 bg-white border border-[#E0E0E0] rounded-xl shadow-lg py-1 z-20">
            {[
              { label: "Upload a file", icon: "📎" },
              { label: "Take a screenshot", icon: "📷" },
              { label: "Add from GitHub", icon: "⬡" },
            ].map(({ label }) => (
              <button
                key={label}
                onClick={() => setShowAttachMenu(false)}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex items-center gap-3"
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Input box */}
      <div className="border border-[#E0E0E0] rounded-xl bg-white shadow-sm overflow-hidden">
        {/* Textarea */}
        <div className="px-4 pt-3 pb-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder={placeholder}
            rows={1}
            className="w-full text-sm text-gray-900 placeholder-[#6B6B6B] focus:outline-none bg-transparent min-h-[28px] max-h-[200px] overflow-y-auto leading-relaxed resize-none"
            aria-label="Message input"
          />
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
          <div className="flex items-center gap-1">
            {/* Attach — shows × when menu open */}
            <button
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label={showAttachMenu ? "Close attach menu" : "Attach file"}
            >
              {showAttachMenu ? <CloseIcon /> : <PlusIcon />}
            </button>
            {/* Style selector (⇄ sliders) */}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label="Response style"
            >
              <StyleIcon />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Model selector */}
            <button className="flex items-center gap-1 text-xs text-[#6B6B6B] hover:text-gray-900 transition-colors duration-200 cursor-pointer">
              <span>Claude Sonnet 4</span>
              <ChevronDownIcon />
            </button>

            {/* Send / Stop button */}
            {isStreaming ? (
              <button
                onClick={onStop}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                aria-label="Stop generating"
              >
                <StopIcon />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!value.trim()}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                  value.trim()
                    ? "bg-[#C96A4A] text-white hover:bg-[#B05A3C]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade to connect tools — shown below input on home page */}
    </div>
  );
}
