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
      <CardExplorer initialQuery={q} />
      <section className="card-next-steps shell" aria-labelledby="card-next-steps-title">
        <p className="eyebrow"><span>Found a card?</span> · Choose your next step</p>
        <h2 id="card-next-steps-title">Turn the card list into a deck or collection.</h2>
        <div>
          <Link href="/tools/deck-builder" data-analytics-event="next_step_click" data-analytics-label="cards-to-builder"><strong>Build with these cards</strong><span>Use legal limits and save your list →</span></Link>
          <Link href="/tools/dawn-of-palpagos-checklist" data-analytics-event="next_step_click" data-analytics-label="cards-to-checklist"><strong>Track BP01 collection</strong><span>Check off base, parallel and Soul entries →</span></Link>
          <Link href="/cards/pals" data-analytics-event="next_step_click" data-analytics-label="cards-to-pals"><strong>Browse Pal cards only</strong><span>See all {cards.filter((card) => card.type === "Pal").length} Pal entries →</span></Link>
          <Link href="/blog/palworld-booster-box" data-analytics-event="next_step_click" data-analytics-label="cards-to-booster"><strong>Opening BP01?</strong><span>Check box contents and buying facts →</span></Link>
        </div>
      </section>
    </>
  );
}
