"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { normalizeStoredDeck, sanitizeDeckName } from "@/lib/deck-share";
import {
  JAPANESE_DECK_DRAFT_STORAGE_KEY,
  JAPANESE_RECENT_CARD_STORAGE_KEY,
} from "@/lib/progress-storage";

type RecentCard = {
  slug: string;
  name: string;
  number: string;
};

type JapaneseHomeProgress = {
  title: string;
  body: string;
  progress?: number;
  progressLabel: string;
  actionLabel: string;
  actionHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

function readRecentCard(): RecentCard | null {
  const savedCard = window.localStorage.getItem(JAPANESE_RECENT_CARD_STORAGE_KEY);
  if (!savedCard) return null;

  const parsedCard: unknown = JSON.parse(savedCard);
  if (
    !parsedCard
    || typeof parsedCard !== "object"
    || !("slug" in parsedCard)
    || !("name" in parsedCard)
    || !("number" in parsedCard)
    || typeof parsedCard.slug !== "string"
    || typeof parsedCard.name !== "string"
    || typeof parsedCard.number !== "string"
    || !/^[a-z0-9-]+$/.test(parsedCard.slug)
  ) {
    return null;
  }

  return {
    slug: parsedCard.slug,
    name: parsedCard.name.slice(0, 80),
    number: parsedCard.number.slice(0, 24),
  };
}

function readSavedDeckProgress(recentCard: RecentCard | null): JapaneseHomeProgress | null {
  const savedDraft = window.localStorage.getItem(JAPANESE_DECK_DRAFT_STORAGE_KEY);
  if (!savedDraft) return null;

  const parsedDraft: unknown = JSON.parse(savedDraft);
  const storedDeck = parsedDraft && typeof parsedDraft === "object" && "deck" in parsedDraft
    ? normalizeStoredDeck(parsedDraft.deck)
    : normalizeStoredDeck(parsedDraft);
  if (!storedDeck) return null;

  const deckTotal = Object.values(storedDeck).reduce((total, copies) => total + copies, 0);
  if (!deckTotal) return null;

  const deckName = parsedDraft && typeof parsedDraft === "object" && "name" in parsedDraft && typeof parsedDraft.name === "string"
    ? sanitizeDeckName(parsedDraft.name, "無題のデッキ")
    : "無題のデッキ";
  const remainingCards = Math.max(50 - deckTotal, 0);

  return {
    title: `「${deckName}」の続きを作る。`,
    body: deckTotal === 50
      ? "50枚のデッキが完成しています。内容を確認して、共有URLを作れます。"
      : `あと${remainingCards}枚でメインデッキが完成します。保存したところから再開できます。`,
    progress: Math.min(Math.round(deckTotal / 50 * 100), 100),
    progressLabel: `${deckTotal} / 50枚`,
    actionLabel: deckTotal === 50 ? "デッキを開いて共有する" : "このデッキの続きを作る",
    actionHref: "/ja/tools/deck-builder?resume=1",
    secondaryLabel: recentCard
      ? `最近見たカード：${recentCard.name} →`
      : "別の完成デッキを見る →",
    secondaryHref: recentCard
      ? `/ja/card/${recentCard.slug}`
      : "/ja/decks",
  };
}

function createRecentCardProgress(recentCard: RecentCard): JapaneseHomeProgress {
  return {
    title: `${recentCard.name}をもう一度見る。`,
    body: `${recentCard.number}の効果と収録情報、同じ色・種類の関連カードを続けて確認できます。`,
    progressLabel: "最近見たカード",
    actionLabel: "カード情報の続きを見る",
    actionHref: `/ja/card/${recentCard.slug}`,
    secondaryLabel: "日本語カードでデッキを作る →",
    secondaryHref: "/ja/tools/deck-builder",
  };
}

export function JapaneseHomeProgressHub() {
  const [progress, setProgress] = useState<JapaneseHomeProgress | null>(null);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      let recentCard: RecentCard | null = null;
      try {
        recentCard = readRecentCard();
      } catch {
        recentCard = null;
      }

      try {
        const savedDeckProgress = readSavedDeckProgress(recentCard);
        if (savedDeckProgress) {
          setProgress(savedDeckProgress);
          return;
        }
      } catch {
        // A broken local draft should not hide a valid recent-card shortcut.
      }

      if (recentCard) setProgress(createRecentCardProgress(recentCard));
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, []);

  if (!progress) return null;

  return (
    <section className="home-progress shell" aria-labelledby="ja-home-progress-title">
      <div className="home-progress-copy">
        <p className="eyebrow"><span>前回の続き</span> · この端末だけに保存</p>
        <h2 id="ja-home-progress-title">{progress.title}</h2>
        <p>{progress.body}</p>
      </div>
      <div className="home-progress-action">
        <strong>{progress.progressLabel}</strong>
        {progress.progress !== undefined && (
          <div
            className="home-progress-track"
            role="progressbar"
            aria-label={progress.progressLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress.progress}
          >
            <span style={{ width: `${progress.progress}%` }} />
          </div>
        )}
        <Link className="button primary" href={progress.actionHref}>{progress.actionLabel} <span>↗</span></Link>
        <Link className="text-link" href={progress.secondaryHref}>{progress.secondaryLabel}</Link>
      </div>
    </section>
  );
}
