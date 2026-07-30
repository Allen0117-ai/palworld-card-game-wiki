import type { Metadata } from "next";
import { SiteSearchResults } from "@/components/SiteSearchResults";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Search Palworld Card Game Cards, Rules & Guides",
  description: "Ask natural-language questions or search the complete Palworld Card Game launch card pool, official Q&A, guides, products and decks.",
  path: "/search",
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
    </>
  );
}
