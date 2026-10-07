import { z } from "zod";

const RU_PHONE_REGEX = /^(\+7|7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export const leadSchema = z.object({
  name: z.string().trim().max(100).optional().default(""),
  phone: z
    .string()
    .trim()
    .min(10, "Введите корректный номер телефона")
    .regex(RU_PHONE_REGEX, "Введите корректный номер телефона"),
  citySlug: z.string().trim().min(1),
  serviceSlug: z.string().trim().min(1),
  comment: z.string().trim().max(500).optional().default(""),
  page: z.string().trim().max(300).optional().default(""),
  utmSource: z.string().trim().max(100).optional(),
  utmMedium: z.string().trim().max(100).optional(),
  utmCampaign: z.string().trim().max(100).optional(),
  utmContent: z.string().trim().max(100).optional(),
  utmTerm: z.string().trim().max(100).optional(),
  // honeypot: real users never fill this; bots that auto-fill every field do.
  // Deliberately permissive here — rejection happens silently in the route handler
  // so a filled-in value doesn't leak "you were caught" back to the bot.
  website: z.string().max(200).optional().default(""),
  // ms since the form rendered; rejects instant (bot) submissions
  renderedAt: z.number().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
