import type { Metadata } from "next";
import { cards, decks, getCardImageAlt } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { DeckExplorer, type DeckPreview } from "@/components/DeckExplorer";
import { SeoImagePanel } from "@/components/SeoImagePanel";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Palworld Card Game Deck Lists, Combos & Beginner Guides",
  description: "See illustrated Palworld Card Game deck guides, three-step play plans, key card combinations, both Trial Deck pools and a complete 50-card beginner sample list.",
  path: "/decks",
  absoluteTitle: true,
});

export default function DecksPage() {
  const deckPreviews: DeckPreview[] = decks.map((deck) => ({
    slug: deck.slug,
    name: deck.name,
    colors: deck.colors,
    archetype: deck.archetype,
    status: deck.status,
    description: deck.description,
    hasRecipe: Boolean(deck.recipe),
    previewCards: deck.core.slice(0, 3).map((cardSlug) => {
      const card = cards.find((item) => item.slug === cardSlug);
      if (!card) throw new Error(`${deck.name} references missing preview card ${cardSlug}`);
      return {
        slug: card.slug,
        image: card.image,
        imageAlt: getCardImageAlt(card),
        isStructure: card.type === "Structure",
      };
    }),
  }));

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: decks.map((deck, index) => ({ "@type": "ListItem", position: index + 1, url: `https://palworldcardgame.wiki/deck/${deck.slug}` })) }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Illustrated deck center</span> · Updated July 31, 2026</p>
        <h1>See the cards.<br />Learn the sequence.</h1>
        <p>Choose between two official Trial Deck guides and one complete 50-card BP01 beginner sample. Every guide shows what to play early, how the key cards combine and how the deck tries to finish.</p>
      </header>
      <div className="seo-image-panel-shell shell">
        <SeoImagePanel
          label="Official Trial Deck cards"
          title="Red / Blue TD01 and Green / Purple TD02"
          caption="Four cards that introduce the Material, Structure, Taunt and Stealth plans in the two Palworld Trial Decks."
          cardNumbers={["ETD01-008", "ETD01-018", "ETD02-006", "ETD02-018"]}
        />
      </div>
      <DeckExplorer decks={deckPreviews} />
    </>
  );
}
