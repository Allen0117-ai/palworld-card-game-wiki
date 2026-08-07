import type { Card } from "./data";

export type CardStrategy = {
  overview: string;
  bestIn: string;
  suggestedCopies: string;
  playPattern: string[];
  watchFor: string;
};

const cardStrategiesByNumber: Record<string, CardStrategy> = {
  "EBP01-015": {
    overview: "Mounted Machine Gun turns stored Materials and an assigned Pal into repeatable 500-damage shots. It is strongest when the same deck already creates Materials efficiently instead of adding the Structure as a standalone damage card.",
    bestIn: "Red Material decks using Stone Pit, Weapon Workbench or other reliable Material sources.",
    suggestedCopies: "Start with 1–2 copies because it needs both setup resources and a Pal available to assign.",
    playPattern: [
      "Develop a Material-producing Structure before spending four Souls on Mounted Machine Gun.",
      "Keep a low-cost Pal available to assign without resting an important attacker.",
      "Consume only the number of Materials needed to finish or soften the chosen Pal; save the rest for later effects.",
    ],
    watchFor: "The ability deals 500 damage X times, but every use still requires both Materials and an assigned Pal. Drawing multiple copies without an engine can slow the deck.",
  },
  "EBP01-027": {
    overview: "Jormuntide is a high-cost Blue tempo finisher. On deploy it replaces itself with a card, rests a cost-7-or-lower opposing Pal and prevents that Pal from standing during the opponent's next Stand Phase.",
    bestIn: "Slower Blue decks that can survive to eight Souls and want one deployment to create a threat plus a full-turn tempo advantage.",
    suggestedCopies: "Start with 1–2 copies; eight-cost cards are powerful late but can crowd an opening hand.",
    playPattern: [
      "Spend early turns drawing cards and controlling the board rather than holding several expensive finishers.",
      "Deploy Jormuntide before attacking so the best opposing cost-7-or-lower blocker or worker stays rested.",
      "Use the delayed stand effect to plan the current attack and the next turn, not only the immediate rest.",
    ],
    watchFor: "It cannot select a cost-8-or-higher Pal, and its 1,600 Power does not protect it from every removal effect. Check the target's printed cost before committing eight Souls.",
  },
  "EBP01-051": {
    overview: "Petallia combines recovery and tempo: its deploy ability gains one life and stands two Souls. It is most useful after those Souls have already paid for an earlier play in the same Main Phase.",
    bestIn: "Green midrange decks that can sequence several plays in one turn and convert the two readied Souls into another Pal, Event or ability.",
    suggestedCopies: "Start with 2–3 copies when life recovery and multi-play turns are part of the deck's main plan.",
    playPattern: [
      "Use ready Souls on an earlier card before deploying Petallia whenever the board allows it.",
      "Stand two rested Souls with the deploy ability, then spend them on a second action instead of ending the turn with them unused.",
      "Treat the life gain as stabilization while Petallia's 700 Power supports the board, not as a standalone win condition.",
    ],
    watchFor: "Petallia is much less efficient when fewer than two Souls are rested. Plan the full Main Phase before deploying it.",
  },
  "EBP01-073": {
    overview: "Helzephyr is a Purple Nocturnal payoff with Strike 3. While it is night, Nocturnal raises its Power and deploying your Nocturnal Pals can send eligible opposing Pals to the Graveyard.",
    bestIn: "Dedicated Purple night decks with enough night-setting cards and Nocturnal Pals to trigger the removal ability repeatedly.",
    suggestedCopies: "Start with 2 copies; increase only after the deck can create night consistently before the seven-cost turn.",
    playPattern: [
      "Establish night before relying on Helzephyr's Power bonus or removal text.",
      "Sequence lower-cost Nocturnal deployments around the opposing Pal you need to remove.",
      "Use its Strike 3 to pressure life after the removal effect clears a blocker or key engine Pal.",
    ],
    watchFor: "Without night, Helzephyr loses its Nocturnal Power bonus and its removal trigger does nothing. The card can also rest itself at end of turn after its effect removes a Pal, so plan defense before attacking.",
  },
};

const colorGamePlans: Record<Card["color"], string> = {
  red: "Red decks that convert Materials and direct damage into pressure",
  blue: "Blue decks that use card flow, rest effects and tempo to control combat",
  green: "Green decks that turn Ingredients and efficient Pals into lasting board value",
  purple: "Purple decks that use night, disruption and graveyard pressure",
  colorless: "decks that need a flexible card without adding another color",
};

function cardName(card: Card) {
  return card.subtitle ? `${card.name} — ${card.subtitle}` : card.name;
}

function abilityIncludes(card: Card, terms: string[]) {
  const ability = card.ability.toLowerCase();
  return terms.some((term) => ability.includes(term.toLowerCase()));
}

function describeCardRole(card: Card) {
  if (card.type === "Pal") {
    if (abilityIncludes(card, ["taunt"])) return "a defensive Pal that protects more important cards";
    if (abilityIncludes(card, ["stealth", "assault"])) return "a combat specialist that changes normal attack or blocking rules";
    if (card.cost >= 7 || (card.strike ?? 0) >= 3) return "a late-game finisher that turns a large Soul payment into pressure";
    if (abilityIncludes(card, ["on deploy"])) return "a tempo Pal whose value starts as soon as it is deployed";
    if (card.cost <= 3) return "an early-game Pal that develops the board without using many Souls";
    return "a mid-game Pal that balances board presence with a usable effect";
  }

  if (card.type === "Structure") {
    if (abilityIncludes(card, ["material", "ingredient", "draw"])) return "a repeatable resource engine";
    if (abilityIncludes(card, ["damage"])) return "a repeatable board-control engine";
    return "a setup card that rewards planning across several turns";
  }

  if (card.type === "Gear") {
    if (abilityIncludes(card, ["damage", "graveyard"])) return "a removal or board-control tool";
    if (abilityIncludes(card, ["power", "strike"])) return "a combat support tool";
    return "a reusable support card";
  }

  if (abilityIncludes(card, ["interrupt", "quick"])) return "a reactive Event that keeps an answer available during battle";
  if (abilityIncludes(card, ["draw", "look at", "reveal"])) return "a card-selection Event that improves hand quality";
  if (abilityIncludes(card, ["damage", "graveyard"])) return "a one-shot board-control Event";
  return "a one-shot tactical Event";
}

function describeDeckFit(card: Card) {
  const basePlan = colorGamePlans[card.color];
  if (abilityIncludes(card, ["material"])) return `${basePlan}, especially lists with reliable Material production.`;
  if (abilityIncludes(card, ["ingredient"])) return `${basePlan}, especially lists that can create and spend Ingredients consistently.`;
  if (abilityIncludes(card, ["night", "nocturnal"])) return `${basePlan} with enough night-setting and Nocturnal cards to keep the condition active.`;
  if (abilityIncludes(card, ["damage"])) return `${basePlan} and need another way to remove or soften opposing Pals.`;
  if (abilityIncludes(card, ["draw", "look at", "reveal"])) return `${basePlan} and want more consistent access to key cards.`;
  if (abilityIncludes(card, ["rest", "stand"])) return `${basePlan} and can turn position changes into an attack or tempo advantage.`;
  return `${basePlan}.`;
}

function suggestCopyCount(card: Card) {
  if (card.cost >= 7) return "Start with 1–2 copies; expensive cards are strongest late and can crowd an opening hand.";
  if (!card.ability.trim()) return card.cost <= 3
    ? "Test 2–4 copies when the deck needs this exact low-cost stat line or card name."
    : "Start with 1–2 copies and keep it only when its stats fill a real gap in the curve.";
  if (abilityIncludes(card, ["interrupt", "quick"])) return "Test 2–3 copies so the answer appears often enough without leaving too many reactive cards unused.";
  if (card.type === "Structure" || card.type === "Gear") return "Start with 2 copies; add a third only when the deck can use this permanent reliably every game.";
  if (card.cost <= 3) return "Test 3–4 copies when this is part of the opening plan; reduce it if later draws become weak.";
  return "Start with 2–3 copies, then adjust after tracking how often it is useful in opening and mid-game hands.";
}

function firstPlayStep(card: Card) {
  if (card.cost >= 7) return `Use earlier turns to develop cheaper cards and preserve enough Souls for ${cardName(card)}.`;
  if (card.type === "Event") return `Identify the board state that makes ${cardName(card)} worth spending from hand before committing Souls elsewhere.`;
  return `Place ${cardName(card)} on the curve where its ${card.cost}-Soul cost does not block the deck's next important play.`;
}

function secondPlayStep(card: Card) {
  if (abilityIncludes(card, ["on deploy"])) return "Resolve the deploy ability before combat, then use the changed board state to choose attacks and assignments.";
  if (abilityIncludes(card, ["interrupt", "quick"])) return "Leave the printed cost available and wait for the battle or action where the response changes the result.";
  if (abilityIncludes(card, ["[act]", "once per turn"])) return "Keep the printed activation cost and any required card, resource or target available before using the ability.";
  if (abilityIncludes(card, ["[auto]", "when ", "at the "])) return "Set up the printed trigger deliberately instead of waiting for it to happen by accident.";
  if (!card.ability.trim()) return "Treat the card as a curve and combat choice; its value comes from cost, Power, Strike, color and card name.";
  return "Read every cost, target and timing condition before committing the card; partial setup can leave its effect unused.";
}

function thirdPlayStep(card: Card) {
  if (card.type === "Pal") return "After deployment, decide whether attacking, blocking or staying available for an assignment produces the most value this turn.";
  if (card.type === "Structure") return "Plan the next turn before assigning Pals or spending stored resources, so the Structure keeps supporting the deck's main engine.";
  if (card.type === "Gear") return "Use the Gear on the turn its ongoing or activated text improves a real combat exchange, not only because Souls are available.";
  return "Compare the immediate effect with keeping the Event for a later, higher-impact target or timing window.";
}

function describeRisk(card: Card) {
  if (!card.ability.trim()) return `${cardName(card)} has no printed ability, so it must justify its slot through stats, cost, color, name or another card's requirement.`;
  if (abilityIncludes(card, ["once per turn"])) return "The effect is limited to once per turn. Track whether the card also needs Souls, discards, resources, a target or a specific board state.";
  if (card.cost >= 7) return `At ${card.cost} Souls, drawing several copies early can slow the deck. Keep enough low- and mid-cost plays around it.`;
  if (abilityIncludes(card, ["if ", "when ", "while ", "night", "material", "ingredient"])) return "The effect is conditional. Count how many cards in the deck can create the required resource, timing or board state before increasing the copy count.";
  return "Do not judge the card only by its best-case effect. Compare the Soul cost, required target and opportunity cost with another card at the same point on the curve.";
}

function createCardStrategy(card: Card): CardStrategy {
  const name = cardName(card);
  const stats = card.type === "Pal"
    ? ` It has ${card.power ?? 0} Power and Strike ${card.strike ?? 0}.`
    : "";

  return {
    overview: `${name} costs ${card.cost} Souls and is a ${card.color} ${card.type}.${stats} In deck building, it functions as ${describeCardRole(card)}.`,
    bestIn: describeDeckFit(card),
    suggestedCopies: suggestCopyCount(card),
    playPattern: [firstPlayStep(card), secondPlayStep(card), thirdPlayStep(card)],
    watchFor: describeRisk(card),
  };
}

export function getCardStrategy(card: Card): CardStrategy {
  return cardStrategiesByNumber[card.number] ?? createCardStrategy(card);
}
