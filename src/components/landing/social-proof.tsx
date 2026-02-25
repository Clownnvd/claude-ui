import { socialProofLogos } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function SocialProof() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-border bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-center text-sm font-medium text-muted mb-8">
            Trusted by 2,000+ companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {socialProofLogos.map((name) => (
              <span
                key={name}
                className="text-lg font-bold text-muted/40 hover:text-muted/70 transition-colors duration-200 select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
