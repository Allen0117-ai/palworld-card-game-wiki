import { notFound } from "next/navigation";
import Link from "next/link";
import { cards, decks, getCardImageAlt, specialArtworkByVariant } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { CardMagnifier } from "@/components/CardMagnifier";
import { CardDetailsTable } from "@/components/CardDetailsTable";
import type { Metadata } from "next";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateStaticParams() { return cards.map((card) => ({ slug: card.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = cards.find((item) => item.slug === slug);
  if (!card) return {};
  const pageLabel = card.hasGuide ? "Stats & Strategy" : "Official Card Details";
  return createPageMetadata({
    title: `${card.name} · Palworld TCG – ${card.rarity} ${card.color} ${pageLabel}`,
    description: card.hasGuide
      ? `Stats and strategy for ${card.name} (${card.number}), a ${card.rarity} ${card.color} card from ${card.setName}.`
      : `Official card text, stats and set information for ${card.name} (${card.number}), a ${card.rarity} ${card.color} card from ${card.setName}.`,
    path: `/card/${card.slug}`,
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
  const relatedDecks = decks.filter((deck) => deck.core.includes(card.slug));

  return (
    <div className="detail-layout shell">
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Thing", name: card.name, description: card.summary, identifier: displayNumber, additionalType: `Palworld TCG ${card.type} card` },
        createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cards", path: "/cards" },
          { name: card.name, path: `/card/${card.slug}` },
        ]),
      ]} />
      <figure className="detail-art">
        <CardMagnifier
          src={displayImage}
          alt={`${getCardImageAlt(card)} detail view`}
          isFoil={Boolean(specialArtwork) || card.rarity === "RR"}
        />
        <figcaption>
          {specialArtwork ? `${displayNumber} parallel artwork` : `${card.number} base artwork`}
          {" · "}Official art ©Bushiroad ©PALWORLD
        </figcaption>
      </figure>
      <article className="detail-content">
        <section className="card-data-panel">
          <p className="eyebrow"><span>{displayNumber}</span> · Official card details</p>
          <h1>{card.name}{card.subtitle ? ` — ${card.subtitle}` : ""}</h1>
          <p className="card-data-summary">{card.summary}</p>
          <CardDetailsTable card={card} displayNumber={displayNumber} displayRarity={displayRarity} />
        </section>
        {card.hasGuide && (
          <section className="content-block">
            <h2>Strategy snapshot</h2>
            <p>{card.summary} Start by testing two to four copies, then adjust once you know how often you want to see it in your opening and midgame hands.</p>
          </section>
        )}
        <section className="content-block">
          <h2>Decks using this card</h2>
          {relatedDecks.length ? <ul>{relatedDecks.map((deck) => <li key={deck.slug}><Link className="text-link" href={`/deck/${deck.slug}`}>{deck.name} →</Link></li>)}</ul> : <p>No featured launch deck uses this card yet. Try it in the deck builder.</p>}
          <Link className="button primary" href="/tools/deck-builder">Open deck builder</Link>
        </section>
        <section className="content-block">
          <h2>Price & availability</h2>
          <p>Verified market-price data is coming soon. We do not publish estimated prices without a reliable marketplace source.</p>
        </section>
      </article>
    </div>
  );
}
