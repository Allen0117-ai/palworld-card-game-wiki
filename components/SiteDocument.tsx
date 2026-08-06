import { Analytics } from "@vercel/analytics/next";
import { Cinzel, Inter, Oxanium } from "next/font/google";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { AnalyticsJourney } from "@/components/AnalyticsJourney";
import { InteractionEffects } from "@/components/InteractionEffects";
import { JsonLd } from "@/components/JsonLd";
import {
  LocalizedSiteFooter,
  LocalizedSiteHeader,
  LocalizedSkipLink,
} from "@/components/LocalizedSiteChrome";
import { ScrollReveal } from "@/components/ScrollReveal";
import { createOrganizationJsonLd, createWebSiteJsonLd } from "@/lib/seo";

const inter = Inter({ variable: "--font-body", subsets: ["latin"] });
const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});
const oxanium = Oxanium({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});
type SiteDocumentProps = Readonly<{
  beforeInteractiveScripts?: React.ReactNode;
  children: React.ReactNode;
  language: "en" | "ja";
}>;

export function SiteDocument({ beforeInteractiveScripts, children, language }: SiteDocumentProps) {
  return (
    <html lang={language}>
      <body className={`${inter.variable} ${cinzel.variable} ${oxanium.variable}`}>
        {beforeInteractiveScripts}
        <JsonLd data={[createOrganizationJsonLd(), createWebSiteJsonLd()]} />
        <LocalizedSkipLink />
        <InteractionEffects />
        <ScrollReveal />
        <LocalizedSiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <LocalizedSiteFooter />
        <Analytics />
        <AnalyticsJourney />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
