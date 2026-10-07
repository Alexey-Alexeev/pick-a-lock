import Link from "next/link";
import type { BlogPost } from "@/types/blogPost";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}/`} className="group flex flex-col gap-3 border-t border-border py-6">
      <TechnicalLabel>{date}</TechnicalLabel>
      <h2 className="text-lg font-semibold tracking-[-0.01em] text-foreground group-hover:text-accent-ink">
        {post.title}
      </h2>
      <p className="text-sm leading-relaxed text-muted line-clamp-2">{post.excerpt}</p>
    </Link>
  );
}
