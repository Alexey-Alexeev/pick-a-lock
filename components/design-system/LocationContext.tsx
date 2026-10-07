import { TechnicalLabel } from "./TechnicalLabel";
import { cn } from "@/lib/utils";

interface LocationContextProps {
  cityPrepositional: string;
  note?: string;
  inverse?: boolean;
  className?: string;
}

export function LocationContext({ cityPrepositional, note, inverse = false, className }: LocationContextProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 border-l-2 border-accent py-0.5 pl-4", className)}>
      <TechnicalLabel inverse={inverse}>Работаем в</TechnicalLabel>
      <span
        className={cn(
          "font-display text-lg font-light uppercase tracking-[-0.01em]",
          inverse ? "text-ink-foreground" : "text-foreground"
        )}
      >
        {cityPrepositional}
      </span>
      {note && (
        <span className={cn("text-sm", inverse ? "text-ink-foreground-muted" : "text-muted")}>{note}</span>
      )}
    </div>
  );
}
