"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "./icons";
import { setStoredCitySlug } from "@/lib/cityPreference";
import { useCurrentCitySlug } from "@/lib/useCurrentCitySlug";
import { cn } from "@/lib/utils";

export interface HeaderCityOption {
  slug: string;
  name: string;
}

export function HeaderCitySelect({
  cities,
  className,
}: {
  cities: HeaderCityOption[];
  className?: string;
}) {
  const router = useRouter();
  const currentSlug = useCurrentCitySlug(cities.map((c) => c.slug));
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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

  const current = cities.find((c) => c.slug === currentSlug);

  function handleSelect(slug: string) {
    setOpen(false);
    if (slug === currentSlug) return;
    setStoredCitySlug(slug);
    router.push(slug === "moscow" ? "/" : `/${slug}/`);
  }

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Выбрать город"
        className="flex items-center gap-1.5 font-bold text-foreground transition-colors hover:text-accent-ink"
      >
        {current?.name ?? "Город"}
        <ChevronDownIcon className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 max-h-80 w-56 overflow-y-auto border border-border bg-paper">
          {cities.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => handleSelect(c.slug)}
              className={cn(
                "block w-full px-4 py-2.5 text-left text-sm normal-case tracking-normal transition-colors hover:bg-surface-sunken hover:text-accent-ink",
                c.slug === currentSlug ? "text-accent-ink" : "text-foreground"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
