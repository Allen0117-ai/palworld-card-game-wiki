"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function JapaneseHeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <form
      className="hero-search beam-border"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        const value = query.trim();
        if (value) router.push(`/ja/search?q=${encodeURIComponent(value)}`);
      }}
    >
      <label className="sr-only" htmlFor="ja-hero-search">カード・ルール・デッキをまとめて検索</label>
      <input
        id="ja-hero-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="カード名、番号、質問を入力"
      />
      <button type="submit">検索 <span>↗</span></button>
    </form>
  );
}
