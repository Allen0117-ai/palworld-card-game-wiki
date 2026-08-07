import type { JapaneseCard } from "./japanese";
import { japaneseColorLabel, japaneseTypeLabel } from "./japanese";

export type JapaneseCardStrategy = {
  overview: string;
  bestIn: string;
  suggestedCopies: string;
  playPattern: string[];
  watchFor: string;
};

const colorPlans: Record<JapaneseCard["color"], string> = {
  red: "素材と効果ダメージを攻めに変える赤デッキ",
  blue: "手札補充・レスト・テンポでバトルを調整する青デッキ",
  green: "食材と効率のよいパルで盤面を作る緑デッキ",
  purple: "夜・妨害・墓地利用を組み合わせる紫デッキ",
  colorless: "色を増やさずに動きを補いたいデッキ",
};

function abilityIncludes(card: JapaneseCard, terms: string[]) {
  return terms.some((term) => card.ability.includes(term));
}

function describeRole(card: JapaneseCard) {
  if (card.type === "Pal") {
    if (abilityIncludes(card, ["挑発"])) return "重要なカードを守る防御役";
    if (abilityIncludes(card, ["隠密", "強襲"])) return "通常のアタックやブロック条件を変える戦闘役";
    if (card.cost >= 7 || (card.strike ?? 0) >= 3) return "終盤に大きな圧力をかけるフィニッシャー";
    if (abilityIncludes(card, ["登場時"])) return "登場したターンから差を作るテンポ役";
    if (card.cost <= 3) return "少ないソウルで序盤の盤面を作る役";
    return "盤面とカード効果を両立する中盤役";
  }

  if (card.type === "Structure") {
    if (abilityIncludes(card, ["素材", "食材", "引く"])) return "複数ターン使える資源エンジン";
    if (abilityIncludes(card, ["ダメージ", "墓地に置く"])) return "繰り返し使える盤面処理";
    return "次のターンまで見据えて使う準備カード";
  }

  if (card.type === "Gear") {
    if (abilityIncludes(card, ["ダメージ", "墓地に置く"])) return "相手の盤面を処理するギア";
    if (abilityIncludes(card, ["戦闘力", "打撃力"])) return "バトルを補助するギア";
    return "継続して使うサポートギア";
  }

  if (abilityIncludes(card, ["妨害", "クイック"])) return "バトル中に構える対応用イベント";
  if (abilityIncludes(card, ["引く", "見る", "公開"])) return "必要なカードへ近づく手札調整イベント";
  if (abilityIncludes(card, ["ダメージ", "墓地に置く"])) return "一度だけ使う盤面処理イベント";
  return "使うタイミングが重要な単発イベント";
}

function describeDeckFit(card: JapaneseCard) {
  const basePlan = colorPlans[card.color];
  if (abilityIncludes(card, ["素材"])) return `${basePlan}。特に素材を安定して得られる構成で使いやすいです。`;
  if (abilityIncludes(card, ["食材"])) return `${basePlan}。食材を作るカードと使うカードの枚数を先に確認します。`;
  if (abilityIncludes(card, ["夜", "夜行性"])) return `${basePlan}。夜を継続できるカードと夜行性パルを十分に入れた構成向けです。`;
  if (abilityIncludes(card, ["ダメージ", "墓地に置く"])) return `${basePlan}。相手の重要なパルを処理する手段を増やしたい時に候補になります。`;
  if (abilityIncludes(card, ["引く", "見る", "公開"])) return `${basePlan}。必要なカードへ安定して近づきたい構成で役立ちます。`;
  return `${basePlan}で、同じコスト帯の候補と比べて採用します。`;
}

function suggestCopyCount(card: JapaneseCard) {
  if (card.cost >= 7) return "まず1～2枚。高コストカードを増やしすぎると序盤の手札が重くなります。";
  if (!card.ability.trim()) return card.cost <= 3
    ? "このカード名や低コストの数値が必要なら2～4枚から試します。"
    : "まず1～2枚。効果を持たないため、コストと数値が役割に合うかを確認します。";
  if (abilityIncludes(card, ["妨害", "クイック"])) return "まず2～3枚。構えやすさと、使わずに手札へ残る回数を記録して調整します。";
  if (card.type === "Structure" || card.type === "Gear") return "まず2枚。毎試合使えるエンジンになる場合だけ3枚目を検討します。";
  if (card.cost <= 3) return "初手から使う役なら3～4枚。終盤の弱いドローになる場合は減らします。";
  return "まず2～3枚。初手と中盤で実際に使えた回数を見て調整します。";
}

function firstStep(card: JapaneseCard) {
  if (card.cost >= 7) return `序盤は低コストカードで盤面を作り、${card.name}に必要な${card.cost}ソウルを残します。`;
  if (card.type === "Event") return `${card.name}を使うと最も差が出る盤面を決めてから、他のカードへソウルを使います。`;
  return `${card.name}のコスト${card.cost}が次の重要な行動を止めない順番で登場させます。`;
}

function secondStep(card: JapaneseCard) {
  if (abilityIncludes(card, ["登場時"])) return "登場時能力をバトル前に解決し、変わった盤面を見てアタック先やアサイン先を決めます。";
  if (abilityIncludes(card, ["妨害", "クイック"])) return "必要なコストを残し、結果を変えられるバトルまで手札で構えます。";
  if (abilityIncludes(card, ["【起】", "ターン１回"])) return "能力のコスト、対象、素材・食材、アサインするパルを先に用意してから起動します。";
  if (abilityIncludes(card, ["【自】", "時", "終了時"])) return "自動能力の条件を偶然待たず、その条件が起きる順番を先に作ります。";
  if (!card.ability.trim()) return "効果を持たないため、コスト・戦闘力・打撃力・色・カード名を目的に採用します。";
  return "効果のコスト、対象、タイミングを確認し、条件が足りないままカードを使わないようにします。";
}

function thirdStep(card: JapaneseCard) {
  if (card.type === "Pal") return "登場後は、アタック・ブロック・アサインのどれがそのターンで最も価値を出すか選びます。";
  if (card.type === "Structure") return "パルのアサインや資源の消費前に次のターンまで計算し、デッキの中心となる動きを続けます。";
  if (card.type === "Gear") return "ソウルが余った時ではなく、継続効果や起動能力が実際のバトルを変えるターンに使います。";
  return "今すぐ使う効果と、より重要な対象やタイミングまで手札に残す価値を比較します。";
}

function describeRisk(card: JapaneseCard) {
  if (!card.ability.trim()) return `${card.name}は効果を持たないため、数値・コスト・色・カード名がデッキ内で明確な役割を持つか確認します。`;
  if (abilityIncludes(card, ["ターン１回"])) return "能力はターン1回です。ソウル、手札、資源、対象、盤面条件も同時に必要か確認します。";
  if (card.cost >= 7) return `コスト${card.cost}なので、序盤に複数枚引くと動きが遅くなります。低・中コストの枚数を減らしすぎないでください。`;
  if (abilityIncludes(card, ["場合", "時", "なら", "夜", "素材", "食材"])) return "条件付きの効果です。必要な資源・タイミング・盤面を作れるカードがデッキに十分あるか数えます。";
  return "最大値だけで判断せず、同じコスト帯のカードと比べて、対象と使うタイミングが安定しているか確認します。";
}

export function getJapaneseCardStrategy(card: JapaneseCard): JapaneseCardStrategy {
  const stats = card.type === "Pal"
    ? `戦闘力${card.power ?? 0}・打撃力${card.strike ?? 0}`
    : `登場コスト${card.cost}`;

  return {
    overview: `${card.name}は、コスト${card.cost}の${japaneseColorLabel(card.color)}・${japaneseTypeLabel(card.type)}カードです。${stats}を持ち、デッキでは${describeRole(card)}として考えます。`,
    bestIn: describeDeckFit(card),
    suggestedCopies: suggestCopyCount(card),
    playPattern: [firstStep(card), secondStep(card), thirdStep(card)],
    watchFor: describeRisk(card),
  };
}
