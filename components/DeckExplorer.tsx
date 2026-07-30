"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { decks } from "@/lib/data";

export function DeckExplorer() {
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("all");
  const results = useMemo(() => decks
    .filter((deck) => deck.name.toLowerCase().includes(query.toLowerCase()) && (color === "all" || deck.colors.includes(color as never)))
    .sort((a, b) => a.name.localeCompare(b.name)), [query, color]);

  return (
    <div className="shell deck-explorer">
      <div className="deck-toolbar">
        <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search decks…" aria-label="Search decks" />
        <select className="select" value={color} onChange={(event) => setColor(event.target.value)} aria-label="Filter decks by color">
          <option value="all">All colors</option><option value="red">Red</option><option value="blue">Blue</option>
          <option value="green">Green</option><option value="purple">Purple</option>
        </select>
        <div className="deck-data-note">Launch-day verified · No fake meta ranking</div>
      </div>
      <div className="deck-page-grid">
        {results.map((deck) => (
          <article className="deck-page-card" key={deck.slug}>
            <div className="color-pips">{deck.colors.map((deckColor) => <span className={`pip ${deckColor}`} key={deckColor} />)}</div>
            <span className="source-badge">{deck.status}</span>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <Link className="text-link" href={`/deck/${deck.slug}`}>View deck guide →</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
