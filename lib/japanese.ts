import japaneseCardRecords from "./official-cards-ja.generated.json";
import { cards, decks, type Card, type Deck } from "./data";

type JapaneseCardRecord = {
  sourceSlug: string;
  set: string;
  number: string;
  englishName: string;
  name: string;
  englishNumber: string;
  ability: string;
  image: string;
};

export type JapaneseCard = Card & {
  japaneseNumber: string;
  englishName: string;
};

const colorLabels: Record<string, string> = {
  red: "赤",
  blue: "青",
  green: "緑",
  purple: "紫",
  colorless: "無色",
};

const typeLabels: Record<string, string> = {
  Pal: "パル",
  Gear: "ギア",
  Structure: "建築物",
  Event: "イベント",
};

const subtypeLabels: Record<string, string> = {
  "Lucky Pal": "ラッキーパル",
  "Normal Pal": "ノーマルパル",
};

const elementLabels: Record<string, string> = {
  Fire: "炎",
  Water: "水",
  Grass: "草",
  Electric: "雷",
  Ground: "地",
  Ice: "氷",
  Dragon: "竜",
  Dark: "闇",
  Neutral: "無",
};

const workLabels: Record<string, string> = {
  Kindling: "火起こし",
  Cooling: "冷却",
  Electricity: "発電",
  Crafting: "手作業",
  Collecting: "採集",
  Harvesting: "採取",
  Transporting: "運搬",
  Farming: "牧場",
};

const setLabels: Record<string, string> = {
  EBP01: "ブースターパック第1弾「パルパゴスの夜明け」",
  ETD01: "トライアルデッキ「パルパゴスの夜明け レッド・ブルー」",
  ETD02: "トライアルデッキ「パルパゴスの夜明け グリーン・パープル」",
};

const recordsByEnglishNumber = new Map(
  (japaneseCardRecords as JapaneseCardRecord[]).map((record) => [record.englishNumber, record]),
);

export const japaneseCards: JapaneseCard[] = cards.map((card) => {
  const record = recordsByEnglishNumber.get(card.number);
  if (!record) {
    throw new Error(`Japanese card data is missing for ${card.number}`);
  }

  return {
    ...card,
    name: record.name,
    subtitle: "",
    image: record.image,
    ability: record.ability,
    summary: `${record.name}（${record.number}）のカード情報です。`,
    setName: setLabels[card.set] || card.setName,
    japaneseNumber: record.number,
    englishName: card.subtitle ? `${card.name} — ${card.subtitle}` : card.name,
  };
});

const japaneseCardsBySlug = new Map(japaneseCards.map((card) => [card.slug, card]));

export function getJapaneseCard(slug: string) {
  return japaneseCardsBySlug.get(slug);
}

export function getJapaneseCardImageAlt(card: JapaneseCard) {
  return `${card.name} ${card.japaneseNumber} パルワールドカードゲーム日本語版カード`;
}

export function japaneseColorLabel(color: string) {
  return colorLabels[color] || color;
}

export function japaneseTypeLabel(type: string) {
  return typeLabels[type] || type;
}

export function japaneseSubtypeLabel(subtype: string) {
  return subtypeLabels[subtype] || subtype;
}

export function japaneseElementLabel(element: string) {
  return elementLabels[element] || element;
}

export function japaneseWorkLabel(work: string) {
  return workLabels[work] || work;
}

export type JapaneseDeck = Deck & {
  japaneseName: string;
  japaneseArchetype: string;
  japaneseStatus: string;
  japaneseDescription: string;
  japaneseGamePlan: Array<{
    title: string;
    description: string;
    cardNumbers: string[];
  }>;
};

const japaneseDeckCopy: Record<string, Omit<JapaneseDeck, keyof Deck>> = {
  "red-blue-launch-pressure": {
    japaneseName: "レッド・ブルー トライアルデッキ",
    japaneseArchetype: "素材・建築物・盤面コントロール",
    japaneseStatus: "公式構築済みデッキ",
    japaneseDescription: "素材を増やして建築物とギアにつなぎ、大型パルで押し切る初心者向けデッキです。",
    japaneseGamePlan: [
      {
        title: "序盤は素材を増やす",
        description: "低コストのパルを展開し、「採石場」にアサインして素材と手札を確保します。",
        cardNumbers: ["ETD01-023", "ETD01-008"],
      },
      {
        title: "建築物で盤面を作る",
        description: "「武器製作台」で相手のパルにダメージを与えながら、味方の打撃力を上げます。",
        cardNumbers: ["ETD01-008", "ETD01-009"],
      },
      {
        title: "大型パルで勝負を決める",
        description: "エレパンダやブリザモスで相手の盤面に圧力をかけ、ライフを削り切ります。",
        cardNumbers: ["ETD01-001", "ETD01-018"],
      },
    ],
  },
  "green-blue-base-value": {
    japaneseName: "グリーン・パープル トライアルデッキ",
    japaneseArchetype: "食材・回復・除去",
    japaneseStatus: "公式構築済みデッキ",
    japaneseDescription: "食材を増やして回復と強化に使い、守りながら有利な盤面を作るデッキです。",
    japaneseGamePlan: [
      {
        title: "食材を確保する",
        description: "ポプリーナと「ベリー農園」で食材を増やし、次の行動に必要な資源を整えます。",
        cardNumbers: ["ETD02-003", "ETD02-008"],
      },
      {
        title: "回復と強化を同時に進める",
        description: "「キャンプファイヤー」でライフを回復し、そのターンのパルをまとめて強化します。",
        cardNumbers: ["ETD02-009", "ETD02-006"],
      },
      {
        title: "ブロックを避けて攻める",
        description: "ヤミトバリのステルスとジオラーヴァの弱体化・除去を使い、相手の守りを崩します。",
        cardNumbers: ["ETD02-018", "ETD02-012"],
      },
    ],
  },
  "mono-red-pal-rush": {
    japaneseName: "BP01 レッド・ブルー 建築物デッキ",
    japaneseArchetype: "素材・建築物・直接ダメージ",
    japaneseStatus: "初心者向けサンプルレシピ",
    japaneseDescription: "BP01の赤と青を使った50枚のサンプルです。素材を増やし、建築物と直接ダメージで主導権を取ります。",
    japaneseGamePlan: [
      {
        title: "軽いパルと建築物から始める",
        description: "序盤にラヴィなどの低コストパルを展開し、「原始的な炉」で素材と手札を増やします。",
        cardNumbers: ["EBP01-012", "EBP01-016"],
      },
      {
        title: "相手のパルを処理する",
        description: "ギアと登場時能力を使い、相手の重要なパルにダメージを与えます。",
        cardNumbers: ["EBP01-021", "EBP01-043"],
      },
      {
        title: "大型パルで詰める",
        description: "スザクとアズレーンで攻撃の質を上げ、最後のライフを狙います。",
        cardNumbers: ["EBP01-002", "EBP01-029"],
      },
    ],
  },
};

export const japaneseDecks: JapaneseDeck[] = decks.map((deck) => {
  const localizedCopy = japaneseDeckCopy[deck.slug];
  if (!localizedCopy) {
    throw new Error(`Japanese deck copy is missing for ${deck.slug}`);
  }
  return { ...deck, ...localizedCopy };
});

export function getJapaneseDeck(slug: string) {
  return japaneseDecks.find((deck) => deck.slug === slug);
}
