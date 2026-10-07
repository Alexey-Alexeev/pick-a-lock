import { cn } from "@/lib/utils";

export function TechnicalLabel({
  children,
  className,
  inverse = false,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  inverse?: boolean;
  /** Render as a heading (e.g. "h2") when this label is a section's only title, so the
   *  document outline doesn't skip a level. Defaults to a plain, non-heading "span". */
  as?: "span" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-[12px] uppercase tracking-[0.18em]",
        inverse ? "text-ink-foreground-muted" : "text-muted",
        className
      )}
    >
      {children}
    </Tag>
  );
}
