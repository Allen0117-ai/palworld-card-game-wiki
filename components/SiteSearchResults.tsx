"use client";

import Link from "next/link";
import { useState } from "react";
import { cards, decks, guides } from "@/lib/data";

export function SiteSearchResults({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const normalized = query.trim().toLowerCase();
  const searchTerms = [
    normalized,
    normalized.replaceAll("starter", "trial"),
    normalized.replaceAll("tcg", "card game"),
  ].filter((term, index, values) => term && values.indexOf(term) === index);
  const matches = (text: string) => searchTerms.some((term) => text.toLowerCase().includes(term));

  const cardResults = cards.filter((card) => (
    matches(`${card.name} ${card.subtitle} ${card.number} ${card.ability} ${card.color} ${card.type}`)
  ));

  const guideResults = guides.filter((guide) => (
    matches(`${guide.title} ${guide.description} ${guide.category}`)
  ));

  const deckResults = decks.filter((deck) => (
    matches(`${deck.name} ${deck.description} ${deck.archetype}`)
  ));

  const hasResults = cardResults.length + guideResults.length + deckResults.length > 0;

  return (
    <div className="search-center shell">
      <form className="search-page-form" role="search" action="/search">
        <label htmlFor="site-search">Search cards, rules, decks and buying guides</label>
        <div>
          <input id="site-search" name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “Interrupt”, “starter deck” or “EBP01-049”…" />
          <button type="submit">Search</button>
        </div>
      </form>

      {!normalized && (
        <div className="search-suggestions">
          <span>Popular today:</span>
          {["how to play", "deck building rules", "starter deck", "Interrupt", "rarity"].map((suggestion) => (
            <button type="button" key={suggestion} onClick={() => setQuery(suggestion)}>{suggestion}</button>
          ))}
        </div>
      )}

      {normalized && !hasResults && (
        <div className="empty-state">No exact result yet. Try a card number, shorter phrase, color or keyword.</div>
      )}

      {normalized && guideResults.length > 0 && (
        <section className="search-group">
          <div className="search-group-heading"><h2>Guides & answers</h2><span>{guideResults.length}</span></div>
          <div className="search-result-list">
            {guideResults.map((guide) => (
              <Link href={`/blog/${guide.slug}`} key={guide.slug}>
                <span>{guide.category}</span>
                <strong>{guide.title}</strong>
                <p>{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {normalized && deckResults.length > 0 && (
        <section className="search-group">
          <div className="search-group-heading"><h2>Deck help</h2><span>{deckResults.length}</span></div>
          <div className="search-result-list">
            {deckResults.map((deck) => (
              <Link href={`/deck/${deck.slug}`} key={deck.slug}>
                <span>{deck.status}</span>
                <strong>{deck.name}</strong>
                <p>{deck.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {normalized && cardResults.length > 0 && (
        <section className="search-group">
          <div className="search-group-heading"><h2>Cards</h2><span>{cardResults.length}</span></div>
          <div className="search-card-results">
            {cardResults.slice(0, 18).map((card) => (
              <Link href={card.hasGuide ? `/card/${card.slug}` : `/cards?q=${encodeURIComponent(card.number)}`} key={card.slug}>
                <img src={card.image} alt="" width={80} height={112} loading="lazy" />
                <div><strong>{card.name}</strong><span>{card.number} · {card.color} · {card.type}</span></div>
              </Link>
            ))}
          </div>
          {cardResults.length > 18 && <Link className="button ghost" href={`/cards?q=${encodeURIComponent(query)}`}>View all {cardResults.length} card results</Link>}
        </section>
      )}
    </div>
  );
}
