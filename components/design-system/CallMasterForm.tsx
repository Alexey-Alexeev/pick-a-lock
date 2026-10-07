"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Field } from "./TextField";
import { Select } from "./Select";
import { PhoneInput } from "./PhoneInput";
import { Checkbox } from "./Checkbox";
import { trackEvent, getStoredUtm } from "@/lib/analytics";

export interface CallMasterFormOption {
  slug: string;
  name: string;
}

interface CallMasterFormProps {
  cities: CallMasterFormOption[];
  services: CallMasterFormOption[];
  defaultCitySlug: string;
  defaultServiceSlug?: string;
  compact?: boolean;
}

type Status = "idle" | "submitting" | "success" | "error";

export function CallMasterForm({
  cities,
  services,
  defaultCitySlug,
  defaultServiceSlug,
  compact = false,
}: CallMasterFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const renderedAt = useRef<number | null>(null);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(formEl);
    const utm = getStoredUtm();

    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      citySlug: String(form.get("citySlug") ?? defaultCitySlug),
      serviceSlug: String(form.get("serviceSlug") ?? defaultServiceSlug ?? ""),
      comment: String(form.get("comment") ?? ""),
      page: typeof window !== "undefined" ? window.location.pathname : "",
      website: String(form.get("website") ?? ""),
      renderedAt: renderedAt.current ?? Date.now(),
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      utmContent: utm.utmContent,
      utmTerm: utm.utmTerm,
    };

    try {
      const res = await fetch("/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Не удалось отправить заявку");
      }
      setStatus("success");
      trackEvent("telegram_submit");
      trackEvent("form_submit");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Не удалось отправить заявку");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-accent/30 bg-accent/5 p-5 text-sm text-accent-ink">
        Заявка отправлена. Мы свяжемся с вами в ближайшее время.
      </div>
    );
  }

  const cityOptions = cities.map((c) => ({ id: c.slug, label: c.name }));
  const serviceOptions = services.map((s) => ({ id: s.slug, label: s.name }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" onFocus={() => trackEvent("form_open")}>
      {!compact && <Field label="Имя" name="name" placeholder="Необязательно" autoComplete="name" />}
      <PhoneInput autoComplete="tel" />
      {!compact && (
        <>
          <Select
            key={defaultCitySlug}
            label="Город"
            name="citySlug"
            defaultSelectedKey={defaultCitySlug}
            options={cityOptions}
          />
          <Select
            label="Услуга"
            name="serviceSlug"
            defaultSelectedKey={defaultServiceSlug}
            options={serviceOptions}
            placeholder="Не выбрана"
          />
          <Field label="Комментарий" name="comment" placeholder="Опишите проблему (необязательно)" multiline />
        </>
      )}
      {compact && (
        <>
          <input type="hidden" name="citySlug" value={defaultCitySlug} />
          <input type="hidden" name="serviceSlug" value={defaultServiceSlug ?? ""} />
        </>
      )}
      {/* honeypot field, hidden from real users via CSS, not display:none so basic bots still fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      {/* The policy link is a sibling, not a child, of the Checkbox's own <label> — nesting it
          inside previously meant a click anywhere in the checkbox row could trigger navigation
          instead of just toggling. Now only the link text itself navigates. */}
      <div className="flex flex-col gap-1.5">
        <Checkbox name="consent" value="yes" isRequired>
          Я даю согласие на обработку персональных данных
        </Checkbox>
        <Link
          href="/privacy/"
          target="_blank"
          className="ml-7 text-[12px] text-muted underline underline-offset-2 transition-colors hover:text-accent-ink"
        >
          Политика обработки персональных данных
        </Link>
      </div>
      <Button type="submit" variant="accent" size="lg" isDisabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Отправляем…" : "Вызвать мастера"}
      </Button>
      {status === "error" && <p className="text-sm text-red-700">{errorMessage}</p>}
    </form>
  );
}
