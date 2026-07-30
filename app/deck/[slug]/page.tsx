import { notFound } from "next/navigation";
import Link from "next/link";
import { CardTile } from "@/components/CardTile";
import { cards, decks } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export function generateStaticParams() { return decks.map((deck) => ({ slug: deck.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const deck = decks.find((item) => item.slug === slug);
  if (!deck) return {};
  return { title: `${deck.name} · Palworld TCG Deck Guide – Cards, Strategy & Matchups`, description: `Complete guide for ${deck.name} in Palworld TCG, including core cards, how to play and launch-meta advice.` };
}

export default async function DeckDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deck = decks.find((item) => item.slug === slug);
  if (!deck) notFound();
  const core = deck.core.map((cardSlug) => cards.find((card) => card.slug === cardSlug)).filter(Boolean);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: `${deck.name} Palworld TCG Deck Guide`, description: deck.description, author: { "@type": "Organization", name: "Palworld Card Game Wiki" } }} />
      <header className="page-hero shell">
        <div className="color-pips">{deck.colors.map((color) => <span className={`pip ${color}`} key={color} />)}</div>
        <p className="eyebrow"><span>{deck.archetype}</span> · {deck.difficulty}</p>
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
      </header>
      <article className="article-shell">
        <h2>Core cards</h2>
        <div className="card-grid listing">{core.map((card) => card && <CardTile card={card} key={card.slug} />)}</div>
        <h2>How the deck plays</h2>
        <p>Use the early turns to establish efficient Pals and make your Souls work every turn. Do not commit every resource at once—keep enough flexibility to answer the opponent’s strongest turn.</p>
        <h3>Opening plan</h3>
        <p>Prioritize a playable curve over keeping only high-rarity cards. Your first hand should help you develop now and preserve at least one strong follow-up.</p>
        <h3>Closing the game</h3>
        <p>Turn your board advantage into attacks once the opponent has fewer clean defensive options. Sequence Gear and Events after deciding which Pal must connect.</p>
        <div className="callout"><strong>Launch-week note:</strong> The meta is still forming. Treat this as a tested starting shell and update it as tournament lists become available.</div>
        <Link className="button primary" href="/tools/deck-builder">Customize in deck builder</Link>
      </article>
    </>
  );
}
