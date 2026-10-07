import { z } from "zod";
import { serviceFaqSchema } from "./service";

export const lockTypeSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  isIndexable: z.boolean(),
  priceFrom: z.string().optional(),
  h1: z.string().optional(),
  tagline: z.string().optional(),
  characteristics: z.array(z.string()).optional(),
  whereUsed: z.array(z.string()).optional(),
  processSteps: z.array(z.string()).optional(),
  advantages: z.array(z.string()).optional(),
  article: z.array(z.string()).optional(),
  faq: z.array(serviceFaqSchema).optional(),
  relatedServiceSlugs: z.array(z.string()).optional(),
  relatedBrandSlugs: z.array(z.string()).optional(),
});

export type LockType = z.infer<typeof lockTypeSchema>;
