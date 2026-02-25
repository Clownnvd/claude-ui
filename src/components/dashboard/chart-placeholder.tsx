"use client";

interface BarChartProps {
  title: string;
  data: { month: string; value: number }[];
}

export function BarChart({ title, data }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-surface rounded-[var(--radius-md)] border border-border p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <div className="flex items-end gap-1.5 h-40">
        {data.map((d, i) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-sm bg-gradient-to-t from-primary to-secondary chart-bar min-h-[4px]"
              style={{
                height: `${(d.value / maxValue) * 100}%`,
                animationDelay: `${i * 60}ms`,
              }}
            />
            <span className="text-[10px] text-muted">{d.month.slice(0, 3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LineChartProps {
  title: string;
  data: { month: string; value: number }[];
}

export function AreaChart({ title, data }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const width = 300;
  const height = 140;
  const padding = 10;

  const points = data
    .map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
      const y =
        height - padding - ((d.value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${padding},${height - padding} ${points} ${
    width - padding
  },${height - padding}`;

  return (
    <div className="bg-surface rounded-[var(--radius-md)] border border-border p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <svg
        className="w-full"
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        preserveAspectRatio="none"
        style={{ height: "160px" }}
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#areaGrad)" />
        <polyline
          points={points}
          className="stroke-secondary"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((d, i) => {
          const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
          const y =
            height -
            padding -
            ((d.value - minValue) / range) * (height - 2 * padding);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              className="fill-secondary stroke-surface"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2">
        {data.filter((_, i) => i % 3 === 0).map((d) => (
          <span key={d.month} className="text-[10px] text-muted">
            {d.month.slice(0, 3)}
          </span>
        ))}
      </div>
    </div>
  );
}
