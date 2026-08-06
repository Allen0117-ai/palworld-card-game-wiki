import type { Metadata } from "next";

export const SITE_NAME = "Palworld Card Game Wiki";
export const SITE_URL = "https://palworldcardgame.wiki";
export const SITE_TITLE_SUFFIX = "Palworld Wiki";
export const EDITORIAL_TEAM_NAME = "Palpagos Archive Editorial Team";
export const EDITORIAL_TEAM_URL = `${SITE_URL}/about#editorial-team`;

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
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_TITLE_SUFFIX}`;
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

export function createEditorialAuthorJsonLd() {
  return {
    "@type": "Organization",
    name: EDITORIAL_TEAM_NAME,
    url: EDITORIAL_TEAM_URL,
  };
}

export function createPublisherJsonLd() {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Palpagos Archive",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
      width: 256,
      height: 256,
    },
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    ...createPublisherJsonLd(),
    description:
      "An independent, non-commercial Palworld Card Game database, rules guide and deck-building resource.",
    email: "mailto:paweyan163@gmail.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Corrections and takedown requests",
      email: "paweyan163@gmail.com",
      availableLanguage: ["English", "Japanese"],
    },
    publishingPrinciples: `${SITE_URL}/about#editorial-policy`,
    knowsAbout: [
      "Palworld Official Card Game rules",
      "Palworld Official Card Game cards",
      "Palworld Official Card Game deck building",
      "Palworld Official Card Game products",
    ],
  };
}

export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Palpagos Archive",
    url: SITE_URL,
    inLanguage: ["en", "ja"],
    publisher: createPublisherJsonLd(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
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
