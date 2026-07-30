import type { Metadata } from "next";
import { SiteSearchResults } from "@/components/SiteSearchResults";

export const metadata: Metadata = {
  title: "Search Palworld Card Game Cards, Rules & Guides",
  description: "Ask natural-language questions or search the complete Palworld Card Game launch card pool, official Q&A, guides, products and decks.",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return (
    <>
      <header className="page-hero shell">
        <p className="eyebrow"><span>One search</span> · Cards, rules, decks & products</p>
        <h1>Find the answer,<br />not another menu.</h1>
        <p>Ask a full question or search a card name, number, printed ability, rule, Trial Deck or launch product. The clearest sourced answer appears first.</p>
      </header>
      <SiteSearchResults initialQuery={q} />
    </>
  );
}
