import { stats } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Stats() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white font-mono animate-count-up">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-white/70 font-medium">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
