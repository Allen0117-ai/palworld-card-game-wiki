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

const localizedPathPairs: Array<[string, string]> = [
  ["/", "/ja"],
  ["/cards", "/ja/cards"],
  ["/decks", "/ja/decks"],
  ["/rules", "/ja/rules"],
  ["/tools/deck-builder", "/ja/tools/deck-builder"],
  ["/search", "/ja/search"],
  ["/blog", "/ja/guides"],
  ["/blog/how-to-play-palworld-card-game", "/ja/guide/how-to-play"],
  ["/blog/palworld-card-game-deck-building-rules", "/ja/guide/deck-building-rules"],
  ["/blog/red-blue-vs-green-purple-trial-deck", "/ja/guide/trial-deck-comparison"],
  ["/blog/palworld-booster-box", "/ja/guide/bp01-booster-box"],
  ["/blog/dawn-of-palpagos-card-list-guide", "/ja/guide/card-list-guide"],
  ["/blog/palworld-card-game-keyword-glossary", "/ja/guide/keyword-glossary"],
];

function getLocalizedAlternates(path: string) {
  let pair = localizedPathPairs.find(([englishPath, japanesePath]) => path === englishPath || path === japanesePath);
  if (!pair && (path.startsWith("/card/") || path.startsWith("/deck/"))) {
    pair = [path, `/ja${path}`];
  }
  if (!pair && (path.startsWith("/ja/card/") || path.startsWith("/ja/deck/"))) {
    pair = [path.slice(3), path];
  }
  if (!pair) return undefined;

  const [englishPath, japanesePath] = pair;
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
