"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    router.push(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search");
  }

  return (
    <form className="hero-search beam-border" onSubmit={submit} role="search">
      <label className="sr-only" htmlFor="hero-card-search">Search Palworld Card Game cards, rules, decks and guides</label>
      <input id="hero-card-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cards, rules, decks or products…" />
      <button type="submit">Search <span>↗</span></button>
    </form>
  );
}
