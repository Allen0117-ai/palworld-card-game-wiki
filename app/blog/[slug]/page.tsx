import { notFound } from "next/navigation";
import Link from "next/link";
import { guides } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return {};
  return { title: `${guide.title} – Palworld TCG Guide`, description: guide.description };
}

const guideContent: Record<string, React.ReactNode> = {
  "how-to-play-palworld-card-game": (
    <>
      <h2>The goal</h2><p>Reduce your opponent’s life to zero by attacking with Pals. Each player brings a 50-card Main Deck and a separate 10-card Soul Deck.</p>
      <h2>The five card types</h2><ul><li><strong>Pals</strong> fight and work at your base.</li><li><strong>Gear</strong> strengthens a Pal.</li><li><strong>Events</strong> create one-time effects.</li><li><strong>Structures</strong> stay at your base and create value.</li><li><strong>Souls</strong> pay card and ability costs.</li></ul>
      <h2>Your turn</h2><p>A turn moves through Stand, Draw, Soul, Main and End. Most decisions happen in the Main Phase, when you play cards, assign Pals, activate effects and attack.</p>
      <div className="callout"><strong>Beginner tip:</strong> Play the trial deck unchanged for a few games before replacing cards. You will understand each slot much faster.</div>
    </>
  ),
  "palworld-tcg-rarity-guide": (
    <>
      <h2>Base rarities</h2><p>The Dawn of Palpagos booster uses C, U, R and RR for its base cards. These labels describe how cards are distributed, not automatically how strong they are in a deck.</p>
      <h2>Parallel cards</h2><p>The launch products also include parallel versions with alternate treatments. Official card listings show labels such as SR, OSR, SP and SSP, while trial decks include TSR and TSP variants.</p>
      <h2>Collect carefully</h2><p>Condition, language, scarcity and collector demand can all affect value. Wait for completed marketplace sales before treating a listing price as a real market price.</p>
    </>
  ),
  "dawn-of-palpagos-pull-rates": (
    <>
      <h2>What is confirmed</h2><p>The first booster set contains 100 base card types plus 61 parallel card types. A booster pack contains seven cards and a box contains twelve packs.</p>
      <h2>What is not confirmed</h2><p>Bushiroad has not published complete pull odds for each rarity. Early box openings are useful observations, but a few boxes are not enough to claim a dependable rate.</p>
      <h2>How we will track it</h2><p>We will separate official guarantees from community-observed results and always show the sample size. That prevents guesses from being presented as facts.</p>
      <div className="callout"><strong>Tracker status:</strong> Waiting for a larger verified launch-week sample before publishing percentages.</div>
    </>
  ),
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return (
    <article className="article-shell">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, author: { "@type": "Organization", name: "Palworld Card Game Wiki" }, mainEntityOfPage: `https://palworldcardgame.wiki/blog/${guide.slug}` }} />
      <p className="eyebrow"><span>{guide.category}</span> · {guide.readTime}</p>
      <h1>{guide.title}</h1>
      <p className="article-lede">{guide.description}</p>
      {guideContent[guide.slug]}
      <h2>Keep exploring</h2>
      <p>Use the card database for launch-set details or test your own list in the free deck builder.</p>
      <Link className="button primary" href="/cards">Browse cards</Link>{" "}
      <Link className="button ghost" href="/tools/deck-builder">Build a deck</Link>
    </article>
  );
}
