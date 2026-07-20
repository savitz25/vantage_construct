import { processSteps } from "@/lib/content";

export function ProcessTimeline({ compact = false }: { compact?: boolean }) {
  const steps = compact ? processSteps : processSteps;

  return (
    <ol className="relative space-y-4">
      {steps.map((step) => (
        <li key={step.number} className="card overflow-hidden">
          <details className="group" open={!compact && step.number === 1}>
            <summary className="flex min-h-[4.5rem] cursor-pointer list-none items-start gap-3 p-4 sm:min-h-0 sm:items-center sm:gap-4 sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg-elevated font-display text-lg text-gold-deep sm:h-12 sm:w-12 sm:text-xl">
                {step.number}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl text-ivory sm:text-3xl">{step.title}</h3>
                <p className="mt-1 text-sm text-text-muted sm:text-base">{step.summary}</p>
                {"investment" in step && step.investment ? (
                  <p className="mt-2 text-sm text-gold">{step.investment}</p>
                ) : null}
              </div>
              <span className="mt-1 text-gold transition group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-border px-6 pb-6 pt-4">
              <ul className="grid gap-2 sm:grid-cols-2">
                {step.details.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
