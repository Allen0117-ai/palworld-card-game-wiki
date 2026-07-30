import type { Metadata } from "next";
import { DeckBuilder } from "@/components/DeckBuilder";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = { title: "Palworld TCG Deck Builder – All 148 Launch Cards", description: "Build a Palworld TCG deck with all BP01 and Trial Deck cards. Check the 50-card, four-copy and two-color rules, then save a draft on your device." };

export default function DeckBuilderPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Palworld TCG Deck Builder", url: "https://palworldcardgame.wiki/tools/deck-builder", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Free tool</span> · No account needed</p>
        <h1>Palworld TCG<br />deck builder.</h1>
        <p>Search all 148 launch main-deck cards. The builder checks the 50-card limit, same-name four-copy limit and two-color rule. Drafts stay on your device.</p>
      </header>
      <DeckBuilder />
    </>
  );
}
