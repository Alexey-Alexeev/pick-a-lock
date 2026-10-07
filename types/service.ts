import { z } from "zod";

export const serviceFaqSchema = z.object({
  q: z.string(),
  a: z.string(),
});

export const serviceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  verbPhrase: z.string(),
  isIndexable: z.boolean(),
  priceFrom: z.string().optional(),
  order: z.number().optional(),
  category: z.enum(["vskrytie", "zamena", "ustanovka", "remont", "izvlechenie", "perekodirovka"]),
  objectTypes: z.array(z.string()),
  description: z.string(),
  whenNeeded: z.array(z.string()),
  includes: z.array(z.string()),
  processSteps: z.array(z.string()),
  advantages: z.array(z.string()),
  faq: z.array(serviceFaqSchema),
  relatedServiceSlugs: z.array(z.string()),
  relatedLockTypeSlugs: z.array(z.string()).optional(),
});

export type Service = z.infer<typeof serviceSchema>;
export type ServiceFaq = z.infer<typeof serviceFaqSchema>;
