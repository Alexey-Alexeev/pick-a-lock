"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MenuIcon, CloseIcon, ChevronDownIcon } from "./icons";
import { TechnicalLabel } from "./TechnicalLabel";
import { HeaderCitySelect, type HeaderCityOption } from "./HeaderCitySelect";
import type { MegaMenuGroup } from "./MegaMenu";
import { useCurrentCitySlug } from "@/lib/useCurrentCitySlug";
import { cn } from "@/lib/utils";

interface FlatLink {
  href: string;
  label: string;
}

export function MobileMenu({
  groups,
  flatLinks,
  cities,
}: {
  groups: MegaMenuGroup[];
  flatLinks: FlatLink[];
  cities: HeaderCityOption[];
}) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(groups[0]?.label ?? null);
  const currentCity = useCurrentCitySlug(cities.map((c) => c.slug));

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        className="flex h-9 w-9 items-center justify-center text-foreground"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {/* Above the sticky header (z-40) and the fixed mobile action bar (z-50) — this overlay
          must cover both when open. */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-paper">
          <div className="flex h-20 items-center justify-between border-b border-border px-6">
            <span className="font-display text-lg font-light tracking-[-0.02em] text-foreground">Меню</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
              className="flex h-9 w-9 items-center justify-center text-foreground"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 pb-28">
            <div className="mb-6 flex items-center gap-2 border-b border-border pb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
              <span>Город:</span>
              <HeaderCitySelect cities={cities} className="text-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              {groups.map((group) => {
                const isOpen = openGroup === group.label;
                return (
                  <div key={group.label} className="border-b border-border py-4">
                    <button
                      type="button"
                      onClick={() => setOpenGroup(isOpen ? null : group.label)}
                      className="flex w-full items-center justify-between"
                      aria-expanded={isOpen}
                    >
                      <TechnicalLabel>{group.label}</TechnicalLabel>
                      <ChevronDownIcon
                        className={cn("h-3.5 w-3.5 text-muted transition-transform duration-200", isOpen && "rotate-180")}
                      />
                    </button>
                    {isOpen && (
                      <div className="mt-4 flex flex-col gap-3.5 pl-0.5">
                        {group.items.map((item) => {
                          const href = group.cityAware ? `/${currentCity}/${item.slug}/` : item.href!;
                          return (
                            <Link
                              key={href}
                              href={href}
                              onClick={() => setOpen(false)}
                              className="text-[16px] text-foreground"
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                        <Link
                          href={group.moreHref}
                          onClick={() => setOpen(false)}
                          className="text-sm text-muted underline decoration-border underline-offset-4"
                        >
                          {group.moreLabel}
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {flatLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-xl font-light text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
