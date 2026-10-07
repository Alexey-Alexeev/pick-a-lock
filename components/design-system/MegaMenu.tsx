"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "./icons";
import { TechnicalLabel } from "./TechnicalLabel";
import { useCurrentCitySlug } from "@/lib/useCurrentCitySlug";
import { cn } from "@/lib/utils";

export interface MegaMenuLink {
  href?: string;
  slug?: string;
  name: string;
}

export interface MegaMenuGroup {
  label: string;
  items: MegaMenuLink[];
  /** When true, item hrefs are built as `/${currentCity}/${item.slug}/` instead of using item.href. */
  cityAware?: boolean;
  moreHref: string;
  moreLabel: string;
}

export function MegaMenu({
  label,
  groups,
  cities,
}: {
  label: string;
  groups: MegaMenuGroup[];
  cities: { slug: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const currentCity = useCurrentCitySlug(cities.map((c) => c.slug));

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 border border-accent px-3 py-1.5 font-bold text-foreground transition-colors hover:border-accent-ink hover:text-accent-ink",
          open && "border-accent-ink text-accent-ink"
        )}
      >
        {label}
        <ChevronDownIcon className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-5 w-[min(820px,90vw)] -translate-x-1/2 border border-border bg-paper shadow-none">
          <div className="grid grid-cols-3 divide-x divide-border">
            {groups.map((group) => (
              <div key={group.label} className="flex flex-col gap-4 p-6">
                <TechnicalLabel>{group.label}</TechnicalLabel>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => {
                    const href = group.cityAware ? `/${currentCity}/${item.slug}/` : item.href!;
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          className="text-sm normal-case tracking-normal text-foreground transition-colors hover:text-accent-ink"
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href={group.moreHref}
                  onClick={() => setOpen(false)}
                  className="mt-auto pt-2 text-sm normal-case tracking-normal text-muted underline decoration-border underline-offset-4 hover:text-accent-ink hover:decoration-accent-ink"
                >
                  {group.moreLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
