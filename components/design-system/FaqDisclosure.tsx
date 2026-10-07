"use client";

import { Disclosure, DisclosureGroup, DisclosurePanel } from "react-aria-components";
import { PlusIcon } from "./icons";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import type { ServiceFaq } from "@/types/service";

interface FaqDisclosureProps {
  items: ServiceFaq[];
  /** 2 arranges items into a two-column grid from the lg breakpoint up (first row = items 1–2,
   *  so it only reads cleanly with an even item count). Defaults to a single column. */
  columns?: 1 | 2;
}

export function FaqDisclosure({ items, columns = 1 }: FaqDisclosureProps) {
  if (items.length === 0) return null;

  const twoColumn = columns === 2;

  return (
    <DisclosureGroup
      className={cn("border-t border-border", twoColumn && "lg:grid lg:grid-cols-2 lg:border-t-0")}
      allowsMultipleExpanded
    >
      {items.map((item, i) => (
        <Disclosure
          key={i}
          id={i}
          className={cn(
            "group border-b border-border",
            twoColumn && [
              "lg:[&:nth-child(-n+2)]:border-t",
              "lg:[&:nth-child(odd)]:pr-10",
              "lg:[&:nth-child(even)]:border-l lg:[&:nth-child(even)]:pl-10",
            ]
          )}
        >
          <h3>
            <Button
              slot="trigger"
              variant="outline"
              className="!h-auto w-full !justify-between gap-6 !rounded-none border-0 !bg-transparent px-0 py-5 text-left font-body text-[16px] font-medium normal-case !whitespace-normal tracking-normal text-foreground hover:!bg-transparent sm:py-6 sm:text-lg"
            >
              <span className="min-w-0 flex-1">{item.q}</span>
              <PlusIcon className="h-4 w-4 shrink-0 text-accent transition-transform duration-200 group-data-[expanded]:rotate-45" />
            </Button>
          </h3>
          <DisclosurePanel className="pb-5 pr-10 text-sm leading-relaxed text-muted sm:pb-6">
            {item.a}
          </DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
