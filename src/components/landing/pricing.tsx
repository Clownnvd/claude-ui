import { pricingPlans } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              Start free, upgrade when you&apos;re ready. No hidden fees, no surprises.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100}>
              <div
                className={`relative rounded-[var(--radius-md)] border p-8 ${
                  plan.highlighted
                    ? "border-primary shadow-lg scale-105 bg-surface"
                    : "border-border bg-surface"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-[var(--radius-full)]">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-foreground font-mono">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-muted">{plan.period}</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted">{plan.description}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        className="w-4 h-4 text-success mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    variant={plan.highlighted ? "primary" : "outline"}
                    size="md"
                    className="w-full"
                    href="/sign-up"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
