import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <ScrollReveal>
          <Badge variant="info" className="mb-6">
            Now with AI-Powered Insights
          </Badge>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
            Analytics that move{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              as fast as you do
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Track, analyze, and optimize your business metrics with real-time
            dashboards, AI-powered insights, and collaborative reports.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/sign-up">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" href="#features">
              See How It Works
            </Button>
          </div>
        </ScrollReveal>

        {/* Dashboard mockup */}
        <ScrollReveal delay={400}>
          <div className="mt-16 mx-auto max-w-5xl">
            <div className="relative rounded-[var(--radius-md)] border border-border bg-surface shadow-lg overflow-hidden p-6">
              {/* Top bar mockup */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-error" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <div className="ml-4 flex-1 h-6 bg-border rounded-[var(--radius-full)]" />
              </div>

              {/* KPI cards mockup */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {["$84.2K", "24.5K", "3.24%", "1,429"].map((val, i) => (
                  <div
                    key={i}
                    className="bg-background rounded-[var(--radius-sm)] p-4 border border-border"
                  >
                    <div className="text-xs text-muted mb-1">
                      {["Revenue", "Users", "Conversion", "Sessions"][i]}
                    </div>
                    <div className="text-lg font-bold font-mono text-foreground">
                      {val}
                    </div>
                    <div className="text-xs text-success mt-1">
                      +{[8.2, 12.5, 1.3, 18.7][i]}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart mockup */}
              <div className="flex gap-4">
                <div className="flex-1 bg-background rounded-[var(--radius-sm)] p-4 border border-border">
                  <div className="text-sm font-semibold mb-4 text-foreground">
                    Revenue Trend
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {[40, 55, 45, 60, 50, 70, 65, 80, 75, 90, 85, 95].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-primary to-secondary chart-bar"
                          style={{
                            height: `${h}%`,
                            animationDelay: `${i * 80}ms`,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="hidden lg:block flex-1 bg-background rounded-[var(--radius-sm)] p-4 border border-border">
                  <div className="text-sm font-semibold mb-4 text-foreground">
                    User Growth
                  </div>
                  <svg className="w-full h-32" viewBox="0 0 300 120" fill="none">
                    <polyline
                      points="0,100 30,85 60,90 90,70 120,75 150,55 180,60 210,40 240,35 270,20 300,10"
                      className="stroke-secondary"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
                    </linearGradient>
                    <polygon
                      points="0,100 30,85 60,90 90,70 120,75 150,55 180,60 210,40 240,35 270,20 300,10 300,120 0,120"
                      fill="url(#gradient)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
