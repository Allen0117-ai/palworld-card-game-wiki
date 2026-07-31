import type { Metadata } from "next";

export const SITE_NAME = "Palworld Card Game Wiki";
export const SITE_URL = "https://palworldcardgame.wiki";

const DEFAULT_SOCIAL_IMAGE = {
  url: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: "Palworld Card Game Wiki — cards, decks and deck builder",
};

export const JAPANESE_SOCIAL_IMAGE = {
  url: `${SITE_URL}/og-ja.png`,
  width: 1200,
  height: 630,
  alt: "パルワールドカードゲーム攻略 — カードリスト・デッキ・ルール",
};

type SocialImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  image?: SocialImage;
  locale?: "en" | "ja";
};

export function absoluteSiteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function getLocalizedAlternates(path: string) {
  const englishPath = path === "/ja" ? "/" : path.startsWith("/ja/") ? path.slice(3) : path;
  const isLocalizedPage = ["/", "/cards", "/decks", "/rules"].includes(englishPath)
    || englishPath.startsWith("/card/")
    || englishPath.startsWith("/deck/");

  if (!isLocalizedPage) return undefined;

  const japanesePath = englishPath === "/" ? "/ja" : `/ja${englishPath}`;
  return {
    en: absoluteSiteUrl(englishPath),
    ja: absoluteSiteUrl(japanesePath),
    "x-default": absoluteSiteUrl(englishPath),
  };
}

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  image = DEFAULT_SOCIAL_IMAGE,
  locale = "en",
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteSiteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const languages = getLocalizedAlternates(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: canonicalUrl, ...(languages ? { languages } : {}) },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type,
      locale: locale === "ja" ? "ja_JP" : "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

export function createBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteSiteUrl(item.path),
    })),
  };
}
