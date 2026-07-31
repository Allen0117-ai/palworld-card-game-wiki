import type { Metadata } from "next";
import checklistEntries from "@/lib/official-bp01-checklist.generated.json";
import { CollectionChecklist, type CollectionChecklistCard } from "@/components/CollectionChecklist";
import { JsonLd } from "@/components/JsonLd";
import { cards } from "@/lib/data";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dawn of Palpagos Checklist – 100 Cards + 61 Parallels",
  description: "Track all 100 base cards, 61 parallel cards and the special SSS Soul from Dawn of Palpagos. Filter by color and rarity; progress saves on your device.",
  path: "/tools/dawn-of-palpagos-checklist",
});

const baseCardLinks = new Map(
  cards
    .filter((card) => card.set === "EBP01")
    .map((card) => [card.number, `/card/${card.slug}`]),
);

const checklistCards: CollectionChecklistCard[] = checklistEntries.map((card) => ({
  ...card,
  href: baseCardLinks.get(card.baseNumber),
}));

export default function DawnOfPalpagosChecklistPage() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Dawn of Palpagos Card Checklist",
          url: "https://palworldcardgame.wiki/tools/dawn-of-palpagos-checklist",
          applicationCategory: "GameApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
        createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cards", path: "/cards" },
          { name: "Dawn of Palpagos Checklist", path: "/tools/dawn-of-palpagos-checklist" },
        ]),
      ]} />
      <header className="page-hero checklist-hero shell">
        <p className="eyebrow"><span>Free collection tool</span> · No account needed</p>
        <h1>Dawn of Palpagos<br />card checklist.</h1>
        <p>Track the complete BP01 launch list: 100 base cards, 61 parallel treatments and the separately listed SSS Soul. Check a card once and your progress stays on this device.</p>
        <div className="checklist-hero-stats" aria-label="Dawn of Palpagos checklist coverage">
          <div><strong>100</strong><span>base cards</span></div>
          <div><strong>61</strong><span>parallel cards</span></div>
          <div><strong>1</strong><span>special Soul</span></div>
        </div>
      </header>
      <CollectionChecklist cards={checklistCards} />
      <section className="article-shell checklist-notes">
        <h2>What this checklist counts</h2>
        <p>The official BP01 product specification lists 100 base card types and 61 parallel types. The official card database also contains one SSS Soul entry, so this tracker shows 162 collectible entries in total.</p>
        <div className="callout"><strong>Prices are not included:</strong> early asking prices move quickly. This tool tracks the card number and official rarity only, so a listing cannot hide a base card behind a parallel-card price.</div>
        <p><a className="button ghost" href="https://en.palworld-official-cardgame.com/cardlist/searchresults?expansion=EBP01" target="_blank" rel="noreferrer">Check the official BP01 list ↗</a></p>
      </section>
    </>
  );
}
