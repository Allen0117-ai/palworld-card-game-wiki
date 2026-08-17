import Link from "next/link";
import { EDITORIAL_TEAM_NAME } from "@/lib/seo";

type EditorialBylineProps = Readonly<{
  locale?: "en" | "ja";
  reviewed: string;
  sourceStatus: string;
}>;

export function EditorialByline({
  locale = "en",
  reviewed,
  sourceStatus,
}: EditorialBylineProps) {
  if (locale === "ja") {
    return (
      <aside className="editorial-byline" aria-label="編集・確認情報">
        <span>編集・確認</span>
        <strong>Palpagos Archive 編集部</strong>
        <span>{reviewed} 確認</span>
        <span>{sourceStatus}</span>
        <Link href="/about#editorial-policy">編集方針</Link>
      </aside>
    );
  }

  return (
    <aside className="editorial-byline" aria-label="Article editor and verification details">
      <span>Reviewed by</span>
      <strong>{EDITORIAL_TEAM_NAME}</strong>
      <span>Last checked {reviewed}</span>
      <span>{sourceStatus}</span>
      <Link href="/about#editorial-policy">Editorial policy</Link>
    </aside>
  );
}
