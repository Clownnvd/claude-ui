import { testimonials } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/avatar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Loved by teams everywhere
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              See what our customers have to say about PulseAnalytics.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <blockquote className="relative bg-surface rounded-[var(--radius-md)] border border-border p-6 h-full flex flex-col">
                <Quote
                  className="w-8 h-8 text-primary/20 mb-4 shrink-0"
                  aria-hidden="true"
                />
                <p className="text-sm text-foreground leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                  <Avatar initials={t.avatar} size="sm" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
