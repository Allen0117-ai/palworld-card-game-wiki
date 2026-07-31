export type JapaneseGuide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  updated: string;
  quickAnswer: string;
  keywords: string[];
};

export const japaneseGuides: JapaneseGuide[] = [
  {
    slug: "how-to-play",
    title: "パルワールドカードゲームの遊び方",
    description: "対戦準備、5つのフェイズ、攻撃、ブロック、ダメージチェック、勝利条件を初めての人向けに順番で解説。",
    category: "初心者ガイド",
    readTime: "8分",
    updated: "2026-07-31",
    quickAnswer: "メインデッキ50枚とソウルデッキ10枚を使い、パルを登場させて相手を攻撃します。相手のライフを0以下にするか、相手のメインデッキを0枚にすると勝利です。",
    keywords: ["パルワールドカードゲーム 遊び方", "ルール", "初心者", "攻撃", "ダメージチェック"],
  },
  {
    slug: "deck-building-rules",
    title: "デッキ構築ルールと初心者向け配分",
    description: "50枚＋ソウル10枚、2色、同名4枚、ラッキー8枚のルールと、最初のデッキを組むときの考え方。",
    category: "デッキ構築",
    readTime: "7分",
    updated: "2026-07-31",
    quickAnswer: "メインデッキは50枚、ソウルデッキは10枚。メインデッキは2色まで、同じカード名は4枚まで、ラッキーアイコンは合計8枚までです。",
    keywords: ["パルワールドカードゲーム デッキ", "デッキ 枚数", "構築ルール", "2色", "同名4枚"],
  },
  {
    slug: "trial-deck-comparison",
    title: "TD01とTD02はどっちがおすすめ？",
    description: "レッド・ブルーとグリーン・パープルの特徴、難しさ、向いている人、最初の1個の選び方を比較。",
    category: "商品・デッキ",
    readTime: "6分",
    updated: "2026-07-31",
    quickAnswer: "わかりやすく攻めたいならTD01レッド・ブルー、資源を作って守りながら有利にしたいならTD02グリーン・パープルがおすすめです。",
    keywords: ["パルワールド トライアルデッキ おすすめ", "TD01", "TD02", "スターターデッキ 比較"],
  },
  {
    slug: "bp01-booster-box",
    title: "BP01「パルパゴスの夜明け」ボックスガイド",
    description: "1ボックスのパック数・カード枚数、収録カード、レアリティ、トライアルデッキとの違い、買う前の確認点。",
    category: "商品ガイド",
    readTime: "7分",
    updated: "2026-07-31",
    quickAnswer: "BP01の1ボックスは12パック入り、1パック7枚で合計84枚です。100種の基本カードと61種のパラレルがありますが、1箱でのコンプリートは保証されません。",
    keywords: ["パルワールド カードゲーム ボックス", "BP01", "パルパゴスの夜明け", "封入率", "価格"],
  },
  {
    slug: "card-list-guide",
    title: "BP01・TD01・TD02 カードリストの見方",
    description: "日本語カード148枚を、色・種類・コスト・カード番号・効果から探す方法と、デッキに合うカードの見つけ方。",
    category: "カード検索",
    readTime: "5分",
    updated: "2026-07-31",
    quickAnswer: "発売時点のメインデッキ用カードは、BP01が100種、TD01とTD02が各24種の合計148種。カード名、番号、色、種類、効果で検索できます。",
    keywords: ["パルワールドカードゲーム カードリスト", "BP01 カード一覧", "TD01", "TD02", "日本語"],
  },
  {
    slug: "keyword-glossary",
    title: "カード用語・キーワード能力一覧",
    description: "スタンド、レスト、アサイン、クイック、妨害、襲撃、挑発、隠密など、対戦でよく使う公式用語を整理。",
    category: "ルール用語",
    readTime: "6分",
    updated: "2026-07-31",
    quickAnswer: "カードの太字キーワードは、繰り返し使う処理を短く表したものです。最初はスタンド、レスト、アサイン、クイック、妨害を覚えると対戦が進めやすくなります。",
    keywords: ["パルワールドカードゲーム 用語", "キーワード能力", "クイック", "妨害", "隠密", "襲撃"],
  },
];

export function getJapaneseGuide(slug: string) {
  return japaneseGuides.find((guide) => guide.slug === slug);
}
