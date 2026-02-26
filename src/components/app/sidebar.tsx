"use client"

import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Crown, Plus, LogOut } from "lucide-react"
import { signOut } from "@/lib/auth-client"

// TODO: Replace with actual user session data from Better Auth
const user = { name: "Người dùng", email: "user@example.com" }

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: React.ReactNode
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "CV của tôi",
    href: "/dashboard",
    icon: FileText,
  },
  {
    label: "Nâng cấp",
    href: "/billing",
    icon: Crown,
    badge: (
      <span className="text-[10px] font-semibold bg-[#1B4FD8] text-white px-1.5 py-0.5 rounded-full leading-none">
        Pro
      </span>
    ),
  },
]

async function handleSignOut() {
  await signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/" } } })
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 flex-shrink-0 bg-white border-r border-[#E2E8F0] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#E2E8F0]">
        <a href="/" className="inline-flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-[#1B4FD8] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">CV</span>
          </div>
          <span className="text-lg font-semibold text-[#0F172A]">CViet</span>
        </a>
      </div>

      {/* New CV button */}
      <div className="p-4">
        <a
          href="/cv/new"
          className="flex items-center justify-center gap-2 w-full bg-[#1B4FD8] hover:bg-[#1440A8] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          Tạo CV mới
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer min-h-[44px] ${
                isActive
                  ? "bg-[#EEF2FF] text-[#1B4FD8]"
                  : "text-[#64748B] hover:bg-gray-50 hover:text-[#0F172A]"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge}
            </a>
          )
        })}
      </nav>

      {/* Bottom: User info */}
      <div className="p-4 border-t border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-3">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#1B4FD8] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          {/* Name + email */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#0F172A] truncate">{user.name}</p>
            <p className="text-xs text-[#64748B] truncate">{user.email}</p>
          </div>
        </div>
        {/* Sign out button */}
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-[#64748B] hover:bg-gray-50 hover:text-[#0F172A] transition-colors duration-200 cursor-pointer min-h-[44px]"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
