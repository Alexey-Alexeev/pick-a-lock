import "server-only";
import type { LeadInput } from "@/types/lead";
import type { City } from "@/types/city";
import type { Service } from "@/types/service";

function formatUtmBlock(lead: LeadInput): string {
  const utmPairs: [string, string | undefined][] = [
    ["utm_source", lead.utmSource],
    ["utm_medium", lead.utmMedium],
    ["utm_campaign", lead.utmCampaign],
    ["utm_content", lead.utmContent],
    ["utm_term", lead.utmTerm],
  ];
  const present = utmPairs.filter(([, v]) => Boolean(v));
  if (present.length === 0) return "";
  return "\n" + present.map(([k, v]) => `${k}: ${v}`).join("\n");
}

export function formatLeadMessage(lead: LeadInput, city: City, service: Service): string {
  const lines = [
    "🔔 НОВАЯ ЗАЯВКА",
    `📍 Город: ${city.name}`,
    `🔧 Услуга: ${service.name}`,
    `👤 Имя: ${lead.name || "не указано"}`,
    `📞 Телефон: ${lead.phone}`,
  ];
  if (lead.comment) lines.push(`📝 Проблема: ${lead.comment}`);
  if (lead.page) lines.push(`🌐 Страница: ${lead.page}`);
  lines.push(`Источник: ${lead.utmSource ?? "direct"}`);
  const utmBlock = formatUtmBlock(lead);
  return lines.join("\n") + utmBlock;
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram is not configured: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram API error ${res.status}: ${body}`);
  }
}
