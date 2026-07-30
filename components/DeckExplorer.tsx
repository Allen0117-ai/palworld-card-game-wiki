"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { decks } from "@/lib/data";

export function DeckExplorer() {
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("all");
  const [sort, setSort] = useState("score");
  const results = useMemo(() => decks
    .filter((deck) => deck.name.toLowerCase().includes(query.toLowerCase()) && (color === "all" || deck.colors.includes(color as never)))
    .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : b.score - a.score), [query, color, sort]);

  return (
    <div className="shell deck-explorer">
      <div className="deck-toolbar">
        <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search decks…" aria-label="Search decks" />
        <select className="select" value={color} onChange={(event) => setColor(event.target.value)} aria-label="Filter decks by color">
          <option value="all">All colors</option><option value="red">Red</option><option value="blue">Blue</option>
          <option value="green">Green</option><option value="purple">Purple</option>
        </select>
        <select className="select" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort decks">
          <option value="score">Most popular</option><option value="name">Name A–Z</option>
        </select>
      </div>
      <div className="deck-page-grid">
        {results.map((deck) => (
          <article className="deck-page-card" key={deck.slug}>
            <div className="color-pips">{deck.colors.map((deckColor) => <span className={`pip ${deckColor}`} key={deckColor} />)}</div>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <Link className="text-link" href={`/deck/${deck.slug}`}>View deck guide →</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
