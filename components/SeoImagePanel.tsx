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
