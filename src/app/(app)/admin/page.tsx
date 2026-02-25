import type { Metadata } from "next";
import { KPICard } from "@/components/dashboard/kpi-card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  adminKpiData,
  adminUsers,
  systemLogs,
} from "@/lib/mock-data";
import {
  MoreHorizontal,
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const roleVariant: Record<string, "info" | "warning" | "default"> = {
  admin: "info",
  editor: "warning",
  viewer: "default",
};

const statusVariant: Record<string, "success" | "default" | "error"> = {
  active: "success",
  inactive: "default",
  suspended: "error",
};

const logIcons = {
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
  success: CheckCircle2,
};

const logColors = {
  info: "text-info",
  warning: "text-warning",
  error: "text-error",
  success: "text-success",
};

export default function AdminPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Overview</h1>
        <p className="text-sm text-muted mt-1">
          System health and user management at a glance.
        </p>
      </div>

      {/* System KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminKpiData.map((kpi) => (
          <KPICard key={kpi.label} data={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users table */}
        <div className="lg:col-span-2 bg-surface rounded-[var(--radius-md)] border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Users ({adminUsers.length})
            </h3>
            <button className="text-sm text-primary font-medium hover:underline cursor-pointer">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="text-left px-5 py-3 font-medium text-muted">
                    User
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted">
                    Role
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted">
                    Last Active
                  </th>
                  <th className="text-right px-5 py-3 font-medium text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border last:border-0 hover:bg-background/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={user.avatar} size="sm" />
                        <div>
                          <div className="font-medium text-foreground">
                            {user.name}
                          </div>
                          <div className="text-xs text-muted">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={roleVariant[user.role]}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={statusVariant[user.status]}>
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-muted whitespace-nowrap">
                      {user.lastActive}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] text-muted hover:text-foreground hover:bg-border transition-colors cursor-pointer"
                        aria-label={`Actions for ${user.name}`}
                      >
                        <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-surface rounded-[var(--radius-md)] border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">
              System Logs
            </h3>
          </div>
          <div className="divide-y divide-border">
            {systemLogs.map((log) => {
              const LogIcon = logIcons[log.type];
              return (
                <div
                  key={log.id}
                  className="px-5 py-3 hover:bg-background/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <LogIcon
                      className={`w-4 h-4 mt-0.5 shrink-0 ${logColors[log.type]}`}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-foreground leading-snug">
                        {log.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted">
                          {log.source}
                        </span>
                        <span className="text-xs text-muted">
                          {log.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
