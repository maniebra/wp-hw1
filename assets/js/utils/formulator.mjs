export default function evaluateFormulas(formulaElement, binding) {
  const formula = formulaElement.getAttribute("evaluator");
  const formulaParts = formula.split(/[-+*/()%]/).filter(Boolean);

  let evaluatedFormula = formula;
  formulaParts.forEach((part) => {
    var elementID = part.trim();
    var value = 0;
    if (part.match(/^[0-9.]+$/)) {
      value = parseFloat(part);
    } else {
      if (
        binding[elementID] === undefined ||
        binding[elementID].value === undefined
      ) {
        return null;
      }
      value = binding[elementID].value;
    }
    console.log(value);
    evaluatedFormula = evaluatedFormula.replace(
      elementID,
      value
    );
  });

  console.log("Evaluated formula:", evaluatedFormula);

  try {
    return eval(evaluatedFormula);
  } catch (e) {
    console.error("Error evaluating formula:", e);
    return null;
  }
}
