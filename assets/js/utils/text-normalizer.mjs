export function normalizeNumbers(rawText) {
  var numbers = "۰۱۲۳۴۵۶۷۸۹";
  return rawText.replace(/[0-9]/g, function (w) {
    return numbers[w];
  });
}

export function normalizePersianCharacters(rawText) {
  return rawText
    .replace(/ك/g, "ک")
    .replace(/ي/g, "ی")
    .replace(/ئ/g, "ی")
    .replace(/ة/g, "ه");
}

export function normalizeText(rawText) {
  return normalizePersianCharacters(normalizeNumbers(rawText));
}
