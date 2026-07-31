import type { Metadata } from "next";
import { DeckBuilder } from "@/components/DeckBuilder";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { cardByNumber, decks } from "@/lib/data";
import Link from "next/link";
import { decodeDeckList, sanitizeDeckName } from "@/lib/deck-share";

export const metadata: Metadata = createPageMetadata({
  title: "Palworld TCG Deck Builder – All 148 Launch Cards",
  description: "Build a Palworld TCG deck with all BP01 and Trial Deck cards. Check the 50-card, four-copy and two-color rules, then save a draft on your device.",
  path: "/tools/deck-builder",
});

export default async function DeckBuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ deck?: string; list?: string; name?: string }>;
}) {
  const { deck: requestedDeckSlug, list: sharedDeckCode, name: sharedDeckName } = await searchParams;
  const starterDeck = decks.find((deck) => deck.slug === requestedDeckSlug && deck.recipe);
  const starterDeckList = Object.fromEntries((starterDeck?.recipe || []).map((entry) => {
    const card = cardByNumber(entry.cardNumber);
    if (!card) throw new Error(`${starterDeck?.name} references missing card ${entry.cardNumber}`);
    return [card.slug, entry.copies];
  }));
  const sharedDeck = decodeDeckList(sharedDeckCode);
  const hasSharedDeck = Object.keys(sharedDeck).length > 0;
  const initialDeck = hasSharedDeck ? sharedDeck : starterDeckList;
  const initialName = hasSharedDeck
    ? sanitizeDeckName(sharedDeckName, "Shared Palworld deck")
    : starterDeck?.name;

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Palworld TCG Deck Builder", url: "https://palworldcardgame.wiki/tools/deck-builder", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Free tool</span> · No account needed</p>
        <h1>Palworld TCG<br />deck builder.</h1>
        <p>Search all 148 launch main-deck cards. The builder checks the 50-card limit, same-name four-copy limit and two-color rule. Drafts stay on your device.</p>
        {hasSharedDeck ? <p className="builder-template-note">A friend shared this deck with you. <strong>Remix it below, then share your version back.</strong></p> : null}
        {!hasSharedDeck && starterDeck ? <p className="builder-template-note">Loaded template: <strong>{starterDeck.name}</strong>. Save it on this device or change cards below.</p> : null}
        {!hasSharedDeck && !starterDeck ? <p><Link className="text-link" href="/deck/mono-red-pal-rush">New player? Start from the illustrated 50-card Red / Blue sample →</Link></p> : null}
        <p><Link className="text-link" href="/blog/palworld-booster-box">Need BP01 cards? Compare a Booster Box with a Trial Deck →</Link></p>
      </header>
      <DeckBuilder initialDeck={initialDeck} initialName={initialName} isSharedDeck={hasSharedDeck} />
    </>
  );
}
