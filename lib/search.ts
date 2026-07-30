const STOP_WORDS = new Set([
  "a", "an", "and", "are", "can", "do", "does", "for", "how", "i", "in",
  "is", "it", "many", "my", "of", "on", "should", "the", "to", "what",
  "when", "where", "which", "with", "work", "this", "that",
]);

const SYNONYM_GROUPS = [
  ["starter", "trial", "precon", "preconstructed"],
  ["buy", "purchase", "shop", "store", "retailer"],
  ["mulligan", "redraw"],
  ["tcg", "ocg", "cardgame"],
  ["rate", "rates", "odds", "pull"],
  ["best", "meta", "tier"],
  ["colour", "color"],
  ["copy", "copies"],
  ["attack", "battle"],
  ["summoning", "deployed"],
  ["health", "life"],
  ["2", "two"],
];

export function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replaceAll("card game", "cardgame")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getSearchTokens(query: string) {
  const baseTokens = normalizeSearchText(query)
    .split(" ")
    .filter((token) => (token.length > 1 || /^\d$/.test(token)) && !STOP_WORDS.has(token));
  const expanded = new Set(baseTokens);

  for (const group of SYNONYM_GROUPS) {
    if (group.some((term) => expanded.has(term))) {
      group.forEach((term) => expanded.add(term));
    }
  }

  return [...expanded];
}

export function scoreSearchText(query: string, text: string) {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedText = normalizeSearchText(text);
  const tokens = getSearchTokens(query);

  if (!normalizedQuery || tokens.length === 0) return 0;

  const matchedTokens = tokens.filter((token) => normalizedText.includes(token));
  if (matchedTokens.length === 0) return 0;

  const baseTokens = normalizeSearchText(query)
    .split(" ")
    .filter((token) => (token.length > 1 || /^\d$/.test(token)) && !STOP_WORDS.has(token));
  const baseMatches = baseTokens.filter((token) => normalizedText.includes(token)).length;
  const coverage = baseTokens.length ? baseMatches / baseTokens.length : 0;

  let score = matchedTokens.length * 8 + coverage * 45;
  if (normalizedText.includes(normalizedQuery)) score += 80;
  if (coverage === 1) score += 30;
  return score;
}

export function rankSearchItems<T>(
  items: T[],
  query: string,
  searchableText: (item: T) => string,
  priority: (item: T) => number = () => 0,
) {
  return items
    .map((item) => ({ item, score: scoreSearchText(query, searchableText(item)) + priority(item) }))
    .filter(({ score }) => score >= 25)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
