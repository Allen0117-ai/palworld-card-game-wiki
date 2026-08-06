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
  status: "Official Trial Deck" | "Beginner Deck Guide";
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
    description: "Learn TD02's Ingredient engine, sturdy Green board, Purple removal and the order that makes its key turns work.",
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
    status: "Beginner Deck Guide",
    description: "A complete 50-card beginner deck using BP01 Red and Blue cards, built around Materials, card draw and direct damage.",
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
  { slug: "how-to-play-palworld-card-game", category: "Start Here", readTime: "14 min", title: "How to play the Palworld Card Game", description: "A complete first-game walkthrough with the official tutorial, real card images, a playable TD01 sequence, setup, combat and Damage Checks.", updated: "August 6, 2026", modified: "2026-08-06", sourceStatus: "Official tutorial, rules and current card text" },
  { slug: "palworld-card-game-deck-building-rules", category: "Rules", readTime: "8 min", title: "Deck building rules: 50 cards, 10 Souls and two colors", description: "Build a legal main deck and avoid the copy-limit, color and Lucky icon mistakes new players make.", updated: "July 30, 2026", sourceStatus: "Official rules explained" },
  { slug: "red-blue-vs-green-purple-trial-deck", category: "Buying Guide", readTime: "9 min", title: "Red/Blue vs Green/Purple: which Trial Deck should you buy?", description: "A plain-English comparison of both launch Trial Decks, their play patterns, parallel replacement card and who each one suits.", updated: "July 31, 2026", modified: "2026-07-31", sourceStatus: "Official card pool + editorial analysis" },
  { slug: "palworld-card-game-products-where-to-buy", category: "Buying Guide", readTime: "11 min", title: "Where to Buy Palworld TCG: Preorders, MSRP & Restocks", heading: "Where to Buy Palworld TCG at a Fair Price — MSRP & Restock Guide", description: "Compare official stores, preorders, TCGplayer listings and singles while checking Palworld TCG MSRP claims, BP01 box contents, restocks and buyer protection.", updated: "August 5, 2026", published: "2026-07-31", modified: "2026-08-05", sourceStatus: "Official product prices + marketplace safety guidance" },
  { slug: "dawn-of-palpagos-card-list-guide", category: "Card List", readTime: "10 min", title: "Dawn of Palpagos BP01 card list and set guide", description: "Explore all 100 base cards by color, type and rarity, plus the two launch Trial Deck card pools.", updated: "July 30, 2026", sourceStatus: "Official card database snapshot" },
  { slug: "palworld-card-game-keyword-glossary", category: "Rules", readTime: "10 min", title: "Palworld Card Game keyword and rules glossary", description: "Clear explanations for Assault, Brave, Interrupt, Quick, Taunt, Stealth, Vigilance, Breakthrough and more.", updated: "July 30, 2026", sourceStatus: "Official card text + Q&A" },
  { slug: "palworld-tcg-rarity-guide", category: "Collecting", readTime: "7 min", title: "Palworld TCG rarity guide", description: "Understand C, U, R, RR and launch-set parallel labels without confusing rarity with play strength.", updated: "July 30, 2026", sourceStatus: "Official product + card list" },
  { slug: "dawn-of-palpagos-chase-cards", category: "Collecting", readTime: "8 min", title: "Dawn of Palpagos chase cards: SSP, SP and collector guide", description: "See the four BP01 SSP cards, standout SP artwork and exact card numbers to check before buying, trading or tracking prices.", updated: "July 31, 2026", published: "2026-07-31", sourceStatus: "Official card list + labeled collector analysis" },
  { slug: "dawn-of-palpagos-pull-rates", category: "Collecting", readTime: "5 min", title: "Dawn of Palpagos pull rates: what is actually confirmed?", description: "A no-rumor launch tracker separating official product facts from early community box-opening observations.", updated: "July 31, 2026", modified: "2026-07-31", sourceStatus: "Official facts + labeled community observations" },
  { slug: "palworld-online-vs-card-game", category: "Franchise Update", readTime: "6 min", title: "Is Palworld Online the Card Game? Key Differences Explained", heading: "Is Palworld Online the Card Game? No — Here’s What It Is", description: "Palworld Online is a separate Garena mobile MMO, not a digital version of the card game. See its confirmed release window and the important differences.", updated: "August 5, 2026", published: "2026-08-05", sourceStatus: "Official Garena and card game announcements" },
  { slug: "palworld-1-0-vs-card-game", category: "Franchise Update", readTime: "8 min", title: "Palworld 1.0 vs Card Game: Pals & Mechanics Compared", heading: "Palworld 1.0 vs Palworld Card Game: Pals and Mechanics Compared", description: "Compare Palworld 1.0 with the official card game, including shared Pals, different combat systems and whether any of the 72 new Pals have cards.", updated: "August 5, 2026", published: "2026-08-05", sourceStatus: "Official updates + 148-card database comparison" },
  { slug: "palworld-card-game-2026-roadmap", category: "News Tracker", readTime: "11 min", title: "Palworld TCG 2026 Release Schedule, Sets & Events", description: "Follow the 2026 Palworld TCG release schedule for tournaments, demo sessions, official accessories, Sleeve & Card Set Vol. 1 and Legends Awaken BP02.", updated: "August 6, 2026", modified: "2026-08-06", sourceStatus: "Official products and events checked August 6" },
  { slug: "palworld-card-game-errata-tracker", category: "Corrections", readTime: "6 min", title: "Palworld Card Game errata and corrections tracker", description: "Confirmed printing corrections and rules updates, separated from rumors so players know which official text controls a match.", updated: "July 30, 2026", sourceStatus: "Official product notices + Q&A" },
  { slug: "palworld-card-game-color-guide", category: "Deck Building", readTime: "10 min", title: "Palworld Card Game color guide and first upgrade path", description: "Compare Red, Blue, Green and Purple by real launch-card mechanics, then choose a focused first set of BP01 upgrades.", updated: "July 30, 2026", sourceStatus: "Official card pool + editorial analysis" },
  { slug: "palworld-tcg-deck-tier-list", category: "Deck Building", readTime: "11 min", title: "Palworld TCG Deck Tier List – Best Launch Decks", description: "Compare the strongest Palworld TCG launch deck shells, why no deck is S tier yet, and what official results could change the ranking.", updated: "August 6, 2026", published: "2026-08-06", modified: "2026-08-06", sourceStatus: "Official card pool + clearly labeled provisional ranking" },
  { slug: "palworld-tcg-best-cards-by-color", category: "Card List", readTime: "12 min", title: "Best Palworld TCG Cards by Color – BP01 Picks", description: "See five useful Red, Blue, Green and Purple BP01 cards, the role each one fills, and how to choose core cards for a focused deck.", updated: "August 6, 2026", published: "2026-08-06", modified: "2026-08-06", sourceStatus: "Official card text + role-based editorial analysis" },
  { slug: "palworld-tcg-trial-deck-upgrade-guide", category: "Deck Building", readTime: "14 min", title: "Palworld TCG Trial Deck Upgrade Guide – TD01 & TD02", description: "Make exact four-card TD01 or TD02 upgrade swaps, then test the resource engine, curve and every legal deck limit before changing more.", updated: "August 6, 2026", published: "2026-08-06", modified: "2026-08-06", sourceStatus: "Official card text + labeled community quantity checks" },
  { slug: "palworld-tcg-tournament-decklists", category: "News Tracker", readTime: "9 min", title: "Palworld TCG Tournament Decklists & Results Tracker", description: "Check whether official Palworld TCG winning decklists are available, where verified results should appear and how community claims are labeled.", updated: "August 6, 2026", published: "2026-08-06", modified: "2026-08-06", sourceStatus: "Official deck recipe and tournament pages checked August 6" },
  { slug: "palworld-tcg-first-edition-vs-reprint", category: "Collector Guide", readTime: "8 min", title: "Palworld TCG First Edition vs Reprint: What Changes?", description: "Learn what First Edition packaging proves, what is not marked on individual Palworld TCG cards, and how to assess BP01 first-print and reprint claims safely.", updated: "August 3, 2026", published: "2026-08-03", sourceStatus: "Official product facts + clearly labeled unknowns" },
  { slug: "palworld-tcg-booster-box-vs-trial-deck-vs-singles", category: "Buying Guide", readTime: "9 min", title: "Palworld TCG Booster Box vs Trial Deck vs Singles", description: "Choose the best first Palworld TCG purchase for playing, collecting or upgrading by comparing a BP01 booster box, Trial Deck and individual cards.", updated: "August 3, 2026", published: "2026-08-03", sourceStatus: "Official contents + goal-based buying analysis" },
  { slug: "palworld-tcg-card-size-sleeves", category: "Accessory Guide", readTime: "9 min", title: "Palworld TCG Card Size, Sleeves & Playmats (63×88mm)", description: "Palworld TCG cards measure 63×88mm. Check standard-size sleeves, official playmat and storage-box dimensions, and the latest accessory release dates.", updated: "August 6, 2026", published: "2026-08-03", modified: "2026-08-06", sourceStatus: "Official dimensions and accessory products checked August 6" },
  { slug: "are-palworld-tcg-trial-decks-worth-it", category: "Buying Guide", readTime: "9 min", title: "Are Palworld TCG Trial Decks Worth It? TD01 & TD02", description: "See exactly what TD01 and TD02 include, who should buy one or two copies, how the guaranteed parallel works, and when boosters or singles are better.", updated: "August 3, 2026", published: "2026-08-03", sourceStatus: "Official Trial Deck contents + buying analysis" },
  { slug: "palworld-tcg-english-vs-japanese-cards", category: "Buying Guide", readTime: "7 min", title: "Palworld TCG English vs Japanese Cards: Which to Buy?", description: "Compare English and Japanese Palworld TCG cards for tournaments, collecting and casual play, including the official Main Deck and mixed-language Soul Deck rules.", updated: "August 3, 2026", published: "2026-08-03", sourceStatus: "Official language policy + regional buying guidance" },
];
