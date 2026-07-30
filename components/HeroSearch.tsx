"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    router.push(query.trim() ? `/cards?q=${encodeURIComponent(query.trim())}` : "/cards");
  }

  return (
    <form className="hero-search" onSubmit={submit} role="search">
      <label className="sr-only" htmlFor="hero-card-search">Search the Palworld TCG card database</label>
      <input id="hero-card-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a card or number…" />
      <button type="submit">Search <span>↗</span></button>
    </form>
  );
}
