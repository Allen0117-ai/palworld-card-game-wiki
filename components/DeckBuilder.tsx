"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { cards, getCardImageAlt } from "@/lib/data";
import { SharePanel } from "@/components/SharePanel";
import { encodeDeckList, normalizeStoredDeck, sanitizeDeckName, type DeckMap } from "@/lib/deck-share";
import { DECK_DRAFT_STORAGE_KEY } from "@/lib/progress-storage";
import { trackUserAction } from "@/lib/user-action-analytics";

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
  const [isDeckPanelOpen, setIsDeckPanelOpen] = useState(false);
  const [openingHand, setOpeningHand] = useState<string[]>([]);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const total = Object.values(deck).reduce((sum, value) => sum + value, 0);
  const deckCards = cards.filter((card) => deck[card.slug]);
  const selectedColors = useMemo(() => new Set(deckCards.filter((card) => card.color !== "colorless").map((card) => card.color)), [deckCards]);
  const luckyCount = deckCards
    .filter((card) => card.subtype?.includes("Lucky"))
    .reduce((sum, card) => sum + (deck[card.slug] || 0), 0);
  const typeCounts = deckCards.reduce<Record<string, number>>((counts, card) => {
    counts[card.type] = (counts[card.type] || 0) + (deck[card.slug] || 0);
    return counts;
  }, {});
  const costCurve = deckCards.reduce<Record<number, number>>((counts, card) => {
    counts[card.cost] = (counts[card.cost] || 0) + (deck[card.slug] || 0);
    return counts;
  }, {});
  const highestCostCount = Math.max(1, ...Object.values(costCurve));
  const isLegalMainDeck = total === 50 && selectedColors.size <= 2 && luckyCount <= 8;
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

  useEffect(() => {
    if (!isDeckPanelOpen) return;
    mobileCloseButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDeckPanelOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isDeckPanelOpen]);

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
    if (card.subtype?.includes("Lucky") && luckyCount >= 8) {
      setNotice("A legal main deck can use no more than eight Lucky cards.");
      return;
    }
    setDeck((current) => ({ ...current, [slug]: (current[slug] || 0) + 1 }));
    setOpeningHand([]);
    setNotice("");
    trackUserAction("deck_add_card", { card: card.number, total: total + 1 });
  }

  function removeCard(slug: string) {
    setDeck((current) => {
      const next = { ...current };
      if ((next[slug] || 0) <= 1) delete next[slug]; else next[slug] -= 1;
      return next;
    });
    setOpeningHand([]);
  }

  function saveDeck() {
    localStorage.setItem(DECK_DRAFT_STORAGE_KEY, JSON.stringify({ version: 1, deck, name: deckName }));
    setNotice("Draft saved on this device.");
    trackUserAction("deck_save", { total, legal: isLegalMainDeck });
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

  function drawOpeningHand() {
    if (total !== 50) {
      setNotice("Complete the 50-card Main Deck before testing an opening hand.");
      return;
    }

    const shuffledCards = deckCards.flatMap((card) => Array.from(
      { length: deck[card.slug] || 0 },
      () => `${card.name}${card.subtitle ? ` — ${card.subtitle}` : ""}`,
    ));
    for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffledCards[index], shuffledCards[randomIndex]] = [shuffledCards[randomIndex], shuffledCards[index]];
    }
    setOpeningHand(shuffledCards.slice(0, 5));
    setNotice("Opening hand drawn. Draw again to test another five cards.");
    trackUserAction("deck_test_hand", { total });
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
      <aside
        id="deck-summary"
        className={`deck-panel${isDeckPanelOpen ? " mobile-open" : ""}`}
        onDragOver={(event) => event.preventDefault()}
        onDrop={dropCard}
      >
        <button ref={mobileCloseButtonRef} className="mobile-deck-close" type="button" onClick={() => setIsDeckPanelOpen(false)} aria-label="Close deck summary">×</button>
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
        <div className="deck-status"><span>{total} / 50 cards</span><span>{selectedColors.size} / 2 colors</span><span>{luckyCount} / 8 Lucky</span></div>
        <p className={`deck-legality${isLegalMainDeck ? " is-legal" : ""}`}>
          {isLegalMainDeck ? "Main Deck ready · Add a separate 10-card Soul Deck to play." : `${Math.max(0, 50 - total)} cards left · Main Deck only`}
        </p>
        {deckCards.length > 0 ? (
          <div className="deck-breakdown" aria-label="Deck statistics">
            <div className="deck-type-counts">
              {(["Pal", "Gear", "Event", "Structure"] as const).map((cardType) => (
                <span key={cardType}><strong>{typeCounts[cardType] || 0}</strong>{cardType}</span>
              ))}
            </div>
            <div className="deck-cost-curve" aria-label="Card cost curve">
              {Array.from({ length: 11 }, (_, costValue) => (
                <span key={costValue} title={`Cost ${costValue}: ${costCurve[costValue] || 0} cards`}>
                  <i style={{ height: `${Math.max(4, ((costCurve[costValue] || 0) / highestCostCount) * 42)}px` }} />
                  <small>{costValue}</small>
                </span>
              ))}
            </div>
          </div>
        ) : null}
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
        {openingHand.length ? (
          <div className="opening-hand" aria-live="polite">
            <strong>Opening hand</strong>
            <ol>{openingHand.map((cardName, index) => <li key={`${cardName}-${index}`}>{cardName}</li>)}</ol>
          </div>
        ) : null}
        <div className="builder-actions">
          <button className="button primary" onClick={saveDeck}>Save draft</button>
          <button className="button ghost" onClick={drawOpeningHand} disabled={total !== 50}>Test opening hand</button>
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
          <button className="button ghost" onClick={() => { setDeck({}); setOpeningHand([]); setNotice("Deck cleared."); }}>Clear deck</button>
        </div>
        <p className="save-note" aria-live="polite">{notice}</p>
      </aside>
      {isDeckPanelOpen ? <button className="mobile-deck-backdrop" type="button" onClick={() => setIsDeckPanelOpen(false)} aria-label="Close deck summary" /> : null}
      <button
        className="mobile-deck-bar"
        type="button"
        aria-controls="deck-summary"
        aria-expanded={isDeckPanelOpen}
        onClick={() => {
          setIsDeckPanelOpen(true);
          trackUserAction("deck_open_summary", { total, colors: selectedColors.size });
        }}
      >
        <span><strong>{total}/50</strong> cards</span>
        <span><strong>{selectedColors.size}/2</strong> colors</span>
        <span>View deck ↑</span>
      </button>
    </div>
  );
}
