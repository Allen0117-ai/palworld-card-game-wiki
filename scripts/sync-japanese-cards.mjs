import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const apiBase = "https://palworld-official-cardgame.com/manage/card-list-user/list";
const imageBase = "https://palworld-official-cardgame.com/wordpress/wp-content/images/cardlist/";
const outputDirectory = join(root, "public", "cards", "ja-official");
const outputJson = join(root, "lib", "official-cards-ja.generated.json");
const englishJson = join(root, "lib", "official-cards.generated.json");
const baseCardNumberPattern = /^(BP01|TD01|TD02)-\d{3}$/;
const requestBatchSize = 12;
const requestHeaders = {
  "user-agent": "PalworldCardGameWiki-JapaneseCardsSync/2.0",
  referer: "https://palworld-official-cardgame.com/cardlist/",
};

function englishCardNumber(japaneseCardNumber) {
  return `E${japaneseCardNumber}`;
}

async function fetchJson(url, label) {
  const response = await fetch(url, { headers: requestHeaders });
  if (!response.ok) throw new Error(`${label} returned ${response.status}: ${url}`);
  return response.json();
}

async function fetchAllOfficialCards() {
  const rows = [];
  let page = 1;
  let total = Number.POSITIVE_INFINITY;

  while (rows.length < total) {
    const payload = await fetchJson(`${apiBase}?page=${page}&per_page=100&status=published`, `Japanese card page ${page}`);
    if (!Array.isArray(payload.items)) throw new Error("Official Japanese card API returned invalid items");
    rows.push(...payload.items);
    total = Number(payload.total || rows.length);
    if (payload.items.length === 0) break;
    page += 1;
  }

  return rows.filter((card) => baseCardNumberPattern.test(card.card_number));
}

async function mapInBatches(items, mapper) {
  const mappedItems = [];
  for (let index = 0; index < items.length; index += requestBatchSize) {
    mappedItems.push(...await Promise.all(items.slice(index, index + requestBatchSize).map(mapper)));
  }
  return mappedItems;
}

await mkdir(outputDirectory, { recursive: true });

const englishCards = JSON.parse(await readFile(englishJson, "utf8"));
const englishCardsByNumber = new Map(englishCards.map((card) => [card.number, card]));
const officialCards = await fetchAllOfficialCards();
const uniqueCards = [...new Map(officialCards.map((card) => [card.card_number, card])).values()];

if (uniqueCards.length !== 148) {
  throw new Error(`Expected 148 official Japanese base cards, received ${uniqueCards.length}`);
}

const cards = uniqueCards.map((card) => {
  const englishNumber = englishCardNumber(card.card_number);
  const englishCard = englishCardsByNumber.get(englishNumber);
  if (!englishCard) throw new Error(`English card mapping is missing for ${card.card_number}`);

  return {
    sourceSlug: `${card.card_number.toLowerCase()}-${englishCard.slug}`,
    set: card.expansion,
    number: card.card_number,
    englishName: englishCard.subtitle ? `${englishCard.name} – ${englishCard.subtitle}` : englishCard.name,
    name: card.card_name,
    englishNumber,
    ability: card.text || "",
    image: `/cards/ja-official/${englishNumber}.png`,
    officialImagePath: card.picture,
  };
});

await mapInBatches(cards, async (card) => {
  const response = await fetch(`${imageBase}${card.officialImagePath}`, { headers: requestHeaders });
  if (!response.ok) throw new Error(`Japanese card image returned ${response.status}: ${card.number}`);
  await writeFile(
    join(outputDirectory, `${card.englishNumber}.png`),
    Buffer.from(await response.arrayBuffer()),
  );
});

const savedCards = cards.map((card) => ({
  sourceSlug: card.sourceSlug,
  set: card.set,
  number: card.number,
  englishName: card.englishName,
  name: card.name,
  englishNumber: card.englishNumber,
  ability: card.ability,
  image: card.image,
}));
await writeFile(outputJson, `${JSON.stringify(savedCards, null, 2)}\n`);

console.log(`Synced ${savedCards.length} official Japanese cards and card images.`);
