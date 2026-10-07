"use client";

import { PhoneIcon } from "./icons";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/seo/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "h-10 px-4 text-[13px]",
  default: "h-11 px-5 text-sm",
  lg: "h-14 px-6 text-[15px]",
} as const;

interface PhoneLinkProps {
  className?: string;
  iconOnly?: boolean;
  /** Matches the neighboring LinkButton's size so the two read as the site's two button types
   *  (filled CTA + bordered secondary) rather than a button next to plain text. */
  size?: keyof typeof SIZES;
}

export function PhoneLink({ className, iconOnly = false, size = "default" }: PhoneLinkProps) {
  return (
    <a
      href={`tel:${SITE_PHONE_HREF}`}
      onClick={() => trackEvent("phone_click")}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-xs)] border border-current/30 font-mono tracking-[-0.01em] transition-colors duration-150 hover:border-accent hover:text-accent",
        iconOnly ? "h-10 w-10 shrink-0 px-0" : SIZES[size],
        className
      )}
    >
      <PhoneIcon className="h-4 w-4 shrink-0" />
      {!iconOnly && SITE_PHONE_DISPLAY}
    </a>
  );
}
