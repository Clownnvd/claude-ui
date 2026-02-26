"use client"

import { Bell } from "lucide-react"

interface TopbarProps {
  title: string
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between flex-shrink-0">
      {/* Page title */}
      <h1 className="text-lg font-semibold text-[#0F172A]">{title}</h1>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Notification bell (placeholder) */}
        <button
          type="button"
          className="relative w-10 h-10 flex items-center justify-center rounded-lg text-[#64748B] hover:bg-gray-50 hover:text-[#0F172A] transition-colors duration-200 cursor-pointer"
          aria-label="Thông báo"
        >
          <Bell className="w-5 h-5" />
          {/* Notification dot placeholder */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#1B4FD8] rounded-full" />
        </button>

        {/* User avatar */}
        <button
          type="button"
          className="w-9 h-9 rounded-full bg-[#1B4FD8] flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity duration-200"
          aria-label="Tài khoản"
        >
          <span className="text-white text-sm font-semibold">U</span>
        </button>
      </div>
    </header>
  )
}
