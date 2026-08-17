type ContentHistoryItem = {
  date: string;
  note: string;
};

type ContentFreshnessPanelProps = {
  updated: string;
  verified?: string;
  sourceStatus: string;
  summary: string;
  changeSummary?: string;
  published?: string;
  history?: ContentHistoryItem[];
  locale?: "en" | "ja";
};

const labels = {
  en: {
    eyebrow: "Page update",
    title: "What changed",
    updated: "Updated",
    verified: "Last checked",
    sources: "Sources",
    coverage: "Covered here",
    changed: "This update",
    history: "Update history",
    published: "Published",
  },
  ja: {
    eyebrow: "情報の更新状況",
    title: "確認日と更新内容",
    updated: "最終更新",
    verified: "最終確認",
    sources: "情報の基準",
    coverage: "このページで確認できること",
    changed: "今回の更新",
    history: "更新履歴",
    published: "初回公開",
  },
} as const;

export function ContentFreshnessPanel({
  updated,
  verified = updated,
  sourceStatus,
  summary,
  changeSummary,
  published,
  history = [],
  locale = "en",
}: ContentFreshnessPanelProps) {
  const copy = labels[locale];
  const timeline = [
    ...(published ? [{ date: published, note: copy.published }] : []),
    ...history,
  ].filter((item, index, items) => (
    items.findIndex((candidate) => candidate.date === item.date && candidate.note === item.note) === index
  ));

  return (
    <section className="content-freshness" aria-label={copy.eyebrow}>
      <div className="content-freshness-heading">
        <p className="eyebrow"><span>{copy.eyebrow}</span></p>
        <h2>{copy.title}</h2>
      </div>
      <dl className="content-freshness-meta">
        <div><dt>{copy.updated}</dt><dd>{updated}</dd></div>
        <div><dt>{copy.verified}</dt><dd>{verified}</dd></div>
        <div><dt>{copy.sources}</dt><dd>{sourceStatus}</dd></div>
      </dl>
      <div className="content-freshness-summary">
        <strong>{changeSummary ? copy.changed : copy.coverage}</strong>
        <p>{changeSummary || summary}</p>
      </div>
      {timeline.length ? (
        <details className="content-freshness-history">
          <summary>{copy.history}</summary>
          <ol>
            {timeline.map((item) => <li key={`${item.date}-${item.note}`}><time>{item.date}</time><span>{item.note}</span></li>)}
          </ol>
        </details>
      ) : null}
    </section>
  );
}
