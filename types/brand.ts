import { z } from "zod";
import { serviceFaqSchema } from "./service";

export const brandSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  isIndexable: z.boolean(),
  country: z.string().optional(),
  priceFrom: z.string().optional(),
  h1: z.string().optional(),
  tagline: z.string().optional(),
  lockTypeSlugs: z.array(z.string()).optional(),
  whenNeeded: z.array(z.string()).optional(),
  advantages: z.array(z.string()).optional(),
  processSteps: z.array(z.string()).optional(),
  article: z.array(z.string()).optional(),
  faq: z.array(serviceFaqSchema).optional(),
  relatedServiceSlugs: z.array(z.string()).optional(),
});

export type Brand = z.infer<typeof brandSchema>;
