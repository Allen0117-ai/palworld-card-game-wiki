"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type DeckPreview = {
  slug: string;
  name: string;
  colors: string[];
  archetype: string;
  status: string;
  description: string;
  hasRecipe: boolean;
  previewCards: {
    slug: string;
    image: string;
    imageAlt: string;
    isStructure: boolean;
  }[];
};

export function DeckExplorer({ decks }: { decks: DeckPreview[] }) {
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("all");
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return decks
      .filter((deck) => {
        const searchableText = `${deck.name} ${deck.description} ${deck.archetype}`.toLowerCase();
        return searchableText.includes(normalizedQuery) && (color === "all" || deck.colors.some((deckColor) => deckColor === color));
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [decks, query, color]);

  return (
    <div className="shell deck-explorer">
      <div className="deck-toolbar">
        <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search decks…" aria-label="Search decks" />
        <select className="select" value={color} onChange={(event) => setColor(event.target.value)} aria-label="Filter decks by color">
          <option value="all">All colors</option><option value="red">Red</option><option value="blue">Blue</option>
          <option value="green">Green</option><option value="purple">Purple</option>
        </select>
        <Link className="deck-data-note" href="/blog/palworld-tcg-tournament-decklists">
          Launch card data · Early official results available
        </Link>
      </div>
      <div className="deck-page-grid">
        {results.map((deck) => {
          return (
            <article className="deck-page-card" key={deck.slug}>
              <div className="deck-page-card-art" aria-label={`${deck.name} featured cards`}>
                {deck.previewCards.map((card) => (
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    width={400}
                    height={card.isStructure ? 286 : 559}
                    sizes="(max-width: 520px) 28vw, 120px"
                    loading="lazy"
                    key={card.slug}
                  />
                ))}
              </div>
              <div className="color-pips">{deck.colors.map((deckColor) => <span className={`pip ${deckColor}`} key={deckColor} />)}</div>
              <span className="source-badge">{deck.status}</span>
              <h2>{deck.name}</h2>
              <p>{deck.description}</p>
              <div className="deck-page-card-facts">
                <span>3-step walkthrough</span>
                <span>3 visual combos</span>
                <span>{deck.hasRecipe ? "50-card beginner deck" : "24-card verified pool"}</span>
              </div>
              <Link className="text-link" href={`/deck/${deck.slug}`}>View illustrated deck guide →</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
