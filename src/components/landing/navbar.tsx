"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: "Tính năng", href: "#features" },
    { label: "Cách hoạt động", href: "#how-it-works" },
    { label: "Bảng giá", href: "#pricing" },
  ]

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-[#E2E8F0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-[#1B4FD8] rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold tracking-tight">CV</span>
            </div>
            <span className="text-[#0F172A] font-semibold text-lg">CViet</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#64748B] hover:text-[#0F172A] text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium text-[#0F172A] hover:text-[#1B4FD8] rounded-lg hover:bg-[#EEF2FF] transition-colors duration-200 cursor-pointer"
            >
              Đăng nhập
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 text-sm font-medium bg-[#1B4FD8] text-white rounded-lg hover:bg-[#1440A8] transition-colors duration-200 cursor-pointer"
            >
              Bắt đầu miễn phí
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors duration-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
              <Link
                href="/sign-in"
                className="block px-3 py-2 text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg transition-colors duration-200 cursor-pointer text-center"
              >
                Đăng nhập
              </Link>
              <Link
                href="/sign-up"
                className="block px-3 py-2 text-sm font-medium bg-[#1B4FD8] text-white rounded-lg hover:bg-[#1440A8] transition-colors duration-200 cursor-pointer text-center"
              >
                Bắt đầu miễn phí
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
