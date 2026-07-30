"use client";

import { useEffect, useState } from "react";

type ArticleHeading = {
  id: string;
  label: string;
};

function headingId(label: string, index: number) {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return `guide-${index + 1}-${slug || "section"}`;
}

export function ArticleEnhancements() {
  const [headings, setHeadings] = useState<ArticleHeading[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(".article-shell");
    if (!article) return;

    const articleHeadings = Array.from(article.querySelectorAll<HTMLHeadingElement>(".article-body h2"));
    const nextHeadings = articleHeadings.map((heading, index) => {
      const label = heading.textContent?.trim() || `Section ${index + 1}`;
      const id = heading.id || headingId(label, index);
      heading.id = id;
      return { id, label };
    });
    const updateProgress = () => {
      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const readableDistance = Math.max(article.offsetHeight - window.innerHeight, 1);
      const nextProgress = Math.min(1, Math.max(0, (window.scrollY - articleTop) / readableDistance));
      setProgress(nextProgress);
    };

    const animationFrame = window.requestAnimationFrame(() => {
      setHeadings(nextHeadings);
      updateProgress();
    });
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      {headings.length > 1 && (
        <nav className="article-toc" aria-label="On this page">
          <strong>On this page</strong>
          <ol>
            {headings.map((heading) => (
              <li key={heading.id}><a href={`#${heading.id}`}>{heading.label}</a></li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
}
