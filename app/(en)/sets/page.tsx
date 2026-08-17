import type { Metadata } from "next";
import Link from "next/link";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentFreshnessPanel } from "@/components/ContentFreshnessPanel";
import { HubLinkGrid } from "@/components/HubLinkGrid";
import { JsonLd } from "@/components/JsonLd";
import { createBreadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";
import { palworldBoosterSets } from "@/lib/sets";

const pageDescription = "Browse the confirmed Palworld TCG sets list, including Dawn of Palpagos BP01, Legends Awaken BP02, release dates, card counts and Trial Deck links.";

export const metadata: Metadata = createPageMetadata({
  title: "Palworld TCG Sets List – BP01, BP02 & Trial Decks",
  description: pageDescription,
  path: "/sets",
  absoluteTitle: true,
});

export default function SetsPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Palworld TCG Sets List",
      description: pageDescription,
      url: `${SITE_URL}/sets`,
      dateModified: "2026-08-10",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: palworldBoosterSets.length,
        itemListElement: palworldBoosterSets.map((set, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${set.code} ${set.name}`,
          url: set.officialUrl,
        })),
      },
    },
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Sets", path: "/sets" },
    ]),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <header className="page-hero shell">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Sets" }]} />
        <p className="eyebrow"><span>Booster set guide</span> · BP01 and BP02 official products</p>
        <h1>Palworld TCG<br />sets list.</h1>
        <p>Browse every officially confirmed booster set, then open its card list, release facts, collector tools and related Trial Decks. Upcoming information stays clearly separated from released card data.</p>
      </header>

      <article className="article-shell">
        <div className="quick-answer">
          <strong>What is confirmed</strong>
          <p>Two named Palworld TCG booster sets have official product pages: BP01 Dawn of Palpagos, released July 30, 2026, and BP02 Legends Awaken, scheduled for October 30, 2026. Bushiroad has also scheduled an unnamed new booster for January 29, 2027, but its set code, name and card details are not published yet. Two additional Trial Decks are scheduled for December 18, 2026; Trial Decks are fixed products, not additional booster sets.</p>
          <a className="quick-answer-source" href="https://en.palworld-official-cardgame.com/products" target="_blank" rel="noreferrer">Primary source: official product index ↗</a>
        </div>

        <ContentFreshnessPanel
          updated="August 10, 2026"
          verified="August 10, 2026"
          sourceStatus="Official English product pages and product-schedule announcement"
          summary="Tracks named booster sets, release dates, card-list availability and confirmed products whose names are still pending."
          changeSummary="Added the December 18 Trial Decks and January 29, 2027 booster date without guessing their unpublished names or set codes."
          published="August 5, 2026"
        />

        <h2>Palworld TCG booster set list</h2>
        <p>This list uses the publisher&apos;s booster numbering. It does not count Trial Decks, promo packs or accessory bundles as booster sets, so players can compare the main expansions without mixing different product types.</p>
        <div className="guide-grid">
          {palworldBoosterSets.map((set, index) => (
            <Link className={`guide-card guide-${index + 1}`} href={set.internalHref} key={set.code}>
              <span className="guide-number">{set.code}</span>
              <div>
                <span className="mini-label">{set.status} · {set.releaseLabel}</span>
                <h3>{set.name}</h3>
                <p>{set.summary}</p>
                <small className="guide-source-label">{set.baseCardCount} normal types · {set.parallelSummary} · {set.cardListStatus}</small>
              </div>
              <span className="guide-arrow">↗</span>
            </Link>
          ))}
        </div>

        <AdsterraBannerAd />

        <h2>What counts as a Palworld TCG set?</h2>
        <p>Players often use “set” for any sealed product, but the official catalog separates three useful product families. Keeping those families distinct makes card numbers, deck contents and collection goals easier to understand.</p>
        <div className="comparison-table" role="region" aria-label="Palworld TCG product family comparison" tabIndex={0}>
          <div className="comparison-head"><span>Code</span><strong>Product type</strong><strong>What it adds</strong></div>
          <div><span>BP</span><p>Booster Pack set</p><p>A numbered expansion with random packs and a new booster card pool.</p></div>
          <div><span>TD</span><p>Trial Deck</p><p>A fixed 50-card Main Deck, 10-card Soul Deck and beginner play accessories.</p></div>
          <div><span>SS</span><p>Sleeve &amp; Card Set</p><p>An accessory bundle with sleeves and a small group of included cards.</p></div>
        </div>
        <p>Event promos use their own PR or Soul numbering and distribution rules. See the <Link className="text-link" href="/cards/promos">verified promo card list</Link> instead of counting them as a numbered booster set.</p>

        <h2>Set 1: Dawn of Palpagos BP01</h2>
        <p>Dawn of Palpagos is the first booster set and the only booster with a complete official card list available today. The base list contains 100 cards across C, U, R and RR, while the product specification separately confirms 61 parallel card types. Use the searchable database to filter the BP01 pool, then use the checklist to track base and parallel collection progress.</p>
        <div className="article-actions">
          <Link className="button primary" href="/cards?set=EBP01">Browse the BP01 card list</Link>
          <Link className="button ghost" href="/tools/dawn-of-palpagos-checklist">Open the BP01 checklist</Link>
          <Link className="button ghost" href="/blog/palworld-tcg-rarity-guide">Understand BP01 rarities</Link>
        </div>

        <h2>Set 2: Legends Awaken BP02</h2>
        <p>Legends Awaken is the confirmed second booster set. Its official product page lists an October 30, 2026 release and 100 normal card types plus parallels. Bushiroad has not published the complete card list, exact parallel count or full mechanic breakdown, so those details remain unknown.</p>
        <div className="callout"><strong>Current status:</strong> BP02 is confirmed, but its full card database is not live yet. The permanent BP02 page will be updated as official reveals arrive; the 2026 Roadmap remains the dated calendar for release timing.</div>
        <div className="article-actions">
          <Link className="button primary" href="/sets/legends-awaken-bp02">Open the BP02 reveal tracker</Link>
          <Link className="button ghost" href="/blog/palworld-card-game-2026-roadmap">Check the verified release timeline</Link>
          <a className="button ghost" href="https://en.palworld-official-cardgame.com/products/bp02" target="_blank" rel="noreferrer">Open the official BP02 page ↗</a>
        </div>

        <h2>What comes after Legends Awaken?</h2>
        <p>The official Summer 2026 announcement schedules two new Trial Decks for December 18, 2026 and a new booster pack for January 29, 2027. The publisher has not announced their names, product codes, colors or card lists, so this index does not invent BP03, TD03 or TD04 labels.</p>
        <div className="callout"><strong>Why there are still two set cards above:</strong> BP01 and BP02 are the only named booster products with published set pages. The January booster will be added as its own entry after Bushiroad publishes an official identity and source page.</div>

        <HubLinkGrid
          compact
          eyebrow="Related launch products"
          title="Trial Decks are separate fixed products."
          intro="Each launch Trial Deck has a fixed 50-card Main Deck built from 24 unique Main Deck card numbers."
          items={[
            { href: "/deck/red-blue-launch-pressure", label: "TD01", title: "Red / Blue", description: "Direct pressure, Materials and defensive timing." },
            { href: "/deck/green-blue-base-value", label: "TD02", title: "Green / Purple", description: "Ingredients, Taunt, Stealth and sequencing." },
            { href: "/decks", label: "Deck index", title: "Compare deck lists", description: "See the full fixed pools and beginner plans." },
            { href: "/blog/palworld-card-game-products-where-to-buy", label: "Buying guide", title: "Choose a product", description: "Compare sealed products without mixing their purposes." },
          ]}
        />

        <h2>Check a set before buying</h2>
        <ul>
          <li>Use Bushiroad&apos;s product pages for current release dates and set sizes.</li>
          <li>Open the searchable card list when you need individual card numbers and text.</li>
          <li>Treat retailer previews and community reveals as incomplete until the card appears in an official source.</li>
        </ul>

        <section className="source-panel">
          <p className="eyebrow">Official sources</p>
          <h2>Official set sources</h2>
          <p>These primary pages control the release dates and published set specifications shown above.</p>
          <div>
            <a href="https://en.palworld-official-cardgame.com/products" target="_blank" rel="noreferrer">Official product index ↗</a>
            {palworldBoosterSets.map((set) => <a href={set.officialUrl} target="_blank" rel="noreferrer" key={set.code}>Official {set.code} page ↗</a>)}
            <a href="https://en.palworld-official-cardgame.com/products/td01" target="_blank" rel="noreferrer">Official TD01 page ↗</a>
            <a href="https://en.palworld-official-cardgame.com/products/td02" target="_blank" rel="noreferrer">Official TD02 page ↗</a>
            <a href="https://en.palworld-official-cardgame.com/news/post-becsu-26" target="_blank" rel="noreferrer">Official 2026–27 product schedule ↗</a>
          </div>
        </section>
      </article>
    </>
  );
}
