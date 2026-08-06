export type PromoCardSeries = {
  name: string;
  cardCount: number;
  cardNumbers: string[];
  distribution: string;
  sourceUrl: string;
};

export const promoCardSeries: PromoCardSeries[] = [
  {
    name: "PR Card Pack Vol.1",
    cardCount: 9,
    cardNumbers: ["EPR-002", "EPR-003", "EPR-004", "EPR-005", "EPR-006", "EPR-007", "EPR-008", "EPR-009", "ESOUL-008"],
    distribution: "One random card for shop-tournament and selected release-event participation.",
    sourceUrl: "https://en.palworld-official-cardgame.com/events/shop-tournaments",
  },
  {
    name: "PR Card Pack Vol.1.5",
    cardCount: 8,
    cardNumbers: ["EPR-002S", "EPR-003S", "EPR-004S", "EPR-005S", "EPR-006S", "EPR-007S", "EPR-008S", "EPR-009S"],
    distribution: "One random card for specified winners, high-finish rewards and store-distributed extra prizes.",
    sourceUrl: "https://en.palworld-official-cardgame.com/events/shop-tournaments",
  },
];
