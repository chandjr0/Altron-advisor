/** Site-wide SEO helpers for Altrion Advisory. */

export const SITE_NAME = "Altrion Advisory";
export const SITE_URL =
  (typeof import.meta !== "undefined" &&
    (import.meta as ImportMeta & { env?: { VITE_SITE_URL?: string } }).env?.VITE_SITE_URL) ||
  "https://www.altrionadvisory.com";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const DEFAULT_KEYWORDS = [
  "Altrion Advisory",
  "FM strategy",
  "facilities management advisory",
  "commercial advisory",
  "private equity FM",
  "corporate occupiers",
  "FM providers",
  "London FM consultant",
  "independent FM advice",
  "Derrick Tate",
].join(", ");

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path: string) {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, "")}${normalised === "/" ? "" : normalised}`;
}

/** Build TanStack Router `head()` meta + link entries for a page. */
export function pageSeo({
  title,
  description,
  path,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
}: PageSeoInput) {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "author", content: SITE_NAME },
      {
        name: "robots",
        content: noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
      },
      { name: "googlebot", content: noIndex ? "noindex, nofollow" : "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_GB" },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: `${SITE_NAME} — Independent FM Strategy & Commercial Advisory` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: `${SITE_NAME} mark` },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
