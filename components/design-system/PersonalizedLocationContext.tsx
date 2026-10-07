"use client";

import { LocationContext } from "./LocationContext";
import { useCurrentCitySlug } from "@/lib/useCurrentCitySlug";

export function PersonalizedLocationContext({
  cities,
}: {
  cities: { slug: string; prepositionalName: string }[];
}) {
  const currentSlug = useCurrentCitySlug(cities.map((c) => c.slug));
  const match = cities.find((c) => c.slug === currentSlug);
  const label = currentSlug !== "moscow" && match ? match.prepositionalName : "Москве и области";

  return <LocationContext cityPrepositional={label} />;
}
