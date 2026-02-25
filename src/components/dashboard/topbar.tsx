"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, LogOut, User, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar } from "@/components/ui/avatar";

export function Topbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: "New user signed up", time: "2m ago", unread: true },
    { id: 2, text: "Revenue goal reached", time: "1h ago", unread: true },
    { id: 3, text: "Server load spike detected", time: "3h ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic placeholder
    console.log("Search:", searchQuery);
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-surface border-b border-border shrink-0">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search dashboards, reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-background text-foreground border border-border rounded-[var(--radius-sm)] placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
            aria-label="Search"
          />
        </div>
      </form>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-4">
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] text-muted hover:text-foreground hover:bg-border transition-colors duration-200 cursor-pointer"
            aria-label={`Notifications (${unreadCount} unread)`}
          >
            <Bell className="w-5 h-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-surface border border-border rounded-[var(--radius-md)] shadow-lg z-50">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">
                  Notifications
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-border last:border-0 hover:bg-background transition-colors cursor-pointer ${
                      n.unread ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {n.unread && (
                        <span className="mt-1.5 w-2 h-2 bg-primary rounded-full shrink-0" />
                      )}
                      <div className={n.unread ? "" : "ml-4"}>
                        <p className="text-sm text-foreground">{n.text}</p>
                        <p className="text-xs text-muted mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-border">
                <button className="text-sm text-primary font-medium hover:underline cursor-pointer">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="cursor-pointer"
            aria-label="User menu"
            aria-expanded={showUserMenu}
          >
            <Avatar initials="JD" size="sm" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 w-56 bg-surface border border-border rounded-[var(--radius-md)] shadow-lg z-50">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">
                  John Doe
                </p>
                <p className="text-xs text-muted">john@example.com</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => router.push("/dashboard/settings")}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-foreground hover:bg-background transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4" aria-hidden="true" />
                  Profile
                </button>
                <button
                  onClick={() => router.push("/dashboard/settings")}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-foreground hover:bg-background transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4" aria-hidden="true" />
                  Settings
                </button>
                <hr className="my-1 border-border" />
                <button
                  onClick={() => router.push("/sign-in")}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-error hover:bg-background transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
