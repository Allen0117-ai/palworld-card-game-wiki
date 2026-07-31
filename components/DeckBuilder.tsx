"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { cards, getCardImageAlt } from "@/lib/data";
import { SharePanel } from "@/components/SharePanel";
import { encodeDeckList, normalizeStoredDeck, sanitizeDeckName, type DeckMap } from "@/lib/deck-share";
import { DECK_DRAFT_STORAGE_KEY } from "@/lib/progress-storage";

function readSavedDraft() {
  const saved = localStorage.getItem(DECK_DRAFT_STORAGE_KEY);
  if (!saved) return null;

  const parsedDraft: unknown = JSON.parse(saved);
  const storedDeck = parsedDraft && typeof parsedDraft === "object" && "deck" in parsedDraft
    ? normalizeStoredDeck(parsedDraft.deck)
    : normalizeStoredDeck(parsedDraft);
  if (!storedDeck) return null;

  const storedName = parsedDraft && typeof parsedDraft === "object" && "name" in parsedDraft && typeof parsedDraft.name === "string"
    ? sanitizeDeckName(parsedDraft.name)
    : "Untitled deck";
  return { deck: storedDeck, name: storedName };
}

export function DeckBuilder({
  initialDeck = {},
  initialName = "Untitled deck",
  isSharedDeck = false,
  resumeSavedDraft = false,
}: {
  initialDeck?: DeckMap;
  initialName?: string;
  isSharedDeck?: boolean;
  resumeSavedDraft?: boolean;
}) {
  const [deck, setDeck] = useState<DeckMap>(initialDeck);
  const [deckName, setDeckName] = useState(() => sanitizeDeckName(initialName));
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("all");
  const [set, setSet] = useState("all");
  const [notice, setNotice] = useState(isSharedDeck ? "Shared deck loaded — change any card and make it yours." : "");
  const total = Object.values(deck).reduce((sum, value) => sum + value, 0);
  const deckCards = cards.filter((card) => deck[card.slug]);
  const selectedColors = useMemo(() => new Set(deckCards.filter((card) => card.color !== "colorless").map((card) => card.color)), [deckCards]);
  const shareCards = [...deckCards]
    .sort((firstCard, secondCard) => (deck[secondCard.slug] - deck[firstCard.slug]) || secondCard.cost - firstCard.cost)
    .slice(0, 4);
  const encodedDeck = encodeDeckList(deck);
  const shareParameters = new URLSearchParams({ list: encodedDeck, name: deckName });
  const sharePath = `/tools/deck-builder?${shareParameters.toString()}`;
  const visible = cards.filter((card) => (
    `${card.name} ${card.subtitle} ${card.number}`.toLowerCase().includes(query.toLowerCase())
    && (color === "all" || card.color === color)
    && (set === "all" || card.set === set)
  ));

  useEffect(() => {
    if (!resumeSavedDraft) return;
    const resumeTimer = window.setTimeout(() => {
      try {
        const savedDraft = readSavedDraft();
        if (!savedDraft) {
          setNotice("No saved draft found yet.");
          return;
        }
        setDeck(savedDraft.deck);
        setDeckName(savedDraft.name);
        setNotice("Welcome back — your saved draft is ready.");
      } catch {
        setNotice("That saved draft could not be read. Start a new list below.");
      }
    }, 0);

    return () => window.clearTimeout(resumeTimer);
  }, [resumeSavedDraft]);

  function addCard(slug: string) {
    const card = cards.find((item) => item.slug === slug);
    if (!card || total >= 50) return;
    const cardName = `${card.name} — ${card.subtitle}`;
    const copiesWithSameName = deckCards
      .filter((item) => `${item.name} — ${item.subtitle}` === cardName)
      .reduce((sum, item) => sum + (deck[item.slug] || 0), 0);
    if (copiesWithSameName >= 4) {
      setNotice("You can use up to four cards with the same full card name.");
      return;
    }
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
    localStorage.setItem(DECK_DRAFT_STORAGE_KEY, JSON.stringify({ version: 1, deck, name: deckName }));
    setNotice("Draft saved on this device.");
  }

  function loadDeck() {
    try {
      const savedDraft = readSavedDraft();
      if (!savedDraft) {
        setNotice("No saved draft found yet.");
        return;
      }
      setDeck(savedDraft.deck);
      setDeckName(savedDraft.name);
      setNotice("Saved draft loaded.");
    } catch {
      setNotice("That saved draft could not be read. Clear it and start a new list.");
    }
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
          <select className="select" aria-label="Filter by set" value={set} onChange={(e) => setSet(e.target.value)}>
            <option value="all">All 148 cards</option>
            <option value="EBP01">BP01</option>
            <option value="ETD01">Red / Blue TD</option>
            <option value="ETD02">Green / Purple TD</option>
          </select>
        </div>
        <p className="builder-result-count">{visible.length} cards shown · Official launch card data updated July 30, 2026</p>
        <div className="builder-card-list">
          {visible.map((card) => (
            <button className="builder-card" key={card.slug} onClick={() => addCard(card.slug)} draggable onDragStart={(event) => beginDrag(event, card.slug)} aria-label={`Add ${card.name}`}>
              <span className={`builder-art${card.type === "Structure" ? " builder-art-landscape" : ""}`}>
                <Image src={card.image} alt={getCardImageAlt(card)} width={400} height={card.type === "Structure" ? 286 : 559} loading="lazy" />
              </span>
              <strong>{card.name}</strong>
              <small>{card.number} · Cost {card.cost}</small>
            </button>
          ))}
        </div>
      </section>
      <aside className="deck-panel" onDragOver={(event) => event.preventDefault()} onDrop={dropCard}>
        <p className="eyebrow">Main deck</p>
        <input
          className="deck-name-input"
          value={deckName}
          onChange={(event) => setDeckName(sanitizeDeckName(event.target.value, ""))}
          onBlur={() => setDeckName((currentName) => sanitizeDeckName(currentName))}
          aria-label="Deck name"
          maxLength={52}
        />
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
          <SharePanel
            assetKey={`deck-${encodedDeck}-${deckName}`}
            triggerLabel={total === 50 ? "Share deck" : "Share draft"}
            shareUrl={sharePath}
            shareText={`I built “${deckName}” in the Palworld TCG deck builder. Open it, remix it, and show me your version.`}
            disabled={total === 0}
            payload={{
              kind: "deck",
              eyebrow: total === 50 ? "Ready-to-play deck" : "Deck builder draft",
              title: deckName,
              total,
              colors: Array.from(selectedColors),
              cards: shareCards.map((card) => ({
                image: card.image,
                name: card.name,
                copies: deck[card.slug],
              })),
            }}
          />
          <button className="button ghost" onClick={loadDeck}>Load saved deck</button>
          <button className="button ghost" onClick={() => { setDeck({}); setNotice("Deck cleared."); }}>Clear deck</button>
        </div>
        <p className="save-note" aria-live="polite">{notice}</p>
      </aside>
    </div>
  );
}
