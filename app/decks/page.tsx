import type { Metadata } from "next";
import { decks } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { DeckExplorer } from "@/components/DeckExplorer";

export const metadata: Metadata = { title: "Palworld TCG Trial Deck Guides & Launch Deck Lab", description: "Compare both official Palworld Card Game Trial Decks, inspect their unique card pools and build a legal launch-day deck without unverified meta claims." };

export default function DecksPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: decks.map((deck, index) => ({ "@type": "ListItem", position: index + 1, url: `https://palworldcardgame.wiki/deck/${deck.slug}` })) }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Launch deck center</span> · Updated July 30, 2026</p>
        <h1>Start with facts.<br />Then start testing.</h1>
        <p>Learn both official Trial Decks and build your first BP01 list. Because the game launched today, we separate confirmed card data from editorial testing and do not invent a settled meta.</p>
      </header>
      <DeckExplorer />
    </>
  );
}
