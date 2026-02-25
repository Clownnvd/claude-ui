import { TrendingUp, TrendingDown } from "lucide-react";
import type { KPIData } from "@/lib/mock-data";

interface KPICardProps {
  data: KPIData;
}

export function KPICard({ data }: KPICardProps) {
  const Icon = data.icon;
  const TrendIcon = data.trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = data.trend === "up" ? "text-success" : "text-error";
  const trendBg = data.trend === "up" ? "bg-success/10" : "bg-error/10";

  return (
    <div className="bg-surface rounded-[var(--radius-md)] border border-border p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] bg-primary/10 text-primary">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-full)] text-xs font-semibold ${trendColor} ${trendBg}`}
        >
          <TrendIcon className="w-3 h-3" aria-hidden="true" />
          <span>{Math.abs(data.change)}%</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold font-mono text-foreground">
          {data.value}
        </div>
        <div className="text-sm text-muted mt-1">{data.label}</div>
      </div>
    </div>
  );
}
