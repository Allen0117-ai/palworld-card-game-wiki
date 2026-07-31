import { notFound } from "next/navigation";
import Link from "next/link";
import { CardTile } from "@/components/CardTile";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DeckGamePlan } from "@/components/DeckGamePlan";
import { DeckRecipe } from "@/components/DeckRecipe";
import { cards, decks } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { createBreadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";

export function generateStaticParams() { return decks.map((deck) => ({ slug: deck.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const deck = decks.find((item) => item.slug === slug);
  if (!deck) return {};
  const isOfficialTrialDeck = deck.status === "Official Trial Deck";
  return createPageMetadata({
    title: isOfficialTrialDeck
      ? `${deck.name.replace(" Guide", "")} List & Guide – Palworld TCG`
      : "Red / Blue BP01 Beginner Deck – Complete 50-Card List",
    description: isOfficialTrialDeck
      ? `See all 24 unique ${deck.colors.join("/")} Main Deck cards, product contents, key combos and a beginner game plan for this Palworld TCG Trial Deck.`
      : deck.description,
    path: `/deck/${deck.slug}`,
    absoluteTitle: true,
    type: "article",
    image: {
      url: `${SITE_URL}/og/decks/${deck.slug}.png`,
      width: 1200,
      height: 630,
      alt: `${deck.name} illustrated deck guide`,
    },
  });
}

export default async function DeckDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deck = decks.find((item) => item.slug === slug);
  if (!deck) notFound();
  const core = deck.core.map((cardSlug) => cards.find((card) => card.slug === cardSlug)).filter(Boolean);
  const pool = deck.cardPool.map((cardSlug) => cards.find((card) => card.slug === cardSlug)).filter(Boolean);
  const otherDecks = decks.filter((item) => item.slug !== deck.slug);
  const pageHeading = deck.status === "Official Trial Deck"
    ? deck.name.replace(" Guide", " List & Guide")
    : deck.name;
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${pageHeading} · Palworld Card Game`,
          description: deck.description,
          image: `${SITE_URL}/og/decks/${deck.slug}.png`,
          datePublished: deck.published,
          dateModified: deck.modified,
          mainEntityOfPage: `${SITE_URL}/deck/${deck.slug}`,
          author: { "@type": "Organization", name: "Palworld Card Game Wiki", url: SITE_URL },
        },
        createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Decks", path: "/decks" },
          { name: deck.name, path: `/deck/${deck.slug}` },
        ]),
      ]} />
      <header className="page-hero shell">
        <Breadcrumbs items={[
          { name: "Home", href: "/" },
          { name: "Decks", href: "/decks" },
          { name: deck.name },
        ]} />
        <div className="color-pips">{deck.colors.map((color) => <span className={`pip ${color}`} key={color} />)}</div>
        <p className="eyebrow"><span>{deck.status}</span> · Updated {deck.updated}</p>
        <h1>{pageHeading}</h1>
        <p>{deck.description}</p>
        {deck.status === "Official Trial Deck" ? <p><a className="text-link" href="#official-card-pool">Jump to the full 24-card pool →</a></p> : null}
      </header>
      <article className="article-shell">
        <div className="verification-strip">
          <strong>{deck.status}</strong>
          <span>{deck.status === "Official Trial Deck" ? "Product and card facts are verified. Strategy guidance is written for new players." : "A beginner-friendly deck list based on the current card pool. It is not a tournament result or tier ranking."}</span>
        </div>
        <div className="deck-at-a-glance" aria-label="Deck overview">
          <div><span>Colors</span><strong>{deck.colors.join(" + ")}</strong></div>
          <div><span>Style</span><strong>{deck.archetype}</strong></div>
          <div><span>Level</span><strong>{deck.difficulty}</strong></div>
        </div>
        <h2>Cards that explain the plan</h2>
        <p>These cards show the deck’s main resource engine, interaction and finishing plan. Select any card to read its full official text.</p>
        <div className="card-grid listing">{core.map((card) => card && <CardTile card={card} key={card.slug} />)}</div>
        <DeckGamePlan deck={deck} />
        <DeckRecipe deck={deck} />
        {deck.status === "Official Trial Deck" && (
          <section className="deck-guide-section" aria-labelledby="official-card-pool">
            <p className="eyebrow"><span>Verified product pool</span> · 24 unique cards</p>
            <h2 id="official-card-pool">All unique Main Deck cards</h2>
            <p>The official card database lists these 24 unique Main Deck entries. The sealed product contains a fixed 50-card Main Deck, 10 Soul cards, one TSR or TSP replacement card and one BP01 booster pack. The public product page does not publish copy-by-copy quantities, so we show only what can be verified.</p>
            <div className="pool-table" role="table" aria-label={`${deck.name} card pool`}>
              {pool.map((card) => card && (
                <Link className="pool-row" role="row" href={`/card/${card.slug}`} key={card.slug}>
                  <span role="cell">{card.number}</span>
                  <strong role="cell">{card.name}{card.subtitle ? ` — ${card.subtitle}` : ""}</strong>
                  <span role="cell">{card.color} · {card.type} · Cost {card.cost}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
        <div className="callout"><strong>Current information:</strong> Tournament results are still emerging. This guide will be updated when reliable event data becomes available.</div>
        <div className="article-actions">
          <Link className="button primary" href={deck.recipe ? `/tools/deck-builder?deck=${deck.slug}` : "/tools/deck-builder"}>
            {deck.recipe ? "Open this 50-card list" : "Customize in deck builder"}
          </Link>
          <a className="button ghost" href={deck.sourceUrl} target="_blank" rel="noreferrer">Check official source ↗</a>
        </div>
        <section className="deck-next-steps" aria-labelledby="keep-learning">
          <p className="eyebrow"><span>Keep learning</span> · Choose your next step</p>
          <h2 id="keep-learning">Do not stop at one page</h2>
          <div>
            <Link href="/blog/how-to-play-palworld-card-game"><span>First game</span><strong>Learn setup, turns and combat →</strong></Link>
            <Link href="/blog/palworld-card-game-deck-building-rules"><span>Deck rules</span><strong>Check colors and copy limits →</strong></Link>
            <Link href="/tools/dawn-of-palpagos-checklist"><span>Collecting</span><strong>Track all BP01 base and parallel cards →</strong></Link>
            {otherDecks.map((otherDeck) => (
              <Link href={`/deck/${otherDeck.slug}`} key={otherDeck.slug}><span>Another deck</span><strong>{otherDeck.name} →</strong></Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
