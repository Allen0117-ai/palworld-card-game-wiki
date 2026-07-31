import { writeFile } from "node:fs/promises";

const API_URL = "https://palworld-official-cardgame.com/manage/rule-qa/list?per_page=5000&status=published";
const OUTPUT_URL = new URL("../lib/official-rules-ja.generated.json", import.meta.url);

const response = await fetch(API_URL, {
  headers: {
    "user-agent": "PalworldCardGameWiki-JapaneseRulesSync/1.0",
    referer: "https://palworld-official-cardgame.com/question/",
  },
});

if (!response.ok) {
  throw new Error(`Official Japanese rules API returned ${response.status}`);
}

const payload = await response.json();
if (!Array.isArray(payload.items) || payload.items.length === 0) {
  throw new Error("Official Japanese rules API returned no Q&A entries");
}

const rules = payload.items
  .filter((entry) => entry.disp_flg)
  .map((entry) => ({
    id: `official-ja-${entry.id}`,
    question: entry.question.trim(),
    answer: entry.answer.trim(),
    category: entry.category_label,
    cardNumbers: entry.card_number ? entry.card_number.split("|") : [],
    cardNames: entry.card_names || "",
    updated: entry.update_time || entry.regist_time,
    sourceUrl: "https://palworld-official-cardgame.com/question/",
  }));

await writeFile(
  OUTPUT_URL,
  `${JSON.stringify({ syncedOn: "2026-07-31", total: rules.length, rules }, null, 2)}\n`,
);

console.log(`Saved ${rules.length} official Japanese Q&A entries`);
