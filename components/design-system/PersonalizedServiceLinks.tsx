"use client";

import Link from "next/link";
import { useCurrentCitySlug } from "@/lib/useCurrentCitySlug";

export interface PersonalizedServiceLink {
  slug: string;
  shortName: string;
}

export function PersonalizedServiceLinks({
  services,
  cities,
}: {
  services: PersonalizedServiceLink[];
  cities: { slug: string }[];
}) {
  const currentSlug = useCurrentCitySlug(cities.map((c) => c.slug));

  return (
    <div className="mt-4 flex flex-col gap-2.5">
      {services.map((s) => (
        <Link
          key={s.slug}
          href={`/${currentSlug}/${s.slug}/`}
          className="text-sm text-foreground underline decoration-border underline-offset-4 hover:text-accent-ink hover:decoration-accent-ink sm:text-[16px]"
        >
          {s.shortName}
        </Link>
      ))}
    </div>
  );
}
