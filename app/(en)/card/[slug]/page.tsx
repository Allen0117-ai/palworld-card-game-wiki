import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cards, decks, getCardImageAlt, specialArtworkByVariant } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CardMagnifier } from "@/components/CardMagnifier";
import { CardDetailsTable } from "@/components/CardDetailsTable";
import { SharePanel } from "@/components/SharePanel";
import { ContentFreshnessPanel } from "@/components/ContentFreshnessPanel";
import type { Metadata } from "next";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateStaticParams() { return cards.map((card) => ({ slug: card.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = cards.find((item) => item.slug === slug);
  if (!card) return {};
  return createPageMetadata({
    title: `${card.name} ${card.number} – Palworld TCG Card`,
    description: card.hasGuide
      ? `Stats and strategy for ${card.name} (${card.number}), a ${card.rarity} ${card.color} card from ${card.setName}.`
      : `Official card text, stats and set information for ${card.name} (${card.number}), a ${card.rarity} ${card.color} card from ${card.setName}.`,
    path: `/card/${card.slug}`,
    absoluteTitle: true,
    image: { url: `https://palworldcardgame.wiki${card.image}`, alt: getCardImageAlt(card) },
  });
}

export default async function CardDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}) {
  const { slug } = await params;
  const { variant } = await searchParams;
  const card = cards.find((item) => item.slug === slug);
  if (!card) notFound();
  const requestedArtwork = specialArtworkByVariant(variant);
  const specialArtwork = requestedArtwork?.card.slug === card.slug ? requestedArtwork : undefined;
  const displayImage = specialArtwork?.image || card.image;
  const displayNumber = specialArtwork?.variantNumber || card.number;
  const displayRarity = specialArtwork?.rarity || card.rarity;
  const relatedDecks = decks.filter((deck) => (
    deck.core.includes(card.slug)
    || deck.recipe?.some((entry) => entry.cardNumber === card.number)
    || (deck.status === "Official Trial Deck" && deck.cardPool.includes(card.slug))
  ));
  const relatedCards = cards
    .filter((item) => item.slug !== card.slug && item.color === card.color && item.type === card.type)
    .slice(0, 4);

  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Thing", name: card.name, description: card.summary, identifier: displayNumber, additionalType: `Palworld TCG ${card.type} card` },
        createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cards", path: "/cards" },
          { name: card.name, path: `/card/${card.slug}` },
        ]),
      ]} />
      <div className="detail-breadcrumb-shell shell">
        <Breadcrumbs items={[
          { name: "Home", href: "/" },
          { name: "Cards", href: "/cards" },
          { name: card.name },
        ]} />
      </div>
      <div className="detail-layout shell">
      <figure className="detail-art">
        <CardMagnifier
          src={displayImage}
          alt={`${getCardImageAlt(card)} detail view`}
          isFoil={Boolean(specialArtwork) || card.rarity === "RR"}
          isLandscape={card.type === "Structure"}
        />
        <figcaption>
          {specialArtwork ? `${displayNumber} parallel artwork` : `${card.number} base artwork`}
          {" · "}Official art ©Bushiroad ©PALWORLD
        </figcaption>
        <div className="detail-share">
          <SharePanel
            assetKey={`card-${displayNumber}`}
            triggerLabel="Share this card"
            shareUrl={`/card/${card.slug}${specialArtwork ? `?variant=${specialArtwork.variantNumber}` : ""}`}
            shareText={`${card.name}${card.subtitle ? ` — ${card.subtitle}` : ""}: ${card.summary} Would you play it?`}
            payload={{
              kind: "card",
              eyebrow: `${displayNumber} · ${displayRarity} ${card.type}`,
              title: `${card.name}${card.subtitle ? ` — ${card.subtitle}` : ""}`,
              body: card.summary,
              image: displayImage,
              accent: card.color,
              facts: [
                `${card.color} ${card.type}`,
                `Cost ${card.cost}`,
                card.power ? `${card.power} power` : "",
                card.strike ? `Strike ${card.strike}` : "",
              ].filter(Boolean),
            }}
          />
        </div>
      </figure>
      <article className="detail-content">
        <section className="card-data-panel">
          <p className="eyebrow"><span>{displayNumber}</span> · Official card details</p>
          <h1>{card.name}{card.subtitle ? ` — ${card.subtitle}` : ""}</h1>
          <p className="card-data-summary">{card.summary}</p>
          <CardDetailsTable card={card} displayNumber={displayNumber} displayRarity={displayRarity} />
        </section>
        <ContentFreshnessPanel
          updated="July 30, 2026"
          verified="July 30, 2026"
          sourceStatus="Official launch card database"
          summary={`Official card text, stats, rarity and set information for ${card.name}.`}
        />
        {card.hasGuide && (
          <section className="content-block">
            <h2>Strategy snapshot</h2>
            <p>{card.summary} Start by testing two to four copies, then adjust once you know how often you want to see it in your opening and midgame hands.</p>
          </section>
        )}
        <section className="content-block">
          <h2>Decks using this card</h2>
          {relatedDecks.length ? <ul>{relatedDecks.map((deck) => <li key={deck.slug}><Link className="text-link" href={`/deck/${deck.slug}`}>{deck.name} →</Link></li>)}</ul> : <p>No featured launch deck uses this card yet. Try it in the deck builder.</p>}
          <Link className="button primary" href={`/tools/deck-builder?card=${card.slug}`} data-analytics-event="card_to_builder" data-analytics-label={card.number}>Add this card to a deck</Link>
        </section>
        <section className="content-block">
          <h2>Related cards to compare</h2>
          <p>Continue with cards that share this card’s color and type.</p>
          <div className="related-card-strip">
            {relatedCards.map((relatedCard) => (
              <Link href={`/card/${relatedCard.slug}`} key={relatedCard.slug}>
                <Image
                  src={relatedCard.image}
                  alt={getCardImageAlt(relatedCard)}
                  width={400}
                  height={relatedCard.type === "Structure" ? 286 : 559}
                  sizes="(max-width: 520px) 38vw, 120px"
                  loading="lazy"
                />
                <strong>{relatedCard.name}</strong>
                <span>{relatedCard.number}</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="content-block">
          <h2>Price & availability</h2>
          <p>Prices vary by seller and region. Compare recent completed sales and trusted retailers before buying; an asking price is not the same as current market value.</p>
          <Link className="text-link" href="/blog/palworld-booster-box">See the Palworld Booster Box buying guide →</Link>
        </section>
      </article>
      </div>
    </>
  );
}
