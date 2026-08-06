export type PalworldBoosterSet = {
  code: "BP01" | "BP02";
  name: string;
  releaseDate: string;
  releaseLabel: string;
  status: "Released" | "Confirmed";
  baseCardCount: number;
  parallelSummary: string;
  cardListStatus: string;
  summary: string;
  internalHref: string;
  officialUrl: string;
};

export const palworldBoosterSets: PalworldBoosterSet[] = [
  {
    code: "BP01",
    name: "Dawn of Palpagos",
    releaseDate: "2026-07-30",
    releaseLabel: "July 30, 2026",
    status: "Released",
    baseCardCount: 100,
    parallelSummary: "61 parallel card types",
    cardListStatus: "Complete base card list live",
    summary: "The first booster set introduces the four launch colors, more than 50 Pal types and the game's first complete booster card pool.",
    internalHref: "/cards?set=EBP01",
    officialUrl: "https://en.palworld-official-cardgame.com/products/bp01",
  },
  {
    code: "BP02",
    name: "Legends Awaken",
    releaseDate: "2026-10-30",
    releaseLabel: "October 30, 2026",
    status: "Confirmed",
    baseCardCount: 100,
    parallelSummary: "Parallel cards confirmed; exact count not announced",
    cardListStatus: "Full card list not published yet",
    summary: "The second booster set is confirmed for October. This index will link to the complete card list only after Bushiroad publishes the official data.",
    internalHref: "/sets/legends-awaken-bp02",
    officialUrl: "https://en.palworld-official-cardgame.com/products/bp02",
  },
];

export function getPalworldBoosterSet(code: PalworldBoosterSet["code"]) {
  const set = palworldBoosterSets.find((item) => item.code === code);
  if (!set) throw new Error(`Missing Palworld booster set data for ${code}`);
  return set;
}
