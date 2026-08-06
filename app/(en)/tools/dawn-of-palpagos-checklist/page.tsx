import type { Metadata } from "next";
import checklistEntries from "@/lib/official-bp01-checklist.generated.json";
import { CollectionChecklist, type CollectionChecklistCard } from "@/components/CollectionChecklist";
import { JsonLd } from "@/components/JsonLd";
import { cards } from "@/lib/data";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { HubLinkGrid } from "@/components/HubLinkGrid";

export const metadata: Metadata = createPageMetadata({
  title: "Dawn of Palpagos Card Checklist – 162 Entries",
  description: "Track all 100 base cards, 61 parallel cards and the special SSS Soul from Dawn of Palpagos. Filter by color and rarity; progress saves on your device.",
  path: "/tools/dawn-of-palpagos-checklist",
  absoluteTitle: true,
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
      <div className="shell section">
        <HubLinkGrid
          eyebrow="Keep collecting"
          title="Check a card, then plan your next step."
          intro="Open the card database for details, build a list with your cards, or read the BP01 buying guide."
          items={[
            { href: "/cards", label: "Card database", title: "Open card details", description: "Search the launch card list by number, name or rarity." },
            { href: "/tools/deck-builder", label: "Free tool", title: "Build from your collection", description: "Turn cards you own into a legal deck list." },
            { href: "/blog/palworld-booster-box", label: "Product guide", title: "Read the BP01 guide", description: "Compare sealed product facts before buying more packs." },
          ]}
        />
      </div>
    </>
  );
}
