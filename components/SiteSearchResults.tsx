"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { cards, decks, getCardImageAlt, guides } from "@/lib/data";
import { rankSearchItems, scoreSearchText } from "@/lib/search";
import { ruleAnswers, type RuleAnswer } from "@/lib/rules";

const searchablePages = [
  {
    href: "/cards/pals",
    label: "Card database",
    title: "Palworld Pals in the Official Card Game",
    description: "Browse every launch Pal card by name, set, color, cost and rarity.",
    searchText: "palworld pals pal cards pal list tcg official card game",
  },
  {
    href: "/tools/dawn-of-palpagos-checklist",
    label: "Collection tool",
    title: "Dawn of Palpagos Card Checklist",
    description: "Track all 100 BP01 base cards, 61 parallels and the special Soul.",
    searchText: "dawn of palpagos bp01 checklist tracker collection chase cards parallels ssp",
  },
];

function AnswerSourceLink({ answer }: { answer: RuleAnswer }) {
  if (answer.sourceUrl.startsWith("/")) {
    return <Link href={answer.sourceUrl}>{answer.sourceLabel} →</Link>;
  }
  return <a href={answer.sourceUrl} target="_blank" rel="noreferrer">{answer.sourceLabel} ↗</a>;
}

export function SiteSearchResults({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const normalized = query.trim().toLowerCase();

  const answerResults = useMemo(() => normalized ? rankSearchItems(
    ruleAnswers,
    normalized,
    (answer) => `${answer.question} ${answer.answer} ${answer.category} ${answer.searchTerms.join(" ")} ${answer.cardNumbers.join(" ")}`,
    (answer) => (answer.featured ? 18 : 0) + Math.min(60, scoreSearchText(normalized, answer.question) * 0.5),
  ).slice(0, 8) : [], [normalized]);

  const cardResults = useMemo(() => normalized ? rankSearchItems(
    cards,
    normalized,
    (card) => `${card.name} ${card.subtitle} ${card.number} ${card.ability} ${card.color} ${card.type} ${card.setName}`,
  ) : [], [normalized]);

  const guideResults = useMemo(() => normalized ? rankSearchItems(
    guides,
    normalized,
    (guide) => `${guide.title} ${guide.description} ${guide.category} ${guide.sourceStatus}`,
  ) : [], [normalized]);

  const pageResults = useMemo(() => normalized ? rankSearchItems(
    searchablePages,
    normalized,
    (page) => `${page.title} ${page.description} ${page.searchText}`,
  ) : [], [normalized]);

  const deckResults = useMemo(() => normalized ? rankSearchItems(
    decks,
    normalized,
    (deck) => `${deck.name} ${deck.description} ${deck.archetype} ${deck.status}`,
  ) : [], [normalized]);

  const hasResults = answerResults.length + cardResults.length + guideResults.length + deckResults.length + pageResults.length > 0;

  return (
    <div className="search-center shell">
      <form className="search-page-form" role="search" action="/search">
        <label htmlFor="site-search">Search cards, rules, decks and buying guides</label>
        <div>
          <input id="site-search" name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask “Can I attack on the first turn?”" />
          <button type="submit">Search</button>
        </div>
      </form>

      {!normalized && (
        <div className="search-suggestions">
          <span>Popular today:</span>
          {["How many cards are in a deck?", "Can I attack first turn?", "What should I buy?", "What does Interrupt do?", "pull rates"].map((suggestion) => (
            <button type="button" key={suggestion} onClick={() => setQuery(suggestion)}>{suggestion}</button>
          ))}
        </div>
      )}

      {normalized && !hasResults && (
        <div className="search-empty">
          <strong>No confident answer yet.</strong>
          <p>Try a card number or shorter phrase, or send the exact question so we can cover it next.</p>
          <a className="button primary" href={`mailto:paweyan163@gmail.com?subject=${encodeURIComponent("Palworld Card Game question")}&body=${encodeURIComponent(`I searched: ${query.trim()}`)}`}>Submit this question</a>
        </div>
      )}

      {normalized && answerResults.length > 0 && (
        <section className="search-group answer-search-group" aria-live="polite">
          <div className="search-group-heading"><h2>Direct answers</h2><span>{answerResults.length}</span></div>
          <div className="direct-answer-list">
            {answerResults.map((answer, index) => (
              <article className="direct-answer" key={answer.id}>
                <span>{index === 0 ? "Best match" : answer.category}</span>
                <h3>{answer.question}</h3>
                <p>{answer.answer}</p>
                <footer>
                  <AnswerSourceLink answer={answer} />
                  {answer.guideUrl && <Link href={answer.guideUrl}>Full guide →</Link>}
                </footer>
              </article>
            ))}
          </div>
          <Link className="text-link" href={`/rules?q=${encodeURIComponent(query.trim())}`}>Search the complete rules &amp; Q&amp;A center →</Link>
        </section>
      )}

      {normalized && pageResults.length > 0 && (
        <section className="search-group">
          <div className="search-group-heading"><h2>Collections &amp; tools</h2><span>{pageResults.length}</span></div>
          <div className="search-result-list">
            {pageResults.map((page) => (
              <Link href={page.href} key={page.href}>
                <span>{page.label}</span>
                <strong>{page.title}</strong>
                <p>{page.description}</p>
              </Link>
            ))}
          </div>
        </section>
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
              <Link href={`/card/${card.slug}`} key={card.slug}>
                <Image src={card.image} alt={getCardImageAlt(card)} width={80} height={112} loading="lazy" />
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
