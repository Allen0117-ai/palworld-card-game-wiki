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

export function getCardStrategy(cardNumber: string): CardStrategy | undefined {
  return cardStrategiesByNumber[cardNumber];
}
