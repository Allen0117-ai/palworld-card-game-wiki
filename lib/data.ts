export type CardColor = "red" | "blue" | "green" | "purple" | "colorless";

export type Card = {
  slug: string;
  name: string;
  subtitle: string;
  number: string;
  rarity: string;
  color: CardColor;
  type: "Pal" | "Gear" | "Event" | "Structure";
  cost: number;
  power?: number;
  strike?: number;
  summary: string;
};

export const cards: Card[] = [
  { slug: "jormuntide-ignis-savage-lava-dragon", name: "Jormuntide Ignis", subtitle: "Savage Lava Dragon", number: "EBP01-001", rarity: "RR", color: "red", type: "Pal", cost: 8, power: 9000, strike: 2, summary: "A high-cost Red finisher built to turn a developed board into decisive pressure." },
  { slug: "suzaku-hellfire-wings", name: "Suzaku", subtitle: "Hellfire Wings", number: "EBP01-002", rarity: "RR", color: "red", type: "Pal", cost: 6, power: 7000, strike: 2, summary: "A flexible Red threat that rewards proactive turns and sustained attacking." },
  { slug: "gobfin-ignis-blazing-hothead", name: "Gobfin Ignis", subtitle: "Blazing Hothead", number: "EBP01-003", rarity: "R", color: "red", type: "Pal", cost: 3, power: 4000, strike: 1, summary: "An efficient early attacker for Red lists that want to establish tempo quickly." },
  { slug: "pump-action-shotgun", name: "Pump-Action Shotgun", subtitle: "Heavy Gear", number: "EBP01-020", rarity: "R", color: "red", type: "Gear", cost: 3, summary: "Offensive Gear that helps an attacking Pal push through stronger defenders." },
  { slug: "pal-sphere", name: "Pal Sphere", subtitle: "Universal Gear", number: "EBP01-098", rarity: "R", color: "colorless", type: "Gear", cost: 2, summary: "A flexible colorless option that can support many launch-set strategies." },
  { slug: "lyleen-blessing-of-the-goddess", name: "Lyleen", subtitle: "Blessing of the Goddess", number: "EBP01-050", rarity: "RR", color: "green", type: "Pal", cost: 7, power: 8000, strike: 2, summary: "A Green value engine suited to patient decks that build a strong base." },
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
  { slug: "red-blue-launch-pressure", name: "Red / Blue Launch Pressure", colors: ["red", "blue"], archetype: "Tempo", difficulty: "Beginner", score: 92, description: "Use Red's efficient attacks and flexible colorless tools to keep the opponent off balance.", core: ["suzaku-hellfire-wings", "gobfin-ignis-blazing-hothead", "pump-action-shotgun", "pal-sphere"] },
  { slug: "green-purple-base-control", name: "Green / Purple Base Control", colors: ["green", "purple"], archetype: "Control", difficulty: "Intermediate", score: 88, description: "Develop resources, protect your base, then close with high-impact Pals.", core: ["lyleen-blessing-of-the-goddess", "pal-sphere"] },
  { slug: "mono-red-pal-rush", name: "Mono Red Pal Rush", colors: ["red"], archetype: "Aggro", difficulty: "Beginner", score: 84, description: "A direct launch-week list focused on early bodies and constant attacking.", core: ["jormuntide-ignis-savage-lava-dragon", "suzaku-hellfire-wings", "gobfin-ignis-blazing-hothead", "pump-action-shotgun"] },
];

export const guides = [
  { slug: "how-to-play-palworld-card-game", category: "Beginner", readTime: "8 min", title: "How to play the Palworld Card Game", description: "Learn Souls, card types, the five turn phases and the basic win condition." },
  { slug: "palworld-tcg-rarity-guide", category: "Collecting", readTime: "6 min", title: "Palworld TCG rarity guide", description: "Understand C, U, R, RR and the launch set's parallel rarity labels." },
];

export const getInitials = (name: string) => name.split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase();
