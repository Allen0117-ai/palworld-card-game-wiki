import Link from "next/link";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentFreshnessPanel } from "@/components/ContentFreshnessPanel";
import { HubLinkGrid } from "@/components/HubLinkGrid";
import { JsonLd } from "@/components/JsonLd";
import { createBreadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Palworld TCG Updates – Cards, Rules, Decks & Events",
  description: "See verified Palworld TCG updates, what changed, which cards, rules, decks or events are affected, and the official source for each update.",
  path: "/updates",
  absoluteTitle: true,
});

const verifiedUpdates = [
  {
    date: "August 20, 2026",
    category: "Products & stock · Japan only",
    title: "Japan expects additional first-edition BP01 shipments in late September",
    summary: "The official Japanese account says extra first-edition BP01 shipments are expected in late September in Japan. This is not an English-edition or worldwide arrival date.",
    affected: [
      { href: "/blog/palworld-card-game-products-where-to-buy", label: "Buying guide" },
      { href: "/blog/palworld-tcg-first-edition-vs-reprint", label: "First Edition guide" },
    ],
    source: { href: "https://x.com/PalworldOCG/status/2090352524444447078", label: "Official Japanese shipment update" },
  },
  {
    date: "August 19, 2026",
    category: "Products & stock · English edition",
    title: "Additional English BP01 stock is on the way; 2nd Edition is planned",
    summary: "The official English account says additional stock is on the way and a 2nd Edition print run is planned. It says more details are coming later, so no English arrival date is confirmed.",
    affected: [
      { href: "/blog/palworld-card-game-products-where-to-buy", label: "Buying guide" },
      { href: "/blog/palworld-tcg-first-edition-vs-reprint", label: "First Edition guide" },
    ],
    source: { href: "https://x.com/PalworldOCG_EN/status/2089880025566675341", label: "Official English stock update" },
  },
  {
    date: "August 19, 2026",
    category: "Products",
    title: "Eternal Ascent TD03 and TD04 names and contents published",
    summary: "The December 18 Trial Decks are Eternal Ascent Red・Green (TD03) and Blue・Purple (TD04). Each includes a 50-card Main Deck, 10-card Soul Deck, playmat and guide, Life Counter, plus Material and Ingredient counters.",
    affected: [
      { href: "/sets", label: "Sets and products" },
      { href: "/blog/palworld-card-game-2026-roadmap", label: "Release schedule" },
    ],
    source: { href: "https://en.palworld-official-cardgame.com/news/post-7", label: "Official Eternal Ascent announcement" },
  },
  {
    date: "August 17, 2026",
    category: "Decks & competitive play",
    title: "Official Tokyo Grand Release deck recipes published",
    summary: "The Japanese official account announced undefeated recipes from the August 15 Tokyo venue event. These are early event results, not a complete global tier list.",
    affected: [
      { href: "/blog/palworld-tcg-tournament-decklists", label: "Tournament tracker" },
      { href: "/blog/palworld-tcg-deck-tier-list", label: "Provisional tier list" },
    ],
    source: { href: "https://x.com/PalworldOCG/status/2089155250359783612", label: "Official Tokyo recipe announcement" },
  },
  {
    date: "August 12, 2026",
    category: "Products & stock",
    title: "Bushiroad acknowledged continuing BP01 shortages",
    summary: "The official Japanese account said Dawn of Palpagos remained in short supply. No public restock date was included, so seller estimates remain local and unconfirmed.",
    affected: [
      { href: "/blog/palworld-card-game-products-where-to-buy", label: "Buying guide" },
    ],
    source: { href: "https://x.com/PalworldOCG/status/2087456988208800144", label: "Official BP01 shortage notice" },
  },
  {
    date: "August 10, 2026",
    category: "Product roadmap",
    title: "Two new Trial Decks and the next booster received release dates",
    summary: "Bushiroad first scheduled two December 18 Trial Decks and a January 29, 2027 booster. The August 19 follow-up later supplied the Trial Deck names and TD03/TD04 codes; the booster identity remains pending.",
    affected: [
      { href: "/blog/palworld-card-game-2026-roadmap", label: "Release schedule" },
      { href: "/sets", label: "Set index" },
    ],
    source: { href: "https://en.palworld-official-cardgame.com/news/post-becsu-26", label: "Official Summer 2026 announcement" },
  },
  {
    date: "August 10, 2026",
    category: "Corrections & collecting",
    title: "BP01 packaging spelling error added to the errata tracker",
    summary: "The official BP01 page says packs and boxes misspell Palworld and that future reprints will correct the packaging. No reprint date or loose-card print marker is published.",
    affected: [
      { href: "/blog/palworld-card-game-errata-tracker", label: "Errata tracker" },
      { href: "/blog/palworld-tcg-first-edition-vs-reprint", label: "First Edition guide" },
    ],
    source: { href: "https://en.palworld-official-cardgame.com/products/bp01", label: "Official BP01 product page" },
  },
  {
    date: "August 8, 2026",
    category: "Decks & competitive play",
    title: "Four undefeated Osaka Grand Release decks published",
    summary: "The official Japanese account named four undefeated players and published each player's deck image in the result thread. The tracker preserves the event context instead of treating the lists as global rankings.",
    affected: [
      { href: "/blog/palworld-tcg-tournament-decklists", label: "Tournament tracker" },
      { href: "/blog/palworld-tcg-deck-tier-list", label: "Provisional tier list" },
    ],
    source: { href: "https://x.com/PalworldOCG/status/2085976842113331425", label: "Official Osaka result thread" },
  },
  {
    date: "August 6, 2026",
    category: "Products & events",
    title: "New demos, playmats, storage boxes and sleeves confirmed",
    summary: "Official September and October dates were added to the event, product and accessory guides. Bushi Navi registration is required for the new store demo sessions.",
    affected: [
      { href: "/events", label: "Events guide" },
      { href: "/blog/palworld-card-game-2026-roadmap", label: "Release schedule" },
      { href: "/blog/palworld-tcg-card-size-sleeves", label: "Accessory guide" },
    ],
    source: { href: "https://en.palworld-official-cardgame.com/events", label: "Official events hub" },
  },
  {
    date: "August 6, 2026",
    category: "Decks & competitive play",
    title: "Launch-format deck guides now separate facts from early rankings",
    summary: "The deck tier list, color picks, Trial Deck upgrades and tournament tracker now explain which claims come from official card data and which remain provisional analysis.",
    affected: [
      { href: "/blog/palworld-tcg-deck-tier-list", label: "Deck tier list" },
      { href: "/blog/palworld-tcg-best-cards-by-color", label: "Best cards by color" },
      { href: "/blog/palworld-tcg-trial-deck-upgrade-guide", label: "Trial Deck upgrades" },
      { href: "/blog/palworld-tcg-tournament-decklists", label: "Tournament tracker" },
    ],
    source: { href: "https://en.palworld-official-cardgame.com/deckrecipe", label: "Official deck recipes" },
  },
  {
    date: "August 6, 2026",
    category: "Cards & tools",
    title: "All 148 launch Main Deck cards remain indexed",
    summary: "BP01, TD01 and TD02 card data is available in the database, rules search and deck builder. BP02 stays in the set tracker until an official complete card list is published.",
    affected: [
      { href: "/cards", label: "Card database" },
      { href: "/rules", label: "Rules search" },
      { href: "/tools/deck-builder", label: "Deck builder" },
      { href: "/sets/legends-awaken-bp02", label: "BP02 tracker" },
    ],
    source: { href: "https://en.palworld-official-cardgame.com/cardlist", label: "Official card list" },
  },
];

export default function UpdatesPage() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Palworld TCG verified updates",
          description: "Verified changes to Palworld TCG cards, rules, decks, products and events.",
          url: `${SITE_URL}/updates`,
          dateModified: "2026-08-20",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: verifiedUpdates.length,
            itemListElement: verifiedUpdates.map((update, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: update.title,
            })),
          },
        },
        createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Updates", path: "/updates" },
        ]),
      ]} />

      <header className="page-hero shell">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Updates" }]} />
        <p className="eyebrow"><span>Verified update center</span> · Last checked August 20, 2026</p>
        <h1>What changed—and what it affects.</h1>
        <p>Each update links the affected cards, rules, decks or event pages and the official source used to verify the change.</p>
      </header>

      <div className="shell updates-freshness">
        <ContentFreshnessPanel
          updated="August 20, 2026"
          verified="August 20, 2026"
          sourceStatus="Official card, product, event and verified social sources"
          summary="This page tracks meaningful changes across the player guides and tools."
          changeSummary="Added the official Eternal Ascent TD03 and TD04 names, colors, release date and included accessories."
          published="August 6, 2026"
        />
        <AdsterraBannerAd />
      </div>

      <section className="latest-updates shell updates-log" aria-labelledby="verified-update-log">
        <div className="latest-updates-heading">
          <div>
            <p className="eyebrow"><span>Change log</span> · Newest first</p>
            <h2 id="verified-update-log">Verified updates</h2>
          </div>
          <p>“Affected pages” shows exactly where the new information is used. External source links open the official page used for verification.</p>
        </div>
        <div className="latest-update-grid">
          {verifiedUpdates.map((update) => (
            <article key={update.title}>
              <span>{update.category} · {update.date}</span>
              <strong>{update.title}</strong>
              <p>{update.summary}</p>
              <nav className="update-impact-links" aria-label={`Affected pages for ${update.title}`}>
                <small>Affected pages</small>
                {update.affected.map((page) => <Link href={page.href} key={page.href}>{page.label} →</Link>)}
                <a href={update.source.href} target="_blank" rel="noreferrer">Source: {update.source.label} ↗</a>
              </nav>
            </article>
          ))}
        </div>
      </section>

      <div className="shell section">
        <HubLinkGrid
          eyebrow="Current format"
          title="Check the live player resources."
          intro="The update log explains changes; these pages contain the current cards, rulings, deck choices and set status."
          items={[
            { href: "/cards", label: "Database", title: "Browse cards", description: "Search BP01, TD01 and TD02 card data." },
            { href: "/rules", label: "Official Q&A", title: "Check a ruling", description: "Search plain-English answers with source links." },
            { href: "/decks", label: "Choose by goal", title: "Compare decks", description: "Start, upgrade or review the launch format." },
            { href: "/sets", label: "Release status", title: "Follow sets", description: "Check BP01 and confirmed BP02 information." },
          ]}
          compact
        />
      </div>
    </>
  );
}
