import type { Metadata } from "next";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
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

const cardListJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Palworld TCG Card List – BP01 and Trial Decks",
  dateModified: "2026-08-10",
  numberOfItems: cards.length,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: cards.length,
    itemListElement: cards.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${card.name} ${card.number}`,
      url: `https://palworldcardgame.wiki/card/${card.slug}`,
    })),
  },
};

type CardSearchParams = Promise<{ q?: string; color?: string; set?: string; type?: string }>;

export default async function CardsPage({ searchParams }: { searchParams: CardSearchParams }) {
  const { q = "", color = "all", set = "all", type = "all" } = await searchParams;
  return (
    <>
      <JsonLd data={cardListJsonLd} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Official launch card data</span> · BP01, TD01 and TD02</p>
        <h1>Palworld TCG<br />card list.</h1>
        <p>Search all 148 launch main-deck card entries: 100 BP01 cards plus 24 unique cards from each Trial Deck. Filter by set, color, type, cost or rarity, then open card text without leaving the page.</p>
      </header>
      <section className="shell section" aria-labelledby="card-list-coverage">
        <h2 id="card-list-coverage">What is included in this Palworld TCG card list?</h2>
        <p>The database links every numbered English launch card from <Link className="text-link" href="/cards?set=EBP01">Dawn of Palpagos BP01</Link>, <Link className="text-link" href="/cards?set=ETD01">TD01 Red / Blue</Link> and <Link className="text-link" href="/cards?set=ETD02">TD02 Green / Purple</Link>. That is 148 Main Deck entries in total. BP02 will remain separate until its official numbered card list is published.</p>
      </section>
      <CardExplorer key={`${q}-${color}-${set}-${type}`} initialQuery={q} initialColor={color} initialSet={set} initialType={type} />
      <div className="shell">
        <AdsterraBannerAd />
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
