import type { MetadataRoute } from "next";
import { cards, decks, guides } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://palworldcardgame.wiki";
  return [
    "", "/cards", "/decks", "/tools/deck-builder", "/blog", "/about", "/privacy",
    ...cards.map((card) => `/card/${card.slug}`),
    ...decks.map((deck) => `/deck/${deck.slug}`),
    ...guides.map((guide) => `/blog/${guide.slug}`),
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "daily" : "weekly", priority: path === "" ? 1 : .8 }));
}
