"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  label: string;
};

function headingId(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function GuideToc({ contentId }: { contentId: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const content = document.getElementById(contentId);
    const article = content?.closest<HTMLElement>(".article-shell");
    if (!content || !article) return;

    const headings = [...content.querySelectorAll<HTMLElement>("h2")];
    const usedIds = new Set<string>();
    const nextItems = headings.map((heading) => {
      const baseId = heading.id || headingId(heading.textContent || "section");
      let id = baseId;
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(id);
      heading.id = id;
      return { id, label: heading.textContent || "Section" };
    });
    const updateProgress = () => {
      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const readableDistance = Math.max(article.offsetHeight - window.innerHeight, 1);
      setProgress(Math.min(1, Math.max(0, (window.scrollY - articleTop) / readableDistance)));
    };
    const frame = window.requestAnimationFrame(() => {
      setItems(nextItems);
      updateProgress();
    });
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [contentId]);

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      {items.length >= 2 && (
        <nav className="guide-toc" aria-label="On this page" data-guide-toc>
          <strong>On this page</strong>
          <ol>
            {items.map((item) => (
              <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
}
