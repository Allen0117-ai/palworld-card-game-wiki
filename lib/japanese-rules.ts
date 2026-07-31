import officialRulesData from "./official-rules-ja.generated.json";

export const JAPANESE_COMPREHENSIVE_RULES_URL = "https://palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/07/30111117/pocg_cr_1.00_260730.pdf";
export const JAPANESE_PLAY_GUIDE_URL = "https://palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/06/26104540/Palworld-OFFICIAL-CARD-GAME-Play-Guide.pdf";
export const JAPANESE_PLAYMAT_URL = "https://palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/06/26104552/Palworld-OFFICIAL-CARD-GAME-Playmat.pdf";
export const JAPANESE_OFFICIAL_QA_URL = "https://palworld-official-cardgame.com/question/";

export type JapaneseRuleAnswer = {
  id: string;
  question: string;
  answer: string;
  category: string;
  searchTerms: string[];
  sourceLabel: string;
  sourceUrl: string;
  updated: string;
  cardNumbers: string[];
  guideUrl?: string;
  featured: boolean;
  official: boolean;
};

const essentialRules: JapaneseRuleAnswer[] = [
  {
    id: "ja-deck-size",
    question: "デッキは何枚必要ですか？",
    answer: "メインデッキはちょうど50枚、ソウルデッキは別にちょうど10枚を用意します。",
    category: "ゲームの準備",
    searchTerms: ["デッキ 枚数", "50枚", "ソウル 10枚", "構築"],
    sourceLabel: "総合ルール 6.1",
    sourceUrl: JAPANESE_COMPREHENSIVE_RULES_URL,
    updated: "2026/07/30",
    cardNumbers: [],
    guideUrl: "/ja/guide/deck-building-rules",
    featured: true,
    official: false,
  },
  {
    id: "ja-starting-life",
    question: "最初のライフと手札は何枚ですか？",
    answer: "ライフは10で開始し、メインデッキから5枚引きます。手札の引き直しは1度だけ行えます。",
    category: "ゲームの準備",
    searchTerms: ["初期ライフ", "初期手札", "5枚", "マリガン", "引き直し"],
    sourceLabel: "総合ルール 6.2",
    sourceUrl: JAPANESE_COMPREHENSIVE_RULES_URL,
    updated: "2026/07/30",
    cardNumbers: [],
    guideUrl: "/ja/guide/how-to-play",
    featured: true,
    official: false,
  },
  {
    id: "ja-win-condition",
    question: "勝利条件と敗北条件は何ですか？",
    answer: "相手のライフを0以下にするか、相手のメインデッキを0枚にすると勝利です。両方が同時に敗北条件を満たした場合は引き分けです。",
    category: "ゲームの進行",
    searchTerms: ["勝ち方", "勝利条件", "敗北条件", "ライフ 0", "デッキ切れ"],
    sourceLabel: "総合ルール 1.2",
    sourceUrl: JAPANESE_COMPREHENSIVE_RULES_URL,
    updated: "2026/07/30",
    cardNumbers: [],
    guideUrl: "/ja/guide/how-to-play",
    featured: true,
    official: false,
  },
  {
    id: "ja-first-player-draw",
    question: "先攻は最初のターンにカードを引きますか？",
    answer: "引きません。先攻の最初のターンはドローフェイズを飛ばし、ソウルフェイズへ進みます。",
    category: "ゲームの進行",
    searchTerms: ["先攻", "1ターン目", "ドロー", "カードを引く"],
    sourceLabel: "総合ルール 7.3",
    sourceUrl: JAPANESE_COMPREHENSIVE_RULES_URL,
    updated: "2026/07/30",
    cardNumbers: [],
    guideUrl: "/ja/guide/how-to-play",
    featured: true,
    official: false,
  },
  {
    id: "ja-attack-first-turn",
    question: "最初のターンや登場したターンに攻撃できますか？",
    answer: "できます。スタンド状態のパルなら、登場したターンでも攻撃できます。カードの効果で制限されている場合は、その指示を優先します。",
    category: "ゲームの進行",
    searchTerms: ["最初のターン 攻撃", "登場したターン", "召喚酔い", "攻撃できる"],
    sourceLabel: "総合ルール 9.2",
    sourceUrl: JAPANESE_COMPREHENSIVE_RULES_URL,
    updated: "2026/07/30",
    cardNumbers: [],
    guideUrl: "/ja/guide/how-to-play",
    featured: true,
    official: false,
  },
  {
    id: "ja-damage-check",
    question: "プレイヤーへのダメージチェックはどう処理しますか？",
    answer: "攻撃したパルの打撃力と同じ枚数まで、メインデッキの上から1枚ずつ墓地に置きます。途中でラッキーアイコンが出るとチェックを止め、そのダメージによるライフ減少は発生しません。",
    category: "ゲームの進行",
    searchTerms: ["ダメージチェック", "打撃力", "ラッキー", "ライフ", "墓地"],
    sourceLabel: "総合ルール 9.6・11.2",
    sourceUrl: JAPANESE_COMPREHENSIVE_RULES_URL,
    updated: "2026/07/30",
    cardNumbers: [],
    guideUrl: "/ja/guide/how-to-play",
    featured: true,
    official: false,
  },
  {
    id: "ja-deck-colors",
    question: "デッキには何色まで入れられますか？",
    answer: "メインデッキに入れられる色は2色までです。無色カードは色数に含みません。",
    category: "ゲームの準備",
    searchTerms: ["デッキ 色", "2色", "無色", "赤 青 緑 紫"],
    sourceLabel: "公式プレイガイド",
    sourceUrl: JAPANESE_PLAY_GUIDE_URL,
    updated: "2026/07/30",
    cardNumbers: [],
    guideUrl: "/ja/guide/deck-building-rules",
    featured: true,
    official: false,
  },
  {
    id: "ja-copy-limit",
    question: "同じ名前のカードは何枚まで入れられますか？",
    answer: "同じカード名は、メインデッキに合計4枚まで入れられます。カード番号やイラストが違っても、カード名が同じなら合計で数えます。",
    category: "ゲームの準備",
    searchTerms: ["同名カード", "4枚", "コピー上限", "カード名"],
    sourceLabel: "総合ルール 6.1",
    sourceUrl: JAPANESE_COMPREHENSIVE_RULES_URL,
    updated: "2026/07/30",
    cardNumbers: [],
    guideUrl: "/ja/guide/deck-building-rules",
    featured: true,
    official: false,
  },
  {
    id: "ja-lucky-limit",
    question: "ラッキーアイコンのカードは何枚まで入れられますか？",
    answer: "ラッキーアイコンを持つカードは、メインデッキ全体で合計8枚までです。同じカード名を4枚までとするルールも同時に守ります。",
    category: "ゲームの準備",
    searchTerms: ["ラッキーアイコン", "8枚", "ラッキーパル", "デッキ構築"],
    sourceLabel: "総合ルール 6.1",
    sourceUrl: JAPANESE_COMPREHENSIVE_RULES_URL,
    updated: "2026/07/30",
    cardNumbers: [],
    guideUrl: "/ja/guide/deck-building-rules",
    featured: true,
    official: false,
  },
  {
    id: "ja-card-types",
    question: "パル・建築物・ギア・イベントの枚数に決まりはありますか？",
    answer: "カード種別ごとの最低枚数や上限はありません。50枚、2色まで、同名4枚まで、ラッキーアイコン合計8枚までの条件を守れば構築できます。",
    category: "ゲームの準備",
    searchTerms: ["パル 枚数", "建築物 枚数", "イベント 上限", "ギア 上限", "カード種別"],
    sourceLabel: "公式Q&A",
    sourceUrl: JAPANESE_OFFICIAL_QA_URL,
    updated: "2026/07/30",
    cardNumbers: [],
    guideUrl: "/ja/guide/deck-building-rules",
    featured: true,
    official: false,
  },
];

type OfficialRuleRecord = {
  id: string;
  question: string;
  answer: string;
  category: string;
  cardNumbers: string[];
  updated: string;
  sourceUrl: string;
};

const officialRules: JapaneseRuleAnswer[] = (officialRulesData.rules as OfficialRuleRecord[]).map((rule) => ({
  ...rule,
  searchTerms: [],
  sourceLabel: "公式Q&A",
  featured: false,
  official: true,
}));

export const japaneseRuleAnswers = [...essentialRules, ...officialRules];
export const japaneseFeaturedRuleAnswers = essentialRules;
export const japaneseOfficialRuleCount = officialRules.length;
export const japaneseRuleCategories = [
  "すべて",
  "ゲームの準備",
  "ゲームの進行",
  "カード能力",
  "カードに紐づくQ&A",
  "大会/イベント",
];
