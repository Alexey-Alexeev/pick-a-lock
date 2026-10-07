import { PlusIcon } from "./icons";
import { cn } from "@/lib/utils";
import type { ServiceFaq } from "@/types/service";

interface FaqDisclosureProps {
  items: ServiceFaq[];
  /** 2 arranges items into a two-column grid from the lg breakpoint up (first row = items 1–2,
   *  so it only reads cleanly with an even item count). Defaults to a single column. */
  columns?: 1 | 2;
  /**
   * How many of the first items render already expanded. The answers people actually came for —
   * price, damage, documents, night calls — are the first ones, and making them cost a tap is
   * friction at the exact moment the visitor decides whether to call. Pass 0 to collapse all.
   */
  openCount?: number;
}

/**
 * Native <details>/<summary> rather than a JS disclosure widget: the panels work with JavaScript
 * disabled, the expanded answers ship in the static HTML without a `hidden` attribute, and this
 * component stays a server component (no react-aria in the client bundle for it).
 */
export function FaqDisclosure({ items, columns = 1, openCount = 2 }: FaqDisclosureProps) {
  if (items.length === 0) return null;

  const twoColumn = columns === 2;

  return (
    <div className={cn("border-t border-border", twoColumn && "lg:grid lg:grid-cols-2 lg:border-t-0")}>
      {items.map((item, i) => (
        <details
          key={i}
          open={i < openCount}
          className={cn(
            "group border-b border-border",
            twoColumn && [
              "lg:[&:nth-child(-n+2)]:border-t",
              "lg:[&:nth-child(odd)]:pr-10",
              "lg:[&:nth-child(even)]:border-l lg:[&:nth-child(even)]:pl-10",
            ]
          )}
        >
          {/* list-style-type on the summary itself is what hides the default marker in Firefox;
              ::-webkit-details-marker covers Safari, which ignores it. */}
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="min-w-0 flex-1 font-body text-[16px] font-medium leading-snug text-foreground sm:text-lg">
              {item.q}
            </h3>
            <PlusIcon className="h-4 w-4 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <div className="pb-5 pr-10 text-sm leading-relaxed text-muted sm:pb-6">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
