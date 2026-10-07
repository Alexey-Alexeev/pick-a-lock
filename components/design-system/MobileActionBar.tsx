"use client";

import { PhoneIcon, WrenchIcon } from "./icons";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/seo/site";
import { trackEvent } from "@/lib/analytics";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-ink-border bg-ink text-ink-foreground md:hidden">
      <a
        href={`tel:${SITE_PHONE_HREF}`}
        onClick={() => trackEvent("phone_click")}
        className="flex items-center justify-center gap-2 border-r border-ink-border py-4 font-mono text-[14px] tracking-[-0.01em]"
      >
        <PhoneIcon className="h-4 w-4" />
        {SITE_PHONE_DISPLAY}
      </a>
      <a
        href="#order-form"
        onClick={() => trackEvent("cta_click")}
        className="flex items-center justify-center gap-2 bg-accent py-4 font-mono text-[14px] tracking-[-0.01em] text-accent-foreground"
      >
        <WrenchIcon className="h-4 w-4" />
        Вызвать мастера
      </a>
    </div>
  );
}
