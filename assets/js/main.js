import bind from "./utils/binder.mjs";
import evaluateFormulas from "./utils/formulator.mjs";

let binding = bind();

binding.submitItem.addEventListener("click", () => {
  alert("clicked");
});

const formulaElement = document
  .querySelectorAll("formula")
  .forEach((formulaElement) => {
    document.querySelectorAll("input[id]").forEach((input) => {
      input.addEventListener("change", () => {
        const result = evaluateFormulas(formulaElement, binding);

        console.log("Result:", result);
      });
    });
  });
