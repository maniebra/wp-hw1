export function normalizeNumbers(persianText) {
  let alteredText = String(persianText);
  const numbers = "۰۱۲۳۴۵۶۷۸۹";
  for(let i = 0; i < 10; i++) {
    alteredText = alteredText.replace(/numbers[i]/g, String(i));
  }
  console.log(alteredText)
  return alteredText
}

export function normalizePersianCharacters(rawText) {
  rawText = String(rawText);
  return rawText
    .replace(/ك/g, "ک")
    .replace(/ي/g, "ی")
    .replace(/ئ/g, "ی")
    .replace(/ة/g, "ه");
}

export function normalizeText(rawText) {
  return normalizePersianCharacters(normalizeNumbers(rawText));
}
