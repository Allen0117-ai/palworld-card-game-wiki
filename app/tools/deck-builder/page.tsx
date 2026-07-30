import type { Metadata } from "next";
import { DeckBuilder } from "@/components/DeckBuilder";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = { title: "Palworld TCG Deck Builder – Build & Share Your Deck", description: "Build a Palworld TCG deck with our interactive deck builder. Search cards, check legal limits, and save a draft on your device." };

export default function DeckBuilderPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Palworld TCG Deck Builder", url: "https://palworldcardgame.wiki/tools/deck-builder", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Free tool</span> · No account needed</p>
        <h1>Palworld TCG<br />deck builder.</h1>
        <p>Click cards to add them. The builder checks the 50-card limit, four-copy limit and two-color rule. Drafts stay on your device.</p>
      </header>
      <DeckBuilder />
    </>
  );
}
