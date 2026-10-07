import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-semibold tracking-[-0.01em] transition-colors duration-150 outline-none disabled:pointer-events-none disabled:opacity-40 rounded-[var(--radius-xs)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
  {
    variants: {
      variant: {
        // Transparent + hairline border, brightens to accent on hover — the spec's secondary button.
        primary: "border border-foreground/30 bg-transparent text-foreground hover:border-accent hover:text-accent",
        accent: "bg-accent text-accent-foreground hover:bg-accent-ink",
        outline: "border border-current bg-transparent text-current hover:bg-current/[0.06]",
      },
      size: {
        default: "h-12 px-6 text-sm",
        sm: "h-10 px-4 text-[14px]",
        lg: "h-14 px-8 text-[16px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
