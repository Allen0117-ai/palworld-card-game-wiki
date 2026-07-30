import officialCardData from "./official-cards.generated.json";

export type CardColor = "red" | "blue" | "green" | "purple" | "colorless";

export type Card = {
  slug: string;
  name: string;
  subtitle: string;
  number: string;
  image: string;
  rarity: string;
  color: CardColor;
  type: "Pal" | "Gear" | "Event" | "Structure";
  cost: number;
  power?: number | null;
  strike?: number | null;
  ability: string;
  summary: string;
  set: "EBP01" | "ETD01" | "ETD02";
  setName: string;
  elements: string[];
  workSuitability: string;
  hasGuide: boolean;
};

export function getCardImageAlt(card: Pick<Card, "color" | "name" | "number" | "subtitle" | "type">) {
  const cardName = card.subtitle ? `${card.name} — ${card.subtitle}` : card.name;
  return `${cardName} (${card.number}), ${card.color} ${card.type} card from the Palworld Card Game`;
}

const editorialCards: Card[] = [
  {
    slug: "jormuntide-ignis-savage-lava-dragon",
    name: "Jormuntide Ignis",
    subtitle: "Savage Lava Dragon",
    number: "EBP01-001",
    image: "/cards/EBP01-001.png",
    rarity: "RR",
    color: "red",
    type: "Pal",
    cost: 8,
    power: 1700,
    strike: 4,
    ability: "Once per turn, pay 3 Souls or discard 2 cards from your hand to stand this card.",
    summary: "A high-cost Red finisher that can ready itself for another action when you can afford the steep resource trade.",
    set: "EBP01",
    setName: "Booster Pack \"Dawn of Palpagos\"",
    elements: ["Dragon", "Fire"],
    workSuitability: "Kindling",
    hasGuide: true,
  },
  {
    slug: "suzaku-hellfire-wings",
    name: "Suzaku",
    subtitle: "Hellfire Wings",
    number: "EBP01-002",
    image: "/cards/EBP01-002.png",
    rarity: "RR",
    color: "red",
    type: "Pal",
    cost: 7,
    power: 1200,
    strike: 3,
    ability: "Your red non-battle damage gets +200. On deploy, choose a Pal and deal 700 damage.",
    summary: "A flexible Red threat that improves burn effects and immediately pressures an opposing Pal.",
    set: "EBP01",
    setName: "Booster Pack \"Dawn of Palpagos\"",
    elements: ["Fire"],
    workSuitability: "Kindling",
    hasGuide: true,
  },
  {
    slug: "gobfin-ignis-blazing-hothead",
    name: "Gobfin Ignis",
    subtitle: "Blazing Hothead",
    number: "EBP01-003",
    image: "/cards/EBP01-003.png",
    rarity: "R",
    color: "red",
    type: "Pal",
    cost: 4,
    power: 400,
    strike: 2,
    ability: "All of your other red Pals get +300 Power.",
    summary: "A compact Red support Pal that turns a wide board into a much more dangerous attacking team.",
    set: "EBP01",
    setName: "Booster Pack \"Dawn of Palpagos\"",
    elements: ["Water", "Fire"],
    workSuitability: "Handiwork",
    hasGuide: true,
  },
  {
    slug: "pump-action-shotgun",
    name: "Pump-Action Shotgun",
    subtitle: "Area-Clear Gear",
    number: "EBP01-020",
    image: "/cards/EBP01-020.png",
    rarity: "R",
    color: "red",
    type: "Gear",
    cost: 7,
    ability: "On deploy, deal 1200 damage to every opposing Pal. Rest this card to give a Pal +200 Power for the turn.",
    summary: "Expensive Red Gear that can reset a crowded opposing board and continue supporting attacks afterward.",
    set: "EBP01",
    setName: "Booster Pack \"Dawn of Palpagos\"",
    elements: [],
    workSuitability: "",
    hasGuide: true,
  },
  {
    slug: "pal-sphere",
    name: "Pal Sphere",
    subtitle: "Classic Draw Event",
    number: "EBP01-047",
    image: "/cards/EBP01-047.png",
    rarity: "U",
    color: "blue",
    type: "Event",
    cost: 4,
    ability: "Draw 3 cards.",
    summary: "A clean Blue refill that trades one action for three fresh cards and helps slower decks keep resources flowing.",
    set: "EBP01",
    setName: "Booster Pack \"Dawn of Palpagos\"",
    elements: [],
    workSuitability: "",
    hasGuide: true,
  },
  {
    slug: "lyleen-blessing-of-the-goddess",
    name: "Lyleen",
    subtitle: "Blessing of the Goddess",
    number: "EBP01-049",
    image: "/cards/EBP01-049.png",
    rarity: "RR",
    color: "green",
    type: "Pal",
    cost: 7,
    power: 900,
    strike: 3,
    ability: "On deploy, gain 3 Ingredients. Once per turn, consume 3 Ingredients to find and deploy a cost 6 or lower Pal from your top 5 cards.",
    summary: "A Green value engine that creates Ingredients and converts them into another Pal from the top of your deck.",
    set: "EBP01",
    setName: "Booster Pack \"Dawn of Palpagos\"",
    elements: ["Grass"],
    workSuitability: "Planting",
    hasGuide: true,
  },
];

const officialCards = officialCardData as Card[];

export const cards: Card[] = officialCards.map((card) => {
  const editorial = editorialCards.find((item) => item.number === card.number);
  return editorial ? { ...card, ...editorial, image: card.image } : card;
});

export const featuredCards = editorialCards.map((editorial) => (
  cards.find((card) => card.number === editorial.number) || editorial
));

export function cardByNumber(number: string) {
  return cards.find((card) => card.number === number);
}

export const homepageShowcaseCards = [
  "EBP01-002",
  "EBP01-027",
  "EBP01-050",
  "EBP01-077",
].flatMap((number) => {
  const card = cardByNumber(number);
  return card ? [card] : [];
});

export type Deck = {
  slug: string;
  name: string;
  colors: CardColor[];
  archetype: string;
  difficulty: string;
  status: "Official Trial Deck" | "Editorial Launch Lab";
  description: string;
  core: string[];
  cardPool: string[];
  sourceUrl: string;
  updated: string;
};

const slugsForSet = (set: Card["set"]) => cards.filter((card) => card.set === set).map((card) => card.slug);
const slugForNumber = (number: string) => cardByNumber(number)?.slug || "";

export const decks: Deck[] = [
  {
    slug: "red-blue-launch-pressure",
    name: "Red / Blue Trial Deck Guide",
    colors: ["red", "blue"],
    archetype: "Damage · Structures · Card flow",
    difficulty: "Beginner",
    status: "Official Trial Deck",
    description: "Understand TD01's 24-card pool, its Material engine, defensive Quick cards and the turns that matter most.",
    core: ["ETD01-001", "ETD01-008", "ETD01-009", "ETD01-018"].map(slugForNumber),
    cardPool: slugsForSet("ETD01"),
    sourceUrl: "https://en.palworld-official-cardgame.com/products/td01",
    updated: "July 30, 2026",
  },
  {
    slug: "green-blue-base-value",
    name: "Green / Purple Trial Deck Guide",
    colors: ["green", "purple"],
    archetype: "Ingredients · Taunt · Stealth",
    difficulty: "Beginner",
    status: "Official Trial Deck",
    description: "Learn TD02's Ingredient engine, sturdy Green board and Purple removal without pretending launch-day data is a settled meta.",
    core: ["ETD02-006", "ETD02-008", "ETD02-012", "ETD02-018"].map(slugForNumber),
    cardPool: slugsForSet("ETD02"),
    sourceUrl: "https://en.palworld-official-cardgame.com/products/td02",
    updated: "July 30, 2026",
  },
  {
    slug: "mono-red-pal-rush",
    name: "BP01 First Deck Lab",
    colors: ["red", "blue", "green", "purple"],
    archetype: "Build a legal first draft",
    difficulty: "Beginner",
    status: "Editorial Launch Lab",
    description: "A rules-first checklist for turning booster cards into a coherent 50-card list while the tournament meta is still forming.",
    core: featuredCards.map((card) => card.slug),
    cardPool: cards.filter((card) => card.set === "EBP01").map((card) => card.slug),
    sourceUrl: "https://en.palworld-official-cardgame.com/rule",
    updated: "July 30, 2026",
  },
];

export const guides = [
  { slug: "how-to-play-palworld-card-game", category: "Start Here", readTime: "12 min", title: "How to play the Palworld Card Game", description: "A complete first-game walkthrough: setup, Souls, phases, combat, blocking, damage checks and win conditions.", updated: "July 30, 2026", sourceStatus: "Official rules explained" },
  { slug: "palworld-card-game-deck-building-rules", category: "Rules", readTime: "8 min", title: "Deck building rules: 50 cards, 10 Souls and two colors", description: "Build a legal main deck and avoid the copy-limit, color and Lucky icon mistakes new players make.", updated: "July 30, 2026", sourceStatus: "Official rules explained" },
  { slug: "red-blue-vs-green-purple-trial-deck", category: "Buying Guide", readTime: "9 min", title: "Red/Blue vs Green/Purple: which Trial Deck should you buy?", description: "A plain-English comparison of both launch Trial Decks, their play patterns and who each one suits.", updated: "July 30, 2026", sourceStatus: "Official card pool + editorial analysis" },
  { slug: "palworld-card-game-products-where-to-buy", category: "Launch Guide", readTime: "7 min", title: "Launch products explained: what to buy and where to start", description: "Understand BP01, both Trial Decks, what each product contains and where to find an official retailer.", updated: "July 30, 2026", sourceStatus: "Official product facts" },
  { slug: "dawn-of-palpagos-card-list-guide", category: "Card List", readTime: "10 min", title: "Dawn of Palpagos BP01 card list and set guide", description: "Explore all 100 base cards by color, type and rarity, plus the two launch Trial Deck card pools.", updated: "July 30, 2026", sourceStatus: "Official card database snapshot" },
  { slug: "palworld-card-game-keyword-glossary", category: "Rules", readTime: "10 min", title: "Palworld Card Game keyword and rules glossary", description: "Clear explanations for Assault, Brave, Interrupt, Quick, Taunt, Stealth, Vigilance, Breakthrough and more.", updated: "July 30, 2026", sourceStatus: "Official card text + Q&A" },
  { slug: "palworld-tcg-rarity-guide", category: "Collecting", readTime: "7 min", title: "Palworld TCG rarity guide", description: "Understand C, U, R, RR and launch-set parallel labels without confusing rarity with play strength.", updated: "July 30, 2026", sourceStatus: "Official product + card list" },
  { slug: "dawn-of-palpagos-pull-rates", category: "Collecting", readTime: "5 min", title: "Dawn of Palpagos pull rates: what is actually confirmed?", description: "A no-rumor launch-day tracker separating official product facts from early community box-opening observations.", updated: "July 30, 2026", sourceStatus: "Verification in progress" },
  { slug: "palworld-card-game-2026-roadmap", category: "News Tracker", readTime: "8 min", title: "Palworld Card Game 2026 roadmap: sets, events and key dates", description: "A dated launch calendar for BP01, the August release tournament, Sleeve & Card Set Vol. 1, Legends Awaken BP02 and the first competitive season.", updated: "July 30, 2026", sourceStatus: "Official announcements summarized" },
  { slug: "palworld-card-game-errata-tracker", category: "Corrections", readTime: "6 min", title: "Palworld Card Game errata and corrections tracker", description: "Confirmed printing corrections and rules updates, separated from rumors so players know which official text controls a match.", updated: "July 30, 2026", sourceStatus: "Official product notices + Q&A" },
  { slug: "palworld-card-game-color-guide", category: "Deck Building", readTime: "10 min", title: "Palworld Card Game color guide and first upgrade path", description: "Compare Red, Blue, Green and Purple by real launch-card mechanics, then choose a focused first set of BP01 upgrades.", updated: "July 30, 2026", sourceStatus: "Official card pool + editorial analysis" },
];
