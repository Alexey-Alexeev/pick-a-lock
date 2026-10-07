import type { Metadata } from "next";
import { canonicalUrl, SITE_NAME, SITE_URL } from "./site";

/** Both engines cut the snippet around here; past it the extra words are written for nobody. */
const META_DESCRIPTION_MAX = 160;

/**
 * Last-resort clamp for descriptions assembled from body copy. Slicing to a fixed length cuts
 * mid-word ("Мастер выезжает в Москву по предва"), which looks like a half-finished page in the
 * SERP, so fall back to the last sentence or clause boundary instead. Pages that matter should
 * carry a purpose-written `metaDescription` and never reach this.
 */
export function clampMeta(text: string, max = META_DESCRIPTION_MAX): string {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const boundary = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  // Only honour a boundary that leaves a usable sentence; otherwise trim back to a whole word.
  if (boundary > max * 0.55) return cut.slice(0, boundary + 1);

  const clause = Math.max(cut.lastIndexOf(" — "), cut.lastIndexOf(", "), cut.lastIndexOf("; "));
  if (clause > max * 0.6) return cut.slice(0, clause) + "…";

  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

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
