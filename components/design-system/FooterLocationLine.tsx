"use client";

import { useCurrentCitySlug } from "@/lib/useCurrentCitySlug";

const DEFAULT_LABEL = "Москва и Московская область";

export function FooterLocationLine({ cities }: { cities: { slug: string; name: string }[] }) {
  const currentSlug = useCurrentCitySlug(cities.map((c) => c.slug));
  const match = cities.find((c) => c.slug === currentSlug);
  const label = currentSlug !== "moscow" && match ? match.name : DEFAULT_LABEL;

  return <span>{label}</span>;
}
