import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cardListUrl = "https://palworldtcg.gg/ja/cards";
const cardPageBase = "https://palworldtcg.gg/ja/card/";
const imageBase = "https://palworldtcg.gg/img/card-images/official/";
const outputDirectory = join(root, "public", "cards", "ja");
const outputJson = join(root, "lib", "official-cards-ja.generated.json");
const requestBatchSize = 12;

const cardRowPattern = /\{\\"slug\\":\\"([^"]+)\\",\\"set_code\\":\\"([^"]+)\\",\\"card_number\\":\\"([^"]+)\\",\\"name\\":\\"([^"]+)\\",\\"japanese_name\\":\\"([^"]+)\\"/g;
const baseCardNumberPattern = /^(BP01|TD01|TD02)-\d{3}$/;
const japaneseEffectPattern = /\\"text\\":\\"((?:\\\\.|[^"\\])*)\\",\\"jp\\":true/;

function englishCardNumber(japaneseCardNumber) {
  return `E${japaneseCardNumber}`;
}

function readEscapedText(value) {
  return JSON.parse(`"${value}"`).replaceAll("\\n", "\n");
}

function parseCardRows(html) {
  const rows = [...html.matchAll(cardRowPattern)]
    .map((match) => ({
      sourceSlug: match[1],
      set: match[2],
      number: match[3],
      englishName: match[4],
      name: match[5],
    }))
    .filter((card) => baseCardNumberPattern.test(card.number));

  const uniqueRows = [...new Map(rows.map((card) => [card.number, card])).values()];
  if (uniqueRows.length !== 148) {
    throw new Error(`Expected 148 Japanese base cards, received ${uniqueRows.length}`);
  }
  return uniqueRows;
}

async function fetchText(url, label) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${label} returned ${response.status}: ${url}`);
  }
  return response.text();
}

async function fetchCardDetails(card) {
  const pageHtml = await fetchText(`${cardPageBase}${card.sourceSlug}`, card.number);
  const effectMatch = pageHtml.match(japaneseEffectPattern);

  return {
    ...card,
    englishNumber: englishCardNumber(card.number),
    ability: effectMatch ? readEscapedText(effectMatch[1]) : "",
    image: `/cards/ja/${englishCardNumber(card.number)}.png`,
  };
}

async function downloadCardImage(card) {
  const response = await fetch(`${imageBase}${card.set}/${card.number}.png`);
  if (!response.ok) {
    throw new Error(`Japanese card image returned ${response.status}: ${card.number}`);
  }
  await writeFile(
    join(outputDirectory, `${card.englishNumber}.png`),
    Buffer.from(await response.arrayBuffer()),
  );
}

async function mapInBatches(items, mapper) {
  const mappedItems = [];
  for (let index = 0; index < items.length; index += requestBatchSize) {
    mappedItems.push(...await Promise.all(items.slice(index, index + requestBatchSize).map(mapper)));
  }
  return mappedItems;
}

await mkdir(outputDirectory, { recursive: true });

const listHtml = await fetchText(cardListUrl, "Japanese card list");
const cards = await mapInBatches(parseCardRows(listHtml), fetchCardDetails);
await mapInBatches(cards, downloadCardImage);
await writeFile(outputJson, `${JSON.stringify(cards, null, 2)}\n`);

console.log(`Synced ${cards.length} official Japanese base cards.`);
