import Link from "next/link";

export type HubLinkGridItem = {
  href: string;
  label: string;
  title: string;
  description: string;
  badge?: string;
};

type HubLinkGridProps = {
  eyebrow: string;
  title: string;
  intro: string;
  items: HubLinkGridItem[];
  compact?: boolean;
  headingId?: string;
};

export function HubLinkGrid({ eyebrow, title, intro, items, compact = false, headingId = "hub-index-title" }: HubLinkGridProps) {
  return (
    <section className={`hub-index${compact ? " hub-index-compact" : ""}`} aria-labelledby={headingId}>
      <div className="hub-index-heading">
        <p className="hub-index-eyebrow">{eyebrow}</p>
        <h2 id={headingId}>{title}</h2>
        <p>{intro}</p>
      </div>
      <nav className="hub-index-links" aria-label={title}>
        {items.map((item) => (
          <Link className="hub-index-link" href={item.href} key={item.href}>
            <span className="hub-index-label">{item.label}</span>
            {item.badge ? <span className="hub-index-badge">{item.badge}</span> : null}
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
