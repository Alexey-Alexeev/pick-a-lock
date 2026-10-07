import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  publishedAt: z.string(),
  relatedServiceSlugs: z.array(z.string()),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
