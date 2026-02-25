import { features } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything you need to grow
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              Powerful features designed for modern analytics teams. No setup
              required.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-stagger>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-surface rounded-[var(--radius-md)] border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-[var(--radius-sm)] bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
