import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { BlogCard } from "@/components/blog/BlogCard";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Блог о замках и дверях",
    description: "Статьи о том, что делать при поломке ключа, заклинившем замке и выборе нового замка для двери.",
    pathname: "/blog/",
    indexable: true,
  });
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-10 sm:py-16">
      <Breadcrumbs items={[{ name: "Блог", path: "/blog/" }]} />
      <TechnicalLabel className="mt-6 block">Блог</TechnicalLabel>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-foreground">
        Статьи о замках и дверях
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Разбираем частые ситуации с замками и дверями и рассказываем, как их решать.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
