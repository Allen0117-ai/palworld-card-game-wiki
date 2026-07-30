"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { rankSearchItems, scoreSearchText } from "@/lib/search";
import { featuredRuleAnswers, officialRuleCount, ruleAnswers, ruleCategories, type RuleAnswer } from "@/lib/rules";

function RuleSourceLink({ rule }: { rule: RuleAnswer }) {
  if (rule.sourceUrl.startsWith("/")) {
    return <Link href={rule.sourceUrl}>{rule.sourceLabel} →</Link>;
  }
  return <a href={rule.sourceUrl} target="_blank" rel="noreferrer">{rule.sourceLabel} ↗</a>;
}

export function RuleExplorer({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("All");
  const [showAllOfficial, setShowAllOfficial] = useState(false);
  const normalizedQuery = query.trim();

  const visibleRules = useMemo(() => {
    const categoryRules = category === "All"
      ? ruleAnswers
      : ruleAnswers.filter((rule) => rule.category === category);

    if (normalizedQuery) {
      return rankSearchItems(
        categoryRules,
        normalizedQuery,
        (rule) => `${rule.question} ${rule.answer} ${rule.category} ${rule.searchTerms.join(" ")} ${rule.cardNumbers.join(" ")}`,
        (rule) => (rule.featured ? 18 : 0) + Math.min(60, scoreSearchText(normalizedQuery, rule.question) * 0.5),
      ).slice(0, 20);
    }

    if (category !== "All") return categoryRules;
    if (showAllOfficial) return ruleAnswers;
    return [
      ...featuredRuleAnswers,
      ...ruleAnswers.filter((rule) => rule.official).slice(0, 8),
    ];
  }, [category, normalizedQuery, showAllOfficial]);

  const resultDescription = normalizedQuery
    ? `${visibleRules.length === 20 ? "Top 20 matches" : `${visibleRules.length} answer${visibleRules.length === 1 ? "" : "s"}`} for “${normalizedQuery}”`
    : category === "All"
      ? `${featuredRuleAnswers.length} essential answers and ${officialRuleCount} official rulings`
      : `${visibleRules.length} answers in ${category}`;

  return (
    <div className="rule-explorer shell">
      <form className="rule-search" role="search" action="/rules">
        <label htmlFor="rule-search-input">Ask a rules question in your own words</label>
        <div>
          <input
            id="rule-search-input"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “Can I attack on the first turn?”"
          />
          <button type="submit">Find answer</button>
        </div>
      </form>

      <div className="rule-category-list" aria-label="Filter rules by category">
        {ruleCategories.map((item) => (
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
        <span>Official wording is preserved for card-specific rulings. Essential answers are plain-English summaries linked to the source.</span>
      </div>

      {visibleRules.length > 0 ? (
        <div className="rule-answer-list">
          {visibleRules.map((rule, index) => (
            <details className="rule-answer" id={rule.id} open={Boolean(normalizedQuery) && index === 0} key={rule.id}>
              <summary>
                <span>{rule.featured ? "Plain-English answer" : rule.category}</span>
                <strong>{rule.question}</strong>
                {rule.cardNumbers.length > 0 && <small>{rule.cardNumbers.slice(0, 4).join(" · ")}</small>}
              </summary>
              <div>
                {rule.answer.split("\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <footer>
                  <RuleSourceLink rule={rule} />
                  {rule.guideUrl && <Link href={rule.guideUrl}>Read the full guide →</Link>}
                  <span>Checked {rule.updated}</span>
                </footer>
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="rule-empty">
          <strong>We do not have a confident answer for that wording yet.</strong>
          <p>Try a card number or a shorter phrase. You can also send the exact question so it can be added to the next update.</p>
          <a className="button primary" href={`mailto:hello@palworldcardgame.wiki?subject=${encodeURIComponent("Palworld Card Game question")}&body=${encodeURIComponent(`I searched: ${normalizedQuery}`)}`}>Submit this question</a>
        </div>
      )}

      {!normalizedQuery && category === "All" && !showAllOfficial && (
        <button className="button ghost rule-show-all" type="button" onClick={() => setShowAllOfficial(true)}>
          Browse all {officialRuleCount} official Q&amp;As
        </button>
      )}
    </div>
  );
}
