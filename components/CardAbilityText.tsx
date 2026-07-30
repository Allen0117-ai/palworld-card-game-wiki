const highlightedTerms = /(\[(?:AUTO|ACT|CONT)\]|On Deploy:|On Attack:|On Assign:|From hand —|Quick —|Once per turn —|\bdamage\b|\bMaterial\b|\bIngredient\b|\bStrike\b|\bPower\b|\bDurability\b)/gi;
const highlightedTerm = /^(\[(?:AUTO|ACT|CONT)\]|On Deploy:|On Attack:|On Assign:|From hand —|Quick —|Once per turn —|damage|Material|Ingredient|Strike|Power|Durability)$/i;

function termClassName(term: string) {
  const normalized = term.toLowerCase();
  if (normalized === "[auto]") return "ability-badge ability-badge-auto";
  if (normalized === "[act]") return "ability-badge ability-badge-act";
  if (normalized === "[cont]") return "ability-badge ability-badge-cont";
  if (normalized.startsWith("on ") || normalized.startsWith("from hand") || normalized.startsWith("quick")) {
    return "ability-keyword";
  }
  if (normalized === "damage") return "ability-damage";
  if (["material", "ingredient", "strike", "power", "durability"].includes(normalized)) {
    return "ability-resource";
  }
  return "ability-timing";
}

export function CardAbilityText({ text }: { text: string }) {
  const abilityLines = text
    ? text.split(/(?=\[(?:AUTO|ACT|CONT)\])/g).filter(Boolean)
    : ["This card has no printed ability text."];

  return (
    <div className="ability-text">
      {abilityLines.map((line, lineIndex) => (
        <p key={`${line.slice(0, 20)}-${lineIndex}`}>
          {line.split(highlightedTerms).filter(Boolean).map((term, termIndex) => (
            highlightedTerm.test(term)
              ? <span className={termClassName(term)} key={`${term}-${termIndex}`}>{term.replaceAll("[", "").replaceAll("]", "")}</span>
              : <span key={`${term}-${termIndex}`}>{term}</span>
          ))}
        </p>
      ))}
    </div>
  );
}
