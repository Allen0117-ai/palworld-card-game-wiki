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
  subtype?: string;
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
  return editorial ? { ...card, summary: editorial.summary, hasGuide: true } : card;
});

export const palCards = cards.filter((card) => card.type === "Pal");

export const featuredCards = editorialCards.map((editorial) => (
  cards.find((card) => card.number === editorial.number) || editorial
));

export function cardByNumber(number: string) {
  return cards.find((card) => card.number === number);
}

export type SpecialArtwork = {
  card: Card;
  image: string;
  rarity: "SP" | "SSP";
  variantNumber: string;
};

const specialArtworkData = [
  { baseNumber: "EBP01-025", variantNumber: "EBP01-025SSP", rarity: "SSP", image: "/cards/showcase/EBP01-025SSP.webp" },
  { baseNumber: "EBP01-073", variantNumber: "EBP01-073SSP", rarity: "SSP", image: "/cards/showcase/EBP01-073SSP.webp" },
  { baseNumber: "EBP01-049", variantNumber: "EBP01-049SSP", rarity: "SSP", image: "/cards/showcase/EBP01-049SSP.webp" },
  { baseNumber: "EBP01-002", variantNumber: "EBP01-002SP", rarity: "SP", image: "/cards/showcase/EBP01-002SP.webp" },
  { baseNumber: "EBP01-026", variantNumber: "EBP01-026SP", rarity: "SP", image: "/cards/showcase/EBP01-026SP.webp" },
  { baseNumber: "EBP01-051", variantNumber: "EBP01-051SP", rarity: "SP", image: "/cards/showcase/EBP01-051SP.webp" },
  { baseNumber: "EBP01-050", variantNumber: "EBP01-050SP", rarity: "SP", image: "/cards/showcase/EBP01-050SP.webp" },
  { baseNumber: "EBP01-075", variantNumber: "EBP01-075SP", rarity: "SP", image: "/cards/showcase/EBP01-075SP.webp" },
] as const;

export const homepageSpecialArtwork: SpecialArtwork[] = specialArtworkData.flatMap((artwork) => {
  const card = cardByNumber(artwork.baseNumber);
  return card ? [{ ...artwork, card }] : [];
});

export function specialArtworkByVariant(variantNumber?: string) {
  return homepageSpecialArtwork.find((artwork) => artwork.variantNumber === variantNumber);
}

export type Deck = {
  slug: string;
  name: string;
  colors: CardColor[];
  archetype: string;
  difficulty: string;
  bestFor: string;
  status: "Official Trial Deck" | "Editorial Launch Lab";
  description: string;
  core: string[];
  cardPool: string[];
  gamePlan: {
    step: string;
    title: string;
    description: string;
    cardNumbers: string[];
  }[];
  combos: {
    title: string;
    description: string;
    cardNumbers: string[];
  }[];
  recipe?: {
    cardNumber: string;
    copies: number;
  }[];
  sourceUrl: string;
  updated: string;
  published: string;
  modified: string;
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
    bestFor: "Best for your first match — the most direct game plan.",
    status: "Official Trial Deck",
    description: "Understand TD01's 24-card pool, its Material engine, defensive Quick cards and the turns that matter most.",
    core: ["ETD01-001", "ETD01-008", "ETD01-009", "ETD01-018"].map(slugForNumber),
    cardPool: slugsForSet("ETD01"),
    gamePlan: [
      {
        step: "01",
        title: "Build Materials early",
        description: "Deploy a cheap Pal, then assign it to Stone Pit. You gain 3 Materials and draw a card, giving the deck fuel without running out of cards.",
        cardNumbers: ["ETD01-023", "ETD01-008"],
      },
      {
        step: "02",
        title: "Turn resources into pressure",
        description: "Weapon Workbench spends a Material and an assigned Pal to deal 800 damage, then gives every Pal +1 Strike for the turn.",
        cardNumbers: ["ETD01-008", "ETD01-009"],
      },
      {
        step: "03",
        title: "Finish with a large attacker",
        description: "Use Grizzbolt to attack standing Pals or let Mammorest Cryst scale with the Structures you already developed.",
        cardNumbers: ["ETD01-001", "ETD01-018"],
      },
    ],
    combos: [
      {
        title: "Stone Pit → Weapon Workbench",
        description: "Stone Pit supplies the Material that Weapon Workbench needs. This is the deck's clearest repeatable engine.",
        cardNumbers: ["ETD01-008", "ETD01-009"],
      },
      {
        title: "Primitive Workbench → Mammorest Cryst",
        description: "Primitive Workbench helps deploy more Structures or Gear. Every Structure also increases Mammorest Cryst's Power.",
        cardNumbers: ["ETD01-020", "ETD01-018"],
      },
      {
        title: "Elphidran Aqua + Crystal Breath",
        description: "Elphidran Aqua improves your hand, while Crystal Breath protects a key turn by reducing Strike and delaying a Pal's next stand.",
        cardNumbers: ["ETD01-012", "ETD01-022"],
      },
    ],
    sourceUrl: "https://en.palworld-official-cardgame.com/products/td01",
    updated: "July 31, 2026",
    published: "2026-07-30",
    modified: "2026-07-31",
  },
  {
    slug: "green-blue-base-value",
    name: "Green / Purple Trial Deck Guide",
    colors: ["green", "purple"],
    archetype: "Ingredients · Taunt · Stealth",
    difficulty: "Beginner",
    bestFor: "Best for players who enjoy setup, timing and tactical choices.",
    status: "Official Trial Deck",
    description: "Learn TD02's Ingredient engine, sturdy Green board and Purple removal without pretending launch-day data is a settled meta.",
    core: ["ETD02-006", "ETD02-008", "ETD02-012", "ETD02-018"].map(slugForNumber),
    cardPool: slugsForSet("ETD02"),
    gamePlan: [
      {
        step: "01",
        title: "Stock Ingredients",
        description: "Flopie gives you 2 Ingredients immediately. Berry Plantation then turns an assigned Pal into 3 more Ingredients and a card.",
        cardNumbers: ["ETD02-003", "ETD02-008"],
      },
      {
        step: "02",
        title: "Create one powerful combat turn",
        description: "Campfire spends Ingredients to gain life and give every Pal +1000 Power. A Taunt Pal helps keep your important pieces safe.",
        cardNumbers: ["ETD02-009", "ETD02-006"],
      },
      {
        step: "03",
        title: "Attack around their defense",
        description: "Felbat cannot be blocked and gains life when it attacks. Astegon weakens a Pal and can clear low-Power Pals when it attacks.",
        cardNumbers: ["ETD02-018", "ETD02-012"],
      },
    ],
    combos: [
      {
        title: "Berry Plantation → Campfire",
        description: "Berry Plantation supplies Ingredients and cards; Campfire converts those Ingredients into life and a team-wide Power boost.",
        cardNumbers: ["ETD02-008", "ETD02-009"],
      },
      {
        title: "Broncherry protects Felbat",
        description: "Broncherry's Taunt forces legal attacks toward it, giving Felbat more chances to attack safely with Stealth and recover life.",
        cardNumbers: ["ETD02-006", "ETD02-018"],
      },
      {
        title: "Astegon sets up its own clear",
        description: "Astegon reduces a Pal by 1000 Power on deploy, then removes every 300-Power-or-lower Pal when it attacks. Check your own board first.",
        cardNumbers: ["ETD02-012", "ETD02-014"],
      },
    ],
    sourceUrl: "https://en.palworld-official-cardgame.com/products/td02",
    updated: "July 31, 2026",
    published: "2026-07-30",
    modified: "2026-07-31",
  },
  {
    slug: "mono-red-pal-rush",
    name: "Red / Blue BP01 Structure Starter",
    colors: ["red", "blue"],
    archetype: "Materials · Structures · Direct damage",
    difficulty: "Beginner",
    bestFor: "Best for copying a complete 50-card list into the deck builder.",
    status: "Editorial Launch Lab",
    description: "A complete 50-card beginner sample list using BP01 Red and Blue cards, with a clear Material engine, card draw and direct-damage finishers.",
    core: ["EBP01-016", "EBP01-017", "EBP01-002", "EBP01-029"].map(slugForNumber),
    cardPool: cards
      .filter((card) => card.set === "EBP01" && ["red", "blue", "colorless"].includes(card.color))
      .map((card) => card.slug),
    gamePlan: [
      {
        step: "01",
        title: "Play cheap Pals and an engine",
        description: "Foxparks, Sparkit and Flambelle make the early turns playable. Primitive Furnace turns an assigned Pal into Materials and a fresh card.",
        cardNumbers: ["EBP01-012", "EBP01-016"],
      },
      {
        step: "02",
        title: "Control the board while drawing",
        description: "Makeshift Handgun and Sparkit damage opposing Pals. Sphere Workbench and Pal Sphere keep cards moving through your hand.",
        cardNumbers: ["EBP01-021", "EBP01-043"],
      },
      {
        step: "03",
        title: "Close with damage or tempo",
        description: "Suzaku strengthens non-battle damage, Ragnahawk powers the whole Red team, and Azurobe rests a threat while replacing itself.",
        cardNumbers: ["EBP01-002", "EBP01-029"],
      },
    ],
    combos: [
      {
        title: "Primitive Furnace + Treasure Chest Found!",
        description: "Both cards help you find or power Red Structures and Gear, making the deck's engine much more consistent.",
        cardNumbers: ["EBP01-016", "EBP01-024"],
      },
      {
        title: "Flame Cauldron + Flambelle",
        description: "Flame Cauldron rewards every Red Pal deployment with Material, while Flambelle adds two more Materials as it enters.",
        cardNumbers: ["EBP01-017", "EBP01-012"],
      },
      {
        title: "Suzaku + Sparkit",
        description: "Suzaku adds 200 to non-battle Pal damage, turning Sparkit's 500 deploy damage into 700 while Suzaku is in your base.",
        cardNumbers: ["EBP01-002", "EBP01-008"],
      },
    ],
    recipe: [
      { cardNumber: "EBP01-006", copies: 4 },
      { cardNumber: "EBP01-008", copies: 4 },
      { cardNumber: "EBP01-012", copies: 4 },
      { cardNumber: "EBP01-016", copies: 4 },
      { cardNumber: "EBP01-034", copies: 4 },
      { cardNumber: "EBP01-036", copies: 4 },
      { cardNumber: "EBP01-017", copies: 3 },
      { cardNumber: "EBP01-021", copies: 3 },
      { cardNumber: "EBP01-024", copies: 3 },
      { cardNumber: "EBP01-043", copies: 3 },
      { cardNumber: "EBP01-046", copies: 3 },
      { cardNumber: "EBP01-047", copies: 3 },
      { cardNumber: "EBP01-002", copies: 2 },
      { cardNumber: "EBP01-010", copies: 2 },
      { cardNumber: "EBP01-029", copies: 2 },
      { cardNumber: "EBP01-038", copies: 2 },
    ],
    sourceUrl: "https://en.palworld-official-cardgame.com/cardlist",
    updated: "July 31, 2026",
    published: "2026-07-31",
    modified: "2026-07-31",
  },
];

export type Guide = {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  heading?: string;
  description: string;
  updated: string;
  published?: string;
  modified?: string;
  sourceStatus: string;
};

export const guides: Guide[] = [
  {
    slug: "palworld-booster-box",
    category: "Buying Guide",
    readTime: "8 min",
    title: "Palworld Dawn of Palpagos Booster Box: Price & Packs (2026)",
    heading: "Palworld Booster Box Guide — Dawn of Palpagos Set",
    description: "See what's inside the Palworld Dawn of Palpagos Booster Box: 12 packs, 84 cards, price checks, pull-rate facts, where to buy, and Trial Deck comparison.",
    updated: "July 31, 2026",
    published: "2026-07-31",
    sourceStatus: "Official product facts + buying analysis",
  },
  { slug: "how-to-play-palworld-card-game", category: "Start Here", readTime: "12 min", title: "How to play the Palworld Card Game", description: "A complete first-game walkthrough: setup, Souls, phases, combat, blocking, damage checks and win conditions.", updated: "July 30, 2026", sourceStatus: "Official rules explained" },
  { slug: "palworld-card-game-deck-building-rules", category: "Rules", readTime: "8 min", title: "Deck building rules: 50 cards, 10 Souls and two colors", description: "Build a legal main deck and avoid the copy-limit, color and Lucky icon mistakes new players make.", updated: "July 30, 2026", sourceStatus: "Official rules explained" },
  { slug: "red-blue-vs-green-purple-trial-deck", category: "Buying Guide", readTime: "9 min", title: "Red/Blue vs Green/Purple: which Trial Deck should you buy?", description: "A plain-English comparison of both launch Trial Decks, their play patterns, parallel replacement card and who each one suits.", updated: "July 31, 2026", modified: "2026-07-31", sourceStatus: "Official card pool + editorial analysis" },
  { slug: "palworld-card-game-products-where-to-buy", category: "Launch Guide", readTime: "7 min", title: "Launch products explained: what to buy and where to start", description: "Understand BP01, both Trial Decks, what each product contains, where to find an official retailer and how to avoid launch-price hype.", updated: "July 31, 2026", modified: "2026-07-31", sourceStatus: "Official facts + labeled community availability reports" },
  { slug: "dawn-of-palpagos-card-list-guide", category: "Card List", readTime: "10 min", title: "Dawn of Palpagos BP01 card list and set guide", description: "Explore all 100 base cards by color, type and rarity, plus the two launch Trial Deck card pools.", updated: "July 30, 2026", sourceStatus: "Official card database snapshot" },
  { slug: "palworld-card-game-keyword-glossary", category: "Rules", readTime: "10 min", title: "Palworld Card Game keyword and rules glossary", description: "Clear explanations for Assault, Brave, Interrupt, Quick, Taunt, Stealth, Vigilance, Breakthrough and more.", updated: "July 30, 2026", sourceStatus: "Official card text + Q&A" },
  { slug: "palworld-tcg-rarity-guide", category: "Collecting", readTime: "7 min", title: "Palworld TCG rarity guide", description: "Understand C, U, R, RR and launch-set parallel labels without confusing rarity with play strength.", updated: "July 30, 2026", sourceStatus: "Official product + card list" },
  { slug: "dawn-of-palpagos-chase-cards", category: "Collecting", readTime: "8 min", title: "Dawn of Palpagos chase cards: SSP, SP and collector guide", description: "See the four BP01 SSP cards, standout SP artwork and exact card numbers to check before buying, trading or tracking prices.", updated: "July 31, 2026", published: "2026-07-31", sourceStatus: "Official card list + labeled collector analysis" },
  { slug: "dawn-of-palpagos-pull-rates", category: "Collecting", readTime: "5 min", title: "Dawn of Palpagos pull rates: what is actually confirmed?", description: "A no-rumor launch tracker separating official product facts from early community box-opening observations.", updated: "July 31, 2026", modified: "2026-07-31", sourceStatus: "Official facts + labeled community observations" },
  { slug: "palworld-card-game-2026-roadmap", category: "News Tracker", readTime: "10 min", title: "Palworld Card Game 2026 roadmap: sets, events and key dates", description: "A dated calendar for BP01, August shop and release events, the September Los Angeles Release Party, Sleeve & Card Set Vol. 1 and Legends Awaken BP02.", updated: "July 31, 2026", modified: "2026-07-31", sourceStatus: "Official announcements checked July 31" },
  { slug: "palworld-card-game-errata-tracker", category: "Corrections", readTime: "6 min", title: "Palworld Card Game errata and corrections tracker", description: "Confirmed printing corrections and rules updates, separated from rumors so players know which official text controls a match.", updated: "July 30, 2026", sourceStatus: "Official product notices + Q&A" },
  { slug: "palworld-card-game-color-guide", category: "Deck Building", readTime: "10 min", title: "Palworld Card Game color guide and first upgrade path", description: "Compare Red, Blue, Green and Purple by real launch-card mechanics, then choose a focused first set of BP01 upgrades.", updated: "July 30, 2026", sourceStatus: "Official card pool + editorial analysis" },
];
