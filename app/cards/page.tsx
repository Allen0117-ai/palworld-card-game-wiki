import type { Metadata } from "next";
import { CardExplorer } from "@/components/CardExplorer";
import { JsonLd } from "@/components/JsonLd";
import { cards } from "@/lib/data";

export const metadata: Metadata = { title: "Palworld TCG Card List – Dawn of Palpagos Preview", description: "Browse verified Dawn of Palpagos cards with official stats, rarity, color, cost, card text and strategy notes." };

export default async function CardsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: cards.map((card, index) => ({ "@type": "ListItem", position: index + 1, url: `https://palworldcardgame.wiki/card/${card.slug}` })) }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Database</span> · Dawn of Palpagos</p>
        <h1>Palworld TCG<br />card list.</h1>
        <p>Explore a curated launch database. Filter cards by color and type, then open any card for strategy notes and deck ideas.</p>
      </header>
      <CardExplorer initialQuery={q} />
    </>
  );
}
