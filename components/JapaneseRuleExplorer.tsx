"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { rankSearchItems, scoreSearchText } from "@/lib/search";
import {
  japaneseFeaturedRuleAnswers,
  japaneseOfficialRuleCount,
  japaneseRuleAnswers,
  japaneseRuleCategories,
  type JapaneseRuleAnswer,
} from "@/lib/japanese-rules";

function SourceLink({ rule }: { rule: JapaneseRuleAnswer }) {
  if (rule.sourceUrl.startsWith("/")) {
    return <Link href={rule.sourceUrl}>{rule.sourceLabel} →</Link>;
  }
  return <a href={rule.sourceUrl} target="_blank" rel="noreferrer">{rule.sourceLabel} ↗</a>;
}

export function JapaneseRuleExplorer({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("すべて");
  const [showAllOfficial, setShowAllOfficial] = useState(false);
  const normalizedQuery = query.trim();

  const visibleRules = useMemo(() => {
    const categoryRules = category === "すべて"
      ? japaneseRuleAnswers
      : japaneseRuleAnswers.filter((rule) => rule.category === category);

    if (normalizedQuery) {
      return rankSearchItems(
        categoryRules,
        normalizedQuery,
        (rule) => `${rule.question} ${rule.answer} ${rule.category} ${rule.searchTerms.join(" ")} ${rule.cardNumbers.join(" ")}`,
        (rule) => (rule.featured ? 18 : 0) + Math.min(60, scoreSearchText(normalizedQuery, rule.question) * 0.5),
      ).slice(0, 20);
    }

    if (category !== "すべて") return categoryRules;
    if (showAllOfficial) return japaneseRuleAnswers;
    return [
      ...japaneseFeaturedRuleAnswers,
      ...japaneseRuleAnswers.filter((rule) => rule.official).slice(0, 8),
    ];
  }, [category, normalizedQuery, showAllOfficial]);

  const resultDescription = normalizedQuery
    ? `「${normalizedQuery}」の検索結果 ${visibleRules.length}件`
    : category === "すべて"
      ? `基本ルール${japaneseFeaturedRuleAnswers.length}件・公式Q&A ${japaneseOfficialRuleCount}件`
      : `${category} ${visibleRules.length}件`;

  return (
    <div className={`rule-explorer shell${normalizedQuery ? " has-query" : ""}`}>
      <form className="rule-search" role="search" action="/ja/rules">
        <label htmlFor="ja-rule-search-input">質問・カード名・カード番号で検索</label>
        <div>
          <input
            id="ja-rule-search-input"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例：最初のターンに攻撃できますか？"
          />
          <button type="submit">答えを探す</button>
        </div>
      </form>

      <div className="rule-category-list" aria-label="カテゴリで絞り込む">
        {japaneseRuleCategories.map((item) => (
          <button
            type="button"
            className={item === category ? "active" : ""}
            aria-pressed={item === category}
            onClick={() => setCategory(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="rule-result-status" aria-live="polite">
        <strong>{resultDescription}</strong>
        <span>カード固有の裁定は公式Q&amp;Aの日本語原文をそのまま掲載。初心者向けの基本回答は、参照した公式ルールを明記しています。</span>
      </div>

      {visibleRules.length > 0 ? (
        <div className="rule-answer-list">
          {visibleRules.map((rule, index) => (
            <details className="rule-answer" id={rule.id} open={Boolean(normalizedQuery) && index === 0} key={rule.id}>
              <summary>
                <span>{rule.featured ? "初心者向け基本回答" : rule.category}</span>
                <strong>{rule.question}</strong>
                {rule.cardNumbers.length > 0 && <small>{rule.cardNumbers.slice(0, 5).join(" · ")}</small>}
              </summary>
              <div>
                {rule.answer.split("\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <footer>
                  <SourceLink rule={rule} />
                  {rule.guideUrl && <Link href={rule.guideUrl}>詳しい解説を読む →</Link>}
                  <span>更新 {rule.updated}</span>
                </footer>
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="rule-empty">
          <strong>該当する回答が見つかりませんでした。</strong>
          <p>カード番号、カード名、または短い言葉に変えて検索してください。</p>
          <a className="button primary" href={`mailto:paweyan163@gmail.com?subject=${encodeURIComponent("パルワールドカードゲーム ルール質問")}&body=${encodeURIComponent(`検索した言葉：${normalizedQuery}`)}`}>質問を送る</a>
        </div>
      )}

      {!normalizedQuery && category === "すべて" && !showAllOfficial && (
        <button className="button ghost rule-show-all" type="button" onClick={() => setShowAllOfficial(true)}>
          公式Q&amp;A {japaneseOfficialRuleCount}件をすべて見る
        </button>
      )}
    </div>
  );
}
