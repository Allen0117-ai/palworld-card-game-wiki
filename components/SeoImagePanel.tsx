import Image from "next/image";
import { cardByNumber, getCardImageAlt } from "@/lib/data";

type PanelAsset = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

type SeoImagePanelProps = {
  assets?: PanelAsset[];
  cardNumbers?: string[];
  caption: string;
  label: string;
  title: string;
};

type GuideVisual = Omit<SeoImagePanelProps, "assets"> & {
  assets?: PanelAsset[];
};

const guideVisuals: Record<string, GuideVisual> = {
  "palworld-booster-box": {
    label: "Dawn of Palpagos booster box",
    title: "12 packs · 7 cards each · 84 cards total",
    caption: "The official Dawn of Palpagos BP01 booster pack with representative cards from the first Palworld Card Game set.",
    cardNumbers: ["EBP01-002", "EBP01-025", "EBP01-050"],
    assets: [
      {
        src: "/media-kit/palworld-card-game-dawn-of-palpagos-booster-pack.webp",
        alt: "Palworld Dawn of Palpagos BP01 booster pack from a 12-pack booster box",
        width: 828,
        height: 1713,
      },
    ],
  },
  "how-to-play-palworld-card-game": {
    label: "Card types at a glance",
    title: "Pals, Gear, Structures and Events",
    caption: "Examples of the four Main Deck card types used while learning how to play the Palworld Card Game.",
    cardNumbers: ["EBP01-001", "EBP01-020", "EBP01-039", "EBP01-047"],
  },
  "palworld-card-game-deck-building-rules": {
    label: "Deck color examples",
    title: "Choose no more than two colors",
    caption: "Red, Blue, Green and Purple Palworld cards. A legal Main Deck may combine up to two of these colors.",
    cardNumbers: ["EBP01-002", "EBP01-025", "EBP01-050", "EBP01-074"],
  },
  "red-blue-vs-green-purple-trial-deck": {
    label: "Trial Deck comparison",
    title: "TD01 pressure versus TD02 setup",
    caption: "Key Red/Blue TD01 and Green/Purple TD02 cards that show the two Palworld Trial Deck play styles.",
    cardNumbers: ["ETD01-008", "ETD01-018", "ETD02-006", "ETD02-018"],
  },
  "palworld-card-game-products-where-to-buy": {
    label: "Launch products",
    title: "Start with a complete deck, then add boosters",
    caption: "The Dawn of Palpagos BP01 booster pack, official card back and representative launch cards.",
    cardNumbers: ["EBP01-001", "EBP01-025"],
    assets: [
      {
        src: "/media-kit/palworld-card-game-dawn-of-palpagos-booster-pack.webp",
        alt: "Palworld Card Game Dawn of Palpagos BP01 booster pack product image",
        width: 828,
        height: 1713,
      },
      {
        src: "/media-kit/palworld-card-game-official-card-back.webp",
        alt: "Official Palworld Card Game card back included with launch products",
        width: 607,
        height: 849,
      },
    ],
  },
  "dawn-of-palpagos-card-list-guide": {
    label: "BP01 card list",
    title: "Four colors from Dawn of Palpagos",
    caption: "Representative Red, Blue, Green and Purple cards from the 100-card Dawn of Palpagos BP01 base set.",
    cardNumbers: ["EBP01-002", "EBP01-027", "EBP01-050", "EBP01-077"],
  },
  "palworld-card-game-keyword-glossary": {
    label: "Keyword examples",
    title: "Interrupt, Quick, Taunt and Stealth",
    caption: "Official card examples for four important Palworld Card Game combat and response keywords.",
    cardNumbers: ["EBP01-004", "EBP01-077", "EBP01-054", "ETD02-018"],
  },
  "palworld-tcg-rarity-guide": {
    label: "Base rarity examples",
    title: "Common, Uncommon, Rare and Double Rare",
    caption: "Palworld BP01 card examples showing the C, U, R and RR base rarity labels.",
    cardNumbers: ["EBP01-011", "EBP01-006", "EBP01-003", "EBP01-001"],
  },
  "dawn-of-palpagos-chase-cards": {
    label: "BP01 collector shortlist",
    title: "SSP centerpieces and standout SP artwork",
    caption: "The base versions of four Dawn of Palpagos cards that also appear as high-rarity SSP or SP parallel treatments.",
    cardNumbers: ["EBP01-001", "EBP01-025", "EBP01-049", "EBP01-073"],
  },
  "dawn-of-palpagos-pull-rates": {
    label: "Pull-rate verification",
    title: "Track every pack and rarity",
    caption: "A Dawn of Palpagos booster with representative BP01 cards. Reliable pull-rate estimates require a recorded sample.",
    cardNumbers: ["EBP01-001", "EBP01-025", "EBP01-050"],
    assets: [
      {
        src: "/media-kit/palworld-card-game-dawn-of-palpagos-booster-pack.webp",
        alt: "Dawn of Palpagos BP01 booster pack used for Palworld Card Game pull-rate tracking",
        width: 828,
        height: 1713,
      },
    ],
  },
  "palworld-online-vs-card-game": {
    label: "One Palworld universe, separate games",
    title: "Mobile MMO or physical card game?",
    caption: "Familiar Pals appear across the wider franchise, but Palworld Online and the Palworld Official Card Game are separate games made for different platforms.",
    cardNumbers: ["ETD01-001", "EBP01-025", "EBP01-049", "EBP01-079"],
  },
  "palworld-1-0-vs-card-game": {
    label: "Video game and tabletop comparison",
    title: "The same Pals play by different rules",
    caption: "Chillet, Grizzbolt, Lyleen and Depresso are familiar faces in the launch card pool. The 72 Pal records added in version 1.0 are not in the current card list.",
    cardNumbers: ["EBP01-025", "ETD01-001", "EBP01-049", "EBP01-079"],
  },
  "palworld-card-game-2026-roadmap": {
    label: "2026 release roadmap",
    title: "Launch, organized play and the next set",
    caption: "Dawn of Palpagos launch cards representing the first chapter of the Palworld Card Game 2026 product and event calendar.",
    cardNumbers: ["EBP01-001", "EBP01-025", "EBP01-050", "EBP01-074"],
  },
  "palworld-card-game-errata-tracker": {
    label: "Official corrections",
    title: "Check the current text before a match",
    caption: "Representative Trial Deck cards. Printing corrections and card-specific rulings are checked against official product notices and Q&A.",
    cardNumbers: ["ETD01-001", "ETD01-008", "ETD02-001", "ETD02-018"],
  },
  "palworld-card-game-color-guide": {
    label: "Four-color field guide",
    title: "Pressure, control, growth or disruption",
    caption: "Representative Red, Blue, Green and Purple BP01 cards used to explain each color's launch-day mechanics.",
    cardNumbers: ["EBP01-002", "EBP01-027", "EBP01-050", "EBP01-077"],
  },
  "palworld-tcg-first-edition-vs-reprint": {
    label: "First-print identification",
    title: "Verify the sealed product and exact card",
    caption: "Representative BP01 cards used to explain what collectors can and cannot verify about First Edition and reprint claims.",
    cardNumbers: ["EBP01-001", "EBP01-025", "EBP01-049"],
  },
  "palworld-tcg-booster-box-vs-trial-deck-vs-singles": {
    label: "First-purchase comparison",
    title: "Booster box, Trial Deck or singles",
    caption: "The BP01 booster pack beside representative Trial Deck cards for comparing the three main ways to start buying Palworld TCG.",
    cardNumbers: ["ETD01-008", "ETD02-018"],
    assets: [
      {
        src: "/media-kit/palworld-card-game-dawn-of-palpagos-booster-pack.webp",
        alt: "Dawn of Palpagos BP01 booster pack compared with Palworld Trial Deck cards and singles",
        width: 828,
        height: 1713,
      },
    ],
  },
  "palworld-tcg-card-size-sleeves": {
    label: "Card protection guide",
    title: "63×88mm standard-size cards",
    caption: "The official Palworld card back and standard-size BP01 cards used to choose sleeves, binders and storage.",
    cardNumbers: ["EBP01-002", "EBP01-025"],
    assets: [
      {
        src: "/media-kit/palworld-card-game-official-card-back.webp",
        alt: "Official Palworld TCG card back for a 63 by 88 millimeter standard-size card",
        width: 607,
        height: 849,
      },
    ],
  },
  "are-palworld-tcg-trial-decks-worth-it": {
    label: "Trial Deck value guide",
    title: "Complete decks, accessories and one parallel",
    caption: "Key cards from TD01 Red/Blue and TD02 Green/Purple, the two ready-to-play Palworld Trial Decks.",
    cardNumbers: ["ETD01-008", "ETD01-018", "ETD02-006", "ETD02-018"],
  },
  "palworld-tcg-english-vs-japanese-cards": {
    label: "Language edition comparison",
    title: "Choose cards for your region and event",
    caption: "English and Japanese versions of a BP01 card used to explain language rules for Main Decks, Soul Decks and collecting.",
    cardNumbers: ["EBP01-025"],
    assets: [
      {
        src: "/cards/ja-official/EBP01-025.png",
        alt: "Japanese edition Palworld TCG card compared with its English edition",
        width: 400,
        height: 559,
      },
    ],
  },
  "palworld-tcg-deck-tier-list": {
    label: "Deck comparison",
    title: "Compare current Palworld TCG deck options",
    caption: "Representative launch cards from the Trial Decks and Dawn of Palpagos used in the current deck comparison.",
    cardNumbers: ["ETD01-008", "ETD02-008", "EBP01-002", "EBP01-049"],
  },
  "palworld-tcg-best-cards-by-color": {
    label: "Color card guide",
    title: "Key cards across the four launch colors",
    caption: "Representative Red, Blue, Green and Purple Dawn of Palpagos cards used in this color-by-color guide.",
    cardNumbers: ["EBP01-002", "EBP01-027", "EBP01-049", "EBP01-074"],
  },
  "palworld-tcg-trial-deck-upgrade-guide": {
    label: "Trial Deck upgrades",
    title: "Build from the two launch Trial Decks",
    caption: "Representative TD01, TD02 and Dawn of Palpagos cards used to discuss Trial Deck upgrade options.",
    cardNumbers: ["ETD01-008", "EBP01-016", "ETD02-008", "EBP01-049"],
  },
  "palworld-tcg-tournament-decklists": {
    label: "Tournament decklists",
    title: "Prepare a legal deck for organized play",
    caption: "Representative Dawn of Palpagos cards used in this tournament decklist guide.",
    cardNumbers: ["EBP01-004", "EBP01-038", "EBP01-054", "EBP01-077"],
  },
};

function cardAssets(cardNumbers: string[], topic: string): PanelAsset[] {
  return cardNumbers.map((number) => {
    const card = cardByNumber(number);
    if (!card) throw new Error(`SEO image panel references missing card ${number}`);
    return {
      src: card.image,
      alt: `${getCardImageAlt(card)} featured in ${topic}`,
      width: 400,
      height: card.type === "Structure" ? 286 : 559,
    };
  });
}

export function SeoImagePanel({
  assets = [],
  cardNumbers = [],
  caption,
  label,
  title,
}: SeoImagePanelProps) {
  const panelAssets = [...assets, ...cardAssets(cardNumbers, title)];

  return (
    <figure className="seo-image-panel">
      <div className="seo-image-panel-heading">
        <span>{label}</span>
        <strong>{title}</strong>
      </div>
      <div className="seo-image-panel-stage">
        {panelAssets.map((asset) => (
          <span className="seo-image-panel-media" key={asset.src}>
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              sizes="(max-width: 640px) 34vw, 180px"
              loading="lazy"
            />
          </span>
        ))}
      </div>
      <figcaption>
        {caption}
        <small>Official card and product images · ©Bushiroad ©PALWORLD</small>
      </figcaption>
    </figure>
  );
}

export function GuideSeoImagePanel({ slug }: { slug: string }) {
  const visual = guideVisuals[slug];
  if (!visual) throw new Error(`Guide ${slug} is missing its SEO image panel`);
  return <SeoImagePanel {...visual} />;
}

export function getGuidePrimaryImage(slug: string) {
  const visual = guideVisuals[slug];
  if (!visual) return;
  const firstCard = visual.cardNumbers?.[0] ? cardByNumber(visual.cardNumbers[0]) : undefined;
  const firstImage = visual.assets?.[0]?.src || firstCard?.image;
  if (!firstImage) return;
  return {
    alt: visual.title,
    url: `https://palworldcardgame.wiki${firstImage}`,
  };
}
