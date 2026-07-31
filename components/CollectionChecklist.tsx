"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type CollectionChecklistCard = {
  number: string;
  baseNumber: string;
  name: string;
  rarity: string;
  color: string;
  type: string;
  isParallel: boolean;
  href?: string;
};

type CollectionStatus = "all" | "missing" | "owned";
type ChecklistScope = "all" | "base" | "parallel" | "soul";

const storageKey = "palworld-bp01-collection-v1";

export function CollectionChecklist({ cards }: { cards: CollectionChecklistCard[] }) {
  const [ownedNumbers, setOwnedNumbers] = useState<Set<string>>(new Set());
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<ChecklistScope>("all");
  const [color, setColor] = useState("all");
  const [rarity, setRarity] = useState("all");
  const [status, setStatus] = useState<CollectionStatus>("all");
  const validNumbers = useMemo(() => new Set(cards.map((card) => card.number)), [cards]);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      const savedChecklist = window.localStorage.getItem(storageKey);
      if (savedChecklist) {
        try {
          const savedNumbers = JSON.parse(savedChecklist);
          if (!Array.isArray(savedNumbers)) throw new TypeError("Saved checklist must be an array");
          setOwnedNumbers(new Set(savedNumbers.filter((number): number is string => (
            typeof number === "string" && validNumbers.has(number)
          ))));
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }
      setHasLoaded(true);
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [validNumbers]);

  useEffect(() => {
    if (!hasLoaded) return;
    window.localStorage.setItem(storageKey, JSON.stringify([...ownedNumbers]));
  }, [hasLoaded, ownedNumbers]);

  const colors = useMemo(() => [...new Set(cards.map((card) => card.color))].sort(), [cards]);
  const rarities = useMemo(() => [...new Set(cards.map((card) => card.rarity))], [cards]);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleCards = cards.filter((card) => {
    const matchesQuery = !normalizedQuery
      || card.name.toLowerCase().includes(normalizedQuery)
      || card.number.toLowerCase().includes(normalizedQuery);
    const matchesScope = scope === "all"
      || (scope === "base" && !card.isParallel)
      || (scope === "parallel" && card.isParallel && card.type !== "Soul")
      || (scope === "soul" && card.type === "Soul");
    const matchesColor = color === "all" || card.color === color;
    const matchesRarity = rarity === "all" || card.rarity === rarity;
    const isOwned = ownedNumbers.has(card.number);
    const matchesStatus = status === "all" || (status === "owned" ? isOwned : !isOwned);
    return matchesQuery && matchesScope && matchesColor && matchesRarity && matchesStatus;
  });

  function toggleCard(cardNumber: string) {
    setOwnedNumbers((currentNumbers) => {
      const nextNumbers = new Set(currentNumbers);
      if (nextNumbers.has(cardNumber)) nextNumbers.delete(cardNumber);
      else nextNumbers.add(cardNumber);
      return nextNumbers;
    });
  }

  function clearChecklist() {
    if (!window.confirm("Clear every checked card from this device?")) return;
    setOwnedNumbers(new Set());
  }

  const ownedCount = ownedNumbers.size;
  const completion = Math.round((ownedCount / cards.length) * 100);

  return (
    <section className="collection-checklist shell" aria-labelledby="collection-checklist-title">
      <div className="checklist-progress-panel">
        <div>
          <p className="eyebrow"><span>Your collection</span> · Saved on this device</p>
          <h2 id="collection-checklist-title">{ownedCount} of {cards.length} cards</h2>
          <p aria-live="polite">{completion}% complete · {cards.length - ownedCount} remaining</p>
        </div>
        <div
          className="checklist-progress-track"
          role="progressbar"
          aria-label="Dawn of Palpagos collection completion"
          aria-valuemin={0}
          aria-valuemax={cards.length}
          aria-valuenow={ownedCount}
        >
          <span style={{ width: `${completion}%` }} />
        </div>
      </div>

      <div className="checklist-toolbar">
        <label className="checklist-search">
          <span>Search cards</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name or card number"
          />
        </label>
        <label>
          <span>Card group</span>
          <select value={scope} onChange={(event) => setScope(event.target.value as ChecklistScope)}>
            <option value="all">All cards</option>
            <option value="base">100 base cards</option>
            <option value="parallel">61 parallel cards</option>
            <option value="soul">Special Soul</option>
          </select>
        </label>
        <label>
          <span>Color</span>
          <select value={color} onChange={(event) => setColor(event.target.value)}>
            <option value="all">All colors</option>
            {colors.map((cardColor) => <option value={cardColor} key={cardColor}>{cardColor}</option>)}
          </select>
        </label>
        <label>
          <span>Rarity</span>
          <select value={rarity} onChange={(event) => setRarity(event.target.value)}>
            <option value="all">All rarities</option>
            {rarities.map((cardRarity) => <option value={cardRarity} key={cardRarity}>{cardRarity}</option>)}
          </select>
        </label>
      </div>

      <div className="checklist-status-tabs" aria-label="Filter by collection status">
        {(["all", "missing", "owned"] as const).map((collectionStatus) => (
          <button
            type="button"
            className={status === collectionStatus ? "is-active" : ""}
            aria-pressed={status === collectionStatus}
            onClick={() => setStatus(collectionStatus)}
            key={collectionStatus}
          >
            {collectionStatus}
          </button>
        ))}
        <button className="checklist-clear" type="button" onClick={clearChecklist} disabled={!ownedCount}>Clear checklist</button>
      </div>

      <p className="checklist-result-count">{visibleCards.length} cards shown</p>
      <div className="checklist-card-list">
        {visibleCards.map((card) => {
          const isOwned = ownedNumbers.has(card.number);
          const checkboxId = `collection-${card.number.toLowerCase()}`;
          return (
            <div className={`checklist-card-row${isOwned ? " is-owned" : ""}`} key={card.number}>
              <input
                id={checkboxId}
                type="checkbox"
                checked={isOwned}
                onChange={() => toggleCard(card.number)}
                aria-label={`Mark ${card.name} ${card.number} as ${isOwned ? "missing" : "owned"}`}
              />
              <label htmlFor={checkboxId}>
                <span className={`checklist-rarity rarity-${card.rarity.toLowerCase().replace("/", "-")}`}>{card.rarity}</span>
                <span className="checklist-card-copy">
                  <strong>{card.name}</strong>
                  <small>{card.number} · {card.color} · {card.type}</small>
                </span>
              </label>
              {card.href ? <Link href={card.href}>View card →</Link> : <span />}
            </div>
          );
        })}
      </div>
      {!visibleCards.length ? <p className="checklist-empty">No cards match these filters.</p> : null}
    </section>
  );
}
