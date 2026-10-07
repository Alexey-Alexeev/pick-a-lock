import type { MetadataRoute } from "next";
import {
  getActiveCities,
  getAllBlogPosts,
  getServicesForCity,
  getIndexableLockTypes,
  getIndexableBrands,
} from "@/lib/content";
import { shouldIndexCity, shouldIndexCityService } from "@/lib/seo/should-index";
import { SITE_URL } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Content here is generated from static JSON at build time, so "last modified" for anything
  // without its own tracked date is honestly just "as of this build" — the build timestamp.
  const buildDate = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: buildDate, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/zamki/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/brendy/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/ceny/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/cities/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog/`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/contacts/`, lastModified: buildDate, changeFrequency: "yearly", priority: 0.3 },
  ];

  for (const lockType of getIndexableLockTypes()) {
    entries.push({
      url: `${SITE_URL}/zamki/${lockType.slug}/`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  for (const brand of getIndexableBrands()) {
    entries.push({
      url: `${SITE_URL}/brendy/${brand.slug}/`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  const cities = getActiveCities();

  for (const city of cities) {
    if (shouldIndexCity(city).indexable) {
      entries.push({
        url: `${SITE_URL}/${city.slug}/`,
        lastModified: buildDate,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    const cityServices = getServicesForCity(city);
    for (const service of cityServices) {
      if (shouldIndexCityService(city, service).indexable) {
        entries.push({
          url: `${SITE_URL}/${city.slug}/${service.slug}/`,
          lastModified: buildDate,
          changeFrequency: "weekly",
          priority: 0.9,
        });
      }
    }
  }

  for (const post of getAllBlogPosts()) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.4,
    });
  }

  return entries;
}
