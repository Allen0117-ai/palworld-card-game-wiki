import type { Metadata } from "next";
import { DeckBuilder } from "@/components/DeckBuilder";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { cardByNumber, cards, decks } from "@/lib/data";
import Link from "next/link";
import { HubLinkGrid } from "@/components/HubLinkGrid";
import { decodeDeckList, sanitizeDeckName } from "@/lib/deck-share";

type DeckBuilderSearchParams = Promise<{ deck?: string; list?: string; name?: string; resume?: string; card?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: DeckBuilderSearchParams;
}): Promise<Metadata> {
  const { list, name } = await searchParams;
  const sharedDeck = decodeDeckList(list);
  const sharedCardCount = Object.values(sharedDeck).reduce((total, copies) => total + copies, 0);
  const sharedName = sanitizeDeckName(name, "Shared Palworld deck");

  return createPageMetadata({
    title: sharedCardCount
      ? `${sharedName.slice(0, 32)} – Palworld Deck`
      : "Palworld TCG Deck Builder & Legal Deck Checker",
    description: sharedCardCount
      ? `Open this ${sharedCardCount}-card Palworld TCG deck, change any card and share your own version. No account needed.`
      : "Build with all 148 launch cards and check the 50-card, four-copy, two-color and eight-Lucky limits. Save and share a legal Palworld TCG deck free.",
    path: "/tools/deck-builder",
    absoluteTitle: true,
  });
}

export default async function DeckBuilderPage({
  searchParams,
}: {
  searchParams: DeckBuilderSearchParams;
}) {
  const { deck: requestedDeckSlug, list: sharedDeckCode, name: sharedDeckName, resume, card: requestedCardSlug } = await searchParams;
  const starterDeck = decks.find((deck) => deck.slug === requestedDeckSlug && deck.recipe);
  const starterDeckList = Object.fromEntries((starterDeck?.recipe || []).map((entry) => {
    const card = cardByNumber(entry.cardNumber);
    if (!card) throw new Error(`${starterDeck?.name} references missing card ${entry.cardNumber}`);
    return [card.slug, entry.copies];
  }));
  const sharedDeck = decodeDeckList(sharedDeckCode);
  const hasSharedDeck = Object.keys(sharedDeck).length > 0;
  const requestedCard = cards.find((card) => card.slug === requestedCardSlug);
  const initialDeck = hasSharedDeck
    ? sharedDeck
    : starterDeck
      ? starterDeckList
      : requestedCard
        ? { [requestedCard.slug]: 1 }
        : {};
  const initialName = hasSharedDeck
    ? sanitizeDeckName(sharedDeckName, "Shared Palworld deck")
    : starterDeck?.name || (requestedCard ? `${requestedCard.name} deck` : undefined);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Palworld TCG Deck Builder", url: "https://palworldcardgame.wiki/tools/deck-builder", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Free tool</span> · No account needed</p>
        <h1>Palworld TCG<br />deck builder &amp; legal checker.</h1>
        <p>Search all 148 launch Main Deck cards. The builder checks 50 cards, same-name copies, two colors and the eight-Lucky limit, then shows your cost curve and lets you test an opening hand. Drafts stay on your device.</p>
        {hasSharedDeck ? <p className="builder-template-note">A friend shared this deck with you. <strong>Remix it below, then share your version back.</strong></p> : null}
        {!hasSharedDeck && starterDeck ? <p className="builder-template-note">Starting deck loaded: <strong>{starterDeck.name}</strong>. Save it on this device or customize the cards below.</p> : null}
        {!hasSharedDeck && requestedCard ? <p className="builder-template-note">Added first card: <strong>{requestedCard.name}</strong>. Choose up to one more color and complete the Main Deck below.</p> : null}
        {!hasSharedDeck && !starterDeck && !requestedCard ? <p><Link className="text-link" href="/deck/mono-red-pal-rush">New player? Start with the illustrated 50-card Red / Blue beginner deck →</Link></p> : null}
        <p><Link className="text-link" href="/blog/palworld-booster-box">Need BP01 cards? Compare a Booster Box with a Trial Deck →</Link></p>
      </header>
      <DeckBuilder
        initialDeck={initialDeck}
        initialName={initialName}
        isSharedDeck={hasSharedDeck}
        resumeSavedDraft={!hasSharedDeck && !starterDeck && resume === "1"}
      />
      <div className="shell section">
        <HubLinkGrid
          eyebrow="Keep exploring"
          title="Find cards, rules and a starting list."
          intro="Use the database for card details, verify your deck rules, or begin with an illustrated example."
          items={[
            { href: "/cards", label: "Card database", title: "Browse all cards", description: "Check card text, numbers and stats before adding cards." },
            { href: "/rules", label: "Rules & FAQ", title: "Verify a rule", description: "Search sourced answers to deck and card questions." },
            { href: "/decks", label: "Deck guides", title: "Open a starting list", description: "See Trial Deck plans and a beginner deck." },
          ]}
        />
      </div>
    </>
  );
}
