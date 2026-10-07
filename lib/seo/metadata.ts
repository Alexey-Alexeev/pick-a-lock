import type { Metadata } from "next";
import { canonicalUrl, SITE_NAME, SITE_URL } from "./site";

// Next's file-convention opengraph-image.tsx only auto-applies to pages in its own route segment,
// not to nested dynamic routes like /[city]/[service] — so every page needs an explicit fallback.
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

interface BuildMetadataArgs {
  title: string;
  description: string;
  pathname: string;
  indexable: boolean;
  ogImage?: string;
}

export function buildMetadata({
  title,
  description,
  pathname,
  indexable,
  ogImage,
}: BuildMetadataArgs): Metadata {
  const url = canonicalUrl(pathname);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      images: [{ url: ogImage ?? DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
