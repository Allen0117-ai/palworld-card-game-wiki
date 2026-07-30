import type { Metadata } from "next";
import { SiteSearchResults } from "@/components/SiteSearchResults";

export const metadata: Metadata = {
  title: "Search Palworld Card Game Cards, Rules & Guides",
  description: "Search the complete Palworld Card Game launch card pool, beginner rules, Trial Deck guides and product answers in one place.",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return (
    <>
      <header className="page-hero shell">
        <p className="eyebrow"><span>One search</span> · Cards, rules, decks & products</p>
        <h1>Find the answer,<br />not another menu.</h1>
        <p>Search card names and numbers, printed abilities, rules explanations, Trial Deck help and launch buying guides together.</p>
      </header>
      <SiteSearchResults initialQuery={q} />
    </>
  );
}
