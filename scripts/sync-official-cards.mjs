import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const apiBase = "https://en.palworld-official-cardgame.com/manage/card-list-user/list";
const imageBase = "https://en.palworld-official-cardgame.com/wordpress/wp-content/images/cardlist/";
const setCodes = ["EBP01", "ETD01", "ETD02"];
const detailSlugs = {
  "EBP01-001": "jormuntide-ignis-savage-lava-dragon",
  "EBP01-002": "suzaku-hellfire-wings",
  "EBP01-003": "gobfin-ignis-blazing-hothead",
  "EBP01-020": "pump-action-shotgun",
  "EBP01-047": "pal-sphere",
  "EBP01-049": "lyleen-blessing-of-the-goddess",
};

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

function readableText(value) {
  const replacements = [
    ["AUTO@", "[AUTO] "],
    ["ACT@", "[ACT] "],
    ["CONT@", "[CONT] "],
    ["OnDeploy@", "On Deploy: "],
    ["OnAttack@", "On Attack: "],
    ["OnAssign@", "On Assign: "],
    ["Hand@", "From hand — "],
    ["Quick@", "Quick — "],
    ["1Turn@", "Once per turn — "],
    ["Damage@", "damage"],
    ["Material@", "Material"],
    ["Ingredient@", "Ingredient"],
    ["Strike@", "Strike"],
    ["Power@", "Power"],
    ["Durability@", "Durability"],
    ["LuckyPal@", "Lucky Pal"],
  ];

  return replacements
    .reduce((text, [token, label]) => text.replaceAll(token, label), value || "")
    .replaceAll("\n", " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchSet(setCode) {
  const firstResponse = await fetch(`${apiBase}?page=1&per_page=100&sort=card_no&title=${setCode}`);
  if (!firstResponse.ok) throw new Error(`Card API returned ${firstResponse.status} for ${setCode}`);
  const firstPage = await firstResponse.json();
  const pages = [firstPage];

  for (let page = 2; page <= Math.ceil(firstPage.total / 100); page += 1) {
    const response = await fetch(`${apiBase}?page=${page}&per_page=100&sort=card_no&title=${setCode}`);
    if (!response.ok) throw new Error(`Card API returned ${response.status} for ${setCode} page ${page}`);
    pages.push(await response.json());
  }

  return pages
    .flatMap((page) => page.items)
    .filter((card) => new RegExp(`^${setCode}-\\d{3}$`).test(card.card_number));
}

async function downloadImage(card) {
  const outputPath = join(root, "public", "cards", "catalog", `${card.card_number}.png`);
  const response = await fetch(`${imageBase}${card.picture}`);
  if (!response.ok) throw new Error(`Image download returned ${response.status} for ${card.card_number}`);
  await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
}

await mkdir(join(root, "public", "cards", "catalog"), { recursive: true });

const sourceCards = (await Promise.all(setCodes.map(fetchSet))).flat();
const cards = sourceCards.map((card) => {
  const [name, ...subtitleParts] = card.card_name.split(" – ");
  const subtitle = subtitleParts.join(" – ");
  return {
    slug: detailSlugs[card.card_number] || `${slugify(card.card_name)}-${card.card_number.toLowerCase()}`,
    name,
    subtitle,
    number: card.card_number,
    image: `/cards/catalog/${card.card_number}.png`,
    rarity: card.rare,
    color: (card.color || "Colorless").toLowerCase(),
    type: card.card_kind,
    cost: Number(card.cost || 0),
    power: card.power ? Number(card.power) : null,
    strike: card.attack ? Number(card.attack) : null,
    ability: readableText(card.text),
    summary: `${card.card_name} is a ${card.color || "Colorless"} ${card.card_kind} from ${card.expansion_name}.`,
    set: card.expansion,
    setName: card.expansion_name,
    elements: card.type ? card.type.split("|") : [],
    workSuitability: card.aptitude || "",
    hasGuide: Boolean(detailSlugs[card.card_number]),
  };
});

await Promise.all(sourceCards.map(downloadImage));
await writeFile(
  join(root, "lib", "official-cards.generated.json"),
  `${JSON.stringify(cards, null, 2)}\n`,
);

console.log(`Synced ${cards.length} official main-deck cards across ${setCodes.join(", ")}.`);
