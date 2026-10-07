import Link from "next/link";
import type { Service } from "@/types/service";
import type { City } from "@/types/city";
import { getPriceForCity } from "@/lib/content";
import { ArrowUpRightIcon } from "./icons";
import { cn } from "@/lib/utils";

export function PriceTable({ services, city }: { services: Service[]; city?: City }) {
  const priced = services.filter((s) => (city ? getPriceForCity(city, s) : s.priceFrom));
  if (priced.length === 0) return null;

  return (
    <div className="border-t border-border">
      {priced.map((service) => {
        const price = city ? getPriceForCity(city, service) : service.priceFrom;
        const rowClassName = "flex items-baseline justify-between gap-4 border-b border-border py-4";

        if (!city) {
          return (
            <div key={service.slug} className={rowClassName}>
              <span className="text-[17px] font-semibold text-foreground">{service.name}</span>
              <span className="shrink-0 font-mono text-base text-accent">от {price} ₽</span>
            </div>
          );
        }

        return (
          <Link
            key={service.slug}
            href={`/${city.slug}/${service.slug}/`}
            className={cn("group", rowClassName, "hover:bg-accent/[0.06]")}
          >
            <span className="flex items-center gap-2 text-[17px] font-semibold text-foreground transition-transform duration-300 group-hover:translate-x-2">
              {service.name}
              <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100" />
            </span>
            <span className="shrink-0 font-mono text-base text-accent">от {price} ₽</span>
          </Link>
        );
      })}
    </div>
  );
}
