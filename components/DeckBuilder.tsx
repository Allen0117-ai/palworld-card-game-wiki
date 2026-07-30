"use client";

import { useMemo, useState } from "react";
import { cards, getInitials } from "@/lib/data";

type DeckMap = Record<string, number>;

export function DeckBuilder() {
  const [deck, setDeck] = useState<DeckMap>({});
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("all");
  const [notice, setNotice] = useState("");
  const total = Object.values(deck).reduce((sum, value) => sum + value, 0);
  const deckCards = cards.filter((card) => deck[card.slug]);
  const selectedColors = useMemo(() => new Set(deckCards.filter((card) => card.color !== "colorless").map((card) => card.color)), [deckCards]);
  const visible = cards.filter((card) => card.name.toLowerCase().includes(query.toLowerCase()) && (color === "all" || card.color === color));

  function addCard(slug: string) {
    const card = cards.find((item) => item.slug === slug);
    if (!card || total >= 50 || (deck[slug] || 0) >= 4) return;
    if (card.color !== "colorless" && !selectedColors.has(card.color) && selectedColors.size >= 2) {
      setNotice("A legal main deck can use no more than two colors.");
      return;
    }
    setDeck((current) => ({ ...current, [slug]: (current[slug] || 0) + 1 }));
    setNotice("");
  }

  function removeCard(slug: string) {
    setDeck((current) => {
      const next = { ...current };
      if ((next[slug] || 0) <= 1) delete next[slug]; else next[slug] -= 1;
      return next;
    });
  }

  function saveDeck() {
    localStorage.setItem("pwcg-deck-draft", JSON.stringify(deck));
    setNotice("Draft saved on this device.");
  }

  function loadDeck() {
    const saved = localStorage.getItem("pwcg-deck-draft");
    if (saved) { setDeck(JSON.parse(saved)); setNotice("Saved draft loaded."); }
    else setNotice("No saved draft found yet.");
  }

  function beginDrag(event: React.DragEvent, slug: string) {
    event.dataTransfer.setData("text/plain", slug);
    event.dataTransfer.effectAllowed = "copy";
  }

  function dropCard(event: React.DragEvent) {
    event.preventDefault();
    addCard(event.dataTransfer.getData("text/plain"));
  }

  return (
    <div className="builder-layout shell">
      <section className="builder-panel">
        <div className="builder-toolbar">
          <input className="input" aria-label="Search card pool" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search launch cards…" />
          <select className="select" aria-label="Filter by color" value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="all">All colors</option><option value="red">Red</option><option value="blue">Blue</option>
            <option value="green">Green</option><option value="purple">Purple</option><option value="colorless">Colorless</option>
          </select>
        </div>
        <div className="builder-card-list">
          {visible.map((card) => (
            <button className="builder-card" key={card.slug} onClick={() => addCard(card.slug)} draggable onDragStart={(event) => beginDrag(event, card.slug)} aria-label={`Add ${card.name}`}>
              <span className={`builder-art art-${card.color}`}>{getInitials(card.name)}</span>
              <strong>{card.name}</strong>
              <small>{card.number} · Cost {card.cost}</small>
            </button>
          ))}
        </div>
      </section>
      <aside className="deck-panel" onDragOver={(event) => event.preventDefault()} onDrop={dropCard}>
        <p className="eyebrow">Main deck</p>
        <h2>Untitled deck</h2>
        <div className="deck-progress"><span style={{ width: `${Math.min(total / 50 * 100, 100)}%` }} /></div>
        <div className="deck-status"><span>{total} / 50 cards</span><span>{selectedColors.size} / 2 colors</span></div>
        <div className="deck-rows" aria-label="Drop cards here or click cards to add">
          {deckCards.length === 0 && <div className="empty-state">Click a card to add it.</div>}
          {deckCards.map((card) => (
            <div className="deck-row" key={card.slug}>
              <div><strong>{card.name}</strong><br /><small>{card.color} · {card.cost} cost</small></div>
              <div className="qty-controls">
                <button onClick={() => removeCard(card.slug)} aria-label={`Remove ${card.name}`}>−</button>
                <span>{deck[card.slug]}</span>
                <button onClick={() => addCard(card.slug)} aria-label={`Add another ${card.name}`}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="builder-actions">
          <button className="button primary" onClick={saveDeck}>Save draft</button>
          <button className="button ghost" onClick={loadDeck}>Load saved deck</button>
          <button className="button ghost" onClick={() => { setDeck({}); setNotice("Deck cleared."); }}>Clear deck</button>
        </div>
        <p className="save-note" aria-live="polite">{notice}</p>
      </aside>
    </div>
  );
}
