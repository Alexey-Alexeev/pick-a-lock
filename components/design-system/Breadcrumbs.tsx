import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema } from "@/components/seo/schema";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function Breadcrumbs({ items, inverse = false }: { items: BreadcrumbItem[]; inverse?: boolean }) {
  const full: BreadcrumbItem[] = [{ name: "Главная", path: "/" }, ...items];

  return (
    <nav aria-label="Хлебные крошки" className="font-mono text-[12px] uppercase tracking-[0.12em]">
      <JsonLd data={breadcrumbListSchema(full)} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {full.map((item, i) => {
          const isLast = i === full.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {i > 0 && <span className={inverse ? "text-ink-foreground-muted" : "text-muted"}>/</span>}
              {isLast ? (
                <span className={inverse ? "text-ink-foreground" : "text-foreground"}>{item.name}</span>
              ) : (
                <Link
                  href={item.path}
                  className={
                    inverse
                      ? "text-ink-foreground-muted hover:text-ink-foreground"
                      : "text-muted hover:text-foreground"
                  }
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
