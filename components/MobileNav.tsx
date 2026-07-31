"use client";

import Link from "next/link";

const englishMobileLinks = [
  ["/rules", "Rules & FAQ"],
  ["/cards", "Card database"],
  ["/decks", "Deck guides"],
  ["/blog", "Guides"],
  ["/tools/deck-builder", "Deck builder"],
  ["/resources", "Sources"],
  ["/search", "Search"],
  ["/ja", "日本語"],
];

const japaneseMobileLinks = [
  ["/ja", "ホーム"],
  ["/ja/cards", "カードリスト"],
  ["/ja/decks", "デッキレシピ"],
  ["/ja/rules", "ルール・遊び方"],
  ["/", "English"],
];

export function MobileNav({ locale = "en" }: { locale?: "en" | "ja" }) {
  const closeMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };
  const mobileLinks = locale === "ja" ? japaneseMobileLinks : englishMobileLinks;

  return (
    <details className="mobile-nav">
      <summary aria-label={locale === "ja" ? "メニューを開く" : "Open main navigation"}>
        <span>{locale === "ja" ? "メニュー" : "Menu"}</span>
        <span aria-hidden="true">◆</span>
      </summary>
      <nav aria-label={locale === "ja" ? "モバイルナビゲーション" : "Mobile navigation"}>
        {mobileLinks.map(([href, label]) => <Link href={href} onClick={closeMenu} key={href}>{label}</Link>)}
      </nav>
    </details>
  );
}
