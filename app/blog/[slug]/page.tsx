import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogPosts, getAllServices, getBlogPost, getCity } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { BlogContent } from "@/components/blog/BlogContent";
import Link from "next/link";

interface PageParams {
  slug: string;
}

export function generateStaticParams(): PageParams[] {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    pathname: `/blog/${post.slug}/`,
    indexable: true,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const moscow = getCity("moscow");
  const allServices = getAllServices();
  const relatedServices = post.relatedServiceSlugs
    .map((s) => allServices.find((svc) => svc.slug === s))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-2xl px-6 py-14 sm:px-10 sm:py-16">
      <Breadcrumbs items={[{ name: "Блог", path: "/blog/" }, { name: post.title, path: `/blog/${post.slug}/` }]} />
      <h1 className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-8">
        <BlogContent content={post.content} />
      </div>

      {relatedServices.length > 0 && moscow && (
        <div className="mt-14 border-t border-border pt-8">
          <TechnicalLabel>Похожие услуги</TechnicalLabel>
          <div className="mt-4 flex flex-col gap-2.5">
            {relatedServices.map((service) => (
              <Link
                key={service!.slug}
                href={`/${moscow.slug}/${service!.slug}/`}
                className="text-sm text-foreground underline decoration-border underline-offset-4 hover:text-accent-ink hover:decoration-accent-ink"
              >
                {service!.shortName}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
