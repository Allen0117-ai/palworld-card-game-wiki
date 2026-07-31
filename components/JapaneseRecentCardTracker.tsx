"use client";

import { useEffect } from "react";
import { JAPANESE_RECENT_CARD_STORAGE_KEY } from "@/lib/progress-storage";

export function JapaneseRecentCardTracker({
  slug,
  name,
  number,
}: {
  slug: string;
  name: string;
  number: string;
}) {
  useEffect(() => {
    window.localStorage.setItem(
      JAPANESE_RECENT_CARD_STORAGE_KEY,
      JSON.stringify({ version: 1, slug, name, number }),
    );
  }, [name, number, slug]);

  return null;
}
