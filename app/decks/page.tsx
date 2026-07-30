import type { Metadata } from "next";
import { decks } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { DeckExplorer } from "@/components/DeckExplorer";

export const metadata: Metadata = { title: "Palworld TCG Launch Deck Ideas & Deck Builder", description: "Explore practical Palworld TCG launch deck ideas by color and archetype, with core cards and strategy notes." };

export default function DecksPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: decks.map((deck, index) => ({ "@type": "ListItem", position: index + 1, url: `https://palworldcardgame.wiki/deck/${deck.slug}` })) }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Community lab</span> · Launch meta</p>
        <h1>Decks built<br />to compete.</h1>
        <p>Practical starting lists for the first Palworld TCG set. These are testing frameworks, not tournament guarantees.</p>
      </header>
      <DeckExplorer />
    </>
  );
}
