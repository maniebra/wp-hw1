export function normalizeNumbers(persianText) {
  persianText = String(persianText);
  const numbers = "۰۱۲۳۴۵۶۷۸۹";
  return persianText.replace(/[۰-۹]/g, function (w) {
    return numbers.indexOf(w);
  });
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
