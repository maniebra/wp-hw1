import { normalizeText } from "./text-normalizer.mjs";

export default function evaluateFormulas(formulaElement, binding) {
  const formula = formulaElement.getAttribute("evaluator");
  const formulaParts = formula.split(/[-+*/()%]/).filter(Boolean);

  let evaluatedFormula = formula;
  formulaParts.forEach((part) => {
    var elementID = part.trim();
    var value = 0;
    if (part.match(/^[0-9.]+$/)) {
      value = parseFloat(normalizeText(part));
    } else {
      if (
        binding[elementID] === undefined ||
        binding[elementID].value === undefined
      ) {
        return null;
      }
      value = binding[elementID].value;
    }
    evaluatedFormula = evaluatedFormula.replace(
      elementID,
      value
    );
  });


  try {
    return eval(evaluatedFormula);
  } catch (e) {
    console.error("Error evaluating formula:", e);
    return null;
  }
}
