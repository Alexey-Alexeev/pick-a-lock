import type { Metadata } from "next";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { LinkButton } from "@/components/design-system/LinkButton";
import { PhoneLink } from "@/components/design-system/PhoneLink";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-6 py-28 sm:px-10">
      <TechnicalLabel>404</TechnicalLabel>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-foreground">
        Страница не найдена
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Такой страницы не существует или она была перемещена. Посмотрите услуги и города
        обслуживания, либо позвоните нам — мы поможем прямо по телефону.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <LinkButton href="/" variant="primary">
          На главную
        </LinkButton>
        <PhoneLink className="text-foreground" />
      </div>
    </div>
  );
}
