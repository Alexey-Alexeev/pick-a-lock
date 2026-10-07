import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  lg: "text-[2.75rem] sm:text-[3.5rem] leading-[1.04]",
  md: "text-[1.95rem] sm:text-[2.35rem] leading-[1.08]",
  sm: "text-xl sm:text-2xl leading-[1.15]",
} as const;

interface SectionHeadingProps {
  as?: ElementType;
  size?: keyof typeof SIZE_CLASSES;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  inverse?: boolean;
}

export function SectionHeading({
  as: Tag = "h2",
  size = "md",
  eyebrow,
  children,
  className,
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow && (
        <span
          className={cn(
            "font-mono text-[12px] uppercase tracking-[0.16em]",
            inverse ? "text-ink-foreground-muted" : "text-muted"
          )}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        className={cn(
          "font-display font-light tracking-[-0.02em]",
          SIZE_CLASSES[size],
          inverse ? "text-ink-foreground" : "text-foreground"
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
