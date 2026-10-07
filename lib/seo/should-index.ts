import type { City } from "@/types/city";
import type { Service } from "@/types/service";

export interface IndexDecision {
  indexable: boolean;
  reason?: string;
}

export function shouldIndexCity(city: City | undefined): IndexDecision {
  if (!city) return { indexable: false, reason: "city not found" };
  if (!city.isActive) return { indexable: false, reason: "city inactive" };
  if (!city.isIndexable) return { indexable: false, reason: "city marked noindex" };
  return { indexable: true };
}

export function shouldIndexCityService(
  city: City | undefined,
  service: Service | undefined
): IndexDecision {
  const cityDecision = shouldIndexCity(city);
  if (!cityDecision.indexable) return cityDecision;
  if (!service) return { indexable: false, reason: "service not found" };
  if (!service.isIndexable) return { indexable: false, reason: "service marked noindex" };

  if (
    city!.availableServiceSlugs &&
    city!.availableServiceSlugs.length > 0 &&
    !city!.availableServiceSlugs.includes(service.slug)
  ) {
    return { indexable: false, reason: "service not offered in this city" };
  }

  const hasMinimumContent =
    Boolean(service.description) && (service.faq.length > 0 || Boolean(city!.custom?.content));
  if (!hasMinimumContent) {
    return { indexable: false, reason: "insufficient content for this combination" };
  }

  return { indexable: true };
}
