import type { Metadata } from "next";
import { KPICard } from "@/components/dashboard/kpi-card";
import { BarChart, AreaChart } from "@/components/dashboard/chart-placeholder";
import { ActivityTable } from "@/components/dashboard/activity-table";
import {
  kpiData,
  recentActivity,
  revenueChartData,
  userGrowthData,
} from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted mt-1">
          Welcome back, John. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.label} data={kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart title="Monthly Revenue" data={revenueChartData} />
        <AreaChart title="User Growth" data={userGrowthData} />
      </div>

      {/* Activity Table */}
      <ActivityTable data={recentActivity} />
    </div>
  );
}
