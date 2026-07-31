import { cards } from "@/lib/data";

export type DeckMap = Record<string, number>;

const cardsByNumber = new Map(cards.map((card) => [card.number, card]));
const cardsBySlug = new Map(cards.map((card) => [card.slug, card]));

export function encodeDeckList(deck: DeckMap) {
  return Object.entries(deck)
    .map(([slug, copies]) => {
      const card = cardsBySlug.get(slug);
      return card && copies > 0 ? `${card.number}x${copies}` : "";
    })
    .filter(Boolean)
    .sort()
    .join(",");
}

export function decodeDeckList(encodedDeck?: string) {
  if (!encodedDeck || encodedDeck.length > 4000) return {};

  const decodedDeck: DeckMap = {};
  let totalCards = 0;

  for (const entry of encodedDeck.split(",")) {
    const match = /^([A-Z0-9-]{5,20})x([1-4])$/.exec(entry);
    if (!match) continue;

    const card = cardsByNumber.get(match[1]);
    const copies = Number(match[2]);
    if (!card || totalCards + copies > 50) continue;

    decodedDeck[card.slug] = copies;
    totalCards += copies;
  }

  return decodedDeck;
}

export function normalizeStoredDeck(value: unknown): DeckMap | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const normalizedDeck: DeckMap = {};
  let totalCards = 0;

  for (const [slug, rawCopies] of Object.entries(value)) {
    if (!cardsBySlug.has(slug) || !Number.isInteger(rawCopies)) continue;
    const copies = Number(rawCopies);
    if (copies < 1 || copies > 4 || totalCards + copies > 50) continue;
    normalizedDeck[slug] = copies;
    totalCards += copies;
  }

  return normalizedDeck;
}

export function sanitizeDeckName(value?: string, fallback = "Untitled deck") {
  const cleanName = value?.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 52);
  return cleanName || fallback;
}
