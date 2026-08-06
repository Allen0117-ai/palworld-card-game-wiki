export type ContentHistoryItem = {
  date: string;
  note: string;
};

export type ContentMaintenance = {
  changeSummary?: string;
  history?: ContentHistoryItem[];
};

const englishGuideMaintenance: Record<string, ContentMaintenance> = {
  "palworld-booster-box": {
    changeSummary: "Confirmed the 12-pack box contents and added current card-list, pull-rate and Trial Deck references.",
  },
  "palworld-card-game-products-where-to-buy": {
    changeSummary: "Added preorder, TCGplayer and singles checks while keeping marketplace prices separate from official MSRP and verified value.",
    history: [
      { date: "2026-08-03", note: "Updated the launch availability and restock guidance." },
      { date: "2026-08-05", note: "Added marketplace and exact-card verification guidance." },
    ],
  },
  "dawn-of-palpagos-pull-rates": {
    changeSummary: "Separated confirmed product facts from labeled community opening samples. No unofficial per-box odds are presented as guaranteed.",
    history: [{ date: "2026-07-31", note: "Added the latest labeled community sample while keeping official facts separate." }],
  },
  "palworld-online-vs-card-game": {
    changeSummary: "Added the first confirmed Palworld Online details and clarified that it is a separate mobile MMO, not a digital card game client.",
  },
  "palworld-1-0-vs-card-game": {
    changeSummary: "Added the current name-match count between the 72 Pal records introduced in version 1.0 and the 148 launch cards.",
  },
  "palworld-card-game-2026-roadmap": {
    changeSummary: "Added the September–October demos and the September 25, October 2 and October 16 accessory releases.",
    history: [
      { date: "2026-07-31", note: "Updated confirmed 2026 events and product dates." },
      { date: "2026-08-05", note: "Added BP02, tournament and promo-card details for each milestone." },
      { date: "2026-08-06", note: "Added newly confirmed demo sessions, playmats, storage boxes and sleeve releases." },
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
    changeSummary: "Added four-card starter upgrades for TD01 and TD02 with copy, color and Lucky-limit checks.",
  },
  "palworld-tcg-tournament-decklists": {
    changeSummary: "Checked the official Deck Recipe and event pages; no complete official tournament decklists are published yet.",
  },
};

export function getEnglishGuideMaintenance(slug: string): ContentMaintenance {
  return englishGuideMaintenance[slug] || {};
}
