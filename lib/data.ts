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
  power?: number;
  strike?: number;
  ability: string;
  summary: string;
};

export const cards: Card[] = [
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
  },
  {
    slug: "jormuntide-surging-sea-serpent-ebp01-027",
    name: "Jormuntide",
    subtitle: "Surging Sea Serpent",
    number: "EBP01-027",
    image: "/cards/showcase/EBP01-027.png",
    rarity: "R",
    color: "blue",
    type: "Pal",
    cost: 8,
    power: 1600,
    strike: 3,
    ability: "On deploy, draw a card, rest an opposing cost 7 or lower Pal, and keep it from standing during the opponent's next stand phase.",
    summary: "A huge Blue sea serpent that combines high power with card draw and strong tempo control.",
  },
  {
    slug: "digtoise-seismic-drillback-ebp01-050",
    name: "Digtoise",
    subtitle: "Seismic Drillback",
    number: "EBP01-050",
    image: "/cards/showcase/EBP01-050.png",
    rarity: "RR",
    color: "green",
    type: "Pal",
    cost: 6,
    power: 900,
    strike: 2,
    ability: "With 10 or more Souls this card gains 1000 Power and 1 Strike. It can also consume Ingredients to gain Power and Breakthrough for the turn.",
    summary: "A Green finisher that turns stored Souls and Ingredients into a hard-hitting Breakthrough threat.",
  },
  {
    slug: "pyrin-noct-steed-of-azure-flames-ebp01-077",
    name: "Pyrin Noct",
    subtitle: "Steed of Azure Flames",
    number: "EBP01-077",
    image: "/cards/showcase/EBP01-077.png",
    rarity: "R",
    color: "purple",
    type: "Pal",
    cost: 7,
    power: 1100,
    strike: 3,
    ability: "Nocturnal gives this card 300 Power at night. Its Interrupt ability can be discarded from hand to nullify an opposing attack.",
    summary: "A dramatic Purple threat that becomes stronger at night and can double as emergency defense from hand.",
  },
];

export const homepageShowcaseCards = [
  cards[1],
  ...["EBP01-027", "EBP01-050", "EBP01-077"].flatMap((number) => {
    const card = cards.find((item) => item.number === number);
    return card ? [card] : [];
  }),
];

export type Deck = {
  slug: string;
  name: string;
  colors: CardColor[];
  archetype: string;
  difficulty: string;
  score: number;
  description: string;
  core: string[];
};

export const decks: Deck[] = [
  { slug: "red-blue-launch-pressure", name: "Red / Blue Launch Pressure", colors: ["red", "blue"], archetype: "Tempo", difficulty: "Beginner", score: 92, description: "Use Red's efficient damage and Blue card draw to keep the opponent off balance.", core: ["suzaku-hellfire-wings", "gobfin-ignis-blazing-hothead", "pump-action-shotgun", "pal-sphere"] },
  { slug: "green-blue-base-value", name: "Green / Blue Base Value", colors: ["green", "blue"], archetype: "Midrange", difficulty: "Intermediate", score: 88, description: "Build ingredients with Green, refill through Blue, then turn steady resources into a stronger board.", core: ["lyleen-blessing-of-the-goddess", "pal-sphere"] },
  { slug: "mono-red-pal-rush", name: "Mono Red Pal Rush", colors: ["red"], archetype: "Aggro", difficulty: "Beginner", score: 84, description: "A direct launch-week list focused on early bodies and constant attacking.", core: ["jormuntide-ignis-savage-lava-dragon", "suzaku-hellfire-wings", "gobfin-ignis-blazing-hothead", "pump-action-shotgun"] },
];

export const guides = [
  { slug: "how-to-play-palworld-card-game", category: "Beginner", readTime: "8 min", title: "How to play the Palworld Card Game", description: "Learn Souls, card types, the five turn phases and the basic win condition." },
  { slug: "palworld-tcg-rarity-guide", category: "Collecting", readTime: "6 min", title: "Palworld TCG rarity guide", description: "Understand C, U, R, RR and the launch set's parallel rarity labels." },
];
