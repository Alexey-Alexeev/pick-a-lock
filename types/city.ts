import { z } from "zod";

export const cityCustomSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  h1: z.string().optional(),
  /** Per-service hero intro overrides, keyed by service slug — takes precedence over the rotation fallback for that one service's page. */
  serviceIntros: z.record(z.string(), z.string()).optional(),
  content: z.string().optional(),
  /** Unique paragraph shown on the city's own landing page (not the per-service pages). */
  homeIntro: z.string().optional(),
  /** Unique paragraph shown under "Типы замков" on every city+service page — doesn't name the city. */
  lockTypesIntro: z.string().optional(),
  /** Unique paragraph shown under "Бренды" on every city+service page — doesn't name the city. */
  brandsIntro: z.string().optional(),
});

export const citySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  genitiveName: z.string(),
  dativeName: z.string(),
  prepositionalName: z.string(),
  accusativeName: z.string(),
  region: z.enum(["moscow", "moscow-oblast"]),
  isActive: z.boolean(),
  isIndexable: z.boolean(),
  priority: z.number(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  districts: z.array(z.string()).optional(),
  nearbyCitySlugs: z.array(z.string()),
  availableServiceSlugs: z.array(z.string()).optional(),
  priceModifiers: z.record(z.string(), z.string()).optional(),
  responseTimeMinutes: z.number().optional(),
  custom: cityCustomSchema.optional(),
});

export type City = z.infer<typeof citySchema>;
