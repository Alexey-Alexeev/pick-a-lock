import Link from "next/link";
import { ArrowUpRightIcon } from "./icons";
import { cn } from "@/lib/utils";

export interface InfoHubItem {
  slug: string;
  name: string;
  summary?: string;
  price?: string;
  href: string;
}

export function InfoHubList({ items }: { items: InfoHubItem[] }) {
  return (
    <div className="border-t border-border">
      {items.map((item, i) => (
        <Link
          key={item.slug}
          href={item.href}
          className={cn(
            "group flex items-center border-b border-border py-5 sm:py-6",
            "hover:bg-accent/[0.06]"
          )}
        >
          <span className="flex flex-1 items-center gap-5 transition-transform duration-300 group-hover:translate-x-4 sm:gap-8">
            <span className="w-8 shrink-0 font-display text-2xl font-light text-foreground/15 transition-colors duration-300 group-hover:text-accent sm:w-10 sm:text-3xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">
              <span className="block font-display text-lg font-light tracking-[-0.01em] text-foreground sm:text-xl">
                {item.name}
              </span>
              {item.summary && <span className="mt-0.5 hidden text-sm text-muted sm:block">{item.summary}</span>}
              <span className="mt-2 block h-px w-0 bg-accent transition-all duration-300 group-hover:w-10" />
            </span>
            {item.price && (
              <span className="shrink-0 font-mono text-sm text-accent">от {item.price} ₽</span>
            )}
            <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100 sm:h-5 sm:w-5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
