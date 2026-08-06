import type { Metadata } from "next";
import { CardExplorer } from "@/components/CardExplorer";
import { JsonLd } from "@/components/JsonLd";
import { cards } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { HubLinkGrid } from "@/components/HubLinkGrid";

export const metadata: Metadata = createPageMetadata({
  title: "Palworld TCG Card List – BP01 & Trial Decks",
  description: "Search all 148 launch main-deck cards from Dawn of Palpagos BP01 and both Trial Decks by name, number, color, type, cost and rarity.",
  path: "/cards",
  absoluteTitle: true,
});

type CardSearchParams = Promise<{ q?: string; color?: string; set?: string; type?: string }>;

export default async function CardsPage({ searchParams }: { searchParams: CardSearchParams }) {
  const { q = "", color = "all", set = "all", type = "all" } = await searchParams;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Palworld Card Game launch card database", numberOfItems: cards.length }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Official data snapshot</span> · Updated July 30, 2026</p>
        <h1>Palworld TCG<br />card list.</h1>
        <p>Search all 148 launch main-deck card entries: 100 BP01 cards plus 24 unique cards from each Trial Deck. Filter by set, color, type, cost or rarity, then open card text without leaving the page.</p>
      </header>
      <CardExplorer key={`${q}-${color}-${set}-${type}`} initialQuery={q} initialColor={color} initialSet={set} initialType={type} />
      <div className="shell">
        <HubLinkGrid
          compact
          eyebrow="More card views"
          title="Keep browsing by set, color or card type."
          intro="Open a ready-made view after using the full card search above."
          items={[
            { href: "/cards?set=EBP01", label: "Booster set", title: "BP01", description: "100 Dawn of Palpagos base cards." },
            { href: "/cards?set=ETD01", label: "Trial Deck", title: "TD01", description: "Red / Blue launch card pool." },
            { href: "/cards?set=ETD02", label: "Trial Deck", title: "TD02", description: "Green / Purple launch card pool." },
            { href: "/cards?color=red", label: "Color", title: "Red", description: "Pressure, damage and Materials." },
            { href: "/cards?color=blue", label: "Color", title: "Blue", description: "Card flow, tempo and Structures." },
            { href: "/cards?color=green", label: "Color", title: "Green", description: "Ingredients, recovery and Taunt." },
            { href: "/cards?color=purple", label: "Color", title: "Purple", description: "Stealth, removal and disruption." },
            { href: "/cards/pals", label: "Card type", title: "Pal cards", description: "Browse every launch Pal entry." },
            { href: "/cards/promos", label: "Event cards", title: "Promo cards", description: "Check PR packs, Soul promos and distribution." },
          ]}
        />
      </div>
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
