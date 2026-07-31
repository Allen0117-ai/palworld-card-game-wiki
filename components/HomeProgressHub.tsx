"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { normalizeStoredDeck, sanitizeDeckName } from "@/lib/deck-share";
import {
  BP01_COLLECTION_STORAGE_KEY,
  BP01_COLLECTION_TOTAL,
  DECK_DRAFT_STORAGE_KEY,
} from "@/lib/progress-storage";

type HomeProgress = {
  eyebrow: string;
  title: string;
  body: string;
  progress: number;
  progressLabel: string;
  actionLabel: string;
  actionHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

const startingProgress: HomeProgress = {
  eyebrow: "Your next move · No account needed",
  title: "Start something worth saving.",
  body: "Copy a complete beginner deck, change a few cards, then create a share card a friend can open and remix.",
  progress: 0,
  progressLabel: "Progress stays on this device",
  actionLabel: "Start from a 50-card deck",
  actionHref: "/tools/deck-builder?deck=mono-red-pal-rush",
  secondaryLabel: "Prefer collecting? Start the BP01 checklist →",
  secondaryHref: "/tools/dawn-of-palpagos-checklist",
};

export function HomeProgressHub() {
  const [progress, setProgress] = useState<HomeProgress>(startingProgress);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      let deckTotal = 0;
      let deckName = "Untitled deck";
      let collectionCount = 0;

      try {
        const savedDraft = window.localStorage.getItem(DECK_DRAFT_STORAGE_KEY);
        if (savedDraft) {
          const parsedDraft: unknown = JSON.parse(savedDraft);
          const storedDeck = parsedDraft && typeof parsedDraft === "object" && "deck" in parsedDraft
            ? normalizeStoredDeck(parsedDraft.deck)
            : normalizeStoredDeck(parsedDraft);
          if (storedDeck) {
            deckTotal = Object.values(storedDeck).reduce((total, copies) => total + copies, 0);
          }
          if (parsedDraft && typeof parsedDraft === "object" && "name" in parsedDraft && typeof parsedDraft.name === "string") {
            deckName = sanitizeDeckName(parsedDraft.name);
          }
        }
      } catch {
        deckTotal = 0;
      }

      try {
        const savedChecklist = window.localStorage.getItem(BP01_COLLECTION_STORAGE_KEY);
        if (savedChecklist) {
          const parsedChecklist: unknown = JSON.parse(savedChecklist);
          if (Array.isArray(parsedChecklist)) {
            collectionCount = Math.min(
              new Set(parsedChecklist.filter((cardNumber): cardNumber is string => typeof cardNumber === "string")).size,
              BP01_COLLECTION_TOTAL,
            );
          }
        }
      } catch {
        collectionCount = 0;
      }

      if (!deckTotal && !collectionCount) return;

      const deckCompletion = deckTotal / 50;
      const collectionCompletion = collectionCount / BP01_COLLECTION_TOTAL;

      if (deckTotal && deckCompletion >= collectionCompletion) {
        setProgress({
          eyebrow: "Welcome back · Saved on this device",
          title: `Continue “${deckName}”.`,
          body: deckTotal === 50
            ? "Your deck is complete. Generate its share card and invite a friend to remix it."
            : `Add ${50 - deckTotal} more cards, then share the finished list with your playgroup.`,
          progress: Math.round(deckCompletion * 100),
          progressLabel: `${deckTotal} of 50 cards`,
          actionLabel: deckTotal === 50 ? "Open and share deck" : "Continue this deck",
          actionHref: "/tools/deck-builder?resume=1",
          secondaryLabel: collectionCount
            ? `BP01 collection: ${collectionCount} of ${BP01_COLLECTION_TOTAL} →`
            : "Or continue with the BP01 checklist →",
          secondaryHref: "/tools/dawn-of-palpagos-checklist",
        });
        return;
      }

      setProgress({
        eyebrow: "Welcome back · Saved on this device",
        title: "Continue your BP01 collection.",
        body: `You have ${BP01_COLLECTION_TOTAL - collectionCount} entries left. Mark the next card, then share your progress with another collector.`,
        progress: Math.round(collectionCompletion * 100),
        progressLabel: `${collectionCount} of ${BP01_COLLECTION_TOTAL} collected`,
        actionLabel: "Continue collection",
        actionHref: "/tools/dawn-of-palpagos-checklist",
        secondaryLabel: deckTotal
          ? `Saved deck: ${deckName} · ${deckTotal} of 50 →`
          : "Or start from a complete 50-card deck →",
        secondaryHref: deckTotal ? "/tools/deck-builder?resume=1" : "/tools/deck-builder?deck=mono-red-pal-rush",
      });
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, []);

  return (
    <section className="home-progress shell" aria-labelledby="home-progress-title" data-reveal>
      <div className="home-progress-copy">
        <p className="eyebrow"><span>{progress.eyebrow}</span></p>
        <h2 id="home-progress-title">{progress.title}</h2>
        <p>{progress.body}</p>
      </div>
      <div className="home-progress-action">
        <strong>{progress.progressLabel}</strong>
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
        <Link className="button primary" href={progress.actionHref}>{progress.actionLabel} <span>↗</span></Link>
        <Link className="text-link" href={progress.secondaryHref}>{progress.secondaryLabel}</Link>
      </div>
    </section>
  );
}
