import { writeFile } from "node:fs/promises";

const API_URL = "https://en.palworld-official-cardgame.com/manage/rule-qa/list?page=1&per_page=200";
const OUTPUT_URL = new URL("../lib/official-rules.generated.json", import.meta.url);

const response = await fetch(API_URL, {
  headers: { "user-agent": "PalworldCardGameWiki-RulesSync/1.0" },
});

if (!response.ok) {
  throw new Error(`Official rules API returned ${response.status}`);
}

const payload = await response.json();
if (!Array.isArray(payload.items) || payload.items.length === 0) {
  throw new Error("Official rules API returned no Q&A entries");
}

const rules = payload.items
  .filter((entry) => entry.disp_flg)
  .map((entry) => ({
    id: `official-${entry.id}`,
    question: entry.question.trim(),
    answer: entry.answer.trim(),
    category: entry.category_label,
    cardNumbers: entry.card_number ? entry.card_number.split("|") : [],
    cardNames: entry.card_names || "",
    updated: entry.update_time || entry.regist_time,
    sourceUrl: "https://en.palworld-official-cardgame.com/question",
  }));

await writeFile(
  OUTPUT_URL,
  `${JSON.stringify({ syncedOn: "2026-07-30", total: rules.length, rules }, null, 2)}\n`,
);

console.log(`Saved ${rules.length} official Q&A entries`);
