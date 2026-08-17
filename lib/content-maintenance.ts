export type ContentHistoryItem = {
  date: string;
  note: string;
};

export type ContentMaintenance = {
  changeSummary?: string;
  history?: ContentHistoryItem[];
};

const englishGuideMaintenance: Record<string, ContentMaintenance> = {
  "how-to-play-palworld-card-game": {
    changeSummary: "The guide now links setup and turn flow to the full deck-building rules and includes both the official tutorial and an independent match walkthrough.",
    history: [
      { date: "2026-08-06", note: "Added official video instruction and a real-card opening exercise." },
      { date: "2026-08-07", note: "Added the concise three-step first-game answer." },
      { date: "2026-08-10", note: "Added a community beginner walkthrough that opens on the creator's YouTube channel." },
      { date: "2026-08-17", note: "Linked the setup steps to the complete deck-building rules." },
    ],
  },
  "palworld-booster-box": {
    changeSummary: "Includes the official Japanese 12-box carton quantity, pack totals and a warning that English case configurations may differ.",
    history: [{ date: "2026-08-07", note: "Added verified box, pack and carton quantities." }],
  },
  "palworld-card-game-deck-building-rules": {
    changeSummary: "The 50-card, 10-Soul, two-color, four-copy and eight-Lucky limits are now easier to find, with direct links to rulings and the deck builder.",
    history: [
      { date: "2026-08-07", note: "Clarified every legal deck limit." },
      { date: "2026-08-17", note: "Improved the search title and connected the guide to official rulings." },
    ],
  },
  "red-blue-vs-green-purple-trial-deck": {
    changeSummary: "Includes direct TD01 and TD02 card-pool links plus an independent look at the physical Trial Deck products.",
    history: [
      { date: "2026-08-10", note: "Added verified starter deck list paths for both launch Trial Decks." },
      { date: "2026-08-10", note: "Added an independent video showing the physical Trial Deck products." },
    ],
  },
  "palworld-card-game-products-where-to-buy": {
    changeSummary: "The official BP01 shortage notice is included; no publisher restock date has been announced.",
    history: [
      { date: "2026-08-03", note: "Updated the launch availability and restock guidance." },
      { date: "2026-08-05", note: "Added marketplace and exact-card verification guidance." },
      { date: "2026-08-07", note: "Added Canada and European buying guidance plus BP02 preorder checks." },
      { date: "2026-08-17", note: "Added the official BP01 shortage notice and clarified that no restock date is published." },
    ],
  },
  "dawn-of-palpagos-pull-rates": {
    changeSummary: "Official product facts and small community opening samples are shown separately; no unofficial odds are treated as guaranteed.",
    history: [{ date: "2026-07-31", note: "Added a small community opening sample beside the official product facts." }],
  },
  "palworld-tcg-rarity-guide": {
    changeSummary: "C, U, R and RR base rarities now lead directly into the SR, OSR, SP and SSP parallel labels and searchable card list.",
    history: [
      { date: "2026-08-07", note: "Added the complete BP01 rarity label path." },
      { date: "2026-08-17", note: "Improved the rarity search title and card-list connection." },
    ],
  },
  "palworld-online-vs-card-game": {
    changeSummary: "Explains why Palworld Online is a separate mobile MMO, not a digital client for the physical card game.",
  },
  "palworld-1-0-vs-card-game": {
    changeSummary: "Compares the 72 Pal records introduced in version 1.0 with the 148-card launch database by exact name.",
  },
  "palworld-card-game-2026-roadmap": {
    changeSummary: "Grand Release Entry Soul rewards are now clearly separated from PR packs offered by other event programs.",
    history: [
      { date: "2026-07-31", note: "Updated confirmed 2026 events and product dates." },
      { date: "2026-08-05", note: "Added BP02, tournament and promo-card details for each milestone." },
      { date: "2026-08-06", note: "Added newly confirmed demo sessions, playmats, storage boxes and sleeve releases." },
      { date: "2026-08-07", note: "Separated confirmed dates from details that remain unconfirmed." },
      { date: "2026-08-10", note: "Added two December Trial Decks and the January 2027 booster schedule." },
      { date: "2026-08-17", note: "Separated Grand Release Entry Soul rewards from shop-tournament PR cards." },
    ],
  },
  "palworld-tcg-card-size-sleeves": {
    changeSummary: "Includes official playmat, storage-box and sleeve designs with their release dates and dimensions.",
    history: [
      { date: "2026-08-05", note: "Explained the included paper playmat and optional upgrades." },
      { date: "2026-08-06", note: "Added the newly listed official accessory range and dimensions." },
    ],
  },
  "palworld-card-game-errata-tracker": {
    changeSummary: "Tracks the official BP01 pack-and-box spelling correction alongside the TD01 Strike errata.",
    history: [{ date: "2026-08-10", note: "Added the BP01 packaging error and future-reprint correction notice." }],
  },
  "palworld-tcg-first-edition-vs-reprint": {
    changeSummary: "Explains the confirmed BP01 packaging correction without claiming that loose cards reveal their print run.",
    history: [{ date: "2026-08-10", note: "Added the confirmed packaging change planned for future BP01 reprints." }],
  },
  "palworld-tcg-deck-tier-list": {
    changeSummary: "The first official Osaka and Tokyo results are included, while the ranking remains provisional and S tier stays empty.",
    history: [{ date: "2026-08-17", note: "Replaced the stale no-results claim with official Osaka and Tokyo result context." }],
  },
  "palworld-tcg-best-cards-by-color": {
    changeSummary: "Compares five Red, Blue, Green and Purple BP01 cards by printed text and their role in a deck.",
  },
  "palworld-tcg-trial-deck-upgrade-guide": {
    changeSummary: "Includes four-card TD01 and TD02 swap tests, card-by-card reasons and clearly identified quantity sources.",
    history: [{ date: "2026-08-06", note: "Replaced vague cut advice with exact first-test swaps and source limits." }],
  },
  "palworld-tcg-tournament-decklists": {
    changeSummary: "Includes official undefeated deck recipes from the Osaka and Tokyo Grand Release events.",
    history: [{ date: "2026-08-17", note: "Added the first official Osaka and Tokyo tournament result entries." }],
  },
};

export function getEnglishGuideMaintenance(slug: string): ContentMaintenance {
  return englishGuideMaintenance[slug] || {};
}
