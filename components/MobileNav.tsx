"use client";

import Link from "next/link";

const mobileLinks = [
  ["/rules", "Rules & FAQ"],
  ["/cards", "Card database"],
  ["/decks", "Deck guides"],
  ["/blog", "Guides"],
  ["/tools/deck-builder", "Deck builder"],
  ["/resources", "Sources"],
  ["/search", "Search"],
];

export function MobileNav() {
  const closeMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <details className="mobile-nav">
      <summary aria-label="Open main navigation"><span>Menu</span><span aria-hidden="true">◆</span></summary>
      <nav aria-label="Mobile navigation">
        {mobileLinks.map(([href, label]) => <Link href={href} onClick={closeMenu} key={href}>{label}</Link>)}
      </nav>
    </details>
  );
}
