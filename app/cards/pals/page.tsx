import type { Metadata } from "next";
import Link from "next/link";
import { CardExplorer } from "@/components/CardExplorer";
import { JsonLd } from "@/components/JsonLd";
import { SeoImagePanel } from "@/components/SeoImagePanel";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { palCards } from "@/lib/data";

const palCardCount = palCards.length;

export const metadata: Metadata = createPageMetadata({
  title: `Palworld Pals Card List – All ${palCardCount} Pal Cards in the TCG`,
  description: `Browse all ${palCardCount} Pal card entries in the Palworld Official Card Game. Search BP01 and Trial Deck Pals by name, set, color, cost and rarity.`,
  path: "/cards/pals",
  absoluteTitle: true,
});

export default function PalCardsPage() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Palworld Pals in the Official Card Game",
          description: `A searchable collection of all ${palCardCount} launch Pal card entries.`,
          numberOfItems: palCardCount,
          url: "https://palworldcardgame.wiki/cards/pals",
        },
        createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cards", path: "/cards" },
          { name: "Pals", path: "/cards/pals" },
        ]),
      ]} />

      <header className="page-hero shell">
        <p className="eyebrow"><span>Pal card database</span> · {palCardCount} launch entries</p>
        <h1>Palworld Pals in the<br />Official Card Game.</h1>
        <p>Browse every Pal-type card from Dawn of Palpagos BP01 and both launch Trial Decks. Search by Pal name, then filter by set, color, cost or rarity.</p>
      </header>

      <div className="seo-image-panel-shell shell">
        <SeoImagePanel
          label="Popular Palworld Pals"
          title="Chillet, Foxparks, Lyleen and Shadowbeak"
          caption="Popular Pals represented as official cards across all four colors in the launch card pool."
          assets={[
            {
              src: "/cards/catalog/EBP01-006.png",
              alt: "Foxparks Pal card (EBP01-006) from the Palworld Official Card Game",
              width: 400,
              height: 559,
            },
            {
              src: "/cards/catalog/EBP01-025.png",
              alt: "Chillet Pal card (EBP01-025) from the Palworld Official Card Game",
              width: 400,
              height: 559,
            },
            {
              src: "/cards/catalog/EBP01-049.png",
              alt: "Lyleen Pal card (EBP01-049) from the Palworld Official Card Game",
              width: 400,
              height: 559,
            },
            {
              src: "/cards/catalog/EBP01-074.png",
              alt: "Shadowbeak Pal card (EBP01-074) from the Palworld Official Card Game",
              width: 400,
              height: 559,
            },
          ]}
        />
      </div>

      <section className="pal-card-intro shell">
        <div className="verification-strip">
          <strong>Card-game scope</strong>
          <span>This page lists <b>Pal cards in the TCG</b>. It does not cover video-game locations, breeding combinations or the complete Palpedia.</span>
        </div>
        <h2>Find a Pal card, then open its official details</h2>
        <p>Each result links to its card number, color, cost, Power, Strike and printed ability. Some Pals appear in both BP01 and a Trial Deck, so this page counts card entries rather than unique creature names.</p>
        <div className="article-actions">
          <Link className="button ghost" href="/cards">Browse every card type</Link>
          <Link className="button ghost" href="/blog/dawn-of-palpagos-card-list-guide">Read the BP01 set guide</Link>
        </div>
      </section>

      <CardExplorer fixedType="Pal" />
    </>
  );
}
