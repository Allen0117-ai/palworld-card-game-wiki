import type { Metadata } from "next";
import Link from "next/link";
import { SiteSearchResults } from "@/components/SiteSearchResults";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Search Palworld Cards, Rules & Guides",
  description: "Ask natural-language questions or search the complete Palworld Card Game launch card pool, official Q&A, guides, products and decks.",
  path: "/search",
  absoluteTitle: true,
});

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const hasQuery = Boolean(q.trim());

  return (
    <>
      <header className={`page-hero search-page-hero shell${hasQuery ? " has-query" : ""}`}>
        <div className="search-query-desktop-copy">
          <p className="eyebrow"><span>One search</span> · Cards, rules, decks &amp; products</p>
          <h1>Find the answer,<br />not another menu.</h1>
          <p>Ask a full question or search a card name, number, printed ability, rule, Trial Deck or launch product. The clearest sourced answer appears first.</p>
        </div>
        {hasQuery && <h1 className="search-query-mobile-title">Search results.</h1>}
      </header>
      <SiteSearchResults initialQuery={q} />
      <section className="search-explainer shell" aria-labelledby="search-explainer-title">
        <p className="eyebrow"><span>Search the wiki</span> · Start with what you know</p>
        <h2 id="search-explainer-title">What can you search on Palpagos Archive?</h2>
        <p>Use a card name, card number, rules question, deck name or product name. Results can take you straight to card details, official rulings, deck lists and buying guides.</p>
        <div className="search-explainer-grid">
          <Link href="/cards"><strong>Cards</strong><span>Find all 148 launch Main Deck cards by name, number, type, color, stats or printed text.</span></Link>
          <Link href="/rules"><strong>Rules</strong><span>Search plain-English essentials and every indexed official Q&amp;A ruling.</span></Link>
          <Link href="/decks"><strong>Decks</strong><span>Open Trial Deck explanations and complete beginner recipes.</span></Link>
          <Link href="/blog"><strong>Guides</strong><span>Find how-to-play, deck-building, product, rarity and collecting answers.</span></Link>
        </div>
      </section>
    </>
  );
}
