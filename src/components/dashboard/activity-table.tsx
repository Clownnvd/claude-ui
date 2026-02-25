import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ActivityItem } from "@/lib/mock-data";

interface ActivityTableProps {
  data: ActivityItem[];
  title?: string;
}

export function ActivityTable({ data, title = "Recent Activity" }: ActivityTableProps) {
  return (
    <div className="bg-surface rounded-[var(--radius-md)] border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="text-left px-5 py-3 font-medium text-muted">
                User
              </th>
              <th className="text-left px-5 py-3 font-medium text-muted">
                Action
              </th>
              <th className="text-left px-5 py-3 font-medium text-muted">
                Target
              </th>
              <th className="text-left px-5 py-3 font-medium text-muted">
                Status
              </th>
              <th className="text-left px-5 py-3 font-medium text-muted">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border last:border-0 hover:bg-background/50 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={item.avatar} size="sm" />
                    <span className="font-medium text-foreground">
                      {item.user}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-foreground">{item.action}</td>
                <td className="px-5 py-3 text-muted">{item.target}</td>
                <td className="px-5 py-3">
                  <Badge variant={item.status}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-muted whitespace-nowrap">
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
