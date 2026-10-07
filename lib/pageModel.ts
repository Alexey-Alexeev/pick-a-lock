import type { City } from "@/types/city";
import type { Service, ServiceFaq } from "@/types/service";
import type { LockType } from "@/types/lockType";
import type { Brand } from "@/types/brand";
import {
  getActiveCities,
  getNearbyCities,
  getPriceForCity,
  getRelatedServices,
  getService,
  getBrand,
  getLockType,
  getIndexableServices,
  getIndexableBrands,
} from "@/lib/content";
import { cityTemplateVars, interpolate, interpolateAll } from "@/lib/templating";
import { shouldIndexCityService } from "@/lib/seo/should-index";
import { getLocalizedServiceName, getLocalizedServiceIntro } from "@/lib/textRotation";
import { SERVICE_FAQ_VARIANTS } from "@/lib/serviceFaqVariants";
import type { BreadcrumbItem } from "@/components/design-system/Breadcrumbs";

export interface CityServicePageModel {
  city: City;
  service: Service;
  indexable: boolean;
  title: string;
  description: string;
  h1: string;
  displayName: string;
  badge: string;
  intro: string;
  price?: string;
  whenNeeded: string[];
  includes: string[];
  processSteps: string[];
  advantages: string[];
  faq: ServiceFaq[];
  relatedServices: Service[];
  nearbyCities: City[];
  customContent?: string;
}

/**
 * Picks this city's FAQ variant for a service via a stable per-city index (not a hash) — each
 * variant pool has exactly one entry per active city, so this is a guaranteed bijection with zero
 * collisions, rather than relying on a hash to merely spread cities across a small, reused pool.
 */
function getLocalizedServiceFaq(
  citySlug: string,
  service: { slug: string; faq: ServiceFaq[] },
  vars: Record<string, string | undefined>
): ServiceFaq[] {
  const pools = SERVICE_FAQ_VARIANTS[service.slug];
  if (!pools) {
    return service.faq.map((item) => ({
      q: interpolate(item.q, vars),
      a: interpolate(item.a, vars),
    }));
  }

  const sortedSlugs = getActiveCities()
    .map((c) => c.slug)
    .sort();
  const index = Math.max(0, sortedSlugs.indexOf(citySlug));

  return pools.map((pool) => {
    const variant = pool[index % pool.length];
    return { q: interpolate(variant.q, vars), a: interpolate(variant.a, vars) };
  });
}

export function buildCityServicePage(city: City, service: Service): CityServicePageModel {
  const vars = cityTemplateVars(city);
  const decision = shouldIndexCityService(city, service);
  const price = getPriceForCity(city, service);
  const displayName = getLocalizedServiceName(city.slug, service);

  const h1 = city.custom?.h1
    ? interpolate(city.custom.h1, vars)
    : `${displayName} в ${city.prepositionalName}`;

  const title =
    city.custom?.title ??
    `${displayName} в ${city.prepositionalName}${price ? ` — цена от ${price} ₽` : ""}`;

  const description =
    city.custom?.description ??
    interpolate(service.description, vars).slice(0, 155);

  const serviceIntro = city.custom?.serviceIntros?.[service.slug];
  const intro = serviceIntro ? interpolate(serviceIntro, vars) : getLocalizedServiceIntro(city.slug, service, vars);

  return {
    city,
    service,
    indexable: decision.indexable,
    displayName,
    title,
    description,
    h1,
    badge: `Работаем в ${city.prepositionalName}`,
    intro,
    price,
    whenNeeded: interpolateAll(service.whenNeeded, vars),
    includes: interpolateAll(service.includes, vars),
    processSteps: interpolateAll(service.processSteps, vars),
    advantages: interpolateAll(service.advantages, vars),
    faq: getLocalizedServiceFaq(city.slug, service, vars),
    relatedServices: getRelatedServices(service, city),
    nearbyCities: getNearbyCities(city),
    customContent: city.custom?.content ? interpolate(city.custom.content, vars) : undefined,
  };
}

/**
 * Shared model for the city-agnostic "info" pages (lock types, brands) — these
 * don't vary per city the way service pages do, so the hero always defaults to
 * Moscow + region rather than interpolating a specific {{city}}.
 */
export interface InfoPageModel {
  kind: "lock-type" | "brand";
  slug: string;
  name: string;
  indexable: boolean;
  title: string;
  description: string;
  h1: string;
  tagline?: string;
  intro: string;
  price?: string;
  breadcrumbItems: BreadcrumbItem[];
  leftLabel: string;
  leftItems: string[];
  rightLabel: string;
  rightItems: string[];
  processSteps: string[];
  advantages: string[];
  article: string[];
  faq: ServiceFaq[];
  relatedServices: Service[];
  relatedLabel: string;
  relatedSecondary: { slug: string; name: string; href: string }[];
  relatedSecondaryLabel: string;
  /** Brand pages only: links to every other brand, so visitors see we aren't limited to this one. */
  otherBrands?: { slug: string; name: string; href: string }[];
}

function resolveRelatedServices(slugs: string[] | undefined): Service[] {
  if (!slugs || slugs.length === 0) return [];
  const bySlug = new Map(getIndexableServices().map((s) => [s.slug, s]));
  return slugs.map((slug) => bySlug.get(slug)).filter((s): s is Service => Boolean(s));
}

export function buildLockTypePage(lockType: LockType): InfoPageModel {
  const price = lockType.priceFrom ?? getService("vskrytie-zamkov")?.priceFrom;
  const brands = (lockType.relatedBrandSlugs ?? [])
    .map((slug) => getBrand(slug))
    .filter((b): b is Brand => b != null && b.isIndexable)
    .map((b) => ({ slug: b.slug, name: b.name, href: `/brendy/${b.slug}/` }));

  return {
    kind: "lock-type",
    slug: lockType.slug,
    name: lockType.name,
    indexable: lockType.isIndexable,
    title: `${lockType.h1 ?? `Вскрытие ${lockType.name.toLowerCase()}`} в Москве и области`,
    description: lockType.description.slice(0, 155),
    h1: lockType.h1 ?? `Вскрытие ${lockType.name.toLowerCase()}`,
    tagline: lockType.tagline,
    intro: lockType.description,
    price,
    breadcrumbItems: [
      { name: "Виды замков", path: "/zamki/" },
      { name: lockType.name, path: `/zamki/${lockType.slug}/` },
    ],
    leftLabel: "Особенности",
    leftItems: lockType.characteristics ?? [],
    rightLabel: "Где встречается",
    rightItems: lockType.whereUsed ?? [],
    processSteps: lockType.processSteps ?? [],
    advantages: lockType.advantages ?? [],
    article: lockType.article ?? [],
    faq: lockType.faq ?? [],
    relatedServices: resolveRelatedServices(lockType.relatedServiceSlugs),
    relatedLabel: "Связанные услуги",
    relatedSecondary: brands,
    relatedSecondaryLabel: "Бренды с таким механизмом",
  };
}

export function buildBrandPage(brand: Brand): InfoPageModel {
  const price = brand.priceFrom ?? getService("vskrytie-zamkov")?.priceFrom;
  const lockTypes = (brand.lockTypeSlugs ?? [])
    .map((slug) => getLockType(slug))
    .filter((lt): lt is LockType => lt != null && lt.isIndexable)
    .map((lt) => ({ slug: lt.slug, name: lt.name, href: `/zamki/${lt.slug}/` }));

  return {
    kind: "brand",
    slug: brand.slug,
    name: brand.name,
    indexable: brand.isIndexable,
    title: `${brand.h1 ?? `Вскрытие замков ${brand.name}`} в Москве и области`,
    description: brand.description.slice(0, 155),
    h1: brand.h1 ?? `Вскрытие замков ${brand.name}`,
    tagline: brand.tagline,
    intro: brand.description,
    price,
    breadcrumbItems: [
      { name: "Бренды замков", path: "/brendy/" },
      { name: brand.name, path: `/brendy/${brand.slug}/` },
    ],
    leftLabel: "Когда обращаются",
    leftItems: brand.whenNeeded ?? [],
    rightLabel: "Страна производства",
    rightItems: brand.country ? [brand.country] : [],
    processSteps: brand.processSteps ?? [],
    advantages: brand.advantages ?? [],
    article: brand.article ?? [],
    faq: brand.faq ?? [],
    relatedServices: resolveRelatedServices(brand.relatedServiceSlugs),
    relatedLabel: "Связанные услуги",
    relatedSecondary: lockTypes,
    relatedSecondaryLabel: "Типы замков бренда",
    otherBrands: getIndexableBrands()
      .filter((b) => b.slug !== brand.slug)
      .map((b) => ({ slug: b.slug, name: b.name, href: `/brendy/${b.slug}/` })),
  };
}
