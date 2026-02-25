"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  LineChart,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
  CreditCard,
  Server,
  ScrollText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const userNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: LineChart, label: "Analytics", href: "/dashboard/analytics" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
];

const adminNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: CreditCard, label: "Billing", href: "/admin/billing" },
  { icon: Server, label: "System", href: "/admin/system" },
  { icon: ScrollText, label: "Logs", href: "/admin/logs" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");
  const nav = isAdmin ? adminNav : userNav;

  return (
    <aside
      className={`flex flex-col h-screen bg-surface border-r border-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      role="navigation"
      aria-label={isAdmin ? "Admin navigation" : "Dashboard navigation"}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-bold overflow-hidden"
        >
          <BarChart3 className="w-6 h-6 shrink-0" aria-hidden="true" />
          {!collapsed && <span className="text-lg">PulseAnalytics</span>}
        </Link>
      </div>

      {/* Nav section label */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            {isAdmin ? "Admin" : "Menu"}
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-foreground hover:bg-border"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Admin/User switch */}
      <div className="px-2 py-2 border-t border-border">
        <Link
          href={isAdmin ? "/dashboard" : "/admin"}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium text-muted hover:text-foreground hover:bg-border transition-colors duration-200 cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
          title={collapsed ? (isAdmin ? "User Dashboard" : "Admin Panel") : undefined}
        >
          <Shield className="w-5 h-5 shrink-0" aria-hidden="true" />
          {!collapsed && (
            <span>{isAdmin ? "User Dashboard" : "Admin Panel"}</span>
          )}
        </Link>
      </div>

      {/* Collapse toggle */}
      <div className="px-2 py-3 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-[var(--radius-sm)] text-muted hover:text-foreground hover:bg-border transition-colors duration-200 cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          ) : (
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </aside>
  );
}
