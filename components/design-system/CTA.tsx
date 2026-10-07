import { LinkButton } from "./LinkButton";
import { PhoneLink } from "./PhoneLink";

interface CTAProps {
  title: string;
  description?: string;
  formHref?: string;
}

export function CTA({ title, description, formHref = "#order-form" }: CTAProps) {
  return (
    <section className="border-t border-border bg-ink-elevated px-6 py-20 text-ink-foreground sm:px-10 sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6">
        <h2 className="font-display text-4xl font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-lg text-base leading-relaxed text-ink-foreground-muted">{description}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-5">
          <LinkButton href={formHref} variant="accent" size="lg">
            Вызвать мастера
          </LinkButton>
          <PhoneLink size="lg" className="text-ink-foreground" />
        </div>
      </div>
    </section>
  );
}
