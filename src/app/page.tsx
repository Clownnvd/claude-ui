"use client";

import { useState } from "react";
import Link from "next/link";

function AnthropicMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L9.5 8.5H3L8.5 12.5L6 19L12 15L18 19L15.5 12.5L21 8.5H14.5L12 2Z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function DemoChatPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex justify-end">
        <div className="bg-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-gray-800 shadow-sm max-w-[80%]">
          Can you help me write a cover letter for a product manager role?
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-7 h-7 rounded-full bg-[#C96A4A] flex items-center justify-center flex-shrink-0 mt-1">
          <AnthropicMark className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800 shadow-sm">
          <p className="font-medium mb-2">Of course! Here&apos;s a cover letter outline:</p>
          <p className="text-gray-600 mb-1">• Opening — connect your background to the role</p>
          <p className="text-gray-600 mb-1">• Body — 2-3 specific achievements with metrics</p>
          <p className="text-gray-600 mb-1">• Closing — express enthusiasm, call to action</p>
          <p className="mt-2 text-gray-600">Want me to draft the full letter? Just share the job description.</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-gray-800 shadow-sm max-w-[80%]">
          Yes please — here&apos;s the JD...
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left — Login form */}
      <div className="flex flex-col items-center justify-center px-8 py-12 bg-[#F9F6F0]">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <AnthropicMark className="w-7 h-7 text-[#C96A4A]" />
            <span className="text-xl font-semibold text-gray-900">Claude</span>
          </div>

          {/* Heading */}
          <h1
            className="text-3xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your ideas, amplified
          </h1>
          <p className="text-[#6B6B6B] mb-8">
            Privacy-first AI that helps you create in confidence.
          </p>

          {/* Google SSO */}
          <button className="w-full flex items-center justify-center gap-3 border border-[#E0E0E0] bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer mb-4">
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#E0E0E0]" />
            <span className="text-sm text-[#6B6B6B]">OR</span>
            <div className="flex-1 h-px bg-[#E0E0E0]" />
          </div>

          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your personal or work email"
            className="w-full border border-[#E0E0E0] rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C96A4A]/30 focus:border-[#C96A4A] transition-colors duration-200 mb-3"
          />

          <Link
            href="/new"
            className="w-full flex items-center justify-center bg-black text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
          >
            Continue with email
          </Link>

          {/* Terms */}
          <p className="text-xs text-[#6B6B6B] text-center mt-6 leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-gray-900">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-gray-900">
              Privacy Policy
            </a>
            .
          </p>

          <p className="text-sm text-center text-[#6B6B6B] mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/new" className="text-gray-900 font-medium underline hover:no-underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Demo preview */}
      <div className="hidden md:flex items-center justify-center bg-[#EDE9E1] px-8 py-12">
        <DemoChatPreview />
      </div>
    </div>
  );
}
