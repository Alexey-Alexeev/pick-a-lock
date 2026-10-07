import { SITE_URL, SITE_NAME, SITE_PHONE_DISPLAY } from "@/lib/seo/site";
import type { City } from "@/types/city";
import type { Service, ServiceFaq } from "@/types/service";

/** Sitewide identity schema — rendered once in the root layout, not per-page. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    telephone: SITE_PHONE_DISPLAY,
    sameAs: [] as string[],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
  };
}

export function localBusinessSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE_NAME} — ${city.name}`,
    url: `${SITE_URL}/${city.slug}/`,
    telephone: SITE_PHONE_DISPLAY,
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.region === "moscow" ? "Москва" : "Московская область",
      addressCountry: "RU",
    },
    ...(city.latitude && city.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: city.latitude, longitude: city.longitude } }
      : {}),
  };
}

export function serviceSchema(service: Service, city: City, price?: string, displayName?: string) {
  const name = displayName ?? service.name;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name: `${name} в ${city.prepositionalName}`,
    areaServed: { "@type": "City", name: city.name },
    provider: { "@type": "LocalBusiness", name: SITE_NAME },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "RUB",
            price,
          },
        }
      : {}),
  };
}

export function breadcrumbListSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqPageSchema(faq: ServiceFaq[]) {
  if (faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
