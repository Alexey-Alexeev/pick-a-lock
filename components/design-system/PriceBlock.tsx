import { TechnicalLabel } from "./TechnicalLabel";
import { cn } from "@/lib/utils";

interface PriceBlockProps {
  label: string;
  price?: string;
  meta?: { label: string; value: string }[];
  inverse?: boolean;
  className?: string;
}

export function PriceBlock({ label, price, meta, inverse = false, className }: PriceBlockProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <TechnicalLabel inverse={inverse}>{label}</TechnicalLabel>
      {price ? (
        <div className="flex items-baseline gap-2.5">
          <span className={cn("text-sm", inverse ? "text-ink-foreground-muted" : "text-muted")}>от</span>
          <span className="font-display text-5xl font-light tracking-[-0.02em] text-accent sm:text-6xl">
            {price}
          </span>
          <span className={cn("text-xl", inverse ? "text-ink-foreground-muted" : "text-muted")}>₽</span>
        </div>
      ) : (
        <span className={cn("font-display text-2xl font-light", inverse ? "text-ink-foreground" : "text-foreground")}>
          по заявке
        </span>
      )}
      {meta && meta.length > 0 && (
        <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-current/10 pt-4">
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <TechnicalLabel inverse={inverse}>{item.label}</TechnicalLabel>
              <span className={cn("font-mono text-sm", inverse ? "text-ink-foreground" : "text-foreground")}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
