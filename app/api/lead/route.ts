import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/types/lead";
import { getCity, getService } from "@/lib/content";
import { formatLeadMessage, sendTelegramMessage } from "@/lib/telegram";
import { isRateLimited } from "@/lib/rateLimit";

const MIN_FILL_TIME_MS = 1200;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Слишком много заявок, попробуйте позже" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Проверьте данные формы" },
      { status: 400 }
    );
  }
  const lead = parsed.data;

  // honeypot: real users never fill the "website" field
  if (lead.website) {
    return NextResponse.json({ ok: true });
  }

  // reject submissions faster than a human could plausibly fill the form
  if (lead.renderedAt && Date.now() - lead.renderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  const city = getCity(lead.citySlug);
  const service = getService(lead.serviceSlug) ?? getService("vskrytie-zamkov");
  if (!city || !service) {
    return NextResponse.json({ ok: false, error: "Город или услуга не найдены" }, { status: 400 });
  }

  try {
    const message = formatLeadMessage(lead, city, service);
    await sendTelegramMessage(message);
  } catch (error) {
    console.error("Failed to send lead to Telegram", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку, попробуйте позвонить" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
