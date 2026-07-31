import type { Metadata } from "next";
import { CardExplorer } from "@/components/CardExplorer";
import { JsonLd } from "@/components/JsonLd";
import { cards } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  title: "Complete Palworld TCG Card List – BP01 & Trial Decks",
  description: "Search all 148 launch main-deck cards from Dawn of Palpagos BP01 and both Trial Decks by name, number, color, type, cost and rarity.",
  path: "/cards",
});

export default async function CardsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Palworld Card Game launch card database", numberOfItems: cards.length }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Official data snapshot</span> · Updated July 30, 2026</p>
        <h1>Palworld TCG<br />card list.</h1>
        <p>Search all 148 launch main-deck card entries: 100 BP01 cards plus 24 unique cards from each Trial Deck. Filter by set, color, type, cost or rarity, then open card text without leaving the page.</p>
      </header>
      <div className="shell">
        <div className="callout"><strong>Looking for Pals?</strong> Browse all {cards.filter((card) => card.type === "Pal").length} Pal-type card entries in the dedicated <Link className="text-link" href="/cards/pals">Palworld Pals card list</Link>.</div>
        <div className="callout"><strong>Tracking a collection?</strong> Check off all 100 BP01 base cards, 61 parallels and the special Soul in the free <Link className="text-link" href="/tools/dawn-of-palpagos-checklist">Dawn of Palpagos checklist</Link>.</div>
        <div className="callout"><strong>Opening BP01?</strong> See what a sealed box contains, how to compare prices and whether it fits you in our <Link className="text-link" href="/blog/palworld-booster-box">Palworld Booster Box guide</Link>.</div>
      </div>
      <CardExplorer initialQuery={q} />
    </>
  );
}
