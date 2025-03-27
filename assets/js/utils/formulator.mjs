import { normalizeText } from "./text-normalizer.mjs";

export default function evaluateFormulas(formulaElement, binding) {
  let formula = formulaElement.getAttribute("evaluator");
  if (!formula) return null;

  const formulaParts = formula.split(/[-+*/()%]/).filter(Boolean);

  let evaluatedFormula = formula;
  formulaParts.forEach(part => {
    const elementID = part.trim();
    let value;

    if (elementID.match(/^[0-9۰-۹.]+$/)) {
      value = parseFloat(normalizeText(elementID));
    } else {
      if (!binding[elementID] || binding[elementID].value === undefined) {
        value = 0;
      } else {
        value = parseFloat(binding[elementID].value);
        if (isNaN(value)) {
          value = 0;
        }
      }
    }
    const regex = new RegExp('\\b' + elementID + '\\b', 'g');
    evaluatedFormula = evaluatedFormula.replace(regex, value);
  });

  evaluatedFormula = evaluatedFormula.replace(
    /([A-Za-z0-9_.]+)\s*\*\*\s*([A-Za-z0-9_.]+)/g,
    'Math.pow($1,$2)'
  );

  try {
    return eval(evaluatedFormula);
  } catch (e) {
    console.error("Error evaluating formula:", e, "Evaluated formula:", evaluatedFormula);
    return null;
  }
}
