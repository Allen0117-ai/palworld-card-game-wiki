import type { MetadataRoute } from "next";
import { cards, decks, guides } from "@/lib/data";
import { japaneseGuides } from "@/lib/japanese-guides";

const baseUrl = "https://palworldcardgame.wiki";

function contentDate(value: string) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00Z`)
    : new Date(`${value} 00:00:00 UTC`);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid sitemap content date: ${value}`);
  return date;
}

function sitemapEntry(path: string, lastModified: string): MetadataRoute.Sitemap[number] {
  return { url: `${baseUrl}${path}`, lastModified: contentDate(lastModified) };
}

function localizedSitemapEntry(path: string, lastModified: string): MetadataRoute.Sitemap[number] {
  const japanesePath = path ? `/ja${path}` : "/ja";
  return {
    ...sitemapEntry(path, lastModified),
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        ja: `${baseUrl}${japanesePath}`,
        "x-default": `${baseUrl}${path}`,
      },
    },
  };
}

function localizedSitemapEntries(path: string, lastModified: string): MetadataRoute.Sitemap {
  const englishEntry = localizedSitemapEntry(path, lastModified);
  return [
    englishEntry,
    { ...englishEntry, url: `${baseUrl}${path ? `/ja${path}` : "/ja"}` },
  ];
}

function localizedSitemapPairEntries(
  englishPath: string,
  japanesePath: string,
  lastModified: string,
  japaneseLastModified = lastModified,
): MetadataRoute.Sitemap {
  const languages = {
    en: `${baseUrl}${englishPath}`,
    ja: `${baseUrl}${japanesePath}`,
    "x-default": `${baseUrl}${englishPath}`,
  };
  return [
    { ...sitemapEntry(englishPath, lastModified), alternates: { languages } },
    { ...sitemapEntry(japanesePath, japaneseLastModified), alternates: { languages } },
  ];
}

const japaneseGuidePairs: Record<string, string> = {
  "how-to-play": "how-to-play-palworld-card-game",
  "deck-building-rules": "palworld-card-game-deck-building-rules",
  "trial-deck-comparison": "red-blue-vs-green-purple-trial-deck",
  "bp01-booster-box": "palworld-booster-box",
  "card-list-guide": "dawn-of-palpagos-card-list-guide",
  "keyword-glossary": "palworld-card-game-keyword-glossary",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedEnglishGuideSlugs = new Set(Object.values(japaneseGuidePairs));
  return [
    ...localizedSitemapEntries("", "2026-08-10"),
    ...localizedSitemapPairEntries("/cards", "/ja/cards", "2026-08-10", "2026-08-07"),
    ...localizedSitemapEntries("/tools/deck-builder", "2026-08-07"),
    ...["/decks", "/search"].flatMap((path) => localizedSitemapEntries(path, "2026-08-04")),
    ...localizedSitemapPairEntries("/rules", "/ja/rules", "2026-08-10", "2026-08-07"),
    ...localizedSitemapPairEntries("/blog", "/ja/guides", "2026-08-05", "2026-08-04"),
    sitemapEntry("/tools/dawn-of-palpagos-checklist", "2026-08-04"),
    sitemapEntry("/resources", "2026-08-07"),
    sitemapEntry("/sets", "2026-08-10"),
    sitemapEntry("/cards/promos", "2026-08-05"),
    sitemapEntry("/events", "2026-08-06"),
    sitemapEntry("/sets/legends-awaken-bp02", "2026-08-07"),
    sitemapEntry("/updates", "2026-08-10"),
    sitemapEntry("/about", "2026-08-07"),
    sitemapEntry("/privacy", "2026-08-10"),
    sitemapEntry("/terms", "2026-08-07"),
    ...["/cards/pals", "/ai-policy"]
      .map((path) => sitemapEntry(path, "2026-07-31")),
    ...cards.flatMap((card) => localizedSitemapPairEntries(
      `/card/${card.slug}`,
      `/ja/card/${card.slug}`,
      "2026-08-07",
    )),
    ...decks.flatMap((deck) => localizedSitemapEntries(`/deck/${deck.slug}`, deck.modified)),
    ...japaneseGuides.flatMap((guide) => localizedSitemapPairEntries(
      `/blog/${japaneseGuidePairs[guide.slug]}`,
      `/ja/guide/${guide.slug}`,
      guide.updated,
    )),
    ...guides.filter((guide) => !localizedEnglishGuideSlugs.has(guide.slug)).map((guide) => sitemapEntry(
      `/blog/${guide.slug}`,
      guide.modified || guide.published || guide.updated,
    )),
  ];
}
