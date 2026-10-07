import "server-only";
import fs from "node:fs";
import path from "node:path";
import { citySchema, type City } from "@/types/city";
import { serviceSchema, type Service } from "@/types/service";
import { lockTypeSchema, type LockType } from "@/types/lockType";
import { brandSchema, type Brand } from "@/types/brand";
import { blogPostSchema, type BlogPost } from "@/types/blogPost";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJsonDir(dirName: string): unknown[] {
  const dir = path.join(CONTENT_DIR, dirName);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")));
}

function loadCities(): City[] {
  const raw = readJsonDir("cities");
  return raw.map((item, i) => {
    const parsed = citySchema.safeParse(item);
    if (!parsed.success) {
      throw new Error(`Invalid city data at index ${i}: ${parsed.error.message}`);
    }
    return parsed.data;
  });
}

function loadServices(): Service[] {
  const raw = readJsonDir("services");
  const parsed = raw.map((item, i) => {
    const result = serviceSchema.safeParse(item);
    if (!result.success) {
      throw new Error(`Invalid service data at index ${i}: ${result.error.message}`);
    }
    return result.data;
  });
  return parsed.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

function loadLockTypes(): LockType[] {
  const raw = readJsonDir("lock-types");
  return raw.map((item, i) => {
    const parsed = lockTypeSchema.safeParse(item);
    if (!parsed.success) {
      throw new Error(`Invalid lock type data at index ${i}: ${parsed.error.message}`);
    }
    return parsed.data;
  });
}

function loadBrands(): Brand[] {
  const raw = readJsonDir("brands");
  return raw.map((item, i) => {
    const parsed = brandSchema.safeParse(item);
    if (!parsed.success) {
      throw new Error(`Invalid brand data at index ${i}: ${parsed.error.message}`);
    }
    return parsed.data;
  });
}

function loadBlogPosts(): BlogPost[] {
  const raw = readJsonDir("blog");
  return raw
    .map((item, i) => {
      const parsed = blogPostSchema.safeParse(item);
      if (!parsed.success) {
        throw new Error(`Invalid blog post data at index ${i}: ${parsed.error.message}`);
      }
      return parsed.data;
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

// Caching is skipped in dev so editing a content JSON file shows up on the next page refresh
// instead of requiring a `npm run dev` restart — fs.readFileSync isn't part of webpack's module
// graph, so its hot-reload can't invalidate these caches the way it does for imported code.
const isDev = process.env.NODE_ENV !== "production";

let citiesCache: City[] | null = null;
let servicesCache: Service[] | null = null;
let lockTypesCache: LockType[] | null = null;
let brandsCache: Brand[] | null = null;
let blogPostsCache: BlogPost[] | null = null;

export function getAllCities(): City[] {
  if (isDev) return loadCities();
  if (!citiesCache) citiesCache = loadCities();
  return citiesCache;
}

export function getActiveCities(): City[] {
  return getAllCities().filter((c) => c.isActive);
}

export function getCity(slug: string): City | undefined {
  return getAllCities().find((c) => c.slug === slug);
}

export function getAllServices(): Service[] {
  if (isDev) return loadServices();
  if (!servicesCache) servicesCache = loadServices();
  return servicesCache;
}

export function getIndexableServices(): Service[] {
  return getAllServices().filter((s) => s.isIndexable);
}

export function getService(slug: string): Service | undefined {
  return getAllServices().find((s) => s.slug === slug);
}

export function getAllLockTypes(): LockType[] {
  if (isDev) return loadLockTypes();
  if (!lockTypesCache) lockTypesCache = loadLockTypes();
  return lockTypesCache;
}

export function getLockType(slug: string): LockType | undefined {
  return getAllLockTypes().find((lt) => lt.slug === slug);
}

export function getIndexableLockTypes(): LockType[] {
  return getAllLockTypes().filter((lt) => lt.isIndexable);
}

export function getAllBrands(): Brand[] {
  if (isDev) return loadBrands();
  if (!brandsCache) brandsCache = loadBrands();
  return brandsCache;
}

export function getIndexableBrands(): Brand[] {
  return getAllBrands().filter((b) => b.isIndexable);
}

export function getBrand(slug: string): Brand | undefined {
  return getAllBrands().find((b) => b.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  if (isDev) return loadBlogPosts();
  if (!blogPostsCache) blogPostsCache = loadBlogPosts();
  return blogPostsCache;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

export function getServicesForCity(city: City): Service[] {
  const indexable = getIndexableServices();
  if (!city.availableServiceSlugs || city.availableServiceSlugs.length === 0) {
    return indexable;
  }
  const allowed = new Set(city.availableServiceSlugs);
  return indexable.filter((s) => allowed.has(s.slug));
}

export function getNearbyCities(city: City, limit = 5): City[] {
  const bySlug = new Map(getActiveCities().map((c) => [c.slug, c]));
  return city.nearbyCitySlugs
    .map((slug) => bySlug.get(slug))
    .filter((c): c is City => Boolean(c) && c!.isIndexable)
    .slice(0, limit);
}

export function getRelatedServices(service: Service, city: City, limit = 6): Service[] {
  const available = new Set(getServicesForCity(city).map((s) => s.slug));
  const byScope = new Map(getIndexableServices().map((s) => [s.slug, s]));
  return service.relatedServiceSlugs
    .filter((slug) => available.has(slug))
    .map((slug) => byScope.get(slug))
    .filter((s): s is Service => Boolean(s))
    .slice(0, limit);
}

export function getPriceForCity(city: City, service: Service): string | undefined {
  return city.priceModifiers?.[service.slug] ?? service.priceFrom;
}
