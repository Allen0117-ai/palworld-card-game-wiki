import type { MetadataRoute } from "next";
import { cards, decks, guides } from "@/lib/data";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["", "/rules", "/cards", "/decks"].flatMap((path) => localizedSitemapEntries(path, "2026-07-31")),
    ...["/cards/pals", "/tools/deck-builder", "/tools/dawn-of-palpagos-checklist", "/blog", "/resources", "/search", "/about", "/privacy"]
      .map((path) => sitemapEntry(path, "2026-07-31")),
    ...cards.flatMap((card) => localizedSitemapEntries(`/card/${card.slug}`, "2026-07-30")),
    ...decks.flatMap((deck) => localizedSitemapEntries(`/deck/${deck.slug}`, deck.modified)),
    ...guides.map((guide) => sitemapEntry(
      `/blog/${guide.slug}`,
      guide.modified || guide.published || guide.updated,
    )),
  ];
}
