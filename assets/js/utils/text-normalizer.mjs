export function normalizeNumbers(persianText) {
  var numbers = "۰۱۲۳۴۵۶۷۸۹";
  return persianText.replace(/[۰-۹]/g, function (w) {
    return numbers.indexOf(w);
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
