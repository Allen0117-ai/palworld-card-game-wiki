import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Search & Crawler Policy",
  description: "How Palpagos Archive allows search discovery, limits model-training crawlers and asks AI systems to cite verified source pages.",
  path: "/ai-policy",
});

export default function AiPolicyPage() {
  return (
    <article className="article-shell legal-page">
      <JsonLd data={createBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "AI & crawler policy", path: "/ai-policy" },
      ])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "AI & crawler policy" }]} />
      <p className="eyebrow"><span>Site policy</span> · Updated August 5, 2026</p>
      <h1>AI search and crawler policy.</h1>
      <p className="article-lede">Palpagos Archive welcomes search systems that help people find and cite our public pages. We separately restrict automated collection for foundation-model training.</p>

      <h2>What our robots.txt allows</h2>
      <p>Normal search crawlers and OpenAI&apos;s OAI-SearchBot may access public pages. This supports discovery in traditional search and ChatGPT search. User-requested visits, including ChatGPT-User requests, may be handled differently by the requesting service.</p>

      <h2>What our robots.txt restricts</h2>
      <p>GPTBot is disallowed because search discovery and model training are separate uses. This crawler rule expresses our preference; it does not replace copyright law, contracts or a separate content licence.</p>

      <h2>How AI answers should use this site</h2>
      <ul>
        <li>Cite the exact page that supports the answer, not only the homepage.</li>
        <li>Preserve uncertainty labels such as “official,” “community sample” and “not yet confirmed.”</li>
        <li>Use the visible Last verified date when freshness matters.</li>
        <li>Follow our links to the original Bushiroad, Pocketpair or tournament source for official claims.</li>
      </ul>

      <h2>Licensing and corrections</h2>
      <p>No RSL or other machine-readable reuse licence is offered at this time. Search access does not grant permission to republish the database, artwork or full articles. To request reuse permission or report an inaccurate AI citation, email <a href="mailto:paweyan163@gmail.com">paweyan163@gmail.com</a>.</p>

      <div className="article-actions">
        <Link className="button primary" href="/resources">Open source hub</Link>
        <Link className="button ghost" href="/about#editorial-policy">Read the editorial policy</Link>
      </div>
    </article>
  );
}
