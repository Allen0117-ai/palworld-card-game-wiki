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
    changeSummary: "Added a three-step first-game answer while keeping the official tutorial, setup, turn flow and real-card practice sequence.",
    history: [
      { date: "2026-08-06", note: "Added official video instruction and a real-card opening exercise." },
      { date: "2026-08-07", note: "Added the concise three-step first-game answer." },
    ],
  },
  "palworld-booster-box": {
    changeSummary: "Added the official Japanese 12-box carton quantity, calculated pack and card totals, and a separate warning for unconfirmed English case configurations.",
    history: [{ date: "2026-08-07", note: "Added verified box, pack and carton quantities." }],
  },
  "palworld-card-game-deck-building-rules": {
    changeSummary: "Moved the exact 50-card, 10-Soul, two-color, four-copy and eight-Lucky limits into the title and direct answer.",
    history: [{ date: "2026-08-07", note: "Improved the legal-deck answer and search title." }],
  },
  "palworld-card-game-products-where-to-buy": {
    changeSummary: "Added BP02 preorder status and country-specific buying checks for Canada, Germany, the Netherlands and Spain without inventing local retailers.",
    history: [
      { date: "2026-08-03", note: "Updated the launch availability and restock guidance." },
      { date: "2026-08-05", note: "Added marketplace and exact-card verification guidance." },
      { date: "2026-08-07", note: "Added Canada and European buying guidance plus BP02 preorder checks." },
    ],
  },
  "dawn-of-palpagos-pull-rates": {
    changeSummary: "Separated confirmed product facts from labeled community opening samples. No unofficial per-box odds are presented as guaranteed.",
    history: [{ date: "2026-07-31", note: "Added the latest labeled community sample while keeping official facts separate." }],
  },
  "palworld-tcg-rarity-guide": {
    changeSummary: "Expanded the direct answer and title to cover base C, U, R and RR labels plus SR, OSR, SP and SSP parallels.",
    history: [{ date: "2026-08-07", note: "Added the complete BP01 rarity label path." }],
  },
  "palworld-online-vs-card-game": {
    changeSummary: "Added the first confirmed Palworld Online details and clarified that it is a separate mobile MMO, not a digital card game client.",
  },
  "palworld-1-0-vs-card-game": {
    changeSummary: "Added the current name-match count between the 72 Pal records introduced in version 1.0 and the 148 launch cards.",
  },
  "palworld-card-game-2026-roadmap": {
    changeSummary: "Added a confirmed-date table and separated pending BP02 card-list, parallel, preorder-allocation and BP01 restock details.",
    history: [
      { date: "2026-07-31", note: "Updated confirmed 2026 events and product dates." },
      { date: "2026-08-05", note: "Added BP02, tournament and promo-card details for each milestone." },
      { date: "2026-08-06", note: "Added newly confirmed demo sessions, playmats, storage boxes and sleeve releases." },
      { date: "2026-08-07", note: "Separated confirmed dates from details that remain unconfirmed." },
    ],
  },
  "palworld-tcg-card-size-sleeves": {
    changeSummary: "Added official playmat, storage-box and sleeve designs with their release dates and dimensions.",
    history: [
      { date: "2026-08-05", note: "Explained the included paper playmat and optional upgrades." },
      { date: "2026-08-06", note: "Added the newly listed official accessory range and dimensions." },
    ],
  },
  "palworld-card-game-errata-tracker": {
    changeSummary: "Added the confirmed TD01 printing correction and links to the current official text and Q&A.",
  },
  "palworld-tcg-deck-tier-list": {
    changeSummary: "Published a provisional launch ranking with no S tier while the official tournament deck database remains empty.",
  },
  "palworld-tcg-best-cards-by-color": {
    changeSummary: "Reviewed five Red, Blue, Green and Purple BP01 cards by their real deck-building roles and official card text.",
  },
  "palworld-tcg-trial-deck-upgrade-guide": {
    changeSummary: "Added exact four-card swap tests for TD01 and TD02, with card-by-card reasons and clearly labeled community quantity checks.",
    history: [{ date: "2026-08-06", note: "Replaced vague cut advice with exact first-test swaps and source limits." }],
  },
  "palworld-tcg-tournament-decklists": {
    changeSummary: "Checked the official Deck Recipe and event pages; no complete official tournament decklists are published yet.",
  },
};

export function getEnglishGuideMaintenance(slug: string): ContentMaintenance {
  return englishGuideMaintenance[slug] || {};
}
